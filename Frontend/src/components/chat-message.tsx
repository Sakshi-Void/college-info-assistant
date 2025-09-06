import { Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
  isAnimating?: boolean
}

export function ChatMessage({ message, isAnimating = false }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div
      className={cn(
        "flex w-full gap-4 px-4 py-6",
        isUser ? "justify-end" : "justify-start",
        isAnimating && "animate-fade-in"
      )}
    >
      <div
        className={cn(
          "flex max-w-[85%] gap-3",
          isUser ? "flex-row-reverse" : "flex-row"
        )}
      >
        {/* Avatar */}
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-xl border",
            isUser
              ? "gradient-primary text-primary-foreground border-primary/20"
              : "bg-bot-bubble border-bot-bubble-border text-muted-foreground"
          )}
        >
          {isUser ? (
            <User className="h-4 w-4" />
          ) : (
            <Bot className="h-4 w-4" />
          )}
        </div>

        {/* Message Content */}
        <div
          className={cn(
            "group relative rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "gradient-primary text-primary-foreground ml-2"
              : "glass-effect text-foreground mr-2"
          )}
        >
          <div className="whitespace-pre-wrap break-words">
            {message.content}
          </div>
          
          {/* Timestamp */}
          <div
            className={cn(
              "mt-2 text-xs opacity-60",
              isUser ? "text-primary-foreground/70" : "text-muted-foreground"
            )}
          >
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
    </div>
  )
}