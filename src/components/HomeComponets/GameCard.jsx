import { IoStarSharp } from "react-icons/io5";
import { Link } from "react-router";


export default function GameCard({ game }) {

    // console.log(game);


    return (
        <div className="relative h-[220px] rounded-3xl overflow-hidden group transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] border border-white/5 hover:border-emerald-500/50">

            <Link to={`/detail/${game.id}`}>

                <img
                    src={game.background_image}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.6] group-hover:brightness-90"
                    alt={game.name}
                />


                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

                <div className="absolute top-3 right-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 transition-transform duration-300 group-hover:translate-y-[-2px]">
                    <span className="text-xs font-bold text-white/90">{game.rating}</span>
                    <IoStarSharp className="text-yellow-400 text-xs" />
                </div>

                <div className="absolute bottom-0 left-0 w-full p-4 transform transition-transform duration-300 group-hover:translate-y-[-5px]">
                    <p className="text-sm font-black text-center text-white uppercase tracking-tight leading-tight drop-shadow-lg group-hover:text-emerald-400 transition-colors">
                        {game.name}
                    </p>
                </div>

                <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </Link>
        </div>
    );
}

