import React, { useRef } from 'react'

function Header() {
  const buttonRef = useRef(null)

  const handleScroll = () => {
    const buttonElement = buttonRef.current
    buttonElement.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    
    <div className="bg-[url('header.jpg')]   hero min-h-[74vh] sticky" >
      <div className="hero-overlay bg-opacity-60"></div>

      <div className="hero-content text-center text-neutral-content">
        <div className="w-auto">
          <h1 className="mb-5 text-5xl font-bold">BUILD YOUR CV PROFILE <br/> AND CONNECT WITH EMPLOYERS.</h1>
          <h3 className="mb-5 font-semibold"> Explore job opportunities and connect with professionals!<br/>
Build your profile and start connecting.</h3>
          <button ref={buttonRef} className="btn border-t-neutral-950" onClick={handleScroll}>learn more</button>
        </div>
      </div>

    </div>
  )
}

export default Header