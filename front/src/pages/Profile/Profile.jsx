import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";

function Profile() {
  const { auth, setAuth } = useAuth();
  const logout = () => {
    setAuth({});
    localStorage.removeItem("accessToken");
  };
  return (
    <div>
      <p>Name: {auth.name}</p>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}

export default Profile;
