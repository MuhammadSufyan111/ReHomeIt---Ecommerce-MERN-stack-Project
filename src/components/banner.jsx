import React from 'react'
import banner1 from '/images/banners/banner3.jpg'

const Banner = () => {
    return (
        <>
            <div className='md:w-[80%]  w-[100%]  m-auto border-amber-700 mt-3'><img src={banner1} alt="" className='w-[100%] border-amber-200 h-[420px] object-cover md:rounded-2xl'/></div>
            
        </>
    )
}

export default Banner