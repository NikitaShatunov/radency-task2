import { createSlice  } from "@reduxjs/toolkit";


export type Item = {
  id: number | null;
  archived: Boolean;
  name: string;
  created: string;
  category: string;
  content: string;
  date: string;
};

interface InitialState {
  items: Item[];
  editTask: Item;
}

const initialState: InitialState = {
  editTask: {
    id: null,
    archived: false,
    name: "",
    created: "",
    category: "",
    content: "",
    date: "",
  },
  items: [
    {
      id: 0,
      archived: true,
      name: "Shopping list",
      created: "April 20, 2021",
      category: "Shop",
      content: "Tomato, milk, bread, oil, salt, flour, butter, meat.",
      date: "",
    },
    {
      id: 1,
      archived: false,
      name: "Random thought",
      created: "June 5, 2022",
      category: "Random Thought",
      content:
        "Life is like a box of chocolates; you never know what you're gonna get.",
      date: "",
    },
    {
      id: 2,
      archived: true,
      name: "Great idea",
      created: "January 15, 2023",
      category: "Random Thought",
      content:
        "A mobile app that helps people learn new languages through interactive games.",
      date: "",
    },
    {
      id: 3,
      archived: true,
      name: "Workout routine",
      created: "March 2, 2023",
      category: "Gym",
      content: "30 minutes of cardio, 20 minutes of strength training.",
      date: "",
    },
    {
      id: 4,
      archived: false,
      name: "Journal entry",
      created: "August 10, 2022",
      category: "Random Thought",
      content: "Today, I learned that the key to happiness is gratitude.",
      date: "",
    },
    {
      id: 5,
      archived: false,
      name: "Travel plans",
      created: "April 3, 2023",
      category: "Idea",
      content:
        "Start saving money for a trip to Japan next year from 12/10/2023",
      date: "12/10/2023",
    },
    {
      id: 6,
      archived: false,
      name: "Recipe",
      created: "July 12, 2023",
      category: "Idea",
      content:
        "Delicious chocolate chip cookie recipe: butter, sugar, eggs, flour, chocolate chips.",
      date: "",
    },
  ],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action) {
      state.items.push(action.payload);
    },
    deleteTask(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    setArchive(state, action) {
      state.items.forEach((obj) => {
        if (obj.id === action.payload) {
          obj.archived = !obj.archived;
        }
      });
    },
    clearTasks(state) {
      state.items = [];
    },
    editTask(state, action) {
      state.items.forEach((obj) => {
        if (obj.id === action.payload.id) {
          obj.content = action.payload.content;
          obj.name = action.payload.name;
          obj.date = action.payload.date;
        }
      });
    },
  },
});
export const { addTask, deleteTask, setArchive, clearTasks, editTask } =
  taskSlice.actions;
export default taskSlice.reducer;
