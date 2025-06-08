import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Function to generate a random 8-digit code
function generateAccessCode(): string {
  return Math.floor(10000000 + Math.random() * 90000000).toString()
}

export async function POST(request: Request) {
  try {
    const formData = await request.json()
    const accessCode = generateAccessCode()

    // Prepare attachments if payment receipt exists
    const attachments = formData.paymentReceipt ? [
      {
        filename: formData.paymentReceipt.name,
        content: formData.paymentReceipt.content,
        contentType: formData.paymentReceipt.type
      }
    ] : []

    // 1. Send application data to user
    const userApplicationEmail = {
      from: 'Property Management <onboarding@resend.dev>',
      to: process.env.EMAIL_USER || 'abdibaye0902@example.com',
      subject: 'Your Rental Application Details',
      text: `
        Your Rental Application Details

        Personal Information:
        - Full Name: ${formData.fullName || 'Not provided'}
        - Email: ${formData.email || 'Not provided'}
        - Phone Number: ${formData.phoneNumber || 'Not provided'}
        - Current Address: ${formData.currentAddress || 'Not provided'}

        Financial Information:
        - Monthly Income: $${formData.monthlyIncome || 'Not provided'}
        - Annual Income: $${formData.annualIncome || 'Not provided'}
        - Outstanding Debts: $${formData.outstandingDebts || 'Not provided'}
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
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e293b;">Your Rental Application Details</h2>
          
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
            </ul>
          </div>
        </div>
      `
    }

    // 2. Send confirmation with access code to user
    const userConfirmationEmail = {
      from: 'Property Management <onboarding@resend.dev>',
      to: formData.email,
      subject: 'Application Confirmation and Access Code',
      text: `
        Application Confirmation

        Dear ${formData.fullName},

        Thank you for submitting your rental application. Your application has been received and is being processed.

        Your unique access code is: ${accessCode}

        For faster processing, please send the following documents to rentals@example.com:
        - Last 3 months' paystubs
        - Any valid government ID

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
              For faster processing, please send the following documents to <a href="mailto:rentals@example.com" style="color: #2563eb;">rentals@example.com</a>:
            </p>
            <ul style="color: #334155; font-size: 16px; line-height: 1.6; padding-left: 20px;">
              <li>Last 3 months' paystubs</li>
              <li>Any valid government ID</li>
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
      resend.emails.send(userApplicationEmail),
      resend.emails.send(userConfirmationEmail)
    ])

    if (userAppEmail.error || userConfEmail.error) {
      console.error('Error sending emails:', userAppEmail.error || userConfEmail.error)
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to send emails',
          error: (userAppEmail.error || userConfEmail.error)?.message 
        },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Emails sent successfully',
      messageIds: {
        userApplication: userAppEmail.data?.id,
        userConfirmation: userConfEmail.data?.id
      },
      accessCode 
    })
  } catch (error) {
    console.error('Error sending emails:', error)
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