"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Mail } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

type UserType = "user" | "partner" | null

export default function Signup() {
  const [userType, setUserType] = useState<UserType>(null)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle signup logic here
    console.log("Signup submitted", { userType, fullName, email, password, confirmPassword })
    // Simulate signup process
    localStorage.setItem("token", "fake-jwt-token")
    router.push("/")
  }

  const handleGoogleSignup = () => {
    // Implement Google signup logic
    console.log("Google signup")
  }

  const handleAppleSignup = () => {
    // Implement Apple signup logic
    console.log("Apple signup")
  }

  const handleEmailSignup = () => {
    // Implement Email signup logic
    console.log("Email signup")
  }

  return (
    <div className="min-h-screen bg-[#FFF0E5] py-16 px-4">
      <Card className="max-w-md mx-auto shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white rounded-xl">
        <CardHeader className="space-y-6">
          <div className="flex justify-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12-removebg-preview-IoKaq0rzeBstHRcxarETd6Wx1Z8yDC.png"
              alt="INSTAINGREDIENTS Logo"
              width={300}
              height={100}
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-center text-[#FF6B35]">Sign Up</h1>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">I want to sign up as:</h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setUserType("user")}
                className={`px-6 py-3 rounded-md font-bold text-lg transition-colors ${
                  userType === "user"
                    ? "bg-[#FF6B35] text-white"
                    : "bg-white text-[#FF6B35] border-2 border-[#FF6B35] hover:bg-[#FFF0E5]"
                }`}
              >
                User
              </button>
              <button
                onClick={() => setUserType("partner")}
                className={`px-6 py-3 rounded-md font-bold text-lg transition-colors ${
                  userType === "partner"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
                }`}
              >
                Partner
              </button>
            </div>
          </div>
          {userType && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#FF6B35] text-white py-3 rounded-md hover:bg-[#E55A2B] transition-colors"
              >
                Sign Up
              </button>
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={handleGoogleSignup}
                  className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-50 flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                  Continue with Google
                </button>
                <button
                  type="button"
                  onClick={handleAppleSignup}
                  className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17.05 20.28c-.98.95-2.05.88-3.08.38-1.07-.52-2.05-.53-3.17 0-1.39.69-2.12.53-3.01-.38C3.33 15.85 3.96 8.43 8.4 8.06c1.23.02 2.06.68 3.03.73 1.14-.12 2.22-.82 3.37-.78 1.53.12 2.67.77 3.39 1.95-3.31 2.14-2.58 6.21.82 7.68-.64 1.39-1.51 2.71-2.96 4.64zm-3.25-18.03c.05 2.22-1.65 4.07-3.79 3.94-.18-1.87 1.43-3.96 3.79-3.94z"
                      fill="currentColor"
                    />
                  </svg>
                  Continue with Apple
                </button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">OR</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleEmailSignup}
                  className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 flex items-center justify-center transition-colors"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Continue with Email
                </button>
              </div>
            </form>
          )}
          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-[#FF6B35] hover:underline">
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

