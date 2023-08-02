import Table from "./components/Table";
import ModalWindow from "./components/ModalWindow";
import { useAppDispatch } from "./redux/redux";
import { setModalState } from "./redux/slices/modalSlice";
import Button from "./components/Button";

function App() {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setModalState(true))
  }
  return (
    <div className="select-none">
      <ModalWindow />
      <Table type="tasks" />
     <Button name="Create note" onClick={() => handleClick()}/>
      <Table type="sum" />
    </div>
  );
}

export default App;