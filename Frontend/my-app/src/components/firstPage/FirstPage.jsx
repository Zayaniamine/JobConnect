import React from 'react'
function FirstPage() {
  return (
    <div className=" bg-[url('header.jpg')]  hero min-h-screen" >
  <div className="hero-overlay bg-opacity-60"></div>

  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Welcome to JobConnect</h1>
      <h3 className="mb-5"><br/> your platform for creating and sharing CVs<br/> Explore job opportunities and connect with professionals!<br/>
Build your profile and start connecting.</h3>
      <button className="btn border-t-neutral-950">Our services</button>
    </div>
  </div>
</div>
  )
}

export default FirstPage