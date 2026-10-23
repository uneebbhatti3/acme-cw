import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
<<<<<<< HEAD
      className={cn("animate-pulse rounded-md bg-accent", className)}
=======
      className={cn("animate-pulse rounded-md bg-muted", className)}
>>>>>>> c95d78430d80c9a2c3e8e7e28542bfe327beeafc
      {...props}
    />
  )
}

export { Skeleton }
