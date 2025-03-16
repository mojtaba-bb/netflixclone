import React, { useState } from 'react'
import NavBar from '../../components/NavBar'
import { Link } from 'react-router-dom'
import { Info, Play } from 'lucide-react'
import useGetTrendingContent from '../../hooks/useGetTrendingContent'
import { ORIGINAL_IMG_BASE_URL } from '../../utils/constants'
import { useContentStore } from '../../store/content'
import MovieSlider from '../../components/MovieSlider'
import {MOVIE_CATEGORIES , TV_CATEGORIES} from '../../utils/constants'


function HomeScreen() {
  const {trendingContent} = useGetTrendingContent();
  const {contentType} =   useContentStore();
  const [imgLoading, setImgLoading] = useState(true)
  
  if(!trendingContent)return(
    <div className='h-screen text-white relative'>
      <NavBar/>
        <div
        className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center -z-10 shimmer'
        />
    </div>
  )
  return (
    <>
      <div className='realative h-screen text-white'>
        <NavBar/>
        {imgLoading && (        
        <div
        className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center -z-10 shimmer'
        />)}
        <img src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path} onLoad={()=>{setImgLoading(false)}} alt="Hero img" className='absolute  top-0 left-0 w-full h-full object-cover -z-50'/>
        <div className='absolute top-0 left-0 w-full h-full bg-black/50 -z-50'  aria-hidden='true'/>
        <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32'>
          <div className='bg-gradient-to-b from-black via-transparent absolute w-full h-full top-0 left-0 -z-10' /> 
          <div className='max-w-2xl '>
            <h1 className='mt-4 text-6xl font-extrabold text-balance'>
              {trendingContent?.name || trendingContent?.title}
            </h1>
            <p className='mt-6 text-lg'>
              {trendingContent?.release_date?.split("-")["0"] || trendingContent?.first_air_date?.split("-")["0"]} | {trendingContent?.adult ?"18+" : "13+"}
            </p>
            <p className='mt-4 text-lg'>
              {trendingContent?.overview.length > 200
                ? trendingContent?.overview.slice(0,200) + " ... "
                : trendingContent?.overview}
            </p>
          </div>
          <div className=' mt-8 flex'>
            <Link to={`/watch/${trendingContent?.id}`} className='bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded  flex items-center'>
            <Play className='size-6  ml-2 fill-black'/>
            پخش
            </Link>

            <Link to={`/watch/${trendingContent?.id}`} className='bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded mr-4 flex items-center '>
            <Info className='size-6  ml-2 '/>
            اطلاعات بیشتر
            </Link>

          </div>
        </div>
      </div>
      <div className='flex flex-col gap-10 py-10 bg-black '>
        {contentType === "movie" ? (
          MOVIE_CATEGORIES.map((category)=><MovieSlider key={category} category={category}/>)
        ) : (
          TV_CATEGORIES.map((category)=><MovieSlider key={category} category={category}/>)
        )}

      </div>
    </>
  )
}

export default HomeScreen