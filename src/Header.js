import React from 'react'

function Header({gotoFirstPage}) {
  return (
    <div className='header'>
        <img className='logo' src={process.env.REACT_APP_LOGO} alt='logo' />
        <button className='reset' onClick={gotoFirstPage} >Home</button>
    </div>
  )
}

export default Header