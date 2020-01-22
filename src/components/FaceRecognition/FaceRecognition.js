import React from 'react';
import './FaceRecognition.css';

const FaceRecognition=({imageUrl, box})=>{

    let allFaces=[];
    for(let i=0;i<box.length;i++){
        allFaces.push(<div className='bounding-box' style={{ top:box[i].topRow, right:box[i].rightCol, bottom:box[i].bottomRow, left:box[i].leftCol}} key={i}></div>)
    }
    console.log(allFaces)
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage'  alt='' src={imageUrl} width='500px' height='auto'/>
                {allFaces}
            </div>  
        </div>
    );
}
export default FaceRecognition;