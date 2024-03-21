import { Route, Routes } from "react-router-dom";

import Books from "./pages/Books/Books";
import NavBar from "./components/Navbar";
import BooksDetails from "./pages/Books/BooksDetails";
function App() {
    return (
        <>
            <NavBar />

            <div className="mb-10">
                <Routes>
                    <Route path="books" element={<Books />} />
                    <Route path="books/:id" element={<BooksDetails />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
