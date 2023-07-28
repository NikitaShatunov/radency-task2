import { useAppSelector } from "../redux/redux";
import * as React from "react";
import { calcSummaryTable } from "../utils/calcSummaryTable";
import { categories } from "./TaskCell";

const SummaryTable = () => {
  const items = useAppSelector((state) => state.tasks.items);
  const [archiveSum, setArchiveSum] = React.useState<Map<string, number> | undefined>();
  const [unarchiveSum, setUnArchiveSum] = React.useState<Map<string, number> | undefined>();
  const [allTasks, setAllTasks] = React.useState<string[] | undefined>();
  React.useEffect(() => {
    const { unarchive, archive, sumOfAll } = calcSummaryTable(items);
    setArchiveSum(archive);
    setUnArchiveSum(unarchive);
    setAllTasks(sumOfAll)
  }, [items]);
  React.useEffect(() => {
    
  }, [allTasks])
  return (
    <>
      <ul className="taskContainerSecond">
        {archiveSum && unarchiveSum && allTasks && allTasks.map((title: string, id: number) => (
          <div key={id} className="secondTableList">
            <li className="task">
              <img
                className="taskImg"
                src={`/img/${categories[title]}`}
                alt={title}
              />
              {title}
            </li>
            <li className="taskSecond">{unarchiveSum.get(title) || "0"}</li>
            <li className="taskSecond">{archiveSum.get(title) || "0"}</li>
          </div>
        ))}
      </ul>
    </>
  );
};

export default SummaryTable;
