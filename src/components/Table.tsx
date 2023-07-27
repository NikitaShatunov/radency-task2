import { useAppSelector } from "../redux/redux";
import TaskCell from "./TaskCell";
import React from 'react';

const Table = () => {
    const tasks = useAppSelector((state) => state.tasks)
    React.useEffect(() => {
       
    }, [])
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
                <span className="sidebar__buttons__archive">Active</span>
                <img
                  data-title="Delete all"
                  className="sidebar__buttons__delete"
                  src="/img/trash.svg"
                  alt="trash"
                />
              </div>
            </div>
            <div className="list__items">
              <div className="list__items__main">
               {tasks.map((obj, id) => <div key={id}><TaskCell props={obj}/></div>)} 
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Table;
