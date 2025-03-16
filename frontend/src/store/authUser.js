import axios from 'axios';
import toast from 'react-hot-toast';
import {create} from 'zustand';

export const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,
    isLogingOut: false,
    isLoginIn: false,
    signup: async (credentials) => {
        set({isSigningUp: true});
        try{
            const response = await axios.post("/api/v1/auth/signup", credentials);
            set({user: response.data.user , isSigningUp: false});
            toast.success("ثبت نام با موفقیت انجام شد");
        }catch(error){
            toast.error(error.response.data.message || "ثبت نام ناموفق بود");
            set({isSigningUp: false, user: null});
        }
    },

    login: async (credentials) => {
        set({isLoginIn: true});
        try {
            const response = await axios.post("/api/v1/auth/login", credentials);
            set({user: response.data.user, isLoginIn: false});
            toast.success("ورود با موفقیت انجام شد");
        } catch (error) {
            toast.error(error.response.data.message || "ورود ناموفق بود");
            set({isLoginIn: false , user: null});
        }

    },

    logout: async () => {
        set({isLogingOut: true});
        try {
            await axios.post("/api/v1/auth/logout");
            set({user: null, isLogingOut: false});
            toast.success("خروج با موفقیت انجام شد");
        } catch (error) {
            toast.error(error.response.data.message || "خطایی رخ داده است");
            set({isLogingOut: false});
        }
    },

    authCheck: async () => {
        set({isCheckingAuth: true});
        try {
            const response = await axios.get("/api/v1/auth/authCheck");
            set({isCheckingAuth: false,user: response.data.user});
            
        } catch {
            
            set({isCheckingAuth: false, user: null});
            
        }
        
    },
}));
