import { FaYoutube, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaG, FaL } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="relative border-t border-white/5 bg-black/40 backdrop-blur-xl">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>

            <div className="max-w-[1400px] mx-auto px-6 py-12 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                    
                    <aside className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="absolute inset-0 bg-emerald-500 blur-md opacity-20 animate-pulse"></div>
                                <svg
                                    width="40"
                                    height="40"
                                    viewBox="0 0 24 24"
                                    className="fill-emerald-500 relative z-10"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-black uppercase tracking-tighter text-white italic">Game<span className="text-emerald-500">Space</span></h2>
                            </div>
                        </div>

                    </aside>

                    <nav className="flex flex-col gap-4 items-start md:items-end">
                        <h6 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Social Connect</h6>
                        <div className="flex gap-4">
                            {[
                                { icon: <FaGithub />, link: "https://github.com/Matteo-Miglio" },
                                { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/matteo-miglio/?skipRedirect=true" },
                                // { icon: <FaFacebook />, link: "#" }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.link}
                                    className="p-3 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:text-emerald-500 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all duration-300 active:scale-90"
                                >
                                    <span className="text-xl">{social.icon}</span>
                                </a>
                            ))}
                        </div>
                    </nav>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                        © 2026 // ALL RIGHTS RESERVED
                    </p>
                </div>
            </div>
        </footer>
    );
}