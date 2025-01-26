"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const [dishName, setDishName] = useState("")
  const [price, setPrice] = useState("")

  useEffect(() => {
    const dishNameParam = searchParams.get("dishName")
    const priceParam = searchParams.get("price")

    setDishName(dishNameParam || "")
    setPrice(priceParam || "0.00")
  }, [searchParams])

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
      <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
      <p className="text-xl mb-4">Thank you for your order of {dishName}.</p>
      <p className="text-lg mb-8">Total: ${price}</p>
      <p className="mb-8">We've sent a confirmation email with your order details.</p>
      <Button asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  )
}

