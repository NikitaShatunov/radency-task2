import { useAppDispatch, useAppSelector } from "../redux/redux";
import { clearTasks } from "../redux/slices/tasksSlice";
import SummaryTable from "./SummaryTable";
import TaskCell from "./TaskCell";
import React from "react";

type Type = {
  type: string;
};

const headersFotTasksTable = [
  "Name",
  "Created",
  "Category",
  "Content",
  "Dates",
];
const headersFotSumTable = ["Note category", "Active", "Archived"];
//depending on the type we render different tables
const Table = ({ type }: Type) => {
  const items = useAppSelector((state) => state.tasks.items);
  const [isArchived, setIsArchived] = React.useState(false);
  const dispatch = useAppDispatch();
  const onClickClearTasks = () => {
    if (window.confirm("Are you sure you want to delete all tasks?"))
      dispatch(clearTasks());
  };
  React.useEffect(() => {}, [items]);
  return (
    <>
      <div>
        <div>
          <div className="listWrapper">
            <div
              className={`list__header ${type === "tasks" ? "tasks" : "sum"}`}
            >
              {type === "tasks"
                ? headersFotTasksTable.map((label, id) => (
                    <div key={id}>{label}</div>
                  ))
                : headersFotSumTable.map((label, id) => (
                    <div key={id}>{label}</div>
                  ))}
              <div className="sidebar__buttons__container">
                {type === "tasks" && (
                  <>
                    <span
                      onClick={() => setIsArchived(!isArchived)}
                      className="sidebar__buttons__archive"
                    >
                      {isArchived ? "Archived" : "Active"}
                    </span>
                    <img
                      onClick={() => onClickClearTasks()}
                      data-title="Delete all"
                      className="sidebar__buttons__delete"
                      src="/img/trash.svg"
                      alt="trash"
                    />
                  </>
                )}
              </div>
            </div>
            <div className="list__items">
              <div className="list__items__main">
              {type === 'tasks' ? <>  {items.map((obj, id) => (
                  <div key={id}>
                    <TaskCell isArchived={isArchived} props={obj} />
                  </div>
                ))}</> : <>
                <SummaryTable />
                </>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Table;
