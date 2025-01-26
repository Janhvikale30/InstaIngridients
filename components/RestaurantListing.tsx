"use client"

import { useState } from "react"
import { Star, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

// Mock data for restaurants
const restaurants = [
  { id: 1, name: "Pasta Paradise", cuisine: "Italian", rating: 4.5, isVegetarian: false, type: "Restaurant" },
  { id: 2, name: "Veggie Delight", cuisine: "Vegetarian", rating: 4.2, isVegetarian: true, type: "Cafe" },
  { id: 3, name: "Spice Route", cuisine: "Indian", rating: 4.7, isVegetarian: false, type: "Restaurant" },
  { id: 4, name: "Sushi Sensation", cuisine: "Japanese", rating: 4.8, isVegetarian: false, type: "Restaurant" },
  { id: 5, name: "Green Leaf", cuisine: "Vegan", rating: 4.0, isVegetarian: true, type: "Cafe" },
  { id: 6, name: "Burger Bliss", cuisine: "American", rating: 4.3, isVegetarian: false, type: "Restaurant" },
  { id: 7, name: "Taco Town", cuisine: "Mexican", rating: 4.1, isVegetarian: false, type: "Restaurant" },
  { id: 8, name: "Dim Sum Delights", cuisine: "Chinese", rating: 4.6, isVegetarian: false, type: "Restaurant" },
  { id: 9, name: "Falafel Factory", cuisine: "Middle Eastern", rating: 4.4, isVegetarian: true, type: "Cafe" },
  { id: 10, name: "Crepe Corner", cuisine: "French", rating: 4.5, isVegetarian: false, type: "Cafe" },
  { id: 11, name: "Pho Palace", cuisine: "Vietnamese", rating: 4.2, isVegetarian: false, type: "Restaurant" },
  { id: 12, name: "Greek Taverna", cuisine: "Greek", rating: 4.3, isVegetarian: false, type: "Restaurant" },
  { id: 13, name: "Luxury Bites", cuisine: "International", rating: 4.9, isVegetarian: false, type: "Hotel" },
  { id: 14, name: "Skyline Dining", cuisine: "Fusion", rating: 4.7, isVegetarian: false, type: "Hotel" },
  { id: 15, name: "Gourmet Heights", cuisine: "European", rating: 4.8, isVegetarian: false, type: "Hotel" },
]

const cuisines = [
  "All",
  "Italian",
  "Vegetarian",
  "Indian",
  "Japanese",
  "Vegan",
  "American",
  "Mexican",
  "Chinese",
  "Middle Eastern",
  "French",
  "Vietnamese",
  "Greek",
  "International",
  "Fusion",
  "European",
]

export function RestaurantListing() {
  const [sortBy, setSortBy] = useState("rating")
  const [filterVeg, setFilterVeg] = useState(false)
  const [filterNonVeg, setFilterNonVeg] = useState(false)
  const [ratingFilter, setRatingFilter] = useState("all")
  const [cuisineFilter, setCuisineFilter] = useState("All")
  const [establishmentType, setEstablishmentType] = useState("All")

  const filteredRestaurants = restaurants
    .filter((restaurant) => {
      if (filterVeg && !restaurant.isVegetarian) return false
      if (filterNonVeg && restaurant.isVegetarian) return false
      if (ratingFilter !== "all" && restaurant.rating < Number.parseInt(ratingFilter)) return false
      if (cuisineFilter !== "All" && restaurant.cuisine !== cuisineFilter) return false
      if (establishmentType !== "All" && restaurant.type !== establishmentType) return false
      return true
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating
      return a.name.localeCompare(b.name)
    })

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <Select onValueChange={setSortBy} defaultValue={sortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Sort by Rating</SelectItem>
            <SelectItem value="name">Sort by Name</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center space-x-2">
          <Checkbox id="veg" checked={filterVeg} onCheckedChange={setFilterVeg} />
          <label htmlFor="veg">Vegetarian</label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="non-veg" checked={filterNonVeg} onCheckedChange={setFilterNonVeg} />
          <label htmlFor="non-veg">Non-Vegetarian</label>
        </div>

        <Select onValueChange={setRatingFilter} defaultValue={ratingFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ratings</SelectItem>
            <SelectItem value="4">4+ Stars</SelectItem>
            <SelectItem value="3">3+ Stars</SelectItem>
            <SelectItem value="2">2+ Stars</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={setCuisineFilter} defaultValue={cuisineFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Cuisine" />
          </SelectTrigger>
          <SelectContent>
            {cuisines.map((cuisine) => (
              <SelectItem key={cuisine} value={cuisine}>
                {cuisine}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        <Button
          variant={establishmentType === "All" ? "default" : "outline"}
          onClick={() => setEstablishmentType("All")}
        >
          All
        </Button>
        <Button
          variant={establishmentType === "Restaurant" ? "default" : "outline"}
          onClick={() => setEstablishmentType("Restaurant")}
        >
          Restaurants
        </Button>
        <Button
          variant={establishmentType === "Cafe" ? "default" : "outline"}
          onClick={() => setEstablishmentType("Cafe")}
        >
          Cafes
        </Button>
        <Button
          variant={establishmentType === "Hotel" ? "default" : "outline"}
          onClick={() => setEstablishmentType("Hotel")}
        >
          Hotels
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <Card key={restaurant.id}>
            <CardHeader>
              <CardTitle>{restaurant.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="flex items-center">
                <Utensils className="mr-2 h-4 w-4" />
                {restaurant.cuisine}
              </p>
              <p className="flex items-center">
                <Star className="mr-2 h-4 w-4 text-yellow-400" />
                {restaurant.rating.toFixed(1)}
              </p>
              <p>{restaurant.isVegetarian ? "Vegetarian" : "Non-Vegetarian"}</p>
              <p>Type: {restaurant.type}</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/restaurant/${restaurant.id}`}>View Menu</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

