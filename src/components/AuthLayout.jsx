import { Outlet, useLoaderData } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import GlobalLoader from "./GlobalLoader";



export default function Layout() {
    const genres = useLoaderData();
    return (
        <>
            <GlobalLoader />
            <Navbar />
            <section className="grid grid-cols-6 gap-4">
                <div className="col-span-6 ">
                    <Outlet />
                </div>
            </section>
            <Footer />
        </>
    )
}