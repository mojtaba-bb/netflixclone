import { LogOut, Menu, Search } from 'lucide-react'
import {React, useState} from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authUser'
import { useContentStore } from '../store/content'

function NavBar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const {user , logout} = useAuthStore()
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
    const {contentType, setContentType}  = useContentStore()
    
    
  return (
    <header className='flex flex-row-reverse items-center justify-between p-4 max-w-6xl mx-auto flex-wrap h-20'>
        <div className='flex flex-row-reverse items-center gap-10 z-50'>
            <Link to='/'>
                <img src='/media/netflix-logo.png' alt='netflix logo' className='w-32 md:w-40' />
            </Link>
            
            {/* desktop navbar items */}
            <div className='hidden sm:flex sm:flex-row-reverse items-center gap-5'>
                <Link to='/' className='hover:underline' onClick={()=>{setContentType("movie")}}>فیلم ها</Link>
                <Link to='/' className='hover:underline' onClick={()=>{setContentType("tv")}}>برنامه‌های تلویزیونی</Link>
                <Link to='/history' className='hover:underline'>تاریخچه جستجو</Link>

            </div>
        </div>


        <div className='flex flex-row-reverse items-center gap-4 z-50'>
            <Link to={"/search"}>
                <Search className='text-white size-6 cursor-pointer'  />
            </Link>
            <img src={user.image} alt="آواتار" className="h-8 rounded cursor-pointer" />
            <LogOut className='size-6 cursor-pointer' onClick={logout} />
            <div className="sm:hidden">
                <Menu className='size-6 cursor-pointer' onClick={toggleMobileMenu} />
            </div>
        </div>
        {/* mobile navbar items */}
        {isMobileMenuOpen && (
            <div className='w-full sm:hidden mt-4 z-50 bg-black border border-gray-800 rounded'>
                <Link to='/' className='block hover:underline p-2' onClick={toggleMobileMenu}>فیلم ها</Link>
                <Link to='/' className='block hover:underline p-2' onClick={toggleMobileMenu}>برنامه‌های تلویزیونی</Link>
                <Link to='/history' className='block hover:underline p-2' onClick={toggleMobileMenu}>تاریخچه جستجو</Link>
            </div>
        )}

    </header>
  )
}

export default NavBar