"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Star, DollarSign, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

// Mock data for a restaurant
const restaurant = {
  id: 1,
  name: "Tasty Bites",
  cuisine: "Italian",
  rating: 4.5,
  priceRange: 2,
  isVegetarian: false,
  menu: [
    { id: 1, name: "Margherita Pizza", price: 12.99, isVegetarian: true },
    { id: 2, name: "Spaghetti Carbonara", price: 14.99, isVegetarian: false },
    { id: 3, name: "Caprese Salad", price: 8.99, isVegetarian: true },
  ],
}

interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
}

export default function RestaurantDetail() {
  const params = useParams()
  const router = useRouter()
  const [orderType, setOrderType] = useState<"order" | "cook">("order")
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])

  const addToOrder = (item: { id: number; name: string; price: number }) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id)
      if (existingItem) {
        return prevItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      } else {
        return [...prevItems, { ...item, quantity: 1 }]
      }
    })
    toast({
      title: "Added to order",
      description: `${item.name} has been added to your order.`,
    })
  }

  const removeFromOrder = (itemId: number) => {
    setOrderItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item,
      )
      return updatedItems.filter((item) => item.quantity > 0)
    })
  }

  const getTotalPrice = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handlePlaceOrder = () => {
    if (orderItems.length === 0) {
      toast({
        title: "Empty Order",
        description: "Please add items to your order before proceeding.",
        variant: "destructive",
      })
      return
    }

    // Navigate to the order review page
    router.push(
      `/order-review?restaurantId=${restaurant.id}&restaurantName=${encodeURIComponent(restaurant.name)}&total=${getTotalPrice().toFixed(2)}`,
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{restaurant.name}</h1>
      <div className="mb-4">
        <p className="text-gray-600">{restaurant.cuisine}</p>
        <div className="flex items-center">
          <Star className="text-yellow-400 mr-1" />
          <span>{restaurant.rating}</span>
        </div>
        <div className="flex items-center">
          {Array.from({ length: restaurant.priceRange }).map((_, index) => (
            <DollarSign key={index} className="text-green-600" />
          ))}
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            restaurant.isVegetarian ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {restaurant.isVegetarian ? "Vegetarian" : "Non-Vegetarian"}
        </span>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {restaurant.menu.map((item) => (
            <div key={item.id} className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-2">${item.price.toFixed(2)}</p>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  item.isVegetarian ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {item.isVegetarian ? "Vegetarian" : "Non-Vegetarian"}
              </span>
              <Button onClick={() => addToOrder(item)} className="mt-2 w-full" variant="outline">
                Add to Order
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Order</h2>
        {orderItems.length === 0 ? (
          <p>Your order is empty. Add items from the menu to get started!</p>
        ) : (
          <div>
            {orderItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-2">
                <span>{item.name}</span>
                <div>
                  <Button onClick={() => removeFromOrder(item.id)} variant="outline" size="sm" className="mr-2">
                    -
                  </Button>
                  <span>{item.quantity}</span>
                  <Button onClick={() => addToOrder(item)} variant="outline" size="sm" className="ml-2">
                    +
                  </Button>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="mt-4">
              <p className="font-bold">Total: ${getTotalPrice().toFixed(2)}</p>
            </div>
          </div>
        )}
        <Button onClick={handlePlaceOrder} className="mt-4" disabled={orderItems.length === 0}>
          <ShoppingCart className="mr-2 h-4 w-4" /> Place Order
        </Button>
      </div>
    </div>
  )
}

