import { useState } from "react"
import { ChatHeader } from "@/components/chat-header"
import { ChatArea } from "@/components/chat-area"
import { ChatInput } from "@/components/chat-input"
import { QuickActions } from "@/components/quick-actions"
import { type Message } from "@/components/chat-message"

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(content),
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleQuickAction = (action: string) => {
    handleSendMessage(`Tell me about ${action.toLowerCase()}`)
  }

  const getAIResponse = (question: string): string => {
    const responses = {
      courses: "We offer a wide range of undergraduate and graduate programs including Engineering, Business, Liberal Arts, Sciences, and more. Each program is designed with industry-relevant curriculum and hands-on learning opportunities.",
      fees: "Our tuition fees vary by program. Undergraduate programs start at $25,000 per year, while graduate programs range from $30,000-45,000. We also offer scholarships, financial aid, and flexible payment plans.",
      admissions: "Our admission process is holistic, considering academic performance, extracurricular activities, and personal essays. Application deadlines are typically in January for fall semester. We accept SAT, ACT, and international equivalents.",
      campus: "Our beautiful 200-acre campus features modern facilities, state-of-the-art laboratories, a central library, sports complex, and comfortable dormitories. Located in the heart of the city with easy access to internships and cultural activities.",
      events: "We host numerous events throughout the year including orientation week, cultural festivals, career fairs, guest lectures, sports tournaments, and graduation ceremonies. Check our events calendar for upcoming activities.",
      clubs: "We have over 100 student organizations covering academics, arts, sports, community service, and special interests. Popular clubs include Debate Society, Robotics Club, Drama Club, and various cultural associations."
    }

    const lowerQuestion = question.toLowerCase()
    for (const [key, response] of Object.entries(responses)) {
      if (lowerQuestion.includes(key)) {
        return response
      }
    }

    return "I'm here to help you with information about our college! You can ask me about courses, fees, admissions, campus facilities, events, clubs, or any other college-related questions. What would you like to know?"
  }

  return (
    <div className="h-screen flex flex-col gradient-background">
      <ChatHeader />
      <ChatArea messages={messages} isLoading={isLoading} />
      <QuickActions onActionClick={handleQuickAction} />
      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
};

export default Index;
