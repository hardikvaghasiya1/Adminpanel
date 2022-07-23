import React, { useEffect, useState } from 'react';

function Listitem({getitem}) {
    const[item,setItem] =useState([])
    
    useEffect(() => {    
      setItem(getitem(0))
    }, [getitem])
    
    return (
        <div>
            {
                item.map((i)=>{
                    return(<p>{i}</p>)
                })
            }
        </div>
    );
}

export default Listitem; 