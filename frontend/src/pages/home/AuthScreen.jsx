import { React, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { ChevronLeft } from "lucide-react";

function AuthScreen() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate("/signup?email=" + email);
  };
  return (
    <div className="relative bg-hero">
      <header className="max-w-6xl mx-auto flex items-center flex-row-reverse justify-between p-4">
        <img
          src="/media/netflix-logo.png"
          alt="logo"
          className="w-32 md:w-52"
        />
        <Link
          to="/login"
          className="text-white font-semibold bg-red-600 py-1 px-2 rounded"
        >
          ورود
        </Link>
      </header>

      {/* hero section*/}
      <div className="flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          فیلم‌ها، سریال‌ها و محتوای سرگرم‌کننده، بدون محدودیت
        </h1>
        <p className="text-lg md-4">
          هر جا که بخواهید تماشا کنید، هر زمان که خواستید لغو کنید
        </p>
        <p className="mb-4">
          آماده‌اید تماشا کنید؟ ایمیل خود را وارد کنید و عضویت خود را تکمیل
          کنید
        </p>
        <form
          action=""
          className="flex flex-col md:flex-row gap-4 w-1/2"
          onSubmit={handleFormSubmit}
        >
          <input
            type="email"
            className="p-2 rounded flex-1 bg-black/80 border border-gray-700"
            placeholder="you@example.com"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="bg-red-600 text-xl  cursor-pointer px-2 lg:px-6 py-1 md:py2 rounded flex justify-center items-center">
            <span>شروع کنید</span>
            <ChevronLeft className="size8 md:size-10" />
          </button>
        </form>
      </div>

      {/* seprator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

      {/* 1st section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center flex-col md:flex-row px-4 md:px-2">
          {/* left side */}
          <div className="flex-1 text-center md:text-right" >
            <h2 className="text-2xl mb-4 font-iranSans-bold">
              از تماشای محتوا در تلویزیون خود لذت ببرید
            </h2>
            <p className="text-sm md:text-lg">
              روی تلویزیون‌های هوشمند، پلی‌استیشن، ایکس‌باکس، کروم‌کست، اپل
              تی‌وی، دستگاه‌های بلوری و دستگاه‌های دیگر تماشا کنید.
            </p>
          </div>
          {/* right side */}
          <div className="flex-1 relative">
            <img
              src="/media/tv.png"
              alt="Tv image"
              className="mt-4 z-20 relative"
            />
            <video
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10"
              playsInline
              autoPlay
              muted
              loop
            >
              <source src="/media/hero-vid.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* seprator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

      {/* 2nd section */}
      <div className="py-10 bg-black text-white">
      <div className="flex max-w-6xl mx-auto items-center justify-center flex-col-reverse md:flex-row px-4 md:px-2">
        {/* right side */}
        <div className="flex-1">
          <div className="relative">
            <img src="/media/stranger-things-lg.png" alt="stranger things img" className="mt-4"/>
            <div className="flex items-center gap-2 absolute  left-1/2 -translate-x-1/2  bottom-5 bg-black w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md px-2">
              <img src="/media/stranger-things-sm.png" alt="stranger things img" className="h-full"/>
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-col gap-0">
                  <span className="text-md lg:text-lg font-bold">Stranger Things</span>
                  <span className="text-sm text-blue-500">دانلود . . .</span>
                </div>
                <img src="/media/download-icon.gif" alt="" className="h-12" />
              </div>
            </div>
          </div>
        </div>
        {/* left side */}
        <div className="flex-1 text-center md:text-right">
          <h2 className="text-2xl mb-4 font-iranSans-bold">
            برنامه‌های دلخواهتان را دانلود کنید و آفلاین ببینید
          </h2>
          <p className="text-sm md:text-lg">
            علاقه‌مندی‌های خود را به‌سادگی ذخیره کنید و همیشه محتوای جذابی برای تماشا داشته باشید.
          </p>
        </div>
      </div>
      </div>

      {/* seprator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

      {/* 3rd section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center flex-col md:flex-row px-4 md:px-2">
          {/* left side */}
          <div className="flex-1 text-center md:text-right" >
            <h2 className="text-2xl mb-4 font-iranSans-bold">
              همه‌جا تماشا کنید
            </h2>
            <p className="text-sm md:text-lg">
              روی تلویزیون‌های هوشمند، پلی‌استیشن، ایکس‌باکس، کروم‌کست، اپل
              تی‌وی، دستگاه‌های بلوری و دستگاه‌های دیگر تماشا کنید.
            </p>
          </div>
          {/* right side */}
          <div className="flex-1 relative overflow-hidden">
            <img
              src="/media/device-pile.png"
              alt="Device image"
              className="mt-4 z-20 relative"
            />
            <video
              className="absolute top-2 left-1/2 -translate-x-1/2  h-4/6 z-10 max-w-[63%]"
              playsInline
              autoPlay
              muted
              loop
            >
              <source src="/media/video-devices.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* seprator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

      {/* 4rd section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center flex-col md:flex-row px-4 md:px-2">
          {/* right */}
          <div className="flex-1 relative">
            <img src="/media/kids.png" alt="Enjoy on your TV" className="mt-4" />
          </div>
          {/* left */}
          <div className="flex-1 text-center md:text-right" >
            <h2 className="text-2xl mb-4 font-iranSans-bold">
              برای کودکان پروفایل بسازید
            </h2>
            <p className="text-sm md:text-lg">
            کودکان خود را به یک ماجراجویی با شخصیت‌های مورد علاقه‌شان بفرستید، در فضایی که ویژه آن‌ها طراحی شده—رایگان با عضویت شما.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default AuthScreen;
