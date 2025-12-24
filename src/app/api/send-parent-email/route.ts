
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.NEXT_PUBLIC_FROM_EMAIL || 'Quizzy Platform <onboarding@resend.dev>';

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
        throw new Error("Email service is not configured. Missing RESEND_API_KEY.");
    }
    
    const { studentName, guardianEmail, examTitle, score, reportUrl } = await request.json();

    if (!studentName || !guardianEmail || !examTitle || score === undefined) {
      return NextResponse.json({ error: 'Missing required fields for email.' }, { status: 400 });
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
          <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
              .header { background-color: #f4f4f4; padding: 10px 20px; border-radius: 8px 8px 0 0; text-align: center; }
              .header h1 { margin: 0; color: #0F1729; }
              .content { padding: 20px; }
              .score-box { background-color: #e9f5ff; border: 2px solid #3B82F6; border-radius: 8px; text-align: center; padding: 20px; margin: 20px 0; }
              .score-box h2 { margin: 0 0 10px 0; font-size: 24px; color: #0F1729; }
              .score-box .score { font-size: 48px; font-weight: bold; color: #3B82F6; }
              .footer { font-size: 12px; color: #777; text-align: center; margin-top: 20px; }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>Quizzy Exam Performance Report</h1>
              </div>
              <div class="content">
                  <p>Hello,</p>
                  <p>This is a report for <strong>${studentName}</strong>'s performance on the exam: <strong>"${examTitle}"</strong>.</p>
                  <div class="score-box">
                      <h2>Final Score</h2>
                      <p class="score">${score.toFixed(2)}%</p>
                  </div>
              </div>
              <div class="footer">
                  <p>Thank you,<br/>The Quizzy Platform Team</p>
              </div>
          </div>
      </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [guardianEmail],
      subject: `Quizzy Exam Report for ${studentName}: "${examTitle}"`,
      html: htmlContent,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ 
          error: 'Failed to send email via Resend.',
          details: error.message 
      }, { status: 500 });
    }
    
    return NextResponse.json({ message: 'Email sent successfully via Resend', data }, { status: 200 });

  } catch (error: any) {
    console.error('API Route Error:', error);
    return NextResponse.json({ 
        error: 'An unexpected error occurred.',
        details: error.message
    }, { status: 500 });
  }
}
