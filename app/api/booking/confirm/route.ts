import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    
    // In Phase 3, this is where we'd add to Google Calendar.
    // For now (Phase 2), we just send a confirmation email to the client.

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: decoded.email,
      subject: `Booking Confirmed: ${decoded.topic}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 10px; padding: 20px;">
          <h2 style="color: #10b981;">Your appointment is confirmed!</h2>
          <p style="color: #555;">Hi ${decoded.name},</p>
          <p style="color: #555;">Your booking for <strong>${decoded.topic}</strong> on <strong>${decoded.date}</strong> at <strong>${decoded.time}</strong> has been confirmed.</p>
          <p style="color: #555;">We look forward to speaking with you.</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <p style="color: #888; font-size: 12px;">Best regards,<br/>The Law Firm Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new NextResponse('<html><body style="font-family: sans-serif; text-align: center; margin-top: 50px;"><h2 style="color: #10b981;">✅ Appointment Confirmed Successfully!</h2><p>A confirmation email has been sent to the client.</p></body></html>', {
      headers: { 'Content-Type': 'text/html' }
    });
  } catch (error) {
    console.error('Confirm Error:', error);
    return new NextResponse('<html><body style="font-family: sans-serif; text-align: center; margin-top: 50px;"><h2 style="color: #ef4444;">❌ Invalid or expired token</h2></body></html>', {
      status: 400,
      headers: { 'Content-Type': 'text/html' }
    });
  }
}
