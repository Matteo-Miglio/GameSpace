import { createBrowserRouter } from "react-router";
import routes from "./routes";
import Layout from "../components/Layout";
import Homepage from "../view/Homepage";
import { getAllGamesLoader, getAllGenres, getFilteredBuGenreGames, getGameDetails } from "./loaders";
import SearchPage from "../view/SearchPage";
import { getSearchedGames } from "./loaders";
import GenrePage from "../view/GenrePage";
import RegisterPage from "../view/auth/RegisterPage";
import LoginPage from "../view/auth/LoginPage";
import ProfilePage from "../view/ProfilePage";
import AuthLayout from "../components/AuthLayout";
import ProfileSettingsPage from "../view/ProfileSettingsPage";
import DetailPage from "../view/DetailPage";
import ScrollToTop from "../components/ScrollToTop";
import ErrorPage from "../components/ErrorPage";

const router = createBrowserRouter([
    {

        Component: ScrollToTop,
        errorElement: <ErrorPage />,
        children: [{


            path: routes.home,
            Component: Layout,
            loader: getAllGenres,
            children: [
                {
                    path: routes.home,
                    Component: Homepage,
                    loader: getAllGamesLoader
                },
                {
                    path: routes.search,
                    Component: SearchPage,
                    loader: getSearchedGames
                },
                {
                    path: routes.genre,
                    Component: GenrePage,
                    loader: getFilteredBuGenreGames
                },

            ]
        }]
    },
    {
        Component: ScrollToTop,
        errorElement: <ErrorPage />,
        children: [{

            path: "auth",
            Component: AuthLayout,
            children: [
                {
                    path: routes.register,
                    Component: RegisterPage
                },
                {
                    path: routes.login,
                    Component: LoginPage
                },
                {
                    path: routes.profile,
                    Component: ProfilePage
                },
                {
                    path: routes.profile_settings,
                    Component: ProfileSettingsPage
                }
            ]
        }]
    },
    {
        Component: ScrollToTop,
        errorElement: <ErrorPage />,
        children: [{
            path: routes.detail,
            Component: DetailPage,
            loader: getGameDetails
        }]
    }

])


export default router