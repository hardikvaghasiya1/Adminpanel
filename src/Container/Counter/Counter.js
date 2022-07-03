import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementcounter, incrementcounter } from '../../Redux/Action/Counter.action';

function Counter(props) {
    const dispatch = useDispatch()
    const counter = useSelector(state => state.counter)
    const handleincrement = () => {
        dispatch(incrementcounter())
    }

    const handledecrement = () => {
        dispatch(decrementcounter())
    }
    return (
        <div>
            <button onClick={() => handleincrement()}>+</button>
            <p>{counter.counter}</p>        
            <button onClick={() => handledecrement()}>-</button>        
        </div>
    );
}

export default Counter;