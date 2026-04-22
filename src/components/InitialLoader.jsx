import { useState, useEffect } from "react";

const InitialLoader = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,rgba(0,0,0,1)_100%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-20"></div>

            <div className="relative flex flex-col items-center">
                <div className="relative w-24 h-24 mb-8">
                    <div className="absolute inset-0 border-2 border-emerald-500/20 rounded-full"></div>
                    <div className="absolute inset-0 border-t-2 border-emerald-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-4 border-2 border-emerald-500/10 rounded-full animate-pulse"></div>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.6em] animate-pulse">
                        Inizializzazione_Archivio
                    </span>
                    <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                            <div 
                                key={i} 
                                className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"
                                style={{ animationDelay: `${i * 0.2}s` }}
                            ></div>
                        ))}
                    </div>
                </div>

                <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 opacity-20 font-mono text-[8px] text-emerald-500 w-full text-center">
                    <p>CORE_BOOT_SEQUENCE: SUCCESS</p>
                    <p>DECRYPTING_DATABASE_NODES...</p>
                </div>
            </div>
        </div>
    );
};

export default InitialLoader;