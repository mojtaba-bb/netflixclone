import React from 'react'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className='min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white'
        style={{backgroundImage:`url('/media/404.png')`}}
    >
        <header className='absolute top-0 left-0 p-4 bg-black w-full'>
            <Link to='/'>
                <img src='/media/netflix-logo.png' alt='netflix logo' className='w-32 md:w-40' />
            </Link>
        </header>
        <main className='text-center error-page--content z-10'>
            <h1 className='text-7xl font-semibold mb-4'>راهتان را گم کرده‌اید؟</h1>
            <p className='mb-6 text-xl'>
                متأسفیم، نمی‌توانیم این صفحه را پیدا کنیم. در صفحه اصلی چیزهای زیادی برای کاوش خواهید یافت.
            </p>
            <Link to='/' className='bg-white text-black py-2 px-4 rounded font-bold text-xl'>
                صفحه اصلی نتفلیکس
            </Link>
        </main>

    </div>
  )
}

export default NotFoundPage