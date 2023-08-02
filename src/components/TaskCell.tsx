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
        <ul className="grid grid-cols-6">
          <li className="flex items-center pl-4 bg-[#adb6e6]/[0.2] mb-3 py-3">
            <img
              className="w-10 mr-4"
              src={`/img/${categories[props.category]}`}
              alt={props.category}
            />
            {props.name}
          </li>
          <li className="flex items-center bg-[#adb6e6]/[0.2] mb-3">{props.created}</li>
          <li className="flex items-center bg-[#adb6e6]/[0.2] mb-3">{props.category}</li>
          <li
            id={String(props.id)}
            className="flex items-center bg-[#adb6e6]/[0.2] mb-3 cursor-zoom-in hover:font-semibold"
            onClick={() => onClickEdit()}
          >
            {props.content.length > 30
              ? props.content.slice(0, 30) + "..."
              : props.content}
          </li>
          <li className="flex items-center justify-center bg-[#adb6e6]/[0.2] mb-3">{props.date}</li>
          <li className="flex justify-center bg-[#adb6e6]/[0.2] mb-3">
            <img
              onClick={() => dispatch(setArchive(props.id))}
              className="w-6 mr-4 cursor-pointer"
              src="/img/archive.svg"
              id={String(props.id)}
              alt="archive"
            />
            <img
              className="w-6 editZoom mr-4 cursor-pointer"
              src="/img/pencil.svg"
              id={String(props.id)}
              onClick={() => onClickEdit()}
              alt="pencil"
            />
            <img
              className="w-6 cursor-pointer"
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
