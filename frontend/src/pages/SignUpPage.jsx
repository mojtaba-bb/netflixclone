
import {React , useState} from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
function SignUpPage() {
  const {searchParams} = new URL(document.location);
  const emailValue = searchParams.get("email");

  const [email, setEmail] = useState(emailValue || "");
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");

  

  const {signup , isSigningUp} = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({email, username, password});
  }
  return (
    <div className="h-screen bg-hero w-full bg-cover bg-center">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/">
          <img src="/media/netflix-logo.png" alt="logo" className="w-52" />
        </Link> 
      </header>
      <div className="flex justify-center items-center mt-20 mx-3">a
        <div className="w-full max-w-md p-8 space-y6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-center text-white text-2xl font-bold mb-4">
            عضویت
          </h1>
          <form action="" className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-right text-gray-300 block"
              >
                ایمیل
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="you@example.com"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="username" className="text-sm font-medium text-right text-gray-300 block">
                نام کاربری
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="username"
                id="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />

            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-right text-gray-300 block">
                رمز عبور
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="********"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="w-full py-2 bg-red-600 rounded-md text-white font-semibold" disabled={isSigningUp}>
              <span>{isSigningUp ? "در حال ثبت نام ... " : "ثبت نام"}</span>
            </button>
          </form>
          <div className="text-center text-gray-400 cursor-default">
            قبلاً عضو شده‌اید؟{" "}
            <Link to="/login" className="text-red-500 hover:underline">
              ورود
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
