import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Create a transporter using Zoho SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_APP_PASSWORD
  }
})

export async function GET() {
  try {
    // Test email configuration
    const testEmail = {
      from: process.env.ZOHO_EMAIL,
      to: process.env.EMAIL_USER || 'abdibaye0902@example.com',
      subject: 'Test Email from Property Management System',
      text: 'This is a test email to verify the email configuration is working correctly.',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e293b;">Test Email</h2>
          <p style="color: #334155; font-size: 16px; line-height: 1.6;">
            This is a test email to verify the email configuration is working correctly.
          </p>
          <p style="color: #334155; font-size: 16px; line-height: 1.6;">
            If you receive this email, the email system is properly configured.
          </p>
        </div>
      `
    }

    // Send test email
    const info = await transporter.sendMail(testEmail)

    if (!info.messageId) {
      throw new Error('Failed to send test email')
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Test email sent successfully',
      messageId: info.messageId
    })
  } catch (error) {
    console.error('Error sending test email:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send test email',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 