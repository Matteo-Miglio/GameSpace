import { useRouteError, Link } from "react-router";

export default function ErrorPage () {
    const error = useRouteError();
    console.error("Dettaglio Errore:", error);

    const errorMessage = error?.statusText || error?.message || "Errore Critico di Sincronizzazione";
    const errorCode = error?.status || "500";

    return (
        <main className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-red-500 selection:text-white">
            

            <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.02)_0%,rgba(0,0,0,1)_100%)] z-0"></div>
            
            <div className="fixed inset-0 bg-[linear-gradient(rgba(18,18,18,0.3)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-40 z-10"></div>

            <div className="fixed -bottom-40 -left-40 w-96 h-96 bg-red-900/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-20 text-center px-6 max-w-4xl">
                
                <div className="inline-flex items-center gap-3 px-6 py-2 border border-red-500/20 bg-red-500/5 rounded-xl mb-12 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>

                    <span className="text-[10px] font-mono text-red-500 uppercase tracking-[0.4em] font-black">
                        System_Failure: ID_{errorCode}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                </div>

                <div className="relative mb-6">
                    <h1 className="text-8xl md:text-[14rem] font-black uppercase italic tracking-tighter text-white leading-none [text-shadow:0_10px_30px_rgba(0,0,0,0.8)]">
                        Loss
                    </h1>

                    <div className="absolute inset-0 bg-red-600/10 blur-[60px] -z-10 scale-150 rounded-full"></div>
                </div>
                

                <div className="flex items-center justify-center gap-4 mb-10 opacity-30">
                    <div className="h-[1px] w-20 bg-red-500"></div>
                    <span className="text-[8px] font-mono text-red-500/70 uppercase tracking-[0.6em]">Signal_Severed</span>
                    <div className="h-[1px] w-20 bg-red-500"></div>
                </div>


                <div className="max-w-xl mx-auto mb-16 p-6 bg-white/[0.01] border border-white/5 rounded-2xl backdrop-blur-sm relative">
                    <p className="text-gray-400 font-mono text-[11px] uppercase tracking-widest leading-relaxed">
                        Il link di comunicazione con l'archivio centrale è stato interrotto. 
                        Il pacchetto dati richiesto è corrotto o inaccessibile. 
                    </p>
                    <p className="mt-4 font-mono text-xs text-red-400/70 uppercase tracking-widest bg-red-500/5 px-4 py-2 rounded inline-block">
                        ERR_MSG: "{errorMessage}"
                    </p>
                    
                    <div className="absolute top-0 right-0 p-4 opacity-30 pointer-events-none">
                        <div className="w-8 h-8 border-t border-r border-red-500 rounded-tr-xl"></div>
                    </div>
                </div>

                <Link 
                    to="/" 
                    className="group relative inline-flex items-center gap-6 px-10 py-5 bg-[#0a0a0a]/90 border border-white/10 rounded-2xl hover:border-emerald-500 transition-all duration-500 shadow-2xl backdrop-blur-xl"
                >

                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                    </div>

                    <div className="flex flex-col items-start leading-none">
                        <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1.5">Initialize</span>
                        <span className="text-sm uppercase tracking-[0.3em] font-black group-hover:text-white transition-colors">Emergency Protocol</span>
                    </div>
                    
                    <div className="absolute inset-0 border border-emerald-500 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:blur-[5px] transition-opacity"></div>
                </Link>
            </div>


            <div className="fixed bottom-8 left-8 opacity-20 font-mono text-[9px] text-gray-600 space-y-1 pointer-events-none z-30">
                <p>LOCATION: NULL_SECTOR_7</p>
                <p>STATUS: CONNECTION_FAILURE</p>
                <p>PROTOCOL: AMBER_ALERT</p>
            </div>

            <div className="fixed bottom-0 right-0 text-[10rem] font-black italic text-white/[0.02] pointer-events-none select-none uppercase z-0">
                Void
            </div>
        </main>
    );
};
