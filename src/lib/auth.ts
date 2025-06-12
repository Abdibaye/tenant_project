import { supabase } from './supabase'

// Hardcoded admin credentials - in a real app, these should be in environment variables
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123' // Change this to your desired password
}

export async function signIn(username: string, password: string) {
  try {
    // Get user from admin_users table
    const { data: userData, error: userError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('username', username)
      .single()

    if (userError) {
      console.error('Database error:', userError)
      throw new Error('Invalid username or password')
    }

    if (!userData) {
      throw new Error('Invalid username or password')
    }

    // Verify password
    if (userData.password !== password) {
      throw new Error('Invalid username or password')
    }

    // Create a session
    const { data, error } = await supabase.auth.signInWithPassword({
      email: `${username}@admin.local`,
      password: password
    })

    if (error) {
      console.error('Auth error:', error)
      throw new Error('Authentication failed')
    }

    return data
  } catch (error) {
    console.error('Error signing in:', error)
    throw error
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    console.error('Error signing out:', error)
    throw error
  }
}

export async function getSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return session
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}

export async function createAdminUser(username: string, password: string) {
  try {
    // Create auth user with dummy email
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: `${username}@admin.local`,
      password: password
    })

    if (authError) throw authError

    // Create admin user record
    const { error: userError } = await supabase
      .from('admin_users')
      .insert([
        {
          username,
          password, // In a real app, this should be hashed
          user_id: authData.user?.id
        }
      ])

    if (userError) throw userError
    return authData
  } catch (error) {
    console.error('Error creating admin user:', error)
    throw error
  }
} 