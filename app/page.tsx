"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Pizza,
  Salad,
  Beef,
  Fish,
  Carrot,
  Cake,
  Coffee,
  Sandwich,
  Soup,
  Utensils,
  Clock,
  Truck,
  ShoppingCart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { RestaurantListing } from "@/components/RestaurantListing"
import { CategoryDropdown } from "@/components/CategoryDropdown"
import { Cart } from "@/components/Cart"

const categories = [
  {
    icon: <Pizza />,
    name: "Pizza",
    tagline: "Cheesy goodness",
    dishes: [
      { name: "Margherita", price: 12.99, isVegetarian: true },
      { name: "Pepperoni", price: 14.99, isVegetarian: false },
      { name: "Vegetarian", price: 13.99, isVegetarian: true },
      { name: "Hawaiian", price: 15.99, isVegetarian: false },
      { name: "BBQ Chicken", price: 16.99, isVegetarian: false },
      { name: "Mushroom Truffle", price: 18.99, isVegetarian: true },
    ],
  },
  {
    icon: <Salad />,
    name: "Salads",
    tagline: "Fresh and crisp",
    dishes: [
      { name: "Caesar Salad", price: 9.99, isVegetarian: false },
      { name: "Greek Salad", price: 10.99, isVegetarian: true },
      { name: "Cobb Salad", price: 11.99, isVegetarian: false },
      { name: "Spinach Salad", price: 10.99, isVegetarian: true },
      { name: "Quinoa Avocado Salad", price: 12.99, isVegetarian: true },
      { name: "Grilled Chicken Salad", price: 13.99, isVegetarian: false },
    ],
  },
  {
    icon: <Beef />,
    name: "Meat",
    tagline: "Protein-packed",
    dishes: [
      { name: "Steak", price: 24.99, isVegetarian: false },
      { name: "BBQ Ribs", price: 22.99, isVegetarian: false },
      { name: "Roast Chicken", price: 18.99, isVegetarian: false },
      { name: "Lamb Chops", price: 26.99, isVegetarian: false },
      { name: "Beef Brisket", price: 20.99, isVegetarian: false },
      { name: "Pork Tenderloin", price: 19.99, isVegetarian: false },
    ],
  },
  {
    icon: <Fish />,
    name: "Seafood",
    tagline: "Ocean's finest",
    dishes: [
      { name: "Grilled Salmon", price: 21.99, isVegetarian: false },
      { name: "Shrimp Scampi", price: 19.99, isVegetarian: false },
      { name: "Fish and Chips", price: 16.99, isVegetarian: false },
      { name: "Tuna Steak", price: 23.99, isVegetarian: false },
      { name: "Lobster Tail", price: 34.99, isVegetarian: false },
      { name: "Crab Cakes", price: 22.99, isVegetarian: false },
    ],
  },
  {
    icon: <Carrot />,
    name: "Vegan",
    tagline: "Plant-based delights",
    dishes: [
      { name: "Vegan Burger", price: 14.99, isVegetarian: true },
      { name: "Quinoa Bowl", price: 13.99, isVegetarian: true },
      { name: "Vegan Pasta", price: 15.99, isVegetarian: true },
      { name: "Vegetable Curry", price: 16.99, isVegetarian: true },
      { name: "Tofu Stir-Fry", price: 14.99, isVegetarian: true },
      { name: "Vegan Sushi Rolls", price: 17.99, isVegetarian: true },
    ],
  },
  {
    icon: <Cake />,
    name: "Desserts",
    tagline: "Sweet treats",
    dishes: [
      { name: "Chocolate Cake", price: 7.99, isVegetarian: true },
      { name: "Cheesecake", price: 8.99, isVegetarian: true },
      { name: "Apple Pie", price: 6.99, isVegetarian: true },
      { name: "Ice Cream Sundae", price: 5.99, isVegetarian: true },
      { name: "Tiramisu", price: 8.99, isVegetarian: true },
      { name: "Fruit Tart", price: 7.99, isVegetarian: true },
    ],
  },
  {
    icon: <Coffee />,
    name: "Beverages",
    tagline: "Quench your thirst",
    dishes: [
      { name: "Cappuccino", price: 4.99, isVegetarian: true },
      { name: "Fresh Orange Juice", price: 3.99, isVegetarian: true },
      { name: "Iced Tea", price: 2.99, isVegetarian: true },
      { name: "Smoothie", price: 5.99, isVegetarian: true },
      { name: "Latte", price: 4.99, isVegetarian: true },
      { name: "Milkshake", price: 6.99, isVegetarian: true },
    ],
  },
  {
    icon: <Sandwich />,
    name: "Sandwiches",
    tagline: "Handheld deliciousness",
    dishes: [
      { name: "Club Sandwich", price: 11.99, isVegetarian: false },
      { name: "Veggie Wrap", price: 9.99, isVegetarian: true },
      { name: "BLT", price: 10.99, isVegetarian: false },
      { name: "Grilled Cheese", price: 8.99, isVegetarian: true },
      { name: "Chicken Panini", price: 12.99, isVegetarian: false },
      { name: "Tuna Melt", price: 11.99, isVegetarian: false },
    ],
  },
  {
    icon: <Soup />,
    name: "Soups",
    tagline: "Warm and comforting",
    dishes: [
      { name: "Tomato Soup", price: 6.99, isVegetarian: true },
      { name: "Chicken Noodle Soup", price: 7.99, isVegetarian: false },
      { name: "Minestrone", price: 7.99, isVegetarian: true },
      { name: "Clam Chowder", price: 8.99, isVegetarian: false },
      { name: "Lentil Soup", price: 6.99, isVegetarian: true },
      { name: "French Onion Soup", price: 8.99, isVegetarian: true },
    ],
  },
]

