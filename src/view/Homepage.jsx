import { useLoaderData, useNavigate, useSearchParams } from "react-router";
import GameList from "../components/HomeComponets/GameList";

export default function Homepage() {
    const { games, currentPage, hasNextPage } = useLoaderData();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const handlePageChange = (newPage) => {
        navigate(`?page=${newPage}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    

    return (
        <div className="max-w-[1400px] mx-auto px-6 py-10">
            <header className="mb-12 text-center">
                <h1 className="text-5xl font-black uppercase italic tracking-tighter text-white">
                    game <span className="text-emerald-500">space</span>
                </h1>
                <div className="flex items-center justify-center gap-4 mt-2">
                    <div className="h-[1px] w-12 bg-emerald-500/50"></div>
                    <p className="text-gray-500 text-xs uppercase tracking-[0.3em]">Explore all games</p>
                    <div className="h-[1px] w-12 bg-emerald-500/50"></div>
                </div>
                <div className="flex justify-center items-center gap-6 mt-16 pb-10">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="px-6 py-2 rounded-full border border-white/10 bg-[#161920] text-sm text-white font-bold uppercase tracking-widest hover:border-emerald-500 hover:text-emerald-500 disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-white transition-all cursor-pointer disabled:cursor-default"
                    >
                        Prev
                    </button>

                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-xs uppercase font-bold">Page</span>
                        <span className="text-emerald-500 font-black text-xl italic">{currentPage}</span>
                    </div>

                    <button
                        disabled={!hasNextPage}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="px-6 py-2 rounded-full border border-white/10 bg-[#161920] text-white text-sm font-bold uppercase tracking-widest hover:border-emerald-500 hover:text-emerald-500 disabled:opacity-30 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer"
                    >
                        Next
                    </button>
                </div>
            </header>

            <GameList>
                {games.map((game) => (
                    <GameList.Card key={game.id} game={game} />
                ))}
            </GameList>

            <div className="flex justify-center items-center gap-6 mt-16 pb-10">
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-6 py-2 rounded-full border border-white/10 bg-[#161920] text-sm text-white font-bold uppercase tracking-widest hover:border-emerald-500 hover:text-emerald-500 disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-white transition-all cursor-pointer  disabled:cursor-default"
                >
                    Prev
                </button>

                <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-xs uppercase font-bold">Page</span>
                    <span className="text-emerald-500 font-black text-xl italic">{currentPage}</span>
                </div>

                <button
                    disabled={!hasNextPage}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-6 py-2 rounded-full border border-white/10 bg-[#161920] text-white text-sm font-bold uppercase tracking-widest hover:border-emerald-500 hover:text-emerald-500 disabled:opacity-30 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer"
                >
                    Next
                </button>
            </div>
        </div>
    );
}