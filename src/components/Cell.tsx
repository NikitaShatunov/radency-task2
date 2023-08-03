import { ReactNode } from "react";

interface Categories {
    [key: string]: string;
  }
  export const categories: Categories = {
    'Shop': "task.svg",
    'Random Thought': "thought.svg",
    'Gym': "gym.svg",
    'Idea': "idea.svg",
  };
  interface Cell {
    styles?: string,
    onClick?: () => void,
    children?: ReactNode,
    size?: 'small' | 'medium' | 'large'
  }
const Cell = ({styles, onClick, children, size} : Cell) => {
    const sizes = {
        'small': 'py-3',
        'medium': 'py-5 ',
        'large': 'py-6'
    }
  return <>
        <li onClick={() => onClick && onClick()} className={`flex items-center px-4 bg-[#adb6e6]/[0.2] mb-3 ${size ? sizes[size] : sizes['small']} ${styles || ''}`}>
           {children}
          </li>
    </>;
};

export default Cell;
