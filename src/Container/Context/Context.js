import React, { useContext } from 'react';
import { ThemeContext } from '../../Context/CreateContext';

function Context(props) {

    const theme = useContext(ThemeContext)
    console.log(theme.theme)
    return (
        <>
            <div>
                <button onClick={() => theme.toogle_theme(theme.theme)}>
                    Change Theme
                </button>
            </div>
            <div className={`${theme.theme}`}>
                <h4>UseContext</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae atque qui perferendis quaerat illum nihil aspernatur, totam placeat tempore nobis.</p>
            </div>
        </>
    );
}

export default Context;