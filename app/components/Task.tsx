'use client'

import { ITask } from "@/types/tasks"
import { FormEventHandler, useState } from "react"
import { FiEdit, FiTrash2 } from "react-icons/fi"
import { Modal } from "./Modal"
import { useRouter } from "next/navigation"
import { deleteTodo, editTodo } from "@/api"

interface TaskProps {
    task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
    const router = useRouter();
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDeleted,setOpenModalDeleted] = useState<boolean>(false)
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
         await editTodo({
           id : task.id ,
           text : taskToEdit
         });
        setTaskToEdit("");
        setOpenModalEdit(false);
        router.refresh();
    };

    const handleDeleteTask = async(id : string) =>{
      await deleteTodo(id);
      setOpenModalDeleted(false);
      router.refresh;
    }



    return (
        <tr key={task.id}>
            <td className="w-full">{task.text}</td>
            <td className="flex gap-5">
                <FiEdit size={20} className="text-blue-600" cursor="pointer" onClick={() => setOpenModalEdit(true)} />
                <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                    <form onSubmit={handleSubmitEditTodo}>
                        <h3 className="font-bold text-lg">Edit Task</h3>
                        <div className="modal-action">
                            <input
                                type="text"
                                placeholder="Edit Task"
                                onChange={e => setTaskToEdit(e.target.value)}
                                value={taskToEdit}
                                className="input input-bordered w-full"
                            />
                            <button className="btn" type="submit">Submit</button>
                        </div>
                    </form>
                </Modal>
                <FiTrash2 size={20} className="text-red-600" cursor="pointer" onClick={()=>setOpenModalDeleted(true)} />
                <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
                  
                  <h3 className="text-lg">Are you sure want to delete ?</h3>
                  <div className="modal-action">
                    <button onClick={()=>handleDeleteTask(task.id)} >Yes</button>
                  </div>
                    
                </Modal>
            </td>
        </tr>
    )
}

export default Task;
