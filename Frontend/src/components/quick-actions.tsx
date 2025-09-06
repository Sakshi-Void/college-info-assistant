import { Button } from "@/components/ui/button"
import { GraduationCap, DollarSign, BookOpen, MapPin, Calendar, Users } from "lucide-react"

interface QuickActionsProps {
  onActionClick: (action: string) => void
}

const quickActions = [
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "fees", label: "Fees", icon: DollarSign },
  { id: "admissions", label: "Admissions", icon: GraduationCap },
  { id: "campus", label: "Campus", icon: MapPin },
  { id: "events", label: "Events", icon: Calendar },
  { id: "clubs", label: "Clubs", icon: Users },
]

export function QuickActions({ onActionClick }: QuickActionsProps) {
  return (
    <div className="px-4 py-3">
      <div className="flex flex-wrap gap-2 justify-center">
        {quickActions.map((action) => {
          const Icon = action.icon
          return (
            <Button
              key={action.id}
              variant="secondary"
              size="sm"
              onClick={() => onActionClick(action.label)}
              className="rounded-full border border-border/50 bg-background/80 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-300 hover:scale-105"
            >
              <Icon className="h-3 w-3 mr-1.5" />
              {action.label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}