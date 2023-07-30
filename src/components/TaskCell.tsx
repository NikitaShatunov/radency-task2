import { useAppDispatch } from "../redux/redux";
import { setCurrentEdit, setIsEdit } from "../redux/slices/modalSlice";
import { Item, deleteTask, setArchive } from "../redux/slices/tasksSlice";
import * as React from "react";

interface TasksCell {
  props: Item;
  isArchived: Boolean;
}
interface Categories {
  [key: string]: string;
}
export const categories: Categories = {
  'Shop': "task.svg",
  'Random Thought': "thought.svg",
  'Gym': "gym.svg",
  'Idea': "idea.svg",
};

const TaskCell = ({ props, isArchived }: TasksCell) => {
  const dispatch = useAppDispatch();

  const onClickDeleteTask = () => {
    if (window.confirm("Are you sure?")) dispatch(deleteTask(props.id));
  };
  const onClickEdit = () => {
    dispatch(setIsEdit(true));
    dispatch(setCurrentEdit(props.id));
  };

  React.useEffect(() => {}, []);
  return (
    <>
      {props.archived === isArchived && (
        <ul className="taskContainer">
          <li className="task">
            <img
              className="taskImg"
              src={`/img/${categories[props.category]}`}
              alt={props.category}
            />
            {props.name}
          </li>
          <li className="task">{props.created}</li>
          <li className="task">{props.category}</li>
          <li
            id={String(props.id)}
            className="task contentOfTask"
            onClick={() => onClickEdit()}
          >
            {props.content.length > 30
              ? props.content.slice(0, 30) + "..."
              : props.content}
          </li>
          <li className="task dateTask">{props.date}</li>
          <li className="sidebar">
            <img
              onClick={() => dispatch(setArchive(props.id))}
              className="sidebar__buttons"
              src="/img/archive.svg"
              id={String(props.id)}
              alt="archive"
            />
            <img
              className="sidebar__buttons editZoom"
              src="/img/pencil.svg"
              id={String(props.id)}
              onClick={() => onClickEdit()}
              alt="pencil"
            />
            <img
              className="sidebar__buttons"
              src="./img/trash.svg"
              id={String(props.id)}
              onClick={() => onClickDeleteTask()}
              alt="trash"
            />
          </li>
        </ul>
      )}
    </>
  );
};

export default TaskCell;
