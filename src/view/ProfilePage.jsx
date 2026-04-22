import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router";
import routes from "../router/routes";
import { supabase } from "../database/supabase";
export default function ProfilePage() {
    const { user, profile, avatarUrl } = useContext(UserContext);
    const [userFavourites, setUserFavourites] = useState();

    console.log(userFavourites);



    const get_favourites = async () => {
        if (profile) {
            let { data: favourites, error } = await supabase
                .from("favourites")
                .select("*")
                .eq("profile_id", profile.id);
            setUserFavourites(favourites);
        }
    }


    useEffect(() => {
        get_favourites();
    }, [profile]);


    return (
        <main
            className="min-h-screen bg-fixed bg-cover bg-center text-white font-sans"
            style={{
                backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.9) 100%)`,
            }}
        >
            {user && profile && (
                <div className="max-w-6xl mx-auto px-6 py-10">

                    <header className="flex items-center gap-6 mb-12 border-b border-white/10 pb-10">
                        <div className="relative">
                            <img
                                src={avatarUrl ?? "https://picsum.photos/200"}
                                alt="Profile"
                                className="w-24 h-24 rounded-full border-2 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                            />
                            <div className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0b0e14]"></div>
                        </div>
                        <div>
                            <h1 className="text-3xl font-black uppercase tracking-tight">
                                {profile.first_name} <span className="text-emerald-500 italic">/{profile.username}</span>
                            </h1>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        <aside className="space-y-6">
                            <div className="bg-[#0f1115] rounded-2xl p-6 border border-white/5 shadow-2xl">
                                <h3 className="text-emerald-500 font-bold uppercase text-xs tracking-widest mb-6 flex items-center gap-2">
                                    <span className="w-1 h-3 bg-emerald-500"></span> Account Info
                                </h3>
                                <div className="space-y-5">
                                    <div>
                                        <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">Full Name</p>
                                        <p className="text-sm font-medium">{profile.first_name} {profile.last_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">Email Address</p>
                                        <p className="text-sm font-medium">{user.email}</p>
                                    </div>
                                    <Link
                                        to={routes.profile_settings}
                                        className="block w-full text-center mt-4 py-3 bg-emerald-500 text-black text-xs font-black uppercase rounded-lg hover:bg-white transition-all shadow-[0_4px_14px_0_rgba(16,185,129,0.3)]"
                                    >
                                        Settings
                                    </Link>
                                </div>
                            </div>
                        </aside>

                        <section className="lg:col-span-2">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold italic uppercase tracking-wider">Your Favorites</h3>
                                <div className="h-[1px] flex-grow mx-4 bg-white/10"></div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {userFavourites && userFavourites.map((game) => (
                                    <div
                                        key={game.id}
                                        className="group relative h-32 rounded-xl overflow-hidden bg-[#161920] border border-white/5 hover:border-emerald-500/50 transition-all flex items-center"
                                    >
                                        <div className="w-24 h-full bg-gray-800 shrink-0">
                                            <img src={game.game_image} alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                        </div>

                                        <Link to={routes.detail.replace(":id", game.game_id)}>
                                            <div className="p-4 flex flex-col justify-center">
                                                <h4 className="text-sm font-bold leading-tight group-hover:text-emerald-400 transition-colors uppercase">
                                                    {game.game_name}
                                                </h4>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            )}
        </main>
    );
}
