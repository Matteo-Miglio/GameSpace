import { FaCircleArrowLeft } from "react-icons/fa6";
import { Link, useLoaderData, useNavigate, useParams } from "react-router";
import { useRef, useContext, useState } from "react";
import Header from "../components/DetailPageComponents/Header";
import BodySection from "../components/DetailPageComponents/BodySection";
import { UserContext } from "../context/UserContext";
import Navbar from "../components/Navbar";
import routes from "../router/routes";
import GlobalLoader from "../components/GlobalLoader";
import { FaRandom } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function DetailPage() {
    const { json: game, screenshots, trailers, series } = useLoaderData();
    const navigate = useNavigate();
    const { profile } = useContext(UserContext);
    const scrollRef = useRef(null);
    const scrollRefTrailers = useRef(null);
    const [loadRandom, setLoadRandom] = useState(false);

    const shots = screenshots?.results || screenshots || [];

    const { id } = useParams();

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (current) {
            const scrollAmount = window.innerWidth > 768 ? 600 : 300;
            current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };


    async function GetRandomGame() {
        setLoadRandom(true);
        let found = false;

        try {
            while (!found) {
                const randomId = Math.floor(Math.random() *100000) + 1;

                const response = await fetch(
                    `https://api.rawg.io/api/games/${randomId}?key=${import.meta.env.VITE_API_KEY}`
                );

                if (!response.ok) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    continue;
                }

                const json = await response.json();

                if (json && json.rating > 0) {
                    found = true;
                    navigate(`/detail/${json.id}`);
                    break;
                }
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoadRandom(false);
        }
    }

    // 948999

    return (
        <main
            key={id}
            style={{
                backgroundImage: `radial-gradient(circle at center, rgba(16, 185, 129, 0.02) 0%, rgba(0, 0, 0, 0.98) 100%), url(${game.background_image})`,
            }}
            className="min-h-screen bg-center bg-cover bg-fixed text-white font-sans selection:bg-emerald-500 selection:text-black overflow-x-hidden"
        >
            <GlobalLoader />

            <div className="fixed w-full top-0 z-[100]">
                <Navbar />
            </div>


            <header className="w-full bg-black/40 backdrop-blur-sm border-b border-white/5 relative z-10 pt-[64px]">
                <Header game={game} />
            </header>


            <div className="max-w-[1400px] mx-auto p-6 md:p-12 space-y-24 relative z-20">


                {trailers && trailers.length > 0 && (
                    <section className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <span className="w-1.5 h-8 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></span>
                                <div>
                                    <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">Cinematic Feed</h3>
                                    <p className="text-[10px] text-emerald-500/50 uppercase tracking-[0.3em] font-bold">{game.name} / trailer</p>
                                </div>
                            </div>
                            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-full">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                <span className="text-[10px] font-mono text-emerald-500 tracking-[0.2em] uppercase font-bold">trailer</span>
                            </div>
                        </div>

                        <div className="relative max-w-5xl mx-auto group/deck">

                            <div className="relative rounded-[3rem] overflow-hidden border border-white/10 bg-black shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                                <div
                                    ref={scrollRefTrailers}
                                    className="flex overflow-x-hidden snap-x snap-mandatory no-scrollbar scroll-smooth"
                                >
                                    {trailers.map((trailer) => (
                                        <div key={trailer.id} className="min-w-full aspect-video relative bg-black snap-center snap-always">
                                            <video
                                                controls
                                                poster={trailer.preview}
                                                className="w-full h-full object-contain opacity-90 group-hover/deck:opacity-100 transition-opacity duration-700"
                                            >
                                                <source src={trailer.data.max} type="video/mp4" />
                                                <source src={trailer.data[480]} type="video/mp4" />
                                            </video>

                                            <div className="absolute top-6 right-8 flex flex-col items-end pointer-events-none">
                                            </div>

                                            <div className="absolute bottom-8 left-10 pointer-events-none">
                                                <h4 className="text-xl font-black uppercase italic text-white tracking-tighter drop-shadow-2xl">
                                                    {trailer.name}
                                                </h4>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>


                            <div className="flex justify-center items-center gap-8 mt-10">
                                <button
                                    onClick={() => {
                                        const container = scrollRefTrailers.current;
                                        container.scrollBy({ left: -container.offsetWidth, behavior: 'smooth' });
                                    }}
                                    className="p-5 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:border-emerald-500/50 hover:text-emerald-500 transition-all active:scale-90 group"
                                >
                                    <FaCircleArrowLeft className="text-2xl" />
                                </button>

                                <button
                                    onClick={() => {
                                        const container = scrollRefTrailers.current;
                                        container.scrollBy({ left: container.offsetWidth, behavior: 'smooth' });
                                    }}
                                    className="p-5 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:border-emerald-500/50 hover:text-emerald-500 transition-all active:scale-90 group"
                                >
                                    <FaCircleArrowLeft className="text-2xl rotate-180" />
                                </button>
                            </div>
                        </div>
                    </section>
                )}

                {shots.length > 0 && (
                    <section className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
                        <div className="flex items-center gap-4 mb-8">
                            <span className="w-1.5 h-8 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></span>
                            <div>
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">Visual Archive</h3>
                                <p className="text-[10px] text-emerald-500/50 uppercase tracking-[0.3em] font-bold">{game.name} / Screenshots</p>
                            </div>
                        </div>

                        <div
                            ref={scrollRef}
                            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar scroll-smooth"
                        >
                            {shots.map((screen) => (
                                <div
                                    key={screen.id}
                                    className="min-w-[85%] md:min-w-[650px] aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 bg-black/50 snap-center shadow-2xl group/item relative"
                                >
                                    <img
                                        src={screen.image}
                                        alt="Database entry"
                                        className="w-full h-full object-cover opacity-100 group-hover/item:scale-105 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity pointer-events-none"></div>
                                </div>
                            ))}
                        </div>


                        <div className="flex justify-center items-center gap-10 mt-8">
                            <button
                                onClick={() => scroll('left')}
                                className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-emerald-500/50 hover:text-emerald-500 transition-all active:scale-90 cursor-pointer"
                            >
                                <FaCircleArrowLeft className="text-xl" />
                            </button>

                            <button
                                onClick={() => scroll('right')}
                                className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-emerald-500/50 hover:text-emerald-500 transition-all active:scale-90 cursor-pointer"
                            >
                                <FaCircleArrowLeft className="text-xl rotate-180" />
                            </button>
                        </div>
                    </section>
                )}

                {profile && profile ? (
                    <section className="animate-in fade-in duration-1000 delay-200 pb-20">
                        <div className="relative bg-[#070707]/80 backdrop-blur-3xl rounded-[3rem] p-8 md:p-14 border border-white/5 shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
                            <div className="text-white relative z-10">
                                <BodySection game={game} profile_id={profile.id} />
                            </div>

                            <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
                                <div className="w-16 h-16 border-t-2 border-r-2 border-emerald-500 rounded-tr-3xl"></div>
                            </div>
                        </div>
                    </section>
                ) : (
                    <div className="relative group overflow-hidden bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-8 flex flex-col items-center justify-center gap-4 transition-all hover:border-emerald-500/40 backdrop-blur-md">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none"></div>

                        <div className="relative flex flex-col items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                                <CgProfile size={24} className="animate-pulse" />
                            </div>

                            <div className="text-center">
                                <p className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.3em] mb-1">
                                    Access Restricted
                                </p>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-200">
                                    Login to see more
                                </h3>
                            </div>

                            <Link
                                to={routes.login}
                                className="mt-2 px-6 py-2 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-white hover:scale-105 transition-all"
                            >
                                Authorize Now
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            <button
                onClick={() => navigate(-1)}
                className="fixed bottom-10 left-10 flex items-center gap-4 group z-[110] bg-[#0a0a0a]/90 backdrop-blur-xl px-7 py-4 rounded-2xl border border-white/10 hover:border-emerald-500/50 transition-all shadow-2xl active:scale-95 cursor-pointer"
            >
                <FaCircleArrowLeft className="text-2xl text-emerald-500 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">take a </span>
                    <span className="text-xs uppercase tracking-[0.2em] font-black group-hover:text-emerald-400 transition-colors">step back</span>
                </div>
            </button>

            <button
                onClick={GetRandomGame}
                disabled={loadRandom}
                className="fixed right-5 bottom-11 flex items-center group z-[110] 
               bg-[#0a0a0a]/90 backdrop-blur-xl px-5 py-4 rounded-2xl 
               border border-white/10 hover:border-emerald-500/50 
               transition-all duration-300 shadow-2xl active:scale-95 
               cursor-pointer opacity-60 hover:opacity-100 disabled:cursor-wait"
            >
                <div className="flex items-center">
                    {/* Testo: ora gestito con margine dinamico per non sovrapporsi */}
                    <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-bold tracking-widest
                         uppercase transition-all duration-500 ease-in-out
                         group-hover:max-w-[120px] group-hover:mr-3
                         text-emerald-400">
                        random game
                    </span>

                    {/* Icon Container: l'elemento che rimane sempre visibile a destra */}
                    <div className={`flex items-center justify-center min-w-[24px] transition-colors duration-300
                        ${loadRandom ? 'text-emerald-500' : 'text-white group-hover:text-emerald-400'}`}>
                        {loadRandom ? (
                            <AiOutlineLoading3Quarters className="animate-spin text-xl" />
                        ) : (
                            <FaRandom className="text-xl" />
                        )}
                    </div>
                </div>
            </button>

            <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-0"></div>


            {series && series.length > 0 &&
                <div className="max-w-[1400px] mx-auto p-6 md:p-12 space-y-12">

                    <div className="flex items-center gap-6">
                        <h3 className="text-sm font-mono uppercase tracking-[0.5em] text-emerald-500 whitespace-nowrap">Series</h3>
                        <div className="h-[1px] w-full bg-gradient-to-r from-emerald-500 to-transparent"></div>
                    </div>

                    {series && series.map((serie) => {
                        return (
                            <Link
                                to={routes.detail.replace(':id', serie.id)}
                                key={serie.id}
                                className="group block relative bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-emerald-500 rounded-3xl p-6 transition-all duration-500 backdrop-blur-sm bg-white/30"
                            >
                                <div className="flex flex-col lg:flex-row gap-8 items-center ">

                                    <div className="w-full lg:w-1/3 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-1 h-8 bg-emerald-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
                                            <div>
                                                <h4 className="text-2xl font-black uppercase italic tracking-tighter text-white group-hover:text-emerald-400 transition-colors">
                                                    {serie.name}
                                                </h4>
                                            </div>
                                        </div>

                                        <div className="flex gap-6 pt-2">
                                            <div className="flex flex-col">
                                                <span className="text-[8px] font-mono text-emerald-500 uppercase">Rating</span>
                                                <span className="text-sm font-black text-white italic">{serie.rating} / 5</span>
                                            </div>
                                            <div className="flex flex-col border-l border-white/10 pl-6">
                                                <span className="text-[8px] font-mono text-emerald-500 uppercase">Release</span>
                                                <span className="text-sm font-black text-white italic">{serie.released}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full lg:w-2/3 relative overflow-hidden">
                                        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10"></div>
                                        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10"></div>

                                        <div className="flex gap-3 overflow-hidden">
                                            {serie.short_screenshots && serie.short_screenshots.slice(0, 4).map((screen, index) => (
                                                <div
                                                    key={index}
                                                    className="min-w-[180px] h-32 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 border border-white/5"
                                                    style={{ transitionDelay: `${index * 50}ms` }}
                                                >
                                                    <img
                                                        src={screen.image}
                                                        className="w-full h-full object-cover"
                                                        alt="preview"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                    <div className="h-[50px]"></div>
                </div>
            }

        </main>
    );
}