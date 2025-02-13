import { formatToString } from "../../../../../helpers/helper"
import { ITaskContentProps } from "../../../../../helpers/Task.types"
import { TaskDescription, TaskDetailContainer, TaskTitle, TimeLine } from "./taskModalStyled"

export const TaskContent: React.FC<ITaskContentProps>= ({ task, onClose })=>{
const {date, title, text, updatedAt, createdAt} =task
return(
    <TaskDetailContainer>
    <TaskTitle>{title}</TaskTitle>
    <p>Task Description:</p>
    <TaskDescription> {text}</TaskDescription>
    <TimeLine>Target Date: {formatToString(date)}</TimeLine>
    <TimeLine>Task Created: {formatToString(createdAt)}</TimeLine>
    <TimeLine>Task Updated: {formatToString(updatedAt)}</TimeLine>
    {/* <button onClick={onClose}>Close</button> */}
    </TaskDetailContainer>
)
}