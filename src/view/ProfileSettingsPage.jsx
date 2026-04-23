import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import routes from "../router/routes";
import { supabase } from "../database/supabase";
import profgen from "../assets/profgen.png";


export default function ProfileSettingsPage() {

    const [file, setFile] = useState();
    const [preview, setPreview] = useState();
    const { updateProfile, profile, getUser, avatarUrl } = useContext(UserContext);

    const handleChange = (e) => {
        setFile(() => e.target.files[0]);
    }

    useEffect(() => {
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(() => imageUrl);
        }
    }, [file]);


    
    
    const handleAvatarSubmit = async (e) => {
        e.preventDefault();
        const fileExt = file.name.split('.').pop();
        const fileName = `${profile.id}${Math.random()}.${fileExt}`;
        await supabase.storage.from("avatars").upload(fileName, file);
        await supabase
        .from('profiles')
        .upsert({ id: profile.id, avatar_url: fileName })
        .select();
        await getUser();
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const onSubmit = (data) => {
        updateProfile(data);
        navigate(routes.profile);
    }


    return (
    <main 
        className="min-h-screen bg-fixed bg-cover bg-center text-white font-sans flex items-center justify-center py-20 px-6"
        style={{
            backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.9) 100%), url('tuo-sfondo-spaziale.jpg')`,
        }}
    >
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 animate-in fade-in zoom-in duration-500">
            

            <section className="md:col-span-5 bg-[#0f1115]/80 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-2xl flex flex-col items-center">
                <h3 className="text-emerald-500 font-bold uppercase text-xs tracking-widest mb-8 self-start flex items-center gap-2">
                    <span className="w-1 h-3 bg-emerald-500"></span> Profile Picture
                </h3>
                
                <div className="relative group mb-8">
                    <div className="absolute -inset-1 bg-emerald-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                    <img 
                        src={preview || avatarUrl || profgen} 
                        alt="Preview Avatar" 
                        className="relative w-48 h-48 rounded-full border-4 border-[#1c1c1c] object-cover shadow-2xl" 
                    />
                </div>

                <form className="w-full space-y-4" onSubmit={handleAvatarSubmit}>
                    <div className="relative">
                        <input 
                            type="file" 
                            id="avatar-upload"
                            className="hidden" 
                            onChange={handleChange} 
                        />
                        <label 
                            htmlFor="avatar-upload"
                            className="flex items-center justify-center w-full px-4 py-3 bg-[#161920] border border-white/10 rounded-xl cursor-pointer hover:border-emerald-500/50 transition-all text-sm font-medium"
                        >
                            Choose File
                        </label>
                    </div>
                    <button className="w-full py-3 bg-white text-black text-xs font-black uppercase rounded-xl hover:bg-emerald-500 transition-all cursor-pointer">
                        Update Photo
                    </button>
                </form>
            </section>

            <section className="md:col-span-7 bg-[#0f1115]/80 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-2xl">
                <h3 className="text-emerald-500 font-bold uppercase text-xs tracking-widest mb-8 flex items-center gap-2">
                    <span className="w-1 h-3 bg-emerald-500"></span> Personal Details
                </h3>

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">

                        <div className="group">
                            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1 mb-1 block">First Name</label>
                            <input 
                                type="text" 
                                placeholder="Enter your name" 
                                className={`w-full bg-[#161920] border ${errors.first_name ? 'border-red-500' : 'border-white/5'} focus:border-emerald-500/50 outline-none p-4 rounded-xl transition-all text-sm`}
                                {...register("first_name", { required: "This field is required" })} 
                            />
                            {errors.first_name && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.first_name.message}</p>}
                        </div>


                        <div className="group">
                            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1 mb-1 block">Last Name</label>
                            <input 
                                type="text" 
                                placeholder="Enter your last name" 
                                className={`w-full bg-[#161920] border ${errors.last_name ? 'border-red-500' : 'border-white/5'} focus:border-emerald-500/50 outline-none p-4 rounded-xl transition-all text-sm`}
                                {...register("last_name", { required: "This field is required" })} 
                            />
                            {errors.last_name && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.last_name.message}</p>}
                        </div>


                        <div className="group">
                            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1 mb-1 block">Username</label>
                            <input 
                                type="text" 
                                placeholder="Choose a username" 
                                className={`w-full bg-[#161920] border ${errors.username ? 'border-red-500' : 'border-white/5'} focus:border-emerald-500/50 outline-none p-4 rounded-xl transition-all text-sm`}
                                {...register("username", { required: "This field is required" })} 
                            />
                            {errors.username && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.username.message}</p>}
                        </div>
                    </div>

                    <button className="w-full mt-8 py-4 bg-emerald-500 text-black text-xs font-black uppercase rounded-xl hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-[1.02] transition-all  cursor-pointer">
                        Save Changes
                    </button>
                </form>
            </section>
        </div>
    </main>
);
}