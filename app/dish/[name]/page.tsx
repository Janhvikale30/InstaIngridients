"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Star, DollarSign, ArrowLeft, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface Restaurant {
  id: number
  name: string
  rating: number
  price: string
  distance: string
  image: string
  type: "Restaurant" | "Cafe" | "Hotel"
}

// Mock data for restaurants
const mockRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "Tasty Bites",
    rating: 4.5,
    price: "$$",
    distance: "0.5 miles",
    image: "/placeholder.svg?height=100&width=100",
    type: "Restaurant",
  },
  {
    id: 2,
    name: "Gourmet Haven",
    rating: 4.8,
    price: "$$$",
    distance: "1.2 miles",
    image: "/placeholder.svg?height=100&width=100",
    type: "Restaurant",
  },
  {
    id: 3,
    name: "Quick Eats",
    rating: 4.2,
    price: "$",
    distance: "0.3 miles",
    image: "/placeholder.svg?height=100&width=100",
    type: "Cafe",
  },
  {
    id: 4,
    name: "Fusion Flavors",
    rating: 4.6,
    price: "$$",
    distance: "0.8 miles",
    image: "/placeholder.svg?height=100&width=100",
    type: "Restaurant",
  },
  {
    id: 5,
    name: "Spice Palace",
    rating: 4.3,
    price: "$$",
    distance: "1.5 miles",
    image: "/placeholder.svg?height=100&width=100",
    type: "Restaurant",
  },
  {
    id: 6,
    name: "Green Leaf Cafe",
    rating: 4.7,
    price: "$$",
    distance: "0.7 miles",
    image: "/placeholder.svg?height=100&width=100",
    type: "Cafe",
  },
  {
    id: 7,
    name: "Sushi Sensation",
    rating: 4.9,
    price: "$$$",
    distance: "1.8 miles",
    image: "/placeholder.svg?height=100&width=100",
    type: "Restaurant",
  },
  {
    id: 8,
    name: "Burger Bliss",
    rating: 4.4,
    price: "$",
    distance: "0.4 miles",
    image: "/placeholder.svg?height=100&width=100",
    type: "Cafe",
  },
  {
    id: 9,
    name: "Pasta Paradise",
    rating: 4.6,
    price: "$$",
    distance: "1.1 miles",
    image: "/placeholder.svg?height=100&width=100",
    type: "Restaurant",
  },
  {
    id: 10,
    name: "Taco Town",
    rating: 4.2,
    price: "$",
    distance: "0.6 miles",
    image: "/placeholder.svg?height=100&width=100",
    type: "Restaurant",
  },
  {
    id: 11,
    name: "Luxury Bites",
    rating: 4.9,
    price: "$$$$",
    distance: "2.0 miles",
    image: "/placeholder.svg?height=100&width=100",
    type: "Hotel",
  },
  {
    id: 12,
    name: "Skyline Dining",
    rating: 4.7,
    price: "$$$",
    distance: "1.9 miles",
    image: "/placeholder.svg?height=100&width=100",
    type: "Hotel",
  },
]

export default function DishRestaurants() {
  const params = useParams()
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [selectedType, setSelectedType] = useState<"All" | "Restaurant" | "Cafe" | "Hotel">("All")
  const dishName = params.name ? decodeURIComponent(params.name as string) : ""

  useEffect(() => {
    // In a real application, you would fetch restaurants based on the dish name
    // For now, we'll use our mock data
    setRestaurants(mockRestaurants)
  }, [])

  const filteredRestaurants = restaurants.filter(
    (restaurant) => selectedType === "All" || restaurant.type === selectedType,
  )

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${dishName} has been added to your cart.`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Restaurants offering {dishName}</h1>
        <Button onClick={handleAddToCart} className="rounded-full p-2">
          <Plus className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex justify-center space-x-4 mb-6">
        <Button variant={selectedType === "All" ? "default" : "outline"} onClick={() => setSelectedType("All")}>
          All
        </Button>
        <Button
          variant={selectedType === "Restaurant" ? "default" : "outline"}
          onClick={() => setSelectedType("Restaurant")}
        >
          Restaurants
        </Button>
        <Button variant={selectedType === "Cafe" ? "default" : "outline"} onClick={() => setSelectedType("Cafe")}>
          Cafes
        </Button>
        <Button variant={selectedType === "Hotel" ? "default" : "outline"} onClick={() => setSelectedType("Hotel")}>
          Hotels
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <Link href={`/restaurant/${restaurant.id}`} key={restaurant.id}>
            <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-2">
                <img
                  src={restaurant.image || "/placeholder.svg"}
                  alt={restaurant.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h2 className="text-xl font-semibold">{restaurant.name}</h2>
                  <div className="flex items-center">
                    <Star className="text-yellow-400 w-4 h-4 mr-1" />
                    <span>{restaurant.rating}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  {restaurant.price}
                </span>
                <span>{restaurant.distance}</span>
              </div>
              <p className="mt-2 text-sm text-gray-500">{restaurant.type}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

