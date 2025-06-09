import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { currentEmail, newEmail, currentPassword, newPassword } = await request.json()

    // Get admin credentials from environment variables
    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD

    // Verify current credentials
    if (currentEmail !== adminEmail || currentPassword !== adminPassword) {
      return NextResponse.json(
        { message: 'Current credentials are incorrect' },
        { status: 400 }
      )
    }

    // Update environment variables (in a real application, you would update this in a database)
    if (newEmail) {
      process.env.ADMIN_EMAIL = newEmail
    }
    if (newPassword) {
      process.env.ADMIN_PASSWORD = newPassword
    }

    return NextResponse.json(
      { message: 'Credentials updated successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error updating credentials:', error)
    return NextResponse.json(
      { message: 'Failed to update credentials' },
      { status: 500 }
    )
  }
} 