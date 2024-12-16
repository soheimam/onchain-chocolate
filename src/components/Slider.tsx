'use client'

import { useEffect, useState } from 'react'

const messages = [
    "Warm up your winter!",
    "Indulge in chocolatey goodness",
    "Perfect for chilly nights",
]

export default function SideBox() {
    const [currentMessage, setCurrentMessage] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessage((prev) => (prev + 1) % messages.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative h-64 rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-blue-500" />
            <div className="absolute inset-0 animate-slide" />
            <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-xl font-bold text-center px-4">
                    {messages[currentMessage]}
                </p>
            </div>
        </div>
    )
}

