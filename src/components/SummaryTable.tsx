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
    //get numbers of each field
    const { unarchive, archive, sumOfAll } = calcSummaryTable(items);
    setArchiveSum(archive);
    setUnArchiveSum(unarchive);
    setAllTasks(sumOfAll)
  }, [items]);
  return (
    <>
      <ul className="grid">
        {archiveSum && unarchiveSum && allTasks && allTasks.map((title: string, id: number) => (
          <div key={id} className="grid grid-cols-3">
            <li className="flex items-center bg-[#adb6e6]/[0.2] mb-3 py-3 pl-4">
              <img
                className="w-10 mr-4"
                src={`/img/${categories[title]}`}
                alt={title}
              />
              {title}
            </li>
            <li className="flex items-center justify-center bg-[#adb6e6]/[0.2] mb-3">{unarchiveSum.get(title) || "0"}</li>
            <li className="flex items-center justify-center bg-[#adb6e6]/[0.2] mb-3">{archiveSum.get(title) || "0"}</li>
          </div>
        ))}
      </ul>
    </>
  );
};

export default SummaryTable;
