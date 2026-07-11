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
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0b0e14; font-family: 'Inter', Helvetica, Arial, sans-serif; padding: 40px 0;">
          <tr>
            <td align="center">
              <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #10141e; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 40px;">
                    <h2 style="color: #dfa129; font-size: 24px; font-weight: 800; margin-top: 0; margin-bottom: 24px;">Booking Confirmed</h2>
                    <p style="color: #ffffff; font-size: 16px; font-weight: 500; margin-bottom: 16px;">Dear ${decoded.name},</p>
                    <p style="color: #a0aab2; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">Your strategic session for <strong style="color: #ffffff;">${decoded.topic}</strong> on <strong style="color: #ffffff;">${decoded.date}</strong> at <strong style="color: #ffffff;">${decoded.time}</strong> has been officially confirmed.</p>
                    <p style="color: #a0aab2; font-size: 16px; line-height: 1.6; margin-bottom: 32px;">We look forward to speaking with you and providing the clarity your business needs.</p>
                    
                    <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 24px;">
                      <p style="color: #ffffff; font-size: 14px; font-weight: 700; margin-bottom: 4px;">NUSALEXA Law Office</p>
                      <p style="color: #a0aab2; font-size: 14px; margin: 0;">Designed for Modern Business</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
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
