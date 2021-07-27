import React from 'react'
import './Footer.css'
function Footer(props) {

    const {changePage,page}=props;

    return (
        <div className='btn-container'>
            <button className='btn' onClick={()=>{
               changePage(-5);
           }}>&lt;&lt; prev</button> 
           <button className='btn' onClick={()=>{
               changePage(-1);
           }}>&lt; prev</button> 
           <p>....  {page}  .....</p>
           <button className='btn' onClick={()=>{
               changePage(1);
           }}>next &gt;</button>
           <button className='btn' onClick={()=>{
               changePage(5);
           }}>next &gt;&gt;</button>
        </div>
    )
}

export default Footer
