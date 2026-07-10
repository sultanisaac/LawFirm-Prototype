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
      subject: `Booking Update: ${decoded.topic}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 10px; padding: 20px;">
          <h2 style="color: #ef4444;">Booking Update</h2>
          <p style="color: #555;">Hi ${decoded.name},</p>
          <p style="color: #555;">We are currently unable to accommodate your booking request for <strong>${decoded.topic}</strong> on <strong>${decoded.date}</strong> at <strong>${decoded.time}</strong>.</p>
          <p style="color: #555;">Please contact us via WhatsApp to reschedule or find an alternative time.</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <p style="color: #888; font-size: 12px;">Best regards,<br/>The Law Firm Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new NextResponse('<html><body style="font-family: sans-serif; text-align: center; margin-top: 50px;"><h2 style="color: #ef4444;">❌ Appointment Declined.</h2><p>A cancellation email has been sent to the client.</p></body></html>', {
      headers: { 'Content-Type': 'text/html' }
    });
  } catch (error) {
    console.error('Decline Error:', error);
    return new NextResponse('<html><body style="font-family: sans-serif; text-align: center; margin-top: 50px;"><h2 style="color: #ef4444;">❌ Invalid or expired token</h2></body></html>', {
      status: 400,
      headers: { 'Content-Type': 'text/html' }
    });
  }
}
