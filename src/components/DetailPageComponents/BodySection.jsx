import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { supabase } from "../../database/supabase";


export default function BodySection({ game, profile_id }) {


    const [isFavourite, setIsFavourite] = useState(false);
    const [description, setDescription] = useState();
    const [gameReviews, setGameReviews] = useState();
    const [checkReview, setCheckReview] = useState(false);

    const handle_description = (e) => {
        setDescription(e.target.value);
    }

    const get_reviews = async () => {
        let { data: reviews, error } = await supabase
            .from("reviews")
            .select(`
                *,
                profiles (
                    username
                )
            `)
            .eq("game_id", game.id)
        setGameReviews(reviews);
    }

    const add_review = async () => {
        const { data, error } = await supabase
            .from("reviews")
            .insert([
                { profile_id, game_id: game.id, game_name: game.name, description }
            ])
            .select();

        setDescription("");
        setCheckReview(!checkReview);
    }


    const get_favourite = async () => {
        let { data: favourites, error } = await supabase
            .from("favourites")
            .select("*")
            .eq("profile_id", profile_id)
            .eq("game_id", game.id)

        if (favourites.length > 0) {
            setIsFavourite(true);
        }

    }

    useEffect(() => {
        get_favourite();
        get_reviews();
    }, [checkReview]);


    const add_game = async () => {
        const { data, error } = await supabase
            .from("favourites")
            .insert([{ profile_id, game_id: game.id, game_name: game.name, game_image: game.background_image }])
            .select();
        setIsFavourite(true);
    }

    const remove_game = async () => {
        const { data, error } = await supabase
            .from("favourites")
            .delete()
            .eq("profile_id", profile_id)
            .eq("game_id", game.id)
            .select();
        setIsFavourite(false);
    }

    return (
        <section className="grid grid-cols-1 md:grid-cols-6 gap-10 mt-16 px-4 md:px-10 pb-20">


            <div className="col-span-5 flex flex-col items-center space-y-6">


                <div className="w-full max-w-2xl flex items-center gap-4">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <p className="text-emerald-500 text-xs uppercase tracking-[0.4em] font-black">User Intel / Reviews</p>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-emerald-500/20 to-transparent"></div>
                </div>


                <div className="w-full max-w-2xl flex flex-col gap-3">
                    <textarea
                        className="textarea w-full bg-black/40 border border-white/10 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 rounded-2xl p-4 text-white placeholder:text-gray-600 resize-none min-h-[120px] transition-all"
                        placeholder="Enter your transmission..."
                        onChange={handle_description}
                        value={description}
                    ></textarea>

                    <button
                        className="group relative overflow-hidden bg-emerald-500 px-8 py-3 rounded-xl self-end transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer"
                        onClick={add_review}
                    >
                        <span className="relative z-10 text-black text-xs font-black uppercase tracking-widest">Send comment</span>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    </button>
                </div>


                <div className="w-full max-w-3xl h-[400px] overflow-y-auto pr-4 space-y-4 no-scrollbar">
                    {gameReviews && gameReviews.length > 0 ? (
                        gameReviews.map((review) => (
                            <div
                                key={review.id}
                                className="relative group border-l-2 border-emerald-500/30 bg-white/5 p-4 rounded-r-2xl hover:bg-white/10 transition-all animate-in slide-in-from-right-4"
                            >
                                
                                <div className="flex justify-between mb-2">
                                    <span className="text-[10px] text-emerald-500 font-mono">User: {review.profiles.username}</span>
                                    <span className="text-[10px] text-gray-500 uppercase tracking-tighter font-bold">Verified User</span>
                                </div>
                                <p className="text-gray-200 text-sm leading-relaxed tracking-wide italic">
                                    "{review.description}"
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center border border-white/5 rounded-3xl bg-black/20">
                            <p className="text-gray-600 text-xs uppercase tracking-widest font-bold">No data logs available</p>
                        </div>
                    )}
                </div>
            </div>


            <div className="flex justify-center md:justify-start items-start pt-10">
                <div

                    onClick={isFavourite ? remove_game : add_game}
                    className="group relative p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-red-500/50 transition-all cursor-pointer select-none active:scale-95"
                >
                    {isFavourite ? (
                        <div className="flex flex-col items-center gap-2">
                            <FaHeart className="text-red-500 text-4xl drop-shadow-[0_0_10px_rgba(239,68,68,0.5)] transition-transform group-hover:scale-110" />
                            <span className="text-[10px] text-red-500 font-black uppercase tracking-widest">Saved</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <FaRegHeart className="text-white/40 text-4xl transition-transform group-hover:scale-110 group-hover:text-red-400" />
                            <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Save</span>
                        </div>
                    )}


                    <div className="absolute inset-0 bg-red-500/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
            </div>
        </section>
    );

}
