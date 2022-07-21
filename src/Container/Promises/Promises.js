import React from 'react';
import { useEffect } from 'react';

function Promises(props) {

    const one = () => {
        return "One";
    }
    const Two = () => {
        return "Two"

    }
    const Three = () => {
        return new Promise ((resolve, reject) => {
            setTimeout(() => {
               resolve("Three");
            }, 2000);   
           })
    }
    
    const Four = () => {
        return "Four";
    }


    const All = async() => {
        const o = one()
        console.log(o);

        const t = Two()
        console.log(t);

        const th = await Three()
        console.log(th);
        
        const f = Four()
        console.log(f);
    }

  const display = (z) => {
    console.log(z);
  }  

  const sum = () => {
    let a=30, b=14;
    let z;
    z=a+b;
    display(z)
  }
  sum(display)


    useEffect(()=>{
        All();
    },[])
    return (
        <div>
            
        </div>
    );
}

export default Promises;