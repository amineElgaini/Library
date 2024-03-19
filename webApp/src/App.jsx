import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter, Routes } from "react-router-dom";

function App() {
    return (
        <>
            <BrowserRouter>
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    <Routes>
                        <Route path="home"></Route>
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
