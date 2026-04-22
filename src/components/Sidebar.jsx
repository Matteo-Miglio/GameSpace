import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io"
import { Link, useParams } from "react-router"




export default function Sidebar({ genres }) {

    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => setIsOpen((prev) => !prev);

    const { slug } = useParams();



    return (
        <nav className="md:sticky md:top-24 text-white z-30 overflow-y-auto md:w-[170px] xl:w-auto">
            <div className="p-4">
                <p className="mb-6 text-2xl font-black uppercase italic tracking-tighter flex items-center justify-between group" onClick={handleToggle}>
                    <span className="flex items-center gap-2">
                        <span className="w-1 h-6 bg-emerald-500"></span>
                        Genres
                    </span>
                    <span
                        className={`md:hidden transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-500' : ''}`}
                    >
                        <IoIosArrowDown />
                    </span>
                </p>

                <ul
                    className={`
                    px-2 py-4 space-y-1
                    ${isOpen ? 'block animate-in slide-in-from-top-2' : 'hidden'} md:block
                    rounded-2xl
                    border border-white/5
                    bg-black/40
                    backdrop-blur-xl
                    shadow-2xl
                `}
                >
                    {genres.map((genre) => (
                        <li key={genre.id}>
                            <Link
                                to={`/genre/${genre.slug}`}
                                className={`
                                    group flex items-center justify-between
                                    px-4 py-2.5 rounded-xl
                                    transition-all duration-300
                                    hover:bg-emerald-500/10
                                    hover:translate-x-1
                                    ${genre.slug === slug ? 'bg-emerald-500/10 translate-x-1' : ''} 
                                `}
                            >
                                <span className={`
                                    text-sm font-bold uppercase tracking-tight
                                    group-hover:text-emerald-400
                                    transition-colors ${genre.slug === slug ? 'text-emerald-400' : "text-gray-400"} 
                                    `}>
                                    {genre.name}
                                </span>

                                <span className={`
                                    w-1.5 h-1.5 rounded-full
                                    bg-emerald-500
                                    shadow-[0_0_8px_rgba(16,185,129,0.8)]
                                    transition-all duration-300
                                    group-hover:opacity-100
                                    group-hover:scale-100
                                    ${genre.slug === slug ? 'opacity-100 scale-100' : 'opacity-0 scale-0'} 
                                `} />
                            </Link>
                        </li>
                    ))}
                </ul>

            </div>
        </nav>
    );
} 