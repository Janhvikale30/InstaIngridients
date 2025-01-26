"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AccountSettings() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
    } else {
      setIsLoggedIn(true)
    }
  }, [router])

  if (!isLoggedIn) {
    return null // or a loading spinner
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
      <p>This is where you would manage your account settings.</p>
    </div>
  )
}

