import { Link } from "react-router";
import routes from "../../router/routes";

export default function Header({ game }) {
   return (
    <header className="relative w-full pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:100%_3px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
            

            <div className="flex flex-col items-center mb-24">

                <div className="flex items-center gap-4 mb-8">
                    <div className="h-[1px] w-12 bg-emerald-500/30"></div>
                    <span className="text-[10px] md:text-[12px] font-mono text-emerald-500 tracking-[0.5em] uppercase">
                        {game.released}
                    </span>
                    <div className="h-[1px] w-12 bg-emerald-500/30"></div>
                </div>


                <div className="relative mb-10">
                    <h1 className="text-center text-7xl md:text-9xl font-black uppercase italic tracking-tighter text-white leading-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
                        {game.name}
                    </h1>

                    <div className="absolute inset-0 bg-emerald-500/10 blur-[60px] -z-10 scale-150"></div>
                </div>

            </div>


            <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">


                <article className="lg:col-span-7 relative">
                    <div className="absolute -left-6 top-0 h-full w-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]"></div>
                    
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-[11px] font-black text-emerald-500 uppercase tracking-widest">Description</span>
                        <div className="h-[1px] flex-1 bg-white/10"></div>
                    </div>
                    
                    <p className="text-gray-300 text-sm md:text-lg leading-relaxed tracking-wide first-letter:text-5xl first-letter:font-black first-letter:text-emerald-500 first-letter:mr-3 first-letter:float-left">
                        {game.description_raw}
                    </p>
                </article>


                <article className="lg:col-span-5 bg-[#0a0a0a]/80 border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-xl relative overflow-hidden group shadow-2xl">
                    

                    <div className="absolute top-0 right-0 p-6">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></div>
                    </div>

                    <div className="space-y-12 relative z-10">
                        <div>
                            <p className="text-[10px] font-mono text-emerald-500/50 uppercase tracking-[0.4em] mb-4">Rating</p>
                            <div className="flex items-baseline gap-3">
                                <span className="text-6xl font-black italic text-white tracking-tighter leading-none">{game.rating}</span>
                                <span className="text-xl text-emerald-500/40 font-black">/ 5</span>
                            </div>
                            
                            <div className="w-full h-1.5 bg-white/5 mt-6 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.6)]" 
                                    style={{ width: `${(game.rating / 5) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <div>
                            <p className="text-[10px] font-mono text-emerald-500/50 uppercase tracking-[0.4em] mb-5">Classification</p>
                            <ul className="flex flex-wrap gap-3">
                                {game.genres.map((genre) => (
                                    <Link to={routes.genre.replace(':slug', genre.slug)} key={genre.id}>
                                        <li className="px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest text-emerald-400 hover:bg-emerald-500 hover:text-black hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all cursor-pointer">
                                            {genre.name}
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="absolute -bottom-12 -right-12 text-[10rem] font-black text-white/[0.02] italic pointer-events-none select-none uppercase">
                        Data
                    </div>
                </article>

            </section>
        </div>
    </header>
);
}