import useAuth from "@/hooks/context/useAuth";

function Profile() {
  const { auth } = useAuth();

  return (
    <div>
      <p>Name: {auth.username}</p>
    </div>
  );
}

export default Profile;
