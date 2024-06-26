import { Route, Routes } from "react-router-dom";

import Books from "./pages/Books/Books";
import BooksDetails from "./pages/Books/BooksDetails";
import Users from "./pages/Users/Users";
import BorrowBook from "./pages/BorrowBook/BorrowBook";
import BorrowingRecords from "./pages/BorrowingRecords/BorrowingRecords";
import Login from "./pages/Login/Login";
import RequireAuth from "./components/RequireAuth";
import Profile from "./pages/Profile/Profile";
import Unauthorized from "./components/Unauthorized";
import ManageBooks from "./pages/manageBooks/ManageBooks";
import { MainDashboard } from "./pages/MainDashboard/MainDashboard";
import MainLayout from "./components/Layout/MainLayout";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  ArcElement
);

const ROLES = {
  admin: 1,
};

function App() {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route path="/" element={<MainLayout />}>
          <Route path="books" element={<Books />} />
          <Route path="books/:id" element={<BooksDetails />} />

          <Route element={<RequireAuth /* allowedRoles={[ROLES.user]} */ />}>
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
            <Route path="mainDashboard" element={<MainDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="borrowBook" element={<BorrowBook />} />
            <Route path="borrowingRecords" element={<BorrowingRecords />} />
            <Route path="manageBooks" element={<ManageBooks />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
