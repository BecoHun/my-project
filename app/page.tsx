import { Suspense } from "react"
import { MessageForm } from "@/components/message-form"
import { MessageList } from "@/components/message-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"

export default function Home() {
  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="mx-auto max-w-2xl space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Üzenőfal</CardTitle>
            <CardDescription>
              Hagyj üzenetet az üzenőfalon!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MessageForm />
          </CardContent>
        </Card>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Üzenetek</h2>
          <Suspense
            fallback={
              <div className="flex justify-center p-8">
                <Spinner className="h-8 w-8" />
              </div>
            }
          >
            <MessageList />
          </Suspense>
        </section>
      </div>
    </main>
  )
}
