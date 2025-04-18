"use client"

import { useState } from "react"
import { useTasksContext } from "@/context/tasks-context"
import type { Task } from "@/types/task"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Edit, Trash, Check, X } from "lucide-react"

interface TaskItemProps {
  task: Task
}

export default function TaskItem({ task }: TaskItemProps) {
  const { dispatch } = useTasksContext()
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)

  const handleToggle = () => {
    dispatch({
      type: "toggled",
      id: task.id,
    })
  }

  const handleDelete = () => {
    dispatch({
      type: "deleted",
      id: task.id,
    })
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditText(task.text)
  }

  const handleSave = () => {
    if (editText.trim()) {
      dispatch({
        type: "edited",
        id: task.id,
        text: editText.trim(),
      })
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditText(task.text)
  }

  return (
    <div
      className={`flex items-center justify-between p-3 rounded-md border ${task.completed ? "bg-muted/50" : "bg-card"}`}
    >
      <div className="flex items-center gap-3 flex-1">
        <Checkbox checked={task.completed} onCheckedChange={handleToggle} id={`task-${task.id}`} />

        {isEditing ? (
          <Input value={editText} onChange={(e) => setEditText(e.target.value)} className="flex-1" autoFocus />
        ) : (
          <label
            htmlFor={`task-${task.id}`}
            className={`flex-1 cursor-pointer ${task.completed ? "line-through text-muted-foreground" : ""}`}
          >
            {task.text}
          </label>
        )}
      </div>

      <div className="flex gap-1">
        {isEditing ? (
          <>
            <Button variant="ghost" size="icon" onClick={handleSave} title="Save">
              <Check className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleCancel} title="Cancel">
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" size="icon" onClick={handleEdit} title="Edit" disabled={task.completed}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleDelete} title="Delete">
              <Trash className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

