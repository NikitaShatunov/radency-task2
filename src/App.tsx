import React from "react";
import "./App.scss";
import Table from "./components/Table";
import ModalWindow from "./components/ModalWindow";
import { useAppDispatch } from "./redux/redux";
import EditModalWindow from "./components/EditModalWindow";
import { setModalState } from "./redux/slices/modalSlice";

function App() {
  const dispatch = useAppDispatch();
  return (
    <div className="App">
      <ModalWindow />
      {/* <EditModalWindow /> */}
      <Table />
      <button
        id={"createButton"}
        onClick={() => dispatch(setModalState(true))}
        className="CreateButton"
      >
        Create note
      </button>
    </div>
  );
}

export default App;
