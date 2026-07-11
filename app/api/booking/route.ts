import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, topic, date, time } = body;

    // Create a payload for the JWT
    const payload = { name, email, topic, date, time };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret123', { expiresIn: '7d' });

    // Base URL of the app
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Magic links
    const confirmLink = `${appUrl}/api/booking/confirm?token=${token}`;
    const declineLink = `${appUrl}/api/booking/decline?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // sending to the business owner
      subject: `New Booking Request from ${name}`,
      html: `
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0b0e14; font-family: 'Inter', Helvetica, Arial, sans-serif; padding: 40px 0;">
          <tr>
            <td align="center">
              <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #10141e; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 40px;">
                    <h2 style="color: #ffffff; font-size: 24px; font-weight: 800; margin-top: 0; margin-bottom: 24px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 16px;">New Booking Request</h2>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 32px;">
                      <tr><td style="padding-bottom: 12px;"><strong style="color: #ffffff;">Name:</strong> <span style="color: #a0aab2;">${name}</span></td></tr>
                      <tr><td style="padding-bottom: 12px;"><strong style="color: #ffffff;">Email:</strong> <span style="color: #a0aab2;">${email}</span></td></tr>
                      <tr><td style="padding-bottom: 12px;"><strong style="color: #ffffff;">Topic:</strong> <span style="color: #a0aab2;">${topic}</span></td></tr>
                      <tr><td style="padding-bottom: 12px;"><strong style="color: #ffffff;">Date:</strong> <span style="color: #a0aab2;">${date}</span></td></tr>
                      <tr><td style="padding-bottom: 12px;"><strong style="color: #ffffff;">Time:</strong> <span style="color: #a0aab2;">${time}</span></td></tr>
                    </table>
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center" style="border-radius: 12px; background-color: #dfa129;">
                          <a href="${confirmLink}" style="font-size: 16px; font-weight: 700; color: #422006; text-decoration: none; padding: 14px 28px; border-radius: 12px; display: inline-block;">Confirm Appointment</a>
                        </td>
                        <td width="16"></td>
                        <td align="center" style="border-radius: 12px; background-color: transparent; border: 1px solid #ef4444;">
                          <a href="${declineLink}" style="font-size: 16px; font-weight: 700; color: #ef4444; text-decoration: none; padding: 14px 28px; border-radius: 12px; display: inline-block;">Decline</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Booking Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
