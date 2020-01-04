import React from 'react';
import './ImageLinkedForm.css';

const ImageLinkedForm= ()=>{
    return(
        <div>
            <p className='f3'>{'This is a Face reconition app give it a try!'}</p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='text'/>
                    <button style={{backgroundColor:'rgb(99, 132, 156)'}} className='w-30 grow f4 link ph3 pv2 dib white'>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkedForm;