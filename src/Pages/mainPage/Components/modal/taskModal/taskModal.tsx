import { ITaskContentProps } from "../../../../../helpers/Task.types"

export const TaskContent: React.FC<ITaskContentProps>= ({ task, onClose })=>{
const {date, title, text, updatedAt, createdAt} =task
return(
    <div>
    <p>Task Name: {title}</p>
    <p>Task Description: {text}</p>
    <p>Target Date: {date}</p>
    <p>Task Created: {createdAt}</p>
    <p>Task Updated: {updatedAt}</p>
    <button onClick={onClose}>Close</button>
    </div>
)
}