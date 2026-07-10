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
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 10px; padding: 20px;">
          <h2 style="color: #333; border-bottom: 1px solid #eaeaea; padding-bottom: 10px;">New Booking Request</h2>
          <p style="color: #555;"><strong>Name:</strong> ${name}</p>
          <p style="color: #555;"><strong>Email:</strong> ${email}</p>
          <p style="color: #555;"><strong>Topic:</strong> ${topic}</p>
          <p style="color: #555;"><strong>Date:</strong> ${date}</p>
          <p style="color: #555;"><strong>Time:</strong> ${time}</p>
          <br/>
          <div style="margin-top: 20px;">
            <a href="${confirmLink}" style="padding: 12px 24px; background: #10b981; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">✅ Confirm Appointment</a>
            <span style="display: inline-block; width: 10px;"></span>
            <a href="${declineLink}" style="padding: 12px 24px; background: #ef4444; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">❌ Decline Appointment</a>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Booking Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
