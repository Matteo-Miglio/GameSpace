import { useLoaderData, useParams } from "react-router";
import GameList from "../components/HomeComponets/GameList";

export default function SearchPage() {
    const games = useLoaderData();

    const {slug} = useParams();

    return (
        <div className="max-w-[1400px] mx-auto px-6 py-10 min-h-screen">
            

            <header className="mb-12 animate-in fade-in slide-in-from-left-6 duration-700">
                <div className="flex items-center gap-4 mb-2">
                    <span className="h-[1px] w-12 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                    <p className="text-emerald-500 text-[10px] uppercase tracking-[0.4em] font-black">
                        Search Results
                    </p>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-white">
                    Query: <span className="text-emerald-500 not-italic">"{slug}"</span>
                </h1>
                
                <div className="mt-4 flex items-center gap-3 bg-white/5 w-fit px-4 py-1.5 rounded-full border border-white/5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">
                        {games.length} Matches found in deep scan
                    </p>
                </div>
            </header>

            {games.length > 0 ? (
                <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    <GameList>
                        {games.map((game) => (
                            <GameList.Card key={game.id} game={game} />
                        ))}
                    </GameList>
                </section>
            ) : (

                <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-white/5 rounded-[3rem] bg-black/20">
                    <div className="text-emerald-500/20 text-8xl mb-6 font-black uppercase italic">Null</div>
                    <h2 className="text-xl font-bold uppercase tracking-widest text-gray-400">No data retrieved</h2>
                    <p className="text-gray-600 text-xs mt-2 uppercase tracking-tighter">Try adjusting your search parameters</p>
                </div>
            )}
        </div>
    );
}