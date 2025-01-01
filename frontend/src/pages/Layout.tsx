import Server from './Server'
import IconBar from '../components/IconBar'

const Layout = () => {
  return (
    <div className='flex flex-row'>
        <IconBar />
        <Server />
    </div>
  )
}

export default Layout