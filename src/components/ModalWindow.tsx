import * as React from "react";
import { useAppDispatch, useAppSelector } from "../redux/redux";
import { Item, addTask, editTask } from "../redux/slices/tasksSlice";
import { formatDate } from "../utils/formatDate";
import { dateValidator } from "../utils/dateValidator";
import { setIsEdit, setModalState } from "../redux/slices/modalSlice";
import Button from "./Button";

interface EditItem {
  id: number;
  name: string;
  content: string;
  date: string;
}

const ModalWindow = () => {
  const isModalShown = useAppSelector((state) => state.modal.isModal);
  const isEditShown = useAppSelector((state) => state.modal.isEdit);
  const currentId = useAppSelector((state) => state.modal.currentEdit);
  const dispatch = useAppDispatch();
  //ref indicates that we click out of modal window
  const refModal = React.useRef<HTMLDivElement>(null);
  const items = useAppSelector((state) => state.tasks.items);
  const [isWarning, setIsWarning] = React.useState(false);
  //states for modalWindow create
  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState("Shop");
  const [content, setContent] = React.useState("");
  //states for modalWindow edit
  const [editName, setEditName] = React.useState("");
  const [editContent, setEditContent] = React.useState("");
  const [editItem, setEditItem] = React.useState<Item | null>(null);

  React.useEffect(() => {
    //define the edit element
    setEditItem(items.filter((obj) => obj.id === currentId)[0]);
    if (editItem) {
      setEditContent(editItem.content);
      setEditName(editItem.name);
    }
  }, [currentId, editItem, isEditShown]);
  React.useEffect(() => {
    setContent("");
    setName("");
    //if we click out of modalWindow it will be closed
    const clickOutside = (event: MouseEvent) => {
      let path = event.composedPath().includes(refModal.current as Node);
      if (path) {
        setIsWarning(false);
        dispatch(setModalState(false));
        dispatch(setIsEdit(false));
      }
    };
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }, [isModalShown, isEditShown]);
  const onClickSave = () => {
    //if we open modalWindow to create new task
    if (isModalShown) {
      if (name && content && category) {
        setIsWarning(false);
        dispatch(setModalState(false));
        dispatch(setIsEdit(false));
        //create new task and push it
        const newItem: Item = {
          id: items.length ? (items[items.length - 1].id || 0) + 1 : 0,
          name: name,
          archived: false,
          category: category,
          content: content,
          //function get current date
          created: formatDate(),
          //get dates if the are
          date: dateValidator(content),
        };
        dispatch(addTask(newItem));
      } else {
        setIsWarning(true);
      }
    }
    //if we open modalWindow to edit task
    if (isEditShown) {
      if (editContent && editName && currentId) {
        setIsWarning(false);
        dispatch(setModalState(false));
        dispatch(setIsEdit(false));
        //only editable fields are changed
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
    if (isModalShown) setName(value);
    if (isEditShown) setEditName(value);
  };
  const onChangeContent = (value: string) => {
    if (isModalShown) setContent(value);
    if (isEditShown) setEditContent(value);
  };
  return (
    <div>
      <div
        className={`fixed top-1/3 h-72 rounded-xl left-1/3 z-50 visible bg-white w-2/6 drop-shadow-lg ${
          isModalShown || isEditShown ? "visible" : "invisible"
        }`}
      >
        <div className="flex p-4 mt-6">
         <div className="w-1/2">
         <h3 className="font-bold">
            {isModalShown ? "Add task:" : editItem?.category}
          </h3>
          <div className="mt-4 ">
            {isModalShown && <label htmlFor="category">Choose category:</label>}
      
            {isModalShown && (
              <select
              className="border mt-2"
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
            )}
            <div className="mt-4"><label
              htmlFor="nameOfTask"
            >
              Name:
            </label></div>

            <input
            className="mt-2 border pl-2"
              value={isModalShown ? name : editName}
              onChange={(e) => onChangeName(e.target.value)}
              name="nameOfTask"
              id="nameOfTask"
              type="text"
            />
            {isEditShown && (
              <div style={{ marginTop: "14px" }}>{editItem?.created}</div>
            )}
            <div className={`text-red-600 ${isWarning ? "show" : "invisible"}`}>
              Fill in all fields
            </div>
          </div>
         </div>
          <div className="ml-7">
            <label htmlFor="contentFirst">Content:</label>
            <br />
            <textarea
            className="border h-32 p-2 w-11/12"
              value={isModalShown ? content : editContent}
              onChange={(e) => onChangeContent(e.target.value)}
              name="contentFirst"
              id="content"
              cols={30}
              rows={10}
            ></textarea>
          </div>

          <div className="fixed bottom-3 right-1/2 ">
            <Button label="Save" size="small" onClick={() => onClickSave()} />
          </div>
        </div>
      </div>
      <div
        ref={refModal}
        className={`fixed top-0 left-0 w-screen h-screen bg-black/25 ${
          isModalShown || isEditShown ? "show" : "invisible"
        }`}
        id="modal-backdrop"
      ></div>
    </div>
  );
};

export default ModalWindow;
