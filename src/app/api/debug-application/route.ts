import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const formData = await request.json()
    console.log('Received form data:', formData)

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
    console.log('Verifying SMTP connection...')
    const verifyResult = await transporter.verify()
    console.log('SMTP Connection Verification:', verifyResult)

    // Generate access code
    const accessCode = Math.floor(10000000 + Math.random() * 90000000).toString()
    console.log('Generated access code:', accessCode)

    // 1. Send application data to admin
    console.log('Preparing admin email...')
    const adminEmail = {
      from: process.env.ZOHO_EMAIL,
      to: process.env.EMAIL_USER,
      subject: 'New Rental Application Received',
      text: `New application received from ${formData.fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e293b;">New Rental Application</h2>
          <p style="color: #334155; font-size: 16px; line-height: 1.6;">
            A new application has been received from ${formData.fullName}
          </p>
          <p style="color: #334155; font-size: 16px; line-height: 1.6;">
            Email: ${formData.email}
          </p>
          <p style="color: #334155; font-size: 16px; line-height: 1.6;">
            Phone: ${formData.phoneNumber}
          </p>
        </div>
      `
    }

    // 2. Send confirmation to applicant
    console.log('Preparing applicant email...')
    const applicantEmail = {
      from: process.env.ZOHO_EMAIL,
      to: formData.email,
      subject: 'Application Confirmation',
      text: `Your application has been received. Access code: ${accessCode}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e293b;">Application Confirmation</h2>
          <p style="color: #334155; font-size: 16px; line-height: 1.6;">
            Dear ${formData.fullName},
          </p>
          <p style="color: #334155; font-size: 16px; line-height: 1.6;">
            Your application has been received. Your access code is: ${accessCode}
          </p>
        </div>
      `
    }

    // Send both emails
    console.log('Sending emails...')
    const [adminResult, applicantResult] = await Promise.all([
      transporter.sendMail(adminEmail),
      transporter.sendMail(applicantEmail)
    ])

    console.log('Admin email result:', adminResult)
    console.log('Applicant email result:', applicantResult)

    if (!adminResult.messageId || !applicantResult.messageId) {
      throw new Error('Failed to send one or both emails')
    }

    return NextResponse.json({
      success: true,
      message: 'Application processed successfully',
      messageIds: {
        adminEmail: adminResult.messageId,
        applicantEmail: applicantResult.messageId
      },
      accessCode
    })
  } catch (error) {
    console.error('Error processing application:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to process application',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
} 