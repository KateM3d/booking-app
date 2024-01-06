import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

const AccountPage = () => {
  const [redirect, setRedirect] = useState<null | string>(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  const handleLinkActivation = (type: string | null) => {
    let classes = "py-2 px-6";
    if (type === subpage || (subpage === undefined && type === "profile")) {
      classes += "py-2 px-6 bg-primary text-white rounded-full";
    }
    return classes;
  };

  const handleUserLogout = async () => {
    await axios.post("/logout");
    setUser(null);
    setRedirect("/");
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <nav className="w-full flex mt-8 gap-2 mb-8 justify-center">
        <Link to={"/account"} className={handleLinkActivation("profile")}>
          My Profile
        </Link>
        <Link
          to={"/account/bookings"}
          className={handleLinkActivation("bookings")}
        >
          My Bookings
        </Link>
        <Link to={"/account/places"} className={handleLinkActivation("places")}>
          My Places
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) <br />
          <button className="primary max-w-sm mt-4" onClick={handleUserLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
