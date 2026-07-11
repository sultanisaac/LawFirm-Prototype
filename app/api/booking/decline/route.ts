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
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>Action Required: Reschedule Your Consultation - NUSALEXA</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

    <style>
        /* Base Reset */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
        body { margin: 0; padding: 0; width: 100% !important; height: 100% !important; background-color: #0b0e14; -webkit-font-smoothing: antialiased; }
        
        /* Hover Effects for Web Preview */
        .btn-primary:hover { background-color: #f0b545 !important; border-color: #f0b545 !important; }
        .btn-secondary:hover { background-color: rgba(223, 161, 41, 0.1) !important; border-color: #dfa129 !important; }
        a:hover { color: #f0b545 !important; }

        /* Mobile Responsiveness */
        @media screen and (max-width: 600px) {
            .email-container { width: 100% !important; max-width: 100% !important; }
            .content-card { padding: 32px 20px !important; border-radius: 0px !important; border-left: none !important; border-right: none !important; }
            .header-padding { padding: 30px 20px 20px !important; }
            
            /* Expand buttons on mobile */
            .btn-table, .btn-wrapper { display: block !important; width: 100% !important; }
            .btn { display: block !important; text-align: center !important; }
            .btn-spacer { height: 16px !important; }
        }
    </style>
</head>

<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #0b0e14; font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;">
    <center style="width: 100%; background-color: #0b0e14;">
        
        <!-- Visually Hidden Preheader Text -->
        <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
            We are unable to accommodate your requested time. Please contact us via WhatsApp to reschedule your consultation.
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
                                    Hello ${decoded.name},
                                </p>
                                
                                <p style="margin: 0 0 24px;">
                                    Thank you for requesting a consultation with NUSALEXA regarding <strong style="color: #ffffff; font-weight: 600;">${decoded.topic}</strong>.
                                </p>

                                <!-- Highlighted Conflict Details -->
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px;">
                                    <tr>
                                        <td style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); border-left: 3px solid #dfa129; border-radius: 8px; padding: 20px; font-family: 'Inter', sans-serif; font-size: 15px; line-height: 1.6; color: #a0aab2;">
                                            We are currently unable to accommodate your requested session on <strong style="color: #ffffff; font-weight: 600;">${decoded.date}</strong> at <strong style="color: #ffffff; font-weight: 600;">${decoded.time}</strong> due to a scheduling conflict.
                                        </td>
                                    </tr>
                                </table>

                                <p style="margin: 0 0 24px;">
                                    To ensure you receive the immediate attention your matter requires, please reach out to our team directly via WhatsApp. We will work with you to find a priority alternative time that fits your schedule.
                                </p>

                                <p style="margin: 0 0 32px;">
                                    We apologize for the inconvenience and look forward to assisting you.
                                </p>

                                <p style="margin: 0 0 40px;">
                                    Best regards,<br>
                                    <strong style="color: #ffffff; font-weight: 600;">NUSALEXA Law Office</strong>
                                </p>
                            </td>
                        </tr>

                        <!-- Action Buttons -->
                        <tr>
                            <td align="left">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="btn-table" width="100%">
                                    <!-- Primary Button: WhatsApp -->
                                    <tr>
                                        <td class="btn-wrapper" align="center" style="padding-bottom: 16px;">
                                            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                                <tr>
                                                    <td style="border-radius: 12px; background-color: #dfa129; text-align: center;">
                                                        <a href="https://api.whatsapp.com/send/?phone=6281200000000&text=${encodeURIComponent(\`Hi NUSALEXA, I need legal help with: \${decoded.topic}. Name/Company: \${decoded.name}\${decoded.company ? \` / \${decoded.company}\` : ''}. Timeline: [today/this week/flexible].\`)}&type=phone_number&app_absent=0" target="_blank" class="btn btn-primary" style="display: inline-block; font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 700; color: #422006; text-decoration: none; padding: 14px 32px; border-radius: 12px; border: 1px solid #dfa129;">
                                                            Chat via WhatsApp to Reschedule
                                                        </a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <!-- Secondary Button: Website -->
                                    <tr>
                                        <td class="btn-wrapper" align="center">
                                            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                                <tr>
                                                    <td style="border-radius: 12px; background-color: transparent; text-align: center;">
                                                        <a href="https://lawfirm-prototype.vercel.app/" target="_blank" class="btn btn-secondary" style="display: inline-block; font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 700; color: #dfa129; text-decoration: none; padding: 14px 32px; border-radius: 12px; border: 1px solid rgba(223, 161, 41, 0.4);">
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
