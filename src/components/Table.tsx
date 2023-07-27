import { useAppDispatch, useAppSelector } from "../redux/redux";
import { clearTasks } from "../redux/slices/tasksSlice";
import TaskCell from "./TaskCell";
import React from "react";

const Table = () => {
  const items = useAppSelector((state) => state.tasks.items);
  const [isArchived, setIsArchived] = React.useState(false);
  const dispatch = useAppDispatch();
  const onClickClearTasks = () => {
    if(window.confirm('Are you sure you want to delete all tasks?')) dispatch(clearTasks())
  }
  React.useEffect(() => {}, [items]);
  return (
    <>
      <div>
        <div>
          <div className="listWrapper">
            <div className="list__header">
              <div>Name</div>
              <div>Created</div>
              <div>Category</div>
              <div>Content</div>
              <div>Dates</div>
              <div className="sidebar__buttons__container">
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
              </div>
            </div>
            <div className="list__items">
              <div className="list__items__main">
                {items.map((obj, id) => (
                  <div key={id}>
                    <TaskCell isArchived={isArchived} props={obj} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Table;
