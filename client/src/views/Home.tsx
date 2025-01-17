import "../styles/Home.css";
import { Link, useNavigate } from "react-router-dom";
// import Carousel from "../components/Carousel";
import { useContext, useEffect } from "react";
import { ExperiencesContext } from "../context/ExperiencesContext";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const { experiences } = useContext(ExperiencesContext);
  const { user } = useContext(AuthContext);

  const navigateTo = useNavigate();
  useEffect(() => {
    // REVIEW double check that this is doing what is supposed to do
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <h1>explore. discover. share.</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className="beigeBox">
          {user ? (
            <>
              {/* //REVIEW in this parenthesis you are inside the expresion executed if true, so no need of conditionally check if tthere is a user (user?.name). there has to be one if this part of the code gets executed    */}
              <h2>Welcome {user?.username}!</h2>
            </>
          ) : (
            <>
              <h2>Welcome!</h2>
            </>
          )}
          <p>
            Discovers voyage, <br />a public travel blog, where people share
            some of the unique experiences and activities they came up with
            while on vacation. <br />
            <br />
            Whether you went on an alchemy walk in Prague, listened to live Faro
            music at a miradouro in Lisbon, or other, share your story with us.
          </p>
          <Link
            style={{ color: "black" }}
            className="nakdButton"
            to={"/experiences"}
          >
            start exploring
          </Link>
          <figcaption>
            exclusive access only for responsible tourists.
          </figcaption>
          <br />

          <div
            onClick={() => {
              navigateTo("/experiences");
            }}
            className="circleBox"
          >
            {experiences && (
              <>
                {" "}
                <span className="dot">
                  <p style={{ paddingTop: "20pt" }}>
                    {/* //REVIEW same as in previous comment about the conditional render. */}
                    {experiences?.length} <br /> experiences
                    <br />
                    to discover!
                  </p>
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <br />
      <div className="top5Carousel">{/* <Carousel /> */}</div>
    </div>
  );
}

export default Home;
