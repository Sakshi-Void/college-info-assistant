import { useEffect, useRef } from "react"
import { ChatMessage, type Message } from "@/components/chat-message"

interface ChatAreaProps {
  messages: Message[]
  isLoading?: boolean
}

export function ChatArea({ messages, isLoading = false }: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center p-8">
          <div className="text-center space-y-4 max-w-md">
            <div className="w-16 h-16 mx-auto gradient-primary rounded-2xl flex items-center justify-center">
              <span className="text-2xl">🎓</span>
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              Welcome to College Info Assistant
            </h2>
            <p className="text-muted-foreground">
              Ask me anything about courses, fees, admissions, campus life, and more. 
              I'm here to help you with all your college-related questions!
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-1">
          {messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              message={message}
              isAnimating={index === messages.length - 1}
            />
          ))}
          {isLoading && (
            <div className="flex w-full gap-4 px-4 py-6">
              <div className="flex max-w-[85%] gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border bg-bot-bubble border-bot-bubble-border">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce"></div>
                  </div>
                </div>
                <div className="glass-effect rounded-2xl px-4 py-3 text-sm">
                  <div className="text-muted-foreground">Typing...</div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  )
}