"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function addMessage(formData: FormData) {
  const content = formData.get("content") as string

  if (!content || content.trim() === "") {
    return { error: "Az üzenet nem lehet üres" }
  }

  const supabase = await createClient()

  const { error } = await supabase.from("messages").insert({
    content: content.trim(),
  })

  if (error) {
    return { error: "Hiba történt a mentés során" }
  }

  revalidatePath("/")
  return { success: true }
}

export async function deleteMessage(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("messages").delete().eq("id", id)

  if (error) {
    return { error: "Hiba történt a törlés során" }
  }

  revalidatePath("/")
  return { success: true }
}
