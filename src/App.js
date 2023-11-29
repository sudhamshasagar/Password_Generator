import React, { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [ length, setLength] = useState(6);
  const [ numberAllowed, setNumberAllowed] = useState(false);
  const [ charAllowed, setCharAllowed] = useState(true);
  const [ password, setPassword] = useState('');

  const getPassword = useRef(null);

  const generatePassword = useCallback(()=>{

    let pass = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if(numberAllowed) characters += '0123456789';
    if(charAllowed) characters += '@$#_`&*!()^"?/|';


    for (let i = 0; i <= length; i++) {
      let str = Math.floor(Math.random()* characters.length + 1);
      pass += characters.charAt(str);
    }

    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(()=>{
    
    generatePassword();
  },[length, numberAllowed, charAllowed,generatePassword]);

  const copyToClipBoard = useCallback(()=>{
    getPassword.current?.select();
    window.navigator.clipboard.writeText(password);
  })

  return (
    <div className="w-full mx-auto max-w-md bg-slate-700 text-white mt-12  justify-center align-middle rounded px-10 py-4">
      <div className="flex shadow rounded-lg overflow-hidden mb-4 flex flex-col text-center justify-center align-middle">
        <h1 className="m-5">Password Generator</h1>
        <input type="text" 
          value={password} 
          className="w-full px-3 py-2 text-black" 
          placeholder="Password" 
          readOnly ref={getPassword}
        />
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0¹' 
          onClick={copyToClipBoard}> 
          Copy 
        </button>
      </div>
      <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" 
              min={6} 
              max={16} 
              value={length} 
              className='cursor-pointer' 
              onChange={(e)=> {setLength(e.target.value)}}
            />
            <label>Length: {length}</label> 
          </div>
      </div>
      <div className="flex items-center gap-x-1">
        <input type="checkbox" 
          defaultChecked={numberAllowed} 
          id="numberInput" 
          onChange={()=>{setNumberAllowed((prev)=>!prev);}}
        />
        <label>Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
        <input type="checkbox" 
          defaultChecked={charAllowed} 
          id="characterInput" 
          onChange={()=>{setCharAllowed((prev)=>!prev);}}
        />
        <label>Characters</label>
      </div>
    </div>
  );
}

export default App;
