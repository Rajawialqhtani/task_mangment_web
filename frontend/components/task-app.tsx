"use client"

import { TasksProvider } from "@/context/tasks-context"
import TaskHeader from "./task-header"
import TaskList from "./task-list"
import TaskForm from "./task-form"

export default function TaskApp() {
  return (
    <TasksProvider>
      <div className="max-w-3xl mx-auto space-y-6">
        <TaskHeader />
        <TaskForm />
        <TaskList />
      </div>
    </TasksProvider>
  )
}

