import * as React from "react";
import { useAppDispatch, useAppSelector } from "../redux/redux";
import { Item, addTask, editTask } from "../redux/slices/tasksSlice";
import { formatDate } from "../utils/formatDate";
import { dateValidator } from "../utils/dateValidator";
import { setIsEdit, setModalState } from "../redux/slices/modalSlice";

interface EditItem {
  id: number,
  name: string,
  content: string,
  date: string,
}

const ModalWindow = () => {
  const isModalShown = useAppSelector((state) => state.modal.isModal);
  const isEditShown = useAppSelector((state) => state.modal.isEdit)
  const currentId = useAppSelector((state) => state.modal.currentEdit)
  const dispatch = useAppDispatch();
  const refModal = React.useRef<HTMLDivElement>(null);
  const items = useAppSelector((state) => state.tasks.items);
  const [isWarning, setIsWarning] = React.useState(false);
  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState("Shop");
  const [content, setContent] = React.useState("");

  const [editName, setEditName] = React.useState("");
  const [editContent, setEditContent] = React.useState("");

  const [editItem, setEditItem] = React.useState<Item | null>(null)

  React.useEffect(() => {
    setEditItem(items.filter(obj => obj.id === currentId)[0])
    if(editItem) {
      setEditContent(editItem.content)
      setEditName(editItem.name)
    }
  }, [currentId, editItem, isEditShown])
  React.useEffect(() => {
    setContent('')
    setName('')
    const clickOutside = (event: MouseEvent) => {
      let path = event.composedPath().includes(refModal.current as Node);
      if (path) {
        setIsWarning(false);
        dispatch(setModalState(false));
        dispatch(setIsEdit(false))
      }
    };
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }, [isModalShown, isEditShown]);
  const onClickSave = () => {
    if(isModalShown) {
      if (name && content && category) {
        setIsWarning(false);
        dispatch(setModalState(false));
        dispatch(setIsEdit(false))
        const newItem: Item = {
          id: items.length ? (items[items.length - 1].id || 0 )+ 1 : 0,
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
    }
    if(isEditShown) {
      if (editContent && editName && currentId) {
        setIsWarning(false);
        dispatch(setModalState(false));
        dispatch(setIsEdit(false))
        const editItem: EditItem = {
          id: currentId,
          name: editName,
          content: editContent,
          date: dateValidator(editContent),
        };
        dispatch(editTask(editItem));
      } else {
        setIsWarning(true);
      }
    }
  };
  const onChangeName = (value: string) => {
    if(isModalShown) setName(value)
    if(isEditShown) setEditName(value)
  }
  const onChangeContent = (value: string) => {
    if(isModalShown) setContent(value)
    if(isEditShown) setEditContent(value)
  }
  return (
    <div>
      <div
        id="modal_1"
        className={`modal__window ${isModalShown || isEditShown ? "show" : "hidden"}`}
      >
        <div className="modal__window__container">
          <h3 className="modal__window__container__header">{isModalShown ? "Add task:" : editItem?.category}</h3>
          <div className="modal__window__container__left">
            {isModalShown && <label htmlFor="category">Choose category:</label>}
            <br />
            {isModalShown && <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              name="category"
              id="category"
            >
              <option value="Shop">Shop</option>
              <option value="Random Thought">Random Thought</option>
              <option value="Gym">Gym</option>
              <option value="Idea">Idea</option>
            </select> }
            
            <br />
            <label
              className="modal__window__container__labelOfTask"
              htmlFor="nameOfTask"
            >
             Name:
            </label>
  
            <br />
            <input
              value={isModalShown ? name : editName}
              onChange={(e) => onChangeName(e.target.value)}
              name="nameOfTask"
              id="nameOfTask"
              type="text"
            />
            {isEditShown  && <div style={{marginTop: "14px"}}>{editItem?.created}</div>}
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
              value={isModalShown ? content : editContent}
              onChange={(e) => onChangeContent(e.target.value)}
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
          isModalShown || isEditShown ? "show" : "hidden"
        }`}
        id="modal-backdrop"
      ></div>
    </div>
  );
};

export default ModalWindow;
