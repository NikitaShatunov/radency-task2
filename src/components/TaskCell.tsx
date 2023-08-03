import { useAppDispatch } from "../redux/redux";
import { setCurrentEdit, setIsEdit } from "../redux/slices/modalSlice";
import { Item, deleteTask, setArchive } from "../redux/slices/tasksSlice";
import Cell from "./Cell";

interface TasksCell {
  props: Item;
  isArchived: Boolean;
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
}
interface Categories {
  [key: string]: string;
}
export const categories: Categories = {
  Shop: "task.svg",
  "Random Thought": "thought.svg",
  Gym: "gym.svg",
  Idea: "idea.svg",
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

  return (
    <>
      {props.archived === isArchived && (
        <ul className="grid grid-cols-6">
          <Cell>
            {" "}
            <img
              className="w-10 mr-4"
              src={`/img/${categories[props.category]}`}
              alt={props.category}
            />
            {props.category}
          </Cell>
          <Cell>{props.created}</Cell>
          <Cell>{props.category}</Cell>
          <Cell
            styles={"cursor-zoom-in hover:text-sky-400"}
            onClick={() => onClickEdit()}
          >
            {props.content.length > 30
              ? props.content.slice(0, 30) + "..."
              : props.content}
          </Cell>
          <Cell styles={"justify-center"}>{props.date}</Cell>
          <Cell styles={"justify-center"}>
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
          </Cell>
        </ul>
      )}
    </>
  );
};

export default TaskCell;
