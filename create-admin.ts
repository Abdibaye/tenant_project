import { createAdminUser } from './src/lib/auth'

async function createAdmin() {
  try {
    const username = 'admin' // Change this to your desired username
    const password = 'your-secure-password' // Change this to your desired password
    
    await createAdminUser(username, password)
    console.log('Admin user created successfully!')
  } catch (error) {
    console.error('Error creating admin user:', error)
  }
}

createAdmin() 