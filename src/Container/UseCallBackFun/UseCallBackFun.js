import { TextField } from '@mui/material';
import React, { useCallback, useState } from 'react';
import Listitem from './Listitem';

function UseCallBackFun(props) {
    const [darktheme, setDarktheme] = useState(false)
    const [number, setNumber] = useState(0)

    const theme = {
        backgroundColor: darktheme ? '#000000' : '#ffffff',
        color: darktheme ? '#ffffff' : "#000000"
    }

    const getitem = useCallback((i)=>{
            console.log("Call");
            return [i+number, i+number+1, i+number+2]
        },[number]
    )
    return (
        <>
            <div style={theme}>
                <button type="submit" onClick={() => { setDarktheme(!darktheme)}}>ChangeTheme</button>
            </div>
            <div>
                <TextField type='text' placeholder='Enter A Number' onChange={(e)=>{setNumber(parseInt(e.target.value))}}></TextField>
                <Listitem getitem = {getitem}/>
            </div>

        </>
    );
}

export default UseCallBackFun;