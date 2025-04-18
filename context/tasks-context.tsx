"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"
import type { Task } from "@/types/task"

// Define action types
type TaskAction =
  | { type: "added"; text: string }
  | { type: "edited"; id: string; text: string }
  | { type: "toggled"; id: string }
  | { type: "deleted"; id: string }
  | { type: "filter"; filter: string }

// Define context type
interface TasksContextType {
  tasks: Task[]
  filter: string
  dispatch: React.Dispatch<TaskAction>
}

// Create context
const TasksContext = createContext<TasksContextType | undefined>(undefined)

// Sample initial tasks
const initialTasks: Task[] = [
  { id: "1", text: "Learn React", completed: true },
  { id: "2", text: "Build a task app", completed: false },
  { id: "3", text: "Deploy to production", completed: false },
]

// Reducer function
function tasksReducer(state: { tasks: Task[]; filter: string }, action: TaskAction) {
  switch (action.type) {
    case "added": {
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: crypto.randomUUID(),
            text: action.text,
            completed: false,
          },
        ],
      }
    }
    case "edited": {
      return {
        ...state,
        tasks: state.tasks.map((task) => (task.id === action.id ? { ...task, text: action.text } : task)),
      }
    }
    case "toggled": {
      return {
        ...state,
        tasks: state.tasks.map((task) => (task.id === action.id ? { ...task, completed: !task.completed } : task)),
      }
    }
    case "deleted": {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.id),
      }
    }
    case "filter": {
      return {
        ...state,
        filter: action.filter,
      }
    }
    default: {
      return state
    }
  }
}

// Provider component
export function TasksProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(tasksReducer, {
    tasks: initialTasks,
    filter: "all",
  })

  return (
    <TasksContext.Provider value={{ tasks: state.tasks, filter: state.filter, dispatch }}>
      {children}
    </TasksContext.Provider>
  )
}

// Custom hook to use the context
export function useTasksContext() {
  const context = useContext(TasksContext)
  if (context === undefined) {
    throw new Error("useTasksContext must be used within a TasksProvider")
  }
  return context
}

