import * as React from 'react';

const Button = React.memo(({name, onClick}: any) => {
    return <> <button
    id={"createButton"}
    onClick={() => onClick()}
    className="p-1 bg-slate-300 ml-4 rounded-xl font-medium hover:bg-slate-400"
  >
    {name}
  </button></>;
})
 
export default Button;