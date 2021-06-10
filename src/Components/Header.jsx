import { Button } from "@chakra-ui/button";
import { Heading } from "@chakra-ui/layout";
import { useContext } from "react";
import globalContext from "../context/globalContext";
import { auth } from "../firebase/config";
import "./header.css";
const Header = () => {
  const { user, setUser } = useContext(globalContext);
  const logOut = () => {
    auth
      .signOut()
      .then((response) => {
        setUser();
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="header-main">
      <div className="header-left-section">Menu</div>
      <div className="header-brand-main">
        <Heading as="h1" size="md" wordBreak="break-word">
          Image Organizer
        </Heading>
      </div>
      <div className="header-navigation">
        {user && (
          <Button
            onClick={logOut}
            colorScheme="pink"
            className="header-btn"
            variant="solid"
            style={{ height: "100%", paddingBottom: "8px", paddingTop: "2px" }}
          >
            Log Out
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
