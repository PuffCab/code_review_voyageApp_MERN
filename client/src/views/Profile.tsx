import { useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import "../styles/ProfilePage.css";

function Profile() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <h1>profile</h1>
      <div className="profileBox">
        <ProfileCard />
      </div>
      <br />
      <br />
      <br />
      <br />
    </>
  );
}

export default Profile;
