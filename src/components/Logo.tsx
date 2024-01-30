import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <Link href={'/'} className='font-bold text-3xl bg-gradient-to-r from-indigo-500 to-cyan-600 text-transparent bg-clip-text hover:cursor-pointer'>
     <Image 
     src={'/logo.png'}
     alt='mbc-logo'
     width={100}
     height={50}
     />
    </Link>
  )
}

export default Logo
