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
          <div className="mx-4">
            <div
              className={`items-center grid text-center mb-3 mt-3 bg-neutral-300 rounded-lg h-10 lg:font-bold text-white text-lg ${
                type === "tasks"
                  ? "grid grid-cols-6"
                  : "grid grid-cols-3 gap-x-4 pt-1"
              }`}
            >
              {type === "tasks"
                ? headersFotTasksTable.map((label, id) => (
                    <div key={id}>{label}</div>
                  ))
                : headersFotSumTable.map((label, id) => (
                    <div key={id}>{label}</div>
                  ))}
              <div className="flex justify-center align-middle">
                {type === "tasks" && (
                  <>
                    <span
                      onClick={() => setIsArchived(!isArchived)}
                      className="hover:text-gray-400 cursor-pointer"
                    >
                      {isArchived ? "Archived" : "Active"}
                    </span>
                    <img
                      onClick={() => onClickClearTasks()}
                      data-title="Delete all"
                      className="ml-3 cursor-pointer"
                      src="/img/trash.svg"
                      alt="trash"
                    />
                  </>
                )}
              </div>
            </div>
            <div>
              <div>
                {type === "tasks" ? (
                  <>
                    {" "}
                    {items.map((obj, id) => (
                      <div key={id}>
                        <TaskCell isArchived={isArchived} props={obj} />
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <SummaryTable />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Table;
