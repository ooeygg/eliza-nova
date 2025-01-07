import "./App.css";
import Landing from "./Landing";
import { PrivyProvider } from "./components/providers/PrivyProvider";

function App() {
    return (
        <PrivyProvider>
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <Landing />
            </div>
        </PrivyProvider>
    );
}

export default App;
