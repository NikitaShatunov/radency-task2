import * as React from "react";
import { useAppDispatch, useAppSelector } from "../redux/redux";
import { Item, addTask } from "../redux/slices/tasksSlice";
import { formatDate } from "../utils/formatDate";
import { dateValidator } from "../utils/dateValidator";
import { setModalState } from "../redux/slices/modalSlice";

const ModalWindow = () => {
  const isModalShown = useAppSelector((state) => state.modal.isModal);
  const dispatch = useAppDispatch();
  const refModal = React.useRef<HTMLDivElement>(null);
  const items = useAppSelector((state) => state.tasks.items);
  const [isWarning, setIsWarning] = React.useState(false);
  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState("Shop");
  const [content, setContent] = React.useState("");
  React.useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      let path = event.composedPath().includes(refModal.current as Node);
      if (path) {
        setIsWarning(false);
        dispatch(setModalState(false));
      }
    };
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }, [isModalShown]);
  const onClickSave = () => {
    if (name && content && category) {
      setIsWarning(false);
      dispatch(setModalState(false));
      const newItem: Item = {
        id: items.length ? items[items.length - 1].id + 1 : 0,
        name: name,
        archived: false,
        category: category,
        content: content,
        created: formatDate(),
        date: dateValidator(content),
      };
      dispatch(addTask(newItem));
    } else {
      setIsWarning(true);
    }
  };
  return (
    <div>
      <div
        id="modal_1"
        className={`modal__window ${isModalShown ? "show" : "hidden"}`}
      >
        <div className="modal__window__container">
          <h3 className="modal__window__container__header">Add task:</h3>
          <div className="modal__window__container__left">
            <label htmlFor="category">Choose category:</label>
            <br />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              name="category"
              id="category"
            >
              <option value="Shop">Shop</option>
              <option value="Random Thought">Random Thought</option>
              <option value="Gym">Gym</option>
              <option value="Idea">Idea</option>
            </select>
            <br />
            <label
              className="modal__window__container__labelOfTask"
              htmlFor="nameOfTask"
            >
              Name:
            </label>
            <br />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="nameOfTask"
              id="nameOfTask"
              type="text"
            />
            <br />
            <br />
            <span className={`warning ${isWarning ? "show" : "hidden"}`}>
              Fill in all fields
            </span>
          </div>
          <div className="modal__window__container__right">
            <label htmlFor="contentFirst">Content:</label>
            <br />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              name="contentFirst"
              id="content"
              cols={30}
              rows={10}
            ></textarea>
          </div>

          <a href="#" onClick={() => onClickSave()} className="modal__close">
            Save
          </a>
        </div>
      </div>

      <div
        ref={refModal}
        className={`modal__window__backdrop ${
          isModalShown ? "show" : "hidden"
        }`}
        id="modal-backdrop"
      ></div>
    </div>
  );
};

export default ModalWindow;
