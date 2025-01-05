import IconBar from '../components/IconBar'
import { Outlet } from 'react-router'
import { WebSocketProvider } from '../context/webSocketContext'

const Layout = () => {
  return (
    <WebSocketProvider>
      <div className='flex flex-row'>
          <IconBar />
          <Outlet />
      </div>
    </WebSocketProvider>
  )
}

export default Layout