"use client"

import { useTasksContext } from "@/context/tasks-context"
import TaskItem from "./task-item"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardList } from "lucide-react"

export default function TaskList() {
  const { tasks, filter } = useTasksContext()

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed
    if (filter === "completed") return task.completed
    return true // 'all' filter
  })

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <ClipboardList className="h-5 w-5" />
          Tasks
        </CardTitle>
      </CardHeader>
      <CardContent>
        {filteredTasks.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            {filter === "all"
              ? "No tasks yet. Add one above!"
              : filter === "active"
                ? "No active tasks. Great job!"
                : "No completed tasks yet."}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

