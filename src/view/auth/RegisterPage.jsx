import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router";
import { supabase } from "../../database/supabase";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import routes from "../../router/routes";

export default function RegisterPage() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { signUp } = useContext(UserContext);

    const navigate = useNavigate();

    const onSubmit = async (user_data) => {


        await signUp({
            email: user_data.email,
            password: user_data.password,
            options: {
                data: {
                    first_name: user_data.first_name,
                    last_name: user_data.last_name,
                    username: user_data.username
                }
            }


        })

        navigate("/");
    };




    return (
        <main
            className="min-h-screen bg-fixed bg-cover bg-center text-white font-sans flex items-center justify-center py-12 px-6"
            style={{
                backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.9) 100%), url('tuo-sfondo-spaziale.jpg')`,
            }}
        >
            <div className="max-w-md w-full bg-[#0f1115]/90 backdrop-blur-xl rounded-3xl p-10 border border-white/5 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">

                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black uppercase tracking-tighter italic">
                        Join the <span className="text-emerald-500">Space</span>
                    </h1>
                    <p className="text-gray-500 text-xs uppercase tracking-[0.2em] mt-2 font-bold">Create your account</p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <input
                                type="text"
                                placeholder="First Name"
                                className={`w-full bg-[#161920] border ${errors.first_name ? 'border-red-500' : 'border-white/5'} focus:border-emerald-500/50 outline-none p-4 rounded-xl transition-all text-sm`}
                                {...register("first_name", { required: "Required" })}
                            />
                            {errors.first_name && <p className="text-red-500 text-[10px] uppercase font-bold ml-1">{errors.first_name.message}</p>}
                        </div>
                        <div className="space-y-1">
                            <input
                                type="text"
                                placeholder="Last Name"
                                className={`w-full bg-[#161920] border ${errors.last_name ? 'border-red-500' : 'border-white/5'} focus:border-emerald-500/50 outline-none p-4 rounded-xl transition-all text-sm`}
                                {...register("last_name", { required: "Required" })}
                            />
                            {errors.last_name && <p className="text-red-500 text-[10px] uppercase font-bold ml-1">{errors.last_name.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <input
                            type="text"
                            placeholder="Username"
                            className={`w-full bg-[#161920] border ${errors.username ? 'border-red-500' : 'border-white/5'} focus:border-emerald-500/50 outline-none p-4 rounded-xl transition-all text-sm`}
                            {...register("username", { required: "Required" })}
                        />
                        {errors.username && <p className="text-red-500 text-[10px] uppercase font-bold ml-1">{errors.username.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <input
                            type="email"
                            placeholder="Email address"
                            className={`w-full bg-[#161920] border ${errors.email ? 'border-red-500' : 'border-white/5'} focus:border-emerald-500/50 outline-none p-4 rounded-xl transition-all text-sm`}
                            {...register("email", { required: "Required" })}
                        />
                        {errors.email && <p className="text-red-500 text-[10px] uppercase font-bold ml-1">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <input
                            type="password"
                            placeholder="Password"
                            className={`w-full bg-[#161920] border ${errors.password ? 'border-red-500' : 'border-white/5'} focus:border-emerald-500/50 outline-none p-4 rounded-xl transition-all text-sm`}
                            {...register("password", { required: "Min 8 characters", minLength: 8 })}
                        />
                        {errors.password && <p className="text-red-500 text-[10px] uppercase font-bold ml-1">{errors.password.message}</p>}
                    </div>

                    <button className="w-full mt-6 py-4 bg-emerald-500 text-black text-xs font-black uppercase rounded-xl hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:scale-[1.02] transition-all tracking-widest cursor-pointer">
                        Create Account
                    </button>

                    <Link to={routes.login} className="text-center text-gray-500 text-[10px] uppercase tracking-widest mt-6">
                        Already have an account? <span className="text-white hover:text-emerald-500 cursor-pointer transition-colors">Login</span>
                    </Link>
                </form>
            </div>
        </main>
    );
}