import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import axios from "axios";
import NavBar from "../components/NavBar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from 'react-player'
import {ORIGINAL_IMG_BASE_URL , SMALL_IMG_BASE_URL} from '../utils/constants.js'
import { formatReleaseDate } from "../utils/dateFunction.js";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton.jsx";


function WatchPage() {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [contentDetails, setContentDetails] = useState({});
  const [similarContent, setSimilarContent] = useState([]);
  const { contentType } = useContentStore();
  const sliderRef= useRef(null);

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`, {
          withCredentials: true,
        });
        setTrailers(res.data.trailer);
      } catch (error) {
        if (error.message.includes("404")) {
          setTrailers([]);
        }
      }
    };
    getTrailers();
  }, [contentType, id]);

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`, {
          withCredentials: true,
        });
        setSimilarContent(res.data.similar);
      } catch (error) {
        if (error.message.includes("404")) {
          setSimilarContent([]);
        }
      }
    };
    getSimilarContent();
  }, [contentType, id]);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`, {
          withCredentials: true,
        });
        setContentDetails(res.data.content);
      } catch (error) {
        if (error.message.includes("404")) {
          setContentDetails(null);
        }
      } finally {
        setLoading(false);
      }
    };
    getContentDetails();
  }, [contentType, id]);

  const handleNext = ()=>{
    if (currentTrailerIdx < trailers.length-1) {
      setCurrentTrailerIdx(currentTrailerIdx +1 )
    }
  }

  const handlePrev = ()=>{
    if (currentTrailerIdx > 0) {
      setCurrentTrailerIdx(currentTrailerIdx -1 )
    }
  }

  const scrollLeft = ()=>{
    if(sliderRef.current){
        sliderRef.current.scrollBy({left:-sliderRef.current.offsetWidth, behavior :"smooth"})
    }
  }
  const scrollRight = ()=>{
      if(sliderRef.current){
          sliderRef.current.scrollBy({left:+sliderRef.current.offsetWidth, behavior :"smooth"})
      }
  }

  if (loading) return (
    <div className="min-h-screen bg-black p-10">
      <WatchPageSkeleton/>
    </div>
  )
  if (!contentDetails) {
    return(
      <div className="bg-black text-white h-screen">
        <div className="max-w-6xl mx-auto">
          <NavBar/>
          <div className="text-center mx-auto px-4 py-8 h-full mt-40">
            <h2 className="text-2xl sm:text-5xl font-bold text-balance">محتوا پیدا نشد 😢</h2>
          </div>
        </div>
      </div>
    )
    
  }
  
  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto container px-4 py-8 h-full">
        <NavBar />
        {trailers.length > 0 && (
          <div className="flex flex-row-reverse justify-between items-center mb-4">
            <button
              className={`bg-gray-500/70 hover:bg-gray-500  text-white py-2 px-4 rounded ${
                currentTrailerIdx === trailers.length - 1 ? "cursor-not-allowed opacity-50 hover:bg-gray-500/70" : "cursor-pointer"
              } `}
              disabled={currentTrailerIdx === trailers.length - 1}
              onClick={handleNext}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className={`bg-gray-500/70 hover:bg-gray-500  text-white py-2 px-4 rounded ${
                currentTrailerIdx === 0
                  ? "cursor-not-allowed opacity-50 hover:bg-gray-500/70"
                  : "cursor-pointer"
              } `}
              disabled={currentTrailerIdx === 0}
              onClick={handlePrev}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
        <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
           {
            trailers.length>0&&(
              <ReactPlayer
              controls={true}
              width={"100%"}
              height={"70vh"}
              className="mx-auto overflow-hidden rounded-lg"
              url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
              />

              
            )
           }
           {
            trailers?.length === 0 &&(
              <h2 className="text-xl text-center mt-5">
                تریلری برای{" "}
                <span className="font-bold text-red-600 ">{contentDetails?.title || contentDetails?.name}</span>
                {" "}یافت نشد.
                😢
              </h2>
            )
           }
        </div>
        {/* movie details */}

        <div
          className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto"
        >

          <div className="mb-4 md:mb-0">
              <h2 className="text-5xl font-bold text-balance">{contentDetails?.title || contentDetails?.name}</h2>
              <p className="mt-2 text-lg">
                
                {contentDetails?.adult ? (
                  <span className="text-red-600">18+</span>
                ) : (
                  <span className="text-green-600">13+</span>
                )}{" "}
                | {" "}
                {formatReleaseDate(contentDetails?.release_date || contentDetails?.first_air_date) }
              </p>
              <p className="mt-4 text-lg">
                {contentDetails?.overview}
              </p>

          </div>
          <img src={ORIGINAL_IMG_BASE_URL + contentDetails.poster_path} alt="Poster image" 
              className="max-h-[600px] rounded-md"
              />

        </div>
        {similarContent.length >0 &&(
          <div className="mt-12 max-w-5xl mx-auto relative">

            <h3 className="text-3xl font-bold mb-4">
              فیلم‌ها / برنامه‌های تلویزیونی مشابه
            </h3>
            <div className="flex overflow-hidden gap-4 pb-4 group" ref={sliderRef}>
              {similarContent.map((content)=>{
                
                if (content.poster_path === null)return null;
                return(
                <Link key={content.id} to={`/watch/${content.id}`}
                className="w-52 flex-none"
                >
                  <img src={SMALL_IMG_BASE_URL + content?.poster_path} alt="Poster path" 
                  className="w-full h-auto rounded-md"
                  />
                  <h4 className="mt-2 text-lg font-semibold">{content.title || content.name}</h4>
                </Link>
              )})}

              <button className='absolute top-1/2 cursor-pointer -translate-y-1/2 left-2 flex opacity-0 group-hover:opacity-100 transition-all duration-300 items-center justify-center size-8 rounded-full bg-red-600 text-white z-10' 
              onClick ={scrollLeft}
              >
                  <ChevronLeft size={20}/>
              </button>
              <button className='absolute top-1/2 cursor-pointer -translate-y-1/2 right-2  flex opacity-0 group-hover:opacity-100 transition-all duration-300 items-center justify-center size-8 rounded-full bg-red-600 text-white z-10' 
              onClick ={scrollRight}
              >
                  <ChevronRight size={20}/>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WatchPage;
