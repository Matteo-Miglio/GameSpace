import { Link, useNavigate } from "react-router";
import { useContext, useState, useEffect } from "react";
import routes from "../router/routes";
import { UserContext } from "../context/UserContext";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import profgen from "../assets/profgen.png";
export default function Navbar() {
    const [slug, setSlug] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const handleChange = (e) => setSlug(e.target.value);
    const navigate = useNavigate();
    const { user, signOut, avatarUrl } = useContext(UserContext);

    const handleLogout = async () => {
        setIsMobileMenuOpen(false);
        await navigate("/");
        signOut();
    };

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [navigate]);

    return (
        <nav className="navbar sticky top-0 z-[60] px-4 md:px-6 py-3 bg-[#0a0a0a]/80 backdrop-blur-2xl border-b border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300">
            
            <div className="flex-none">
                <Link
                    to={routes.home}
                    className="group flex items-center gap-2 text-2xl font-black uppercase italic tracking-tighter text-white hover:text-emerald-400 transition-all"
                >
                    <div className="w-2 h-8 bg-emerald-500 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.8)] transition-all"></div>
                    Game<span className="text-emerald-500">Space</span>
                </Link>
            </div>

            <div className="hidden md:flex flex-1 justify-center px-4">
                <div className="relative flex items-center w-full max-w-xl group">
                    <div className="flex w-full items-center bg-black/40 border border-white/10 rounded-xl overflow-hidden focus-within:border-emerald-500/50 focus-within:ring-1 focus-within:ring-emerald-500/20 transition-all duration-300">
                        <input
                            type="text"
                            placeholder="Search Database..."
                            className="input flex-1 h-11 bg-transparent border-0 focus:outline-none text-sm text-gray-200 placeholder:text-gray-600 px-5"
                            onChange={handleChange}
                            value={slug}
                        />
                        <Link
                            to={`/search/${slug}`}
                            className="h-11 px-6 bg-emerald-500/10 border-l border-white/10 hover:bg-emerald-500 hover:text-black text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center"
                        >
                            Search
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex-none flex items-center gap-4 ms-auto">
                
                <div className="hidden md:block dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="flex items-center gap-3 group p-1 pr-3 rounded-full hover:bg-white/5 transition-all cursor-pointer">
                        <div className="avatar cursor-pointer">
                            <div className="w-10 rounded-full ring-2 ring-emerald-500/20 group-hover:ring-emerald-500/50 transition-all overflow-hidden bg-[#161920] flex items-center justify-center">
                                {user ? (
                                    <img src={avatarUrl ? avatarUrl : profgen} alt="User" />
                                ) : (
                                    <CgProfile className="text-2xl text-emerald-500" />
                                )}
                            </div>
                        </div>
                        <IoIosArrowDown className="text-gray-500 group-hover:text-emerald-500 transition-colors" />
                    </div>

                    <ul tabIndex={0} className="dropdown-content mt-4 w-52 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.6)] rounded-2xl bg-[#0f1115]/95 backdrop-blur-2xl border border-white/10 z-50 animate-in fade-in zoom-in duration-200">
                        {!user ? (
                            <>
                                <li><Link to={routes.register} className="flex px-4 py-3 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/5 rounded-xl transition-all">Register</Link></li>
                                <li><Link to={routes.login} className="flex px-4 py-3 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/5 rounded-xl transition-all">Login</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to={routes.profile} className="flex px-4 py-3 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/5 rounded-xl transition-all">Profile</Link></li>
                                <div className="h-[1px] bg-white/5 my-2 mx-2"></div>
                                <li><button onClick={handleLogout} className="w-full flex px-4 py-3 text-[10px] font-black uppercase text-red-500/70 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all cursor-pointer">Logout</button></li>
                            </>
                        )}
                    </ul>
                </div>

                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden p-2 text-emerald-500 text-3xl transition-all active:scale-90"
                >
                    {isMobileMenuOpen ? <HiX /> : <HiMenuAlt3 />}
                </button>
            </div>

            <div className={`fixed inset-0 top-[65px] bg-[#0a0a0a]/98 backdrop-blur-3xl z-50 md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}>
                <div className="flex flex-col p-6 gap-8 bg-[#0a0a0a]">
                    
                    <div className="flex w-full items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:border-emerald-500/50">
                        <input
                            type="text"
                            placeholder="Search Games..."
                            className="flex-1 h-12 bg-transparent border-0 focus:outline-none text-sm text-gray-200 px-5"
                            onChange={handleChange}
                            value={slug}
                        />
                        <Link to={`/search/${slug}`} className="h-12 px-5 bg-emerald-500 flex items-center text-black font-bold">
                            <IoIosSearch size={20} />
                        </Link>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-[10px] font-mono text-emerald-500/50 uppercase tracking-[0.3em] mb-2 px-2">Terminal Access</p>
                        {!user ? (
                            <>
                                <Link to={routes.login} className="p-4 bg-white/5 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-300 text-center transition-all">Login</Link>
                                <Link to={routes.register} className="p-4 bg-emerald-500 rounded-xl text-xs font-bold uppercase tracking-widest text-black text-center transition-all">Register</Link>
                            </>
                        ) : (
                            <>
                                <Link to={routes.profile} className="p-4 bg-white/5 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-emerald-400 transition-all">Profile</Link>
                                <button onClick={handleLogout} className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-xs font-bold uppercase tracking-widest text-red-500 text-left transition-all">Logout</button>
                            </>
                        )}
                    </div>

                    <div className="mt-auto opacity-20 font-mono text-[8px] text-emerald-500 uppercase tracking-widest">
                        System_Status: Mobile_Linked<br/>
                        Secure_Node: Active
                    </div>
                </div>
            </div>
        </nav>
    );
}