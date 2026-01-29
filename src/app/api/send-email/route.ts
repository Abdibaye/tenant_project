import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

if (!process.env.ZOHO_EMAIL || !process.env.ZOHO_APP_PASSWORD) {
  throw new Error('Missing required environment variables for email configuration')
}

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

// Function to generate a random 8-digit code
function generateAccessCode(): string {
  return Math.floor(10000000 + Math.random() * 90000000).toString()
}

// Common email headers to prevent spam
const commonHeaders = {
  'X-Entity-Ref-ID': Date.now().toString(),
  'List-Unsubscribe': `<mailto:${process.env.ZOHO_EMAIL}?subject=unsubscribe>`,
  'Precedence': 'bulk',
  'X-Auto-Response-Suppress': 'OOF, AutoReply',
  'X-MS-Exchange-CrossTenant-FromEntityHeader': 'Hosted',
  'X-MS-Exchange-Organization-AuthSource': process.env.EMAIL_DOMAIN || 'yourdomain.com',
  'X-MS-Exchange-Organization-AuthAs': 'Internal',
  'X-MS-Exchange-Organization-AuthMechanism': '04',
  'X-MS-Exchange-Organization-Network-Message-Id': Date.now().toString(),
  'X-MS-Exchange-Organization-SCL': '0'
}

// Define attachment type
interface Attachment {
  filename: string;
  content: Buffer;
  contentType: string;
}

