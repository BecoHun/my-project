"use client"

import { useRef } from "react"
import { useFormStatus } from "react-dom"
import { addMessage } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className="min-w-[100px]">
      {pending ? <Spinner /> : "Mentés"}
    </Button>
  )
}

export function MessageForm() {
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    const result = await addMessage(formData)
    if (result.success) {
      formRef.current?.reset()
    }
  }

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-4">
      <Textarea
        name="content"
        placeholder="Írd ide az üzeneted..."
        required
        minLength={1}
        className="min-h-[100px] resize-none"
      />
      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  )
}
