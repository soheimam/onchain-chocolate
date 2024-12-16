'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { AlertTriangle, Lock, Shield } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { SecurityCard } from './SecurityCard'

const SECURITY_NOTICES = [
    {
        title: 'Keep Your Cocoa\n(and Wallet) Safe',
        description: 'Always double-check\nthe address before\nsending payments.',
        Icon: Lock,
    },
    {
        title: 'Protect Your\nPrivate Keys',
        description: 'Never share your\nprivate keys or\nseed phrase.',
        Icon: Shield,
    },
    {
        title: 'Beware of\nPhishing Attempts',
        description: 'Verify website URLs\nand email senders\nbefore taking action.',
        Icon: AlertTriangle,
    },
]

export default function SecurityNoticeSlider() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
    const [selectedIndex, setSelectedIndex] = useState(0)

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    const scrollTo = useCallback((index: number) => {
        if (!emblaApi) return
        emblaApi.scrollTo(index)
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on('select', onSelect)
        return () => {
            emblaApi.off('select', onSelect)
        }
    }, [emblaApi, onSelect])

    return (
        <div className=" col-span-2 md:col-span-4 relative max-w-md w-full overflow-hidden" ref={emblaRef}>
            <div className="flex">
                {SECURITY_NOTICES.map((notice, index) => (
                    <div key={index} className="flex-[0_0_100%] min-w-0">
                        <SecurityCard {...notice} />
                    </div>
                ))}
            </div>
            <div className="absolute bottom-4 left-0 right-0">
                <div className="flex justify-center gap-2">
                    {SECURITY_NOTICES.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-opacity ${index === selectedIndex ? 'bg-white' : 'bg-white/40'
                                }`}
                            onClick={() => scrollTo(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
