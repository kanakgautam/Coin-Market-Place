import React from 'react'
import './Header.css'

function Header(props) {

    const {handleChange}=props;
    return (
        <div className='coin-search'>
            <form>
                <input type='text' className='coin-input' placeholder='Search' onChange={(event)=>{
                    handleChange(event);
                }} />
            </form>
        </div>
    )
}

export default Header
