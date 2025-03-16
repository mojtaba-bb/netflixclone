import React, { useState } from 'react'
import { useContentStore } from '../store/content'
import NavBar from '../components/NavBar'
import { Search } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { ORIGINAL_IMG_BASE_URL } from '../utils/constants'

function SearchPage() {
    const [activeTab , setActiveTab] = useState("movie")
    const [searchTerm, setSearchTerm] = useState("")
    const [results, setResults] = useState([])
    const {setContentType} = useContentStore();
    
    const handleTabClick = (tab) =>{
        setActiveTab(tab);
        tab === "movie" ? setContentType("movie") : setContentType("tv")
        setResults([])
    }
    const handleSearch = async (e)=>{
        e.preventDefault();
        try{
            const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`)
            setResults(res.data.content)
        }catch (error){
            if (error.response.status === 404) {
                toast.error("چیزی پیدا نشد، مطمئن شوید که در دسته‌بندی درست جستجو می‌کنید")
            }else{
                toast.error("خطایی رخ داده است، لطفاً بعداً دوباره تلاش کنید")
            }
        }

    }
    console.log("results " , results) 
  return (
    <div className='bg-black min-h-screen text-white'>
        <NavBar/>
        <div className='container mx-auto px-4 py-8'>
            <div className='flex justify-center gap-3 mb-4'>
                <button
                className={`py-2 px-4 rounded ${activeTab === "movie" ? "bg-red-600" : "bg-gray-600"} hover:bg-red-700 cursor-pointer`}
                onClick={()=>{handleTabClick("movie")}}
                >
                    فیلم ها
                </button>
                <button
                className={`py-2 px-4 rounded ${activeTab === "tv" ? "bg-red-600" : "bg-gray-600"} hover:bg-red-700 cursor-pointer`}
                onClick={()=>{handleTabClick("tv")}}
                >
                    برنامه‌های تلویزیونی
                </button>
                <button
                className={`py-2 px-4 rounded ${activeTab === "person" ? "bg-red-600" : "bg-gray-600"} hover:bg-red-700 cursor-pointer`}
                onClick={()=>{handleTabClick("person")}}
                >
                    اشخاص
                </button>
            </div>
            <form className='flex gap-2 items-stretch mb-8 max-w-2xl mx-auto' onSubmit={handleSearch}>
                <input type="text" 
                value={searchTerm}
                onChange={(e)=> setSearchTerm(e.target.value)}
                placeholder={`جستجو برای یک ${activeTab === "movie" ? "فیلم" : ""}${activeTab === "tv" ? "برنامه‌ تلویزیونی" : ""}${activeTab === "person" ? "شخص" : ""}`}
                className='w-full p-2 rounded bg-gray-800 text-white'
                />
                <button className='bg-red-600 hover:bg-red-700 cursor-pointer text-white p-2 rounded'>
                    <Search className='size-6'/>
                </button>
            </form>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {results.map((result)=>{
                    if (!result.poster_path && !result.profile_path) return null
                    return(
                        <div key={result.id} className='bg-gray-800 p-4 rounded'>
                            {activeTab === "person" ? (
                                <div  className='flex flex-col items-center'>
                                    <img src={ORIGINAL_IMG_BASE_URL+result.profile_path} alt={result.name} className='max-h-96 rounded mx-auto' />
                                    <h2 className='mt-2 text-xl font-bold'>{result.name}</h2>
                                </div>
                            ):(
                                <Link to={"/watch/"+ result.id} onClick={()=>{setContentType(activeTab)}} className='flex flex-col items-center'>
                                    <img src={ORIGINAL_IMG_BASE_URL+result.poster_path} alt={result.name || result.title} className='max-h-96 rounded mx-auto' />
                                    <h2 className='mt-2 text-xl font-bold'>{result.name || result.title}</h2>
                                </Link>
                            )
                            
                            }
                        </div>
                    )
                })}
            </div>
        </div>


    </div>
  )
}

export default SearchPage