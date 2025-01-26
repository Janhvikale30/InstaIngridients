"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { CheckCircle, CreditCard, Banknote, Smartphone, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

type PaymentMethod = "credit_card" | "upi" | "cash_on_delivery"

export default function OrderReviewContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit_card")
  const [mobileNumber, setMobileNumber] = useState("")

  const restaurantId = searchParams.get("restaurantId")
  const restaurantName = searchParams.get("restaurantName")
  const total = searchParams.get("total")

  const sendConfirmationSMS = (phoneNumber: string) => {
    toast({
      title: "Confirmation SMS Sent",
      description: `A confirmation SMS has been sent to ${phoneNumber}.`,
    })
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!mobileNumber) {
      toast({
        title: "Mobile Number Required",
        description: "Please enter a mobile number for order confirmation.",
        variant: "destructive",
      })
      return
    }
    toast({
      title: "Payment Processed",
      description: `Your payment of $${total} has been processed successfully using ${paymentMethod}.`,
    })
    sendConfirmationSMS(mobileNumber)
    router.push(`/order-confirmation?restaurantId=${restaurantId}&restaurantName=${restaurantName}&total=${total}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Order Review</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        <p className="mb-2">Restaurant: {restaurantName}</p>
        <p className="text-lg font-bold">Total: ${total}</p>
      </div>
      <form onSubmit={handlePaymentSubmit}>
        <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
        <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value="credit_card" id="credit_card" />
            <Label htmlFor="credit_card" className="flex items-center">
              <CreditCard className="mr-2" /> Credit Card
            </Label>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value="upi" id="upi" />
            <Label htmlFor="upi" className="flex items-center">
              <Smartphone className="mr-2" /> UPI
            </Label>
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <RadioGroupItem value="cash_on_delivery" id="cash_on_delivery" />
            <Label htmlFor="cash_on_delivery" className="flex items-center">
              <Banknote className="mr-2" /> Cash on Delivery
            </Label>
          </div>
        </RadioGroup>
        <div className="mb-4">
          <Label htmlFor="mobile_number">Mobile Number for Order Confirmation</Label>
          <Input
            type="tel"
            id="mobile_number"
            placeholder="Enter your mobile number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          <CheckCircle className="mr-2 h-4 w-4" /> Confirm and Pay
        </Button>
      </form>
    </div>
  )
}

