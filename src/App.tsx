import "./App.scss";
import Table from "./components/Table";
import ModalWindow from "./components/ModalWindow";
import { useAppDispatch } from "./redux/redux";
import { setModalState } from "./redux/slices/modalSlice";

function App() {
  const dispatch = useAppDispatch();
  return (
    <div className="App">
      <ModalWindow />
      <Table type="tasks" />
      <button
        id={"createButton"}
        onClick={() => dispatch(setModalState(true))}
        className="CreateButton"
      >
        Create note
      </button>
      <Table type="sum" />
    </div>
  );
}

export default App;