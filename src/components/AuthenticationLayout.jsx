import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import GlobalLoader from "./GlobalLoader";
export default function AuthenticationLayout() {
    return (
        <>
            <GlobalLoader />
            <Navbar />
            <Outlet />
            <Footer />

        </>
    )
}