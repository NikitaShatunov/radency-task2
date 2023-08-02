import Table from "./components/Table";
import ModalWindow from "./components/ModalWindow";
import { useAppDispatch } from "./redux/redux";
import { setModalState } from "./redux/slices/modalSlice";

function App() {
  const dispatch = useAppDispatch();
  return (
    <div className="select-none">
      <ModalWindow />
      <Table type="tasks" />
      <button
        id={"createButton"}
        onClick={() => dispatch(setModalState(true))}
        className="p-3 bg-slate-300 ml-4 rounded-xl font-medium hover:bg-slate-400"
      >
        Create note
      </button>
      <Table type="sum" />
    </div>
  );
}

export default App;