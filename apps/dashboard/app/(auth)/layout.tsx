import React from 'react'

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='flex justify-center items-center w-screen h-screen sm:bg-zinc-100'>
      {children}
    </div>
  )
}

export default AuthLayout