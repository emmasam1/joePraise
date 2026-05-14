// import Link from 'next/link'
// import React from 'react'
// import Image from 'next/image'

// const page = () => {
//   return (
//     <div className='flex gap-5 justify-center items-center flex-col bg-[#E8FFF7] h-screen'>
//          <h1 className="text-4xl font-extrabold text-center text-[#15BE87] tracking-tight">
//              Email Verification
//             </h1>

//             <Image src="/images/success_icon.png" width={200} height={200} alt="successIcon" className='my-5'/>

//             <p className='text-[#4A4A4A] text-2xl'>Congratulations</p>
//             <span className='text-[#4A4A4A] text-lg text-center tracking-wide'>Your email has been successfully<br/> verified.</span>

//             <Link href="/dashboard" className='text-[#15BE87] underline font-semibold'>Proceed to Dashboard</Link>
//     </div>
//   )
// }

// export default page

import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const page = () => {
  return (
    <div className='flex gap-5 justify-center items-center flex-col bg-[#E8FFF7] h-screen w-full font-sans'>
      <h1 className="text-4xl font-extrabold text-center text-[#15BE87] tracking-tight">
        Email Verification
      </h1>

      <Image 
        src="/images/success_icon.png" 
        width={200} 
        height={200} 
        alt="successIcon" 
        className='my-5 animate-bounce'
        priority
      />

      <p className='text-[#4A4A4A] text-2xl font-bold'>Congratulations</p>
      <span className='text-[#4A4A4A] text-lg text-center tracking-wide'>
        Your email has been successfully<br/> verified.
      </span>

      <Link href="/dashboard" className='text-[#15BE87] underline font-semibold text-lg hover:text-[#0f9468] transition-colors mt-4'>
        Proceed to Dashboard
      </Link>
    </div>
  )
}

export default page;