import { Loader } from "@/components/landing/Loader"
import { Billboard } from "@/components/landing/Billboard"
import { GrainOverlay } from "@/components/landing/GrainOverlay"

export default function Page() {
  return (
    <div className="relative bg-ink text-paper [overflow-x:clip]">
      <Loader />
      <Billboard />
      <GrainOverlay />
    </div>
  )
}
