import React from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CartItem {
  name: string
  price: number
  quantity: number
}

interface CartProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  removeFromCart: (itemName: string) => void
}

export function Cart({ isOpen, onClose, items, removeFromCart }: CartProps) {
  if (!isOpen) return null

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {items.map((item) => (
              <div key={item.name} className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => removeFromCart(item.name)}>
                  Remove
                </Button>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t">
              <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            </div>
            <Button className="w-full mt-4">Proceed to Checkout</Button>
          </>
        )}
      </div>
    </div>
  )
}

