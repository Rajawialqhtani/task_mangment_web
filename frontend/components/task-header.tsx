"use client"

import { useTasksContext } from "@/context/tasks-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ListFilter } from "lucide-react"

export default function TaskHeader() {
  const { tasks, filter, dispatch } = useTasksContext()

  const completedCount = tasks.filter((task) => task.completed).length
  const totalCount = tasks.length

  const handleFilterChange = (value: string) => {
    dispatch({ type: "filter", filter: value })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Task Manager</h1>
        <div className="flex items-center gap-2">
          <ListFilter className="h-5 w-5 text-muted-foreground" />
          <Select value={filter} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        {completedCount} of {totalCount} tasks completed
      </div>
    </div>
  )
}

