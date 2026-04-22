import { useNavigation } from "react-router";

export default function GlobalLoader() {
    const navigation = useNavigation();

    const isLoading = navigation.state === "loading";

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-1 bg-black overflow-hidden">
                <div className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-load-progress"></div>
            </div>

            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] flex flex-col items-center justify-center transition-opacity duration-300">
                <div className="flex flex-col items-center gap-4">

                    <div className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                        <span className="text-[8px] font-mono text-emerald-500/30 uppercase animate-pulse">
                            Fetching_Assets_from_Node_{Math.floor(Math.random() * 100)}...
                        </span>
                    </div>

                </div>
            </div>
        </div>
    );
};