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
    // Test application data
    const testApplicationData = {
      fullName: "Test User",
      email: process.env.EMAIL_USER || 'abdibaye0902@example.com',
      phoneNumber: "+1234567890",
      currentAddress: "123 Test St, Test City, TS 12345",
      monthlyIncome: "5000",
      annualIncome: "60000",
      outstandingDebts: "0",
      missedRentPayments: "no",
      hasEvictionHistory: "no",
      hasBankruptcy: "no",
      numberOfOccupants: "2",
      hasChildren: "no",
      plannedStayDuration: "12 months",
      hasPets: "no",
      hasSmoking: "no",
      needsFlexibility: "no",
      moveInDate: "2024-07-01",
      tourDate: "2024-06-15",
      tourTime: "2:00 PM",
      paymentMethod: "zelle"
    }

    // Generate access code
    const accessCode = Math.floor(10000000 + Math.random() * 90000000).toString()

    // 1. Send application data to admin
    const adminEmail = {
      from: process.env.ZOHO_EMAIL,
      to: process.env.EMAIL_USER || 'abdibaye0902@example.com',
      subject: 'Test Application Received',
      text: `Test application received from ${testApplicationData.fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e293b;">Test Application Received</h2>
          <p style="color: #334155; font-size: 16px; line-height: 1.6;">
            This is a test application from ${testApplicationData.fullName}
          </p>
        </div>
      `
    }

    // 2. Send confirmation to applicant
    const applicantEmail = {
      from: process.env.ZOHO_EMAIL,
      to: testApplicationData.email,
      subject: 'Test Application Confirmation',
      text: `Test application confirmation for ${testApplicationData.fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e293b;">Test Application Confirmation</h2>
          <p style="color: #334155; font-size: 16px; line-height: 1.6;">
            This is a test confirmation for ${testApplicationData.fullName}
          </p>
          <p style="color: #334155; font-size: 16px; line-height: 1.6;">
            Access Code: ${accessCode}
          </p>
        </div>
      `
    }

    // Send both emails
    const [adminResult, applicantResult] = await Promise.all([
      transporter.sendMail(adminEmail),
      transporter.sendMail(applicantEmail)
    ])

    if (!adminResult.messageId || !applicantResult.messageId) {
      throw new Error('Failed to send test emails')
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Test application processed successfully',
      messageIds: {
        adminEmail: adminResult.messageId,
        applicantEmail: applicantResult.messageId
      },
      accessCode,
      testData: testApplicationData
    })
  } catch (error) {
    console.error('Error processing test application:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to process test application',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 