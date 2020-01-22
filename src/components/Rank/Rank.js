import React from 'react';
import './Rank.css';


const Rank=({name,entries,length})=>{
    return(
        <div>
            <div className='white f3'>
                {`${name} your entry count is...`}
            </div>
            <div className='white f1'>
                {entries}
            </div>'
            <div className='white f3'>
                The number of Faces are <p className='face-count'>{`${length}`}</p>
            </div>
        </div>
    );
}
export default Rank;