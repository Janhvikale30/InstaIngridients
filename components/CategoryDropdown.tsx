import React, { useState } from "react"
import { ChevronDown, ChevronUp, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface Dish {
  name: string
  price: number
  isVegetarian: boolean
}

interface CategoryDropdownProps {
  icon: React.ReactNode
  name: string
  tagline: string
  dishes: Dish[]
  addToCart: (item: { name: string; price: number }) => void
}

const VegIcon = () => (
  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="green" strokeWidth="2" />
    <circle cx="12" cy="12" r="6" fill="green" />
  </svg>
)

const NonVegIcon = () => (
  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="red" strokeWidth="2" />
    <circle cx="12" cy="12" r="6" fill="red" />
  </svg>
)

export function CategoryDropdown({ icon, name, tagline, dishes, addToCart }: CategoryDropdownProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null)
  const router = useRouter()

  const handleDishClick = (dish: Dish) => {
    setSelectedDish(dish)
    router.push(`/dish/${encodeURIComponent(dish.name)}`)
  }

  const handleCategoryClick = () => {
    router.push(`/category/${encodeURIComponent(name)}`)
  }

  const handleAddToOrder = (dish: Dish) => {
    addToCart({ name: dish.name, price: dish.price })
    toast({
      title: "Added to Order",
      description: `${dish.name} has been added to your order.`,
    })
  }

  return (
    <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <button onClick={handleCategoryClick} className="flex flex-col items-center group">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center text-[#8B4513] hover:text-white hover:bg-[#8B4513] transition-colors group-hover:shadow-lg border-2 border-[#8B4513]">
          {React.cloneElement(icon as React.ReactElement, { className: "w-12 h-12 sm:w-16 sm:h-16 mb-2" })}
          <span className="font-semibold text-xs sm:text-sm">{name}</span>
        </div>
        <span className="mt-2 text-xs sm:text-sm text-[#8B4513] group-hover:text-[#8B4513] transition-colors">
          {tagline}
        </span>
      </button>
      {isHovered && (
        <div className="absolute z-10 mt-2 w-48 sm:w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1 max-h-60 overflow-y-auto"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {dishes.map((dish, index) => (
              <button
                key={index}
                onClick={() => handleDishClick(dish)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center justify-between"
                role="menuitem"
              >
                <div className="flex items-center">
                  {dish.isVegetarian ? <VegIcon /> : <NonVegIcon />}
                  <span>{dish.name}</span>
                </div>
                <span>${dish.price.toFixed(2)}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="ml-2 p-1 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAddToOrder(dish)
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

