import { Button } from "./components/ui/button";

export default function Agent() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-4">
            <p className="text-lg text-gray-600">
                Select an option from the sidebar to configure, view, or chat
                with your ELIZA agent
            </p>
            <Button className="transition-all duration-300 hover:text-cyan-400 hover:opacity-100 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                Configure Agent
            </Button>
        </div>
    );
}