export async function POST(request: Request) {
  try {
    const formData = await request.json()
    const accessCode = generateAccessCode()

    // Prepare attachments if payment receipt exists
    let attachments: Attachment[] = []
    if (formData.paymentReceipt) {
      try {
        // Ensure the content is properly formatted
        const content = formData.paymentReceipt.content
        if (!content) {
          throw new Error('Payment receipt content is missing')
        }

        // Create attachment object
        attachments = [{
          filename: formData.paymentReceipt.name,
          content: Buffer.from(content, 'base64'),
          contentType: formData.paymentReceipt.type || 'application/octet-stream'
        }]
      } catch (error) {
        throw new Error('Failed to process payment receipt attachment')
      }
    }

    // 1. Send application data to admin
    const userApplicationEmail = {
      from: `"Pinnacle Property Management" <${process.env.ZOHO_EMAIL}>`,
      to: process.env.EMAIL_USER,
      subject: 'New Rental Application Received',
      headers: commonHeaders,
      text: `
        New Rental Application Received

        A new application has been received from ${formData.fullName}.

        Property Information:
        - Apartment Address: ${formData.apartmentAddress || 'Not provided'}

        Personal Information:
        - Full Name: ${formData.fullName || 'Not provided'}
        - Email: ${formData.email || 'Not provided'}
        - Phone Number: ${formData.phoneNumber || 'Not provided'}
        - Current Address: ${formData.currentAddress || 'Not provided'}

        Financial Information:
        - Monthly Income: $${formData.monthlyIncome || 'Not provided'}
        - Annual Income: $${formData.annualIncome || 'Not provided'}
        - Outstanding Debts: $${formData.outstandingDebts || 'Not provided'}
        - Credit Score Range: ${formData.creditScore || 'Not provided'}
        - Missed Rent Payments: ${formData.missedRentPayments || 'Not provided'}
        - Has Eviction History: ${formData.hasEvictionHistory || 'Not provided'}
        - Has Bankruptcy: ${formData.hasBankruptcy || 'Not provided'}

        Additional Information:
        - Number of Occupants: ${formData.numberOfOccupants || 'Not provided'}
        - Has Children: ${formData.hasChildren || 'Not provided'}
        - Planned Stay Duration: ${formData.plannedStayDuration || 'Not provided'}
        - Has Pets: ${formData.hasPets || 'Not provided'}
        ${formData.hasPets === 'yes' ? `- Pet Details: ${formData.petDetails || 'Not provided'}` : ''}
        - Has Smoking: ${formData.hasSmoking || 'Not provided'}
        - Needs Flexibility: ${formData.needsFlexibility || 'Not provided'}
        - Move-in Date: ${formData.moveInDate || 'Not provided'}

        Tour & Payment:
        - Tour Date: ${formData.tourDate || 'Not provided'}
        - Tour Time: ${formData.tourTime || 'Not provided'}
        - Payment Method: ${formData.paymentMethod || 'Not provided'}
        ${formData.paymentReceipt ? '- Payment Receipt: Attached' : ''}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e293b;">New Rental Application</h2>
          
          <div style="margin: 20px 0; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
            <h3 style="color: #334155;">Property Information</h3>
            <ul style="list-style: none; padding: 0;">
              <li><strong>Apartment Address:</strong> ${formData.apartmentAddress || 'Not provided'}</li>
            </ul>
          </div>

          <div style="margin: 20px 0; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
            <h3 style="color: #334155;">Personal Information</h3>
            <ul style="list-style: none; padding: 0;">
              <li><strong>Full Name:</strong> ${formData.fullName || 'Not provided'}</li>
              <li><strong>Email:</strong> ${formData.email || 'Not provided'}</li>
              <li><strong>Phone Number:</strong> ${formData.phoneNumber || 'Not provided'}</li>
              <li><strong>Current Address:</strong> ${formData.currentAddress || 'Not provided'}</li>
            </ul>
          </div>

          <div style="margin: 20px 0; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
            <h3 style="color: #334155;">Financial Information</h3>
            <ul style="list-style: none; padding: 0;">
              <li><strong>Monthly Income:</strong> $${formData.monthlyIncome || 'Not provided'}</li>
              <li><strong>Annual Income:</strong> $${formData.annualIncome || 'Not provided'}</li>
              <li><strong>Outstanding Debts:</strong> $${formData.outstandingDebts || 'Not provided'}</li>
              <li><strong>Credit Score Range:</strong> ${formData.creditScore || 'Not provided'}</li>
              <li><strong>Missed Rent Payments:</strong> ${formData.missedRentPayments || 'Not provided'}</li>
              <li><strong>Has Eviction History:</strong> ${formData.hasEvictionHistory || 'Not provided'}</li>
              <li><strong>Has Bankruptcy:</strong> ${formData.hasBankruptcy || 'Not provided'}</li>
            </ul>
          </div>

          <div style="margin: 20px 0; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
            <h3 style="color: #334155;">Additional Information</h3>
            <ul style="list-style: none; padding: 0;">
              <li><strong>Number of Occupants:</strong> ${formData.numberOfOccupants || 'Not provided'}</li>
              <li><strong>Has Children:</strong> ${formData.hasChildren || 'Not provided'}</li>
              <li><strong>Planned Stay Duration:</strong> ${formData.plannedStayDuration || 'Not provided'}</li>
              <li><strong>Has Pets:</strong> ${formData.hasPets || 'Not provided'}</li>
              ${formData.hasPets === 'yes' ? `<li><strong>Pet Details:</strong> ${formData.petDetails || 'Not provided'}</li>` : ''}
              <li><strong>Has Smoking:</strong> ${formData.hasSmoking || 'Not provided'}</li>
              <li><strong>Needs Flexibility:</strong> ${formData.needsFlexibility || 'Not provided'}</li>
              <li><strong>Move-in Date:</strong> ${formData.moveInDate || 'Not provided'}</li>
            </ul>
          </div>

          <div style="margin: 20px 0; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
            <h3 style="color: #334155;">Tour & Payment</h3>
            <ul style="list-style: none; padding: 0;">
              <li><strong>Tour Date:</strong> ${formData.tourDate || 'Not provided'}</li>
              <li><strong>Tour Time:</strong> ${formData.tourTime || 'Not provided'}</li>
              <li><strong>Payment Method:</strong> ${formData.paymentMethod || 'Not provided'}</li>
              ${formData.paymentReceipt ? `<li><strong>Payment Receipt:</strong> Attached</li>` : ''}
            </ul>
          </div>
        </div>
      `,
      attachments
    }

    // 2. Send confirmation with access code to user
    const userConfirmationEmail = {
      from: `"Pinnacle Property Management" <${process.env.ZOHO_EMAIL}>`,
      to: formData.email,
      subject: 'Application Confirmation and Access Code',
      headers: commonHeaders,
      text: `
        Application Confirmation

        Dear ${formData.fullName},

        Thank you for submitting your rental application. Your application has been received and is being processed.

        Your unique access code is: ${accessCode}

        For faster processing, please send the following documents to rental@pprmgt.com:
        - Most recent W2
        - Any valid government ID (front & back clear pictures)

        Tour Details:
        - Date: ${formData.tourDate || 'Not provided'}
        - Time: ${formData.tourTime || 'Not provided'}

        We will review your application within 1-3 business days. If you have any questions, please don't hesitate to contact us.

        Best regards,
        Property Management Team
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e293b;">Application Confirmation</h2>
          
          <div style="margin: 20px 0; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
            <p style="color: #334155; font-size: 16px; line-height: 1.6;">
              Dear ${formData.fullName},
            </p>
            <p style="color: #334155; font-size: 16px; line-height: 1.6;">
              Thank you for submitting your rental application. Your application has been received and is being processed.
            </p>
          </div>

          <div style="margin: 20px 0; padding: 20px; background-color: #f1f5f9; border-radius: 8px; text-align: center;">
            <h3 style="color: #334155; margin-bottom: 10px;">Your Access Code</h3>
            <p style="font-size: 24px; font-weight: bold; color: #0f172a; letter-spacing: 2px;">${accessCode}</p>
          </div>

          <div style="margin: 20px 0; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
            <h3 style="color: #334155; margin-bottom: 15px;">Required Documents</h3>
            <p style="color: #334155; font-size: 16px; line-height: 1.6;">
              For faster processing, please send the following documents to <a href="mailto:rental@pprmgt.com" style="color: #2563eb;">rental@pprmgt.com</a>:
            </p>
            <ul style="color: #334155; font-size: 16px; line-height: 1.6; padding-left: 20px;">
              <li>Most recent W2</li>
              <li>Any valid government ID (front & back clear pictures)</li>
            </ul>
          </div>

          <div style="margin: 20px 0; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
            <h3 style="color: #334155; margin-bottom: 15px;">Tour Details</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 10px;"><strong>Date:</strong> ${formData.tourDate || 'Not provided'}</li>
              <li style="margin-bottom: 10px;"><strong>Time:</strong> ${formData.tourTime || 'Not provided'}</li>
            </ul>
          </div>

          <div style="margin: 20px 0; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
            <p style="color: #334155; font-size: 16px; line-height: 1.6;">
              We will review your application within 1-3 business days. If you have any questions, please don't hesitate to contact us.
            </p>
            <p style="color: #334155; font-size: 16px; line-height: 1.6; margin-top: 20px;">
              Best regards,<br>
              Property Management Team
            </p>
          </div>
        </div>
      `
    }

    // Send both emails
    const [userAppEmail, userConfEmail] = await Promise.all([
      transporter.sendMail(userApplicationEmail),
      transporter.sendMail(userConfirmationEmail)
    ])

    if (!userAppEmail.messageId || !userConfEmail.messageId) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to send emails',
          error: 'Email sending failed'
        },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Emails sent successfully',
      messageIds: {
        userApplication: userAppEmail.messageId,
        userConfirmation: userConfEmail.messageId
      },
      accessCode 
    })
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send emails',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 