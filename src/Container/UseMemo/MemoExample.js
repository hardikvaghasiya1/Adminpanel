import React, { useMemo, useState } from 'react';

function MemoExample(props) {

    const[number, setNumber] = useState(0);
    const[counter, setCounter] = useState(0);
    
    const factorial = (n) => {
        console.log("call");
        if (n > 1) {
            return n * factorial(n-1);
        }
        else{
            return 1;
        }
    }

    const result = useMemo(() => factorial(number), [number]);


    return (
        <div>
            <input type="text" placeholder="Enter Digit" onChange={(e)=>{setNumber(e.target.value)}}/>
            <button type="submit" onClick={()=>{setCounter(counter+1)}}>Counter</button>
            <p>Counter Value:-{counter}</p>
            <p>factorial Value:-{result}</p>
        </div>
    );
}

export default MemoExample;