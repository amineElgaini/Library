import { Route, Routes } from "react-router-dom";

import Books from "./pages/Books/Books";
import NavBar from "./components/Navbar";
import BooksDetails from "./pages/Books/BooksDetails";
import Users from "./pages/Users/Users";
import BorrowBook from "./pages/BorrowBook/BorrowBook";
import BorrowingRecords from "./pages/BorrowingRecords/BorrowingRecords";
import Login from "./pages/Login/Login";
import RequireAuth from "./components/RequireAuth";
import Profile from "./pages/Profile/Profile";
import Unauthorized from "./components/Unauthorized";
const ROLES = {
  admin: 1,
  user: 2,
  manage_users: 3,
};

function App() {
  return (
    <>
      <Routes>

        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route path="/" element={<NavBar />}>
          <Route path="books" element={<Books />} />
          <Route path="books/:id" element={<BooksDetails />} />

          <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
            <Route path="users" element={<Users />} />
            <Route path="borrowBook" element={<BorrowBook />} />
            <Route path="borrowingRecords" element={<BorrowingRecords />} />
          </Route>
        </Route>
        
      </Routes>
    </>
  );
}

export default App;
