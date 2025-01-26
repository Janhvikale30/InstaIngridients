import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"

const OrderReviewContent = dynamic(() => import("./OrderReviewContent"), { ssr: false })

export default function OrderReview() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <OrderReviewContent />
    </Suspense>
  )
}

