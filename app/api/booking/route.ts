import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, topic, date, time } = body;

    // Create a payload for the JWT
    const payload = { name, email, phone, topic, date, time };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret123', { expiresIn: '7d' });

    // Base URL of the app (dynamically detected from the request, falling back to env variable)
    const requestUrl = new URL(req.url);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || requestUrl.origin;

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
      subject: `[ACTION REQUIRED] New Consultation Request: ${topic} - ${name}`,
      html: `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>New Consultation Request Received</title>
    
    <!-- Note: Standard email clients will fallback to Arial/sans-serif if web fonts are stripped -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet">

    <style>
        /* Base Reset */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
        body { margin: 0; padding: 0; width: 100% !important; height: 100% !important; background-color: #0b0e14; -webkit-font-smoothing: antialiased; }
        
        /* Hover Effects for Web Preview (Stripped in most email clients, but great for the canvas) */
        .btn-primary:hover { background-color: #f0b545 !important; border-color: #f0b545 !important; }
        .btn-secondary:hover { background-color: rgba(223, 161, 41, 0.1) !important; border-color: #dfa129 !important; }
        .wa-link:hover { color: #f0b545 !important; text-decoration: underline !important; }

        /* Mobile Responsiveness */
        @media screen and (max-width: 600px) {
            .email-container { width: 100% !important; max-width: 100% !important; }
            .content-card { padding: 24px 20px !important; border-radius: 0px !important; border-left: none !important; border-right: none !important; }
            .header-padding { padding: 30px 20px 20px !important; }
            
            /* Stack buttons on mobile */
            .btn-table, .btn-wrapper { display: block !important; width: 100% !important; }
            .btn-wrapper { margin-bottom: 12px !important; padding-right: 0 !important; }
            .btn { display: block !important; text-align: center !important; }
            .data-label { width: 100% !important; display: block !important; padding-bottom: 4px !important; }
            .data-value { width: 100% !important; display: block !important; padding-bottom: 16px !important; }
            .data-row { display: block !important; }
        }
    </style>
</head>

<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #0b0e14; font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;">
    <center style="width: 100%; background-color: #0b0e14;">
        <!-- Visually Hidden Preheader Text -->
        <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
            A new strategic consultation request has been submitted by ${name}. Please review and confirm.
        </div>

        <!-- Main Email Container -->
        <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: auto; width: 100%; max-width: 600px;" class="email-container">
            
            <tr>
                <td class="header-padding" style="padding: 40px 0 30px; text-align: center;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                        <tr>
                            <td style="font-family: 'Inter', sans-serif; font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: 2px;">
                                NUSALEXA <span style="color: #dfa129;">.</span>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 500; color: #a0aab2; letter-spacing: 3px; padding-top: 4px; text-transform: uppercase;">
                                Law Office | Dark Performance Lab
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

            <tr>
                <td style="padding: 0 16px 40px;">
                    <!-- Content Card Background -->
                    <table class="content-card" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #10141e; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; border-top: 4px solid #dfa129; padding: 40px;">
                        
                        <!-- Headline -->
                        <tr>
                            <td style="padding-bottom: 24px;">
                                <h1 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 24px; font-weight: 700; color: #ffffff; line-height: 1.3;">
                                    New Consultation Request Received
                                </h1>
                            </td>
                        </tr>

                        <!-- Body Copy -->
                        <tr>
                            <td style="font-family: 'Inter', sans-serif; font-size: 15px; line-height: 1.6; color: #a0aab2; padding-bottom: 32px;">
                                <p style="margin: 0 0 16px; color: #ffffff; font-weight: 500;">Hello NUSALEXA Law Office Admin,</p>
                                <p style="margin: 0;">A new strategic consultation request has just been submitted via the website. Please review the client details below and confirm or decline the appointment.</p>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding-bottom: 24px;">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                    <tr>
                                        <td style="font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 700; color: #ffffff; text-transform: uppercase; letter-spacing: 1px; padding-bottom: 12px;">
                                            Client Details
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 20px;">
                                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr class="data-row">
                                                    <td class="data-label" width="30%" valign="top" style="font-family: 'Inter', sans-serif; font-size: 14px; color: #a0aab2; padding-bottom: 12px;">Name:</td>
                                                    <td class="data-value" width="70%" valign="top" style="font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500; color: #ffffff; padding-bottom: 12px;">${name}</td>
                                                </tr>
                                                <tr class="data-row">
                                                    <td class="data-label" width="30%" valign="top" style="font-family: 'Inter', sans-serif; font-size: 14px; color: #a0aab2; padding-bottom: 12px;">Email:</td>
                                                    <td class="data-value" width="70%" valign="top" style="font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500; color: #ffffff; padding-bottom: 12px;">
                                                        <a href="mailto:${email}" style="color: #ffffff; text-decoration: none;">${email}</a>
                                                    </td>
                                                </tr>
                                                <tr class="data-row">
                                                    <td class="data-label" width="30%" valign="top" style="font-family: 'Inter', sans-serif; font-size: 14px; color: #a0aab2;">WhatsApp:</td>
                                                    <td class="data-value" width="70%" valign="top" style="font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500; color: #ffffff;">
                                                        <a href="https://wa.me/${phone?.replace(/[^0-9]/g, '')}" class="wa-link" style="color: #dfa129; text-decoration: none; font-weight: 600; display: inline-block;">
                                                            ${phone || 'N/A'} &rarr;
                                                        </a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding-bottom: 40px;">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                    <tr>
                                        <td style="font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 700; color: #ffffff; text-transform: uppercase; letter-spacing: 1px; padding-bottom: 12px;">
                                            Requested Appointment
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 20px;">
                                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr class="data-row">
                                                    <td class="data-label" width="30%" valign="top" style="font-family: 'Inter', sans-serif; font-size: 14px; color: #a0aab2; padding-bottom: 12px;">Topic:</td>
                                                    <td class="data-value" width="70%" valign="top" style="font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500; color: #ffffff; padding-bottom: 12px;">${topic}</td>
                                                </tr>
                                                <tr class="data-row">
                                                    <td class="data-label" width="30%" valign="top" style="font-family: 'Inter', sans-serif; font-size: 14px; color: #a0aab2;">Date & Time:</td>
                                                    <td class="data-value" width="70%" valign="top" style="font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500; color: #dfa129;">${date} at ${time}</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <tr>
                            <td align="center">
                                <!-- Center container for buttons -->
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="btn-table">
                                    <tr>
                                        <!-- Primary Button: Confirm -->
                                        <td class="btn-wrapper" style="padding-right: 16px;">
                                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr>
                                                    <td style="border-radius: 12px; background-color: #dfa129; text-align: center;">
                                                        <a href="${confirmLink}" class="btn btn-primary" style="display: block; font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 700; color: #422006; text-decoration: none; padding: 14px 28px; border-radius: 12px; border: 1px solid #dfa129;">Confirm Appointment</a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        
                                        <!-- Secondary Button: Decline & Reschedule -->
                                        <td class="btn-wrapper">
                                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr>
                                                    <td style="border-radius: 12px; background-color: transparent; text-align: center;">
                                                        <a href="${declineLink}" class="btn btn-secondary" style="display: block; font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 700; color: #dfa129; text-decoration: none; padding: 14px 28px; border-radius: 12px; border: 1px solid rgba(223, 161, 41, 0.4);">Decline & Reschedule</a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding-top: 40px;">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                    <tr>
                                        <td style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 24px;">
                                            <p style="margin: 0; font-family: 'Inter', sans-serif; font-size: 12px; line-height: 1.5; color: rgba(255, 255, 255, 0.5); text-align: center;">
                                                <strong>Note:</strong> Clicking "Confirm" will automatically schedule this on your Google Calendar and send a Google Meet invite to the client.
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
            
            <!-- Safe Area Padding Bottom -->
            <tr><td style="padding-bottom: 40px;"></td></tr>
            
        </table>
    </center>
</body>
</html>
      `,
    };

    const clientMailOptions = {
      from: process.env.EMAIL_USER,
      to: email, // sending to the client
      subject: `Consultation Request Received - NUSALEXA`,
      html: `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>Consultation Request Received - NUSALEXA</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet">

    <style>
        /* Base Reset */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
        body { margin: 0; padding: 0; width: 100% !important; height: 100% !important; background-color: #0b0e14; -webkit-font-smoothing: antialiased; }
        
        /* Hover Effects for Web Preview */
        .btn-primary:hover { background-color: #f0b545 !important; border-color: #f0b545 !important; }
        a:hover { color: #f0b545 !important; }

        /* Mobile Responsiveness */
        @media screen and (max-width: 600px) {
            .email-container { width: 100% !important; max-width: 100% !important; }
            .content-card { padding: 32px 20px !important; border-radius: 0px !important; border-left: none !important; border-right: none !important; }
            .header-padding { padding: 30px 20px 20px !important; }
            
            /* Expand buttons on mobile */
            .btn-table, .btn-wrapper { display: block !important; width: 100% !important; }
            .btn { display: block !important; text-align: center !important; }
        }
    </style>
</head>

<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #0b0e14; font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;">
    <center style="width: 100%; background-color: #0b0e14;">
        
        <!-- Visually Hidden Preheader Text -->
        <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
            Thank you for requesting a strategic consultation with NUSALEXA. Your request is currently under review by our team.
        </div>

        <!-- Main Email Container -->
        <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: auto; width: 100%; max-width: 600px;" class="email-container">
            
            <tr>
                <td class="header-padding" style="padding: 40px 0 30px; text-align: center;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                        <tr>
                            <td style="font-family: 'Inter', sans-serif; font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: 2px;">
                                NUSALEXA <span style="color: #dfa129;">.</span>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 500; color: #a0aab2; letter-spacing: 3px; padding-top: 4px; text-transform: uppercase;">
                                Law Office | Dark Performance Lab
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

            <tr>
                <td style="padding: 0 16px 40px;">
                    <!-- Content Card Background -->
                    <table class="content-card" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #10141e; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; border-top: 4px solid #dfa129; padding: 48px 40px;">
                        
                        <!-- Body Copy -->
                        <tr>
                            <td style="font-family: 'Inter', sans-serif; font-size: 15px; line-height: 1.6; color: #a0aab2;">
                                <p style="margin: 0 0 24px; color: #ffffff; font-weight: 600; font-size: 18px;">
                                    Hello ${name},
                                </p>
                                
                                <p style="margin: 0 0 24px;">
                                    Thank you for requesting a strategic consultation with NUSALEXA.
                                </p>

                                <!-- Highlighted Request Details -->
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px;">
                                    <tr>
                                        <td style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); border-left: 3px solid #dfa129; border-radius: 8px; padding: 20px; font-family: 'Inter', sans-serif; font-size: 15px; line-height: 1.6; color: #a0aab2;">
                                            We have received your request to discuss <strong style="color: #ffffff; font-weight: 600;">${topic}</strong> on <strong style="color: #ffffff; font-weight: 600;">${date}</strong> at <strong style="color: #ffffff; font-weight: 600;">${time}</strong>.
                                        </td>
                                    </tr>
                                </table>

                                <p style="margin: 0 0 24px;">
                                    Our team is currently reviewing our calendar to ensure we can provide the focused, dedicated attention your matter requires. You will receive a follow-up email shortly with final confirmation and a secure Google Meet link once your appointment is locked in.
                                </p>

                                <p style="margin: 0 0 32px;">
                                    If your matter is highly urgent, or if you have specific documents you would like us to review prior to the call, you may reply directly to this email.
                                </p>

                                <p style="margin: 0 0 40px;">
                                    Best regards,<br>
                                    <strong style="color: #ffffff; font-weight: 600;">NUSALEXA Law Office</strong>
                                </p>
                            </td>
                        </tr>

                        <!-- Action Button -->
                        <tr>
                            <td align="left">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="btn-table">
                                    <tr>
                                        <td class="btn-wrapper">
                                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr>
                                                    <td style="border-radius: 12px; background-color: #dfa129; text-align: center;">
                                                        <a href="https://lawfirm-prototype.vercel.app/" target="_blank" class="btn btn-primary" style="display: inline-block; font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 700; color: #422006; text-decoration: none; padding: 14px 32px; border-radius: 12px; border: 1px solid #dfa129;">
                                                            NUSALEXA Law Office
                                                        </a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
            
            <!-- Safe Area Padding Bottom -->
            <tr><td style="padding-bottom: 40px;"></td></tr>
            
        </table>
    </center>
</body>
</html>
      `,
    };

    // Send both emails in parallel
    await Promise.all([
      transporter.sendMail(mailOptions),
      transporter.sendMail(clientMailOptions),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Booking Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
