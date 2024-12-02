import { cn } from "@/lib/utils"
import React from 'react'

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    className?: string
}

const GlassButton: React.FC<GlassButtonProps> = ({ children, className, ...props }) => {
    return (
        <button
            className={cn(
                "relative px-6 py-3 rounded-lg",
                "bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg",
                "border border-white border-opacity-30",
                "text-white font-semibold",
                "shadow-lg",
                "transition-all duration-300 ease-in-out",
                "hover:bg-opacity-30 hover:scale-105",
                "focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50",
                "active:scale-95",
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}

export default GlassButton

