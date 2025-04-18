"use client"

import type React from "react"

import { useState } from "react"
import { useTasksContext } from "@/context/tasks-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"

export default function TaskForm() {
  const [text, setText] = useState("")
  const { dispatch } = useTasksContext()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      dispatch({
        type: "added",
        text: text.trim(),
      })
      setText("")
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="Add a new task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={!text.trim()}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

