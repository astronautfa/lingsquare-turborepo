import React from 'react'

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='flex justify-center items-center w-screen h-screen bg-background'>
      {children}
    </div>
  )
}

export default AuthLayout