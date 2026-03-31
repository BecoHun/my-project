import { createClient } from "@/lib/supabase/server"
import { MessageItem } from "./message-item"

interface Message {
  id: string
  content: string
  created_at: string
}

export async function MessageList() {
  const supabase = await createClient()

  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center text-destructive">
        Hiba történt az üzenetek betöltése során
      </div>
    )
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
        Még nincsenek üzenetek. Légy te az első!
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {messages.map((message: Message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  )
}
