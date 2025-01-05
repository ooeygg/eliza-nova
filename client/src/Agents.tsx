import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import "./App.css";

type Agent = {
    id: string;
    name: string;
};

function Agents() {
    const navigate = useNavigate();
    const { data: agents, isLoading } = useQuery({
        queryKey: ["agents"],
        queryFn: async () => {
            const res = await fetch("/api/agents");
            const data = await res.json();
            return data.agents as Agent[];
        },
    });

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4 text-primary/80">Select your agent:</h1>

            {isLoading ? (
                <div>Loading agents...</div>
            ) : (
                <div className="grid gap-3 w-full max-w-md">
                    {agents?.map((agent) => (
                        <Button
                            key={agent.id}
                            className="w-full text-lg py-4 bg-card/30 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300 text-primary/80 hover:text-black hover:opacity-100 hover:scale-105"
                            onClick={() => {
                                navigate(`/${agent.id}`);
                            }}
                        >
                            {agent.name}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Agents;
