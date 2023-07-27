const TaskCell = ({props}: any) => {
  const categories: any = {
    Shop: "task.svg",
    "Random Thought": "thought.svg",
    Gym: "gym.svg",
    Idea: "idea.svg",
  };
  
  return (
    <>
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
          id={props.id}
          className="task contentOfTask editZoom"
          data-modal="#modal_2"
        >
          {props.content.length > 30
            ? props.content.slice(0, 30) + "..."
            : props.content}
        </li>
        <li className="task dateTask">{props.date}</li>
        <li className="sidebar">
          <img
            className="sidebar__buttons"
            src="/img/archive.svg"
            id={props.id}
            alt="archive"
          />
          <img
            className="sidebar__buttons editZoom"
            data-modal="#modal_2"
            src="/img/pencil.svg"
            id={props.id}
            alt="pencil"
          />
          <img
            className="sidebar__buttons"
            src="./img/trash.svg"
            id={props.id}
            alt="trash"
          />
        </li>
      </ul>
    </>
  );
};

export default TaskCell;
