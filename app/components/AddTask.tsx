'use client';
import { FaPlus } from "react-icons/fa"
import { Modal } from "./Modal"
import { FormEventHandler, useState } from "react"
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import {v4 as uuidv4} from 'uuid';

const AddTask = () => {
  const router = useRouter();
  const [modalOpen,setModalOpen] = useState<boolean>(false);
  const [newTaskValue,setNewTaskValue] = useState<string>("");

  const handleSubmitNewTodo:FormEventHandler<HTMLFormElement> = async (e)=>{
    e.preventDefault();
    await addTodo({
      id : uuidv4() ,
      text : newTaskValue
    });
    setNewTaskValue("");
    setModalOpen(false);
    router.refresh();
  }

  
  


  return (
    <div>
        <button className="btn btn-primary w-full" onClick={()=>setModalOpen(!modalOpen)} >
            ADD NEW TASK <FaPlus size={13} />
        </button>

        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <form onSubmit={handleSubmitNewTodo}>
            <h3 className="font-bold text-lg">Add new Task</h3>
            <div className="modal-action">
            <input
              type="text"
              placeholder="Add todo"
              onChange={e=> setNewTaskValue(e.target.value)}
              value={newTaskValue}
              className="input input-bordered  w-full " 
              />
              <button className="btn" type="submit">Submit</button>
            </div>
          </form>
        </Modal>
    </div>
  )
}

export default AddTask