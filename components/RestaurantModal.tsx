import React from "react"
import { X } from "lucide-react"
import Link from "next/link"

interface Restaurant {
  id: number
  name: string
  rating: number
  price: string
  distance: string
}

interface RestaurantModalProps {
  isOpen: boolean
  onClose: () => void
  dish: string
  restaurants: Restaurant[]
}

export function RestaurantModal({ isOpen, onClose, dish, restaurants }: RestaurantModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#8B4513]">Restaurants offering {dish}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {restaurants.map((restaurant) => (
            <Link href={`/restaurant/${restaurant.id}`} key={restaurant.id} className="block">
              <div className="border-b border-gray-200 py-4 hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Rating: {restaurant.rating}/5</span>
                  <span>{restaurant.price}</span>
                </div>
                <p className="text-sm text-gray-500">{restaurant.distance} away</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

