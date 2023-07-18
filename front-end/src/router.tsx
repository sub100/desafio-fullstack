import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Usuario from "./pages/Usuario/Usuario";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import EditarUsuario from "./pages/Usuario/EditarUsuario";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/cadastrar-usuario",
        element: <Usuario />,
    },
    {
        path: "/editar-usuario/:id",
        element: <EditarUsuario />,
    }
]);