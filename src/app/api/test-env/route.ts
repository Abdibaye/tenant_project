import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check if environment variables are set
    const envVars = {
      ZOHO_EMAIL: process.env.ZOHO_EMAIL ? 'Set' : 'Not Set',
      ZOHO_APP_PASSWORD: process.env.ZOHO_APP_PASSWORD ? 'Set' : 'Not Set',
      EMAIL_USER: process.env.EMAIL_USER ? 'Set' : 'Not Set'
    }

    // Check if any required variables are missing
    const missingVars = Object.entries(envVars)
      .filter(([_, value]) => value === 'Not Set')
      .map(([key]) => key)

    if (missingVars.length > 0) {
      return NextResponse.json({
        success: false,
        message: 'Missing required environment variables',
        missingVariables: missingVars,
        environmentStatus: envVars
      }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: 'All environment variables are set correctly',
      environmentStatus: envVars
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Error checking environment variables',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 