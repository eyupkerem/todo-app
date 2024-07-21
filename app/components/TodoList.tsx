import { ITask } from "@/types/tasks"
import React from "react"
import Task from "./Task"

interface ToDoListProps{
  tasks:ITask[]
}

const TodoList:React.FC<ToDoListProps> = ({tasks}) => {
  return (
    <div className="overflow-x-auto">
  <table className="table ">
    <thead>
      <tr>
        <th>Task</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {tasks.map(task => (<Task task={task} key={task.id}/>))}
    </tbody>
  </table>
</div>
  )
}

export default TodoList