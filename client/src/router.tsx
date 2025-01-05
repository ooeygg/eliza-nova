// In your router configuration file (e.g., App.jsx or router.jsx)
import { createBrowserRouter } from "react-router-dom";
import ComingSoon from "./components/ui/ComingSoon";
import Landing from "./Landing";
import Agent from "./Agent"; // We'll create this component
import Layout from "./Layout";
import Chat from "./Chat";
import Character from "./Character";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />,
    },
    {
        path: "/:agentId",
        element: <Layout />,
        children: [
            {
                path: "", // This matches /:agentId exactly
                element: <Chat />,
            },
            {
                path: "chat", // This matches /:agentId/chat
                element: <Chat />,
            },
            {
                path: "agents", // This matches /:agentId/chat
                element: <ComingSoon />,
            },
        ],
    },
]);