export default function WelcomePage() {
  const [cartItems, setCartItems] = useState<Array<{ name: string; price: number; quantity: number }>>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (item: { name: string; price: number }) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.name === item.name)
      if (existingItem) {
        return prevItems.map((i) => (i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i))
      } else {
        return [...prevItems, { ...item, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (itemName: string) => {
    setCartItems((prevItems) =>
      prevItems.reduce(
        (acc, item) => {
          if (item.name === itemName) {
            if (item.quantity > 1) {
              acc.push({ ...item, quantity: item.quantity - 1 })
            }
          } else {
            acc.push(item)
          }
          return acc
        },
        [] as typeof cartItems,
      ),
    )
  }

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold text-[#FF6B35] mb-4">Welcome to INSTAINGREDIENTS</h1>
            <p className="text-xl text-gray-600 mb-6">Your culinary adventure starts here!</p>
            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <Utensils className="w-6 h-6 text-[#FF6B35] mr-2" />
                <span className="text-lg">Gourmet meals at your doorstep</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-6 h-6 text-[#FF6B35] mr-2" />
                <span className="text-lg">Quick and easy ordering</span>
              </div>
              <div className="flex items-center">
                <Truck className="w-6 h-6 text-[#FF6B35] mr-2" />
                <span className="text-lg">Fast and reliable delivery</span>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button asChild>
                <Link href="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/menu">View Menu</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.jpg-W11yCuLe1jDN8bNbAMJIC61eiSTbX5.jpeg"
              alt="Fresh Asian cooking ingredients including chilies, herbs, spices, and aromatics laid out on a dark blue surface"
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#FF6B35] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Dining Experience?</h2>
          <p className="text-xl text-[#FFF0E5] mb-8">
            Join INSTAINGREDIENTS today and discover a world of culinary delights!
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/signup">
              Sign Up Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Food Categories Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Explore Food Categories</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {categories.map((category, index) => (
              <CategoryDropdown
                key={index}
                icon={category.icon}
                name={category.name}
                tagline={category.tagline}
                dishes={category.dishes}
                addToCart={(item) => {
                  setCartItems((prevItems) => {
                    const existingItem = prevItems.find((i) => i.name === item.name)
                    if (existingItem) {
                      return prevItems.map((i) => (i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i))
                    } else {
                      return [...prevItems, { ...item, quantity: 1 }]
                    }
                  })
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* All Restaurants Section */}
      <section className="bg-[#FFF0E5] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Explore All Restaurants</h2>
          <RestaurantListing />
        </div>
      </section>

      {/* Cart Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button onClick={toggleCart} className="rounded-full p-3">
          <ShoppingCart className="h-6 w-6" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </Button>
      </div>

      {/* Cart Component */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        removeFromCart={removeFromCart}
      />
    </div>
  )
}

