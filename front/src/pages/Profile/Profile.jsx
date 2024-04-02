import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    setAuth({});
    localStorage.removeItem("accessToken");
    navigate("/books");
  };

  return (
    <div>
      <p>Name: {auth.username}</p>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}

export default Profile;
