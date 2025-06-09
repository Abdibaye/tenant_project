'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Home, Shield, Clock, Building2, CheckCircle2, ArrowRight } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="Pinnacle Property Management"
                width={120}
                height={110}
                className="py-1"
              />
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#process" className="text-sm text-slate-600 hover:text-slate-900">Application Process</a>
              <a href="#contact" className="text-sm text-slate-600 hover:text-slate-900">Contact</a>
              <Button
                onClick={() => router.push('/apply/step1')}
                className="bg-slate-900 hover:bg-slate-800 text-white text-sm px-4 py-1"
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-12">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"
            alt="Modern Apartment Interior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-slate-900 opacity-60"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Find Your Dream Home
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-8 max-w-3xl mx-auto">
              Experience luxury living with our premium properties and seamless application process.
            </p>
            <Button
              onClick={() => router.push('/apply/step1')}
              className="bg-white text-slate-900 hover:bg-slate-100 text-lg px-8 py-6"
            >
              Start your application & schedule your tour
            </Button>
          </div>
        </div>
      </div>

      {/* Application Process Section */}
      <div className="py-24 bg-white" id="process">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Simple Application Process</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our streamlined process makes applying for your dream home easy and efficient. <span className="font-bold text-blue-600">The application takes approximately 5 minutes to complete.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative">
              <div className="bg-slate-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-semibold">1</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Basic Information</h3>
                <p className="text-slate-600">
                  Provide your contact details and basic information.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRight className="h-8 w-8 text-slate-300" />
              </div>
            </div>

            <div className="relative">
              <div className="bg-slate-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-semibold">2</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Financial Details</h3>
                <p className="text-slate-600">
                  Share your financial information and rental history.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRight className="h-8 w-8 text-slate-300" />
              </div>
            </div>

            <div className="relative">
              <div className="bg-slate-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-semibold">3</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Schedule Tour</h3>
                <p className="text-slate-600">
                  Choose a convenient time to visit your potential home.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRight className="h-8 w-8 text-slate-300" />
              </div>
            </div>

            <div>
              <div className="bg-slate-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-semibold">4</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Submit & Pay</h3>
                <p className="text-slate-600">
                  Complete your application and pay the processing fee.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Us</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We've streamlined the rental application process to make it simple, secure, and stress-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Home className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Premium Properties</h3>
              <p className="text-slate-600">
                Access to well-maintained properties in prime locations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Secure Process</h3>
              <p className="text-slate-600">
                Your information is protected with industry-standard security measures.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Quick Response</h3>
              <p className="text-slate-600">
                Get a response within 1-3 business days after submitting your application.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Professional Management</h3>
              <p className="text-slate-600">
                Experienced team dedicated to providing excellent service.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-100 py-12" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Contact Us</h3>
              <p className="text-slate-600">Email: info@pprmgt.com</p>
              <p className="text-slate-600">Phone: (916) 916-9903</p>
              <p className="text-slate-600">Address: 1650 Page St, San Francisco, California(CA), 94117</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/apply" className="text-slate-600 hover:text-slate-900">Apply Now</a></li>
                <li><a href="#process" className="text-slate-600 hover:text-slate-900">Application Process</a></li>
                <li><a href="#contact" className="text-slate-600 hover:text-slate-900">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-600 hover:text-slate-900">Facebook</a>
                <a href="#" className="text-slate-600 hover:text-slate-900">Twitter</a>
                <a href="#" className="text-slate-600 hover:text-slate-900">Instagram</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-200 text-center text-slate-600">
            <p>&copy; {new Date().getFullYear()} Pinnacle Properties. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
