import React from 'react'

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col space-y-2 bg-cb-dark-blue text-cb-white'>
      {children}
    </div>
  )
}
