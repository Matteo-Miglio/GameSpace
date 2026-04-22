import { useLoaderData, useNavigate, useParams } from "react-router";
import GameList from "../components/HomeComponets/GameList";


export default function GenrePage() {
    const { games, currentPage, hasNextPage } = useLoaderData();
    const { slug } = useParams();
    const navigate = useNavigate();

    const handlePageChange = (newPage) => {
        navigate(`?page=${newPage}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <div className="max-w-[1400px] mx-auto px-6 py-10">

                <header className="mb-12">
                    <div className="flex items-center gap-4 mb-2">
                        <span className="h-[1px] w-8 bg-emerald-500"></span>
                        <p className="text-emerald-500 text-xs uppercase tracking-[0.3em] font-bold">
                            Filtering by "{slug}" game
                        </p>
                    </div>

                    <h1 className="text-6xl font-black uppercase italic tracking-tighter text-white">
                        {slug} <span className="text-emerald-500 not-italic">.</span>
                    </h1>
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
                </header>


                <section className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                    <GameList>
                        {games.map((game) => (
                            <GameList.Card key={game.id} game={game} />
                        ))}
                    </GameList>
                </section>

                {games.length === 0 && (
                    <div className="text-center py-20 bg-black/20 rounded-3xl border border-white/5">
                        <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">
                            No games found in this sector.
                        </p>
                    </div>
                )}
            </div>
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
        </>

    );
}