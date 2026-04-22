import { RouterProvider } from "react-router"
import router from "./router/router"
import { UserContextProvider } from "./context/UserContext"
import { useState } from "react";

function App() {

  const [loading, setIsLoading] = useState(true);

  return (
    <>
        <UserContextProvider>
          <RouterProvider router={router} />
        </UserContextProvider>
    </>
  )


}

export default App
