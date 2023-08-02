import "../styles/tailwind.css"
interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick: () => void;
}


const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  onClick,
}: ButtonProps) => {
  const mode = primary ? ' bg-slate-300' : ' bg-white border-2';
  const sizes = {
    'small': 'p-1',
    'medium': 'p-2 text-xl font-semibold',
    'large': 'p-3 text-2xl font-bold'
  }
  return (
    <button
      type="button"
      className={`ml-4 rounded-xl px-2 hover:bg-slate-400 ${mode} ${sizes[size]}`}
      style={{ backgroundColor }}
      onClick={() => onClick()}
    >
      {label}
    </button>
  );
};
export default Button