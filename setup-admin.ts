const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

interface AuthUser {
  id: string
  email: string
}

async function createTables() {
  try {
    // Create application_settings table
    const { error: settingsError } = await supabase.rpc('create_application_settings_table')
    if (settingsError) {
      console.error('Error creating application_settings table:', settingsError)
      return false
    }
    return true
  } catch (error) {
    console.error('Error creating tables:', error)
    return false
  }
}

async function setupAdmin() {
  try {
    // First create necessary tables
    const tablesCreated = await createTables()
    if (!tablesCreated) {
      console.error('Failed to create necessary tables')
      return
    }

    // Check if admin user already exists in admin_users table
    const { data: existingUser, error: checkError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('username', 'admin')
      .maybeSingle()

    if (checkError) {
      console.error('Error checking existing user:', checkError)
      return
    }

    if (existingUser) {
      console.log('Admin user already exists!')
      console.log('Username: admin')
      console.log('Password: admin123')
      return
    }

    // Get the existing auth user
    const { data: authData, error: authError } = await supabase.auth.admin.listUsers()
    if (authError) {
      console.error('Error getting auth users:', authError)
      return
    }

    const adminUser = authData.users.find((user: AuthUser) => user.email === 'admin@admin.local')
    if (!adminUser) {
      console.error('Admin auth user not found')
      return
    }

    // Create the admin user record in admin_users table
    const { error: userError } = await supabase
      .from('admin_users')
      .insert([
        {
          username: 'admin',
          password: 'admin123',
          user_id: adminUser.id
        }
      ])

    if (userError) {
      console.error('Error creating admin user record:', userError)
      return
    }

    console.log('Admin user created successfully!')
    console.log('Username: admin')
    console.log('Password: admin123')
  } catch (error) {
    console.error('Error setting up admin:', error)
  }
}

setupAdmin() 