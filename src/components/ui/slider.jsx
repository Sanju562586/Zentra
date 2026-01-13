import * as React from "react"
import { cn } from "@/lib/utils"

const Slider = React.forwardRef(({ className, min, max, step, value, onValueChange, ...props }, ref) => {
    return (
        <div className={cn("relative flex items-center w-full touch-none select-none py-4", className)}>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value?.[1] ?? value?.[0] ?? value} // Handle array (take 2nd val for max) or single
                onChange={(e) => {
                    const val = Number(e.target.value);
                    // If the consumer expects an array (like StoreSidebar), we emulate it [0, val]
                    // Or if it expects a single value, we pass it.
                    // Based on StoreSidebar, it passes [0, 5000].
                    // We can just return [0, val] if the incoming value was an array.
                    if (Array.isArray(value)) {
                        onValueChange([value[0], val]);
                    } else {
                        onValueChange(val);
                    }
                }}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                ref={ref}
                {...props}
            />
        </div>
    )
})
Slider.displayName = "Slider"

export { Slider }
