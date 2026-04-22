import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../context/UserContext";
import { useForm } from "react-hook-form";
import routes from "../../router/routes";

export default function LoginPage() {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const navigate = useNavigate();

    const { login } = useContext(UserContext);

    const onSubmit = async (user_data) => {

        await login({
            email: user_data.email,
            password: user_data.password
        });
        navigate("/");

    }

   return (
    <main 
        className="min-h-screen bg-fixed bg-cover bg-center text-white font-sans flex items-center justify-center px-6"
        style={{
            backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.9) 100%), url('tuo-sfondo-spaziale.jpg')`,
        }}
    >

        <div className="max-w-md w-full bg-[#0f1115]/90 backdrop-blur-xl rounded-3xl p-10 border border-white/5 shadow-2xl animate-in fade-in zoom-in duration-500">
            
            <div className="text-center mb-10">
                <h1 className="text-4xl font-black uppercase tracking-tighter italic">
                    Welcome <span className="text-emerald-500">Back</span>
                </h1>
                <p className="text-gray-500 text-xs uppercase tracking-[0.2em] mt-2 font-bold">Access the space</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

                <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-500 ml-1 block">Email</label>
                    <input 
                        type="email" 
                        placeholder="your@email.com" 
                        className={`w-full bg-[#161920] border ${errors.email ? 'border-red-500' : 'border-white/5'} focus:border-emerald-500/50 outline-none p-4 rounded-xl transition-all text-sm`}
                        {...register("email", { required: "This field is required" })} 
                    />
                    {errors.email && (
                        <p role="alert" className="text-red-500 text-[10px] uppercase font-bold ml-1 mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div className="space-y-1">
                    <div className="flex justify-between items-center ml-1">
                        <label className="text-[10px] uppercase font-bold text-gray-500 block">Password</label>
                    </div>
                    <input 
                        type="password" 
                        placeholder="••••••••" 
                        className={`w-full bg-[#161920] border ${errors.password ? 'border-red-500' : 'border-white/5'} focus:border-emerald-500/50 outline-none p-4 rounded-xl transition-all text-sm`}
                        {...register("password", { required: "This field is required", minLength: 8 })} 
                    />
                    {errors.password && (
                        <p role="alert" className="text-red-500 text-[10px] uppercase font-bold ml-1 mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <button className="w-full mt-4 py-4 bg-emerald-500 text-black text-xs font-black uppercase rounded-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-[1.02] transition-all tracking-[0.2em] cursor-pointer">
                    Login
                </button>

                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <Link to={routes.register} className="text-gray-500 text-[10px] uppercase tracking-widest">
                        New explorer? 
                        <span className="text-white hover:text-emerald-400 ml-2 cursor-pointer font-bold transition-colors underline decoration-emerald-500/30 underline-offset-4">
                            Create Account
                        </span>
                    </Link>
                </div>
            </form>
        </div>
    </main>
);
}