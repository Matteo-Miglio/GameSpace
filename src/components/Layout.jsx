import { Outlet, useLoaderData, useNavigation } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import GlobalLoader from "./GlobalLoader";
import InitialLoader from "./InitialLoader";
import { useEffect, useState } from "react";

let isFirstLoad = true;

export default function Layout() {
    const genres = useLoaderData();
    const navigation = useNavigation(); 
    
    const [showInitialLoader, setShowInitialLoader] = useState(isFirstLoad);

    useEffect(() => {
        if (isFirstLoad) {
            const timer = setTimeout(() => {
                setShowInitialLoader(false);
                isFirstLoad = false;
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const isNavigating = navigation.state === "loading";

    return (
        <>
            {showInitialLoader && <InitialLoader />}

            {isNavigating && !showInitialLoader && <GlobalLoader />}

            <div className={showInitialLoader ? "opacity-0" : "opacity-100 transition-opacity duration-700"}>
                <Navbar />
                <section className="grid grid-cols-7 gap-4">
                    <div className="col-span-5 col-start-2 md:col-span-1 justify-center self-start md:sticky top-0">
                        <Sidebar genres={genres} />
                    </div>
                    <div className="col-span-7  md:col-span-6">
                        <Outlet />
                    </div>
                </section>
                <Footer />
            </div>
        </>
    )
}