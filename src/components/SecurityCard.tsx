import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from 'lucide-react'

interface SecurityCardProps {
    title: string
    description: string
    Icon: LucideIcon
}

export function SecurityCard({ title, description, Icon }: SecurityCardProps) {
    return (
        <Card className="light-blue text-white min-w-full py-4">
            <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-semibold whitespace-pre-line">{title}</h2>
                <div className="flex items-start gap-2">
                    <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <p className="text-lg whitespace-pre-line">{description}</p>
                </div>
            </CardContent>
        </Card>
    )
}