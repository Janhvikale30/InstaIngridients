"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { User, HelpCircle, LogOut, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isSupportOpen, setIsSupportOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    // Implement logout logic here
    setIsLoggedIn(false)
    localStorage.removeItem("token")
    router.push("/")
  }

  // Simulating a login effect
  useEffect(() => {
    // Check if user is logged in (e.g., by checking local storage or a token)
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token")
      setIsLoggedIn(!!token)
    }

    checkLoginStatus()
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#FFF0E5] shadow-md z-50 h-24">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/insta-removebg-preview-b3bZTS1ei8u2dNxQ5twCip3oIvl9Yg.png"
            alt="INSTAINGREDIENTS Logo - Chef on Scooter"
            width={80}
            height={80}
            className="rounded-full"
          />
        </Link>
        <nav className="flex items-center space-x-6">
          <Button variant="ghost" className="hover:bg-[#FF6B35] hover:text-white" onClick={() => router.push("/")}>
            Home
          </Button>
          <div className="relative">
            <Button variant="ghost" className="flex items-center" onClick={() => setIsSupportOpen(!isSupportOpen)}>
              <HelpCircle className="w-5 h-5 mr-1" />
              Support
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
            {isSupportOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-[#FF6B35]">
                <Link href="/support/contact" className="block px-4 py-2 hover:bg-[#FF6B35] hover:text-white">
                  Contact Us
                </Link>
                <Link href="/support/faq" className="block px-4 py-2 hover:bg-[#FF6B35] hover:text-white">
                  FAQs
                </Link>
                <Link href="/support/about" className="block px-4 py-2 hover:bg-[#FF6B35] hover:text-white">
                  About Us
                </Link>
              </div>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isLoggedIn ? (
                <>
                  <DropdownMenuItem onSelect={() => router.push("/account")}>Account Settings</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => router.push("/orders")}>Order History</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem onSelect={() => router.push("/login")}>Log in</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => router.push("/signup")}>Sign up</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  )
}

export default Header

