"use client"

import { useTransition } from "react"
import { Trash2 } from "lucide-react"
import { deleteMessage } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"

interface Message {
  id: string
  content: string
  created_at: string
}

interface MessageItemProps {
  message: Message
}

export function MessageItem({ message }: MessageItemProps) {
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    startTransition(async () => {
      await deleteMessage(message.id)
    })
  }

  const formattedDate = new Date(message.created_at).toLocaleString("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <Card className={isPending ? "opacity-50" : ""}>
      <CardContent className="flex items-start justify-between gap-4 p-4">
        <div className="flex-1 space-y-1">
          <p className="whitespace-pre-wrap text-foreground">{message.content}</p>
          <p className="text-xs text-muted-foreground">{formattedDate}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          disabled={isPending}
          className="text-muted-foreground hover:text-destructive shrink-0"
          aria-label="Üzenet törlése"
        >
          {isPending ? <Spinner className="h-4 w-4" /> : <Trash2 className="h-4 w-4" />}
        </Button>
      </CardContent>
    </Card>
  )
}
