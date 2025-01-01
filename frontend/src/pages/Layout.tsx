import IconBar from '../components/IconBar'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <div className='flex flex-row'>
        <IconBar />
        <Outlet />
    </div>
  )
}

export default Layout