import React from 'react'

const navbar = () => {
  return (
    <nav className='flex justify-between px-[6%] items-center text-white py-2.5 bg-[#2E2B77]'>
        <a href="/" className="name font-bold text-2xl cursor-pointer">iTask</a>
        <ul className="options flex gap-6 pr-5 max-[650px]:pr-1 items-center">
            <li className='font-medium cursor-pointer hover:underline max-[650px]:hidden'>Services</li>
            <li className='font-medium cursor-pointer hover:underline max-[650px]:hidden'>Projects</li>
            <li className='font-medium cursor-pointer hover:underline max-[650px]:hidden'>About</li>
            <li><button className='px-7 py-1.5 font-semibold hover:bg-opacity-85 active:bg-[#ED6A5A] bg-[#0088A9] rounded-full'>Contact</button></li>
        </ul>
    </nav>
  )
}

export default navbar