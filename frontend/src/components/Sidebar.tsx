import React from 'react'

interface Props {
    children: React.ReactNode
}

const Sidebar = ({children}: Props) => {
  return (
    <div className='w-60 bg-red-500 h-screen'>{children}</div>
  )
}

export default Sidebar