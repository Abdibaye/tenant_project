import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function GET() {
  try {
    // Create transporter with debug logging
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_APP_PASSWORD,
      },
      debug: true, // Enable debug logging
      logger: true // Enable logger
    })

    // Verify SMTP connection
    const verifyResult = await transporter.verify()
    console.log('SMTP Connection Verification:', verifyResult)

    // Test email
    const testEmail = {
      from: process.env.ZOHO_EMAIL,
      to: process.env.EMAIL_USER,
      subject: 'Test Email from Property Management App',
      text: 'This is a test email to verify the email sending functionality.',
      html: '<p>This is a test email to verify the email sending functionality.</p>'
    }

    // Send test email
    const info = await transporter.sendMail(testEmail)
    console.log('Email Send Result:', info)

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      messageId: info.messageId,
      preview: nodemailer.getTestMessageUrl(info)
    })
  } catch (error) {
    console.error('Email Error:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to send test email',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
} 