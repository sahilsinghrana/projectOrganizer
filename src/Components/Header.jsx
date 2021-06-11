import { Button } from "@chakra-ui/button";
import { Heading } from "@chakra-ui/layout";
import { Link } from "@chakra-ui/react";
import { useContext } from "react";
import { auth } from "../firebase/config";
import "./header.css";
import { AuthContext } from "../Auth";
import { successToast } from "../utils/toasts";
import { useToast } from "@chakra-ui/react";
const Header = () => {
  const { currentUser } = useContext(AuthContext);
  const toast = useToast();
  const logOut = () => {
    auth
      .signOut()
      .then(() => {
        successToast(toast, "Logged Out");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="header-main">
      <div className="header-left-section">Menu</div>
      <Link href="/">
        <div className="header-brand-main">
          <Heading as="h1" size="md" wordBreak="break-word">
            Image Organizer
          </Heading>
        </div>
      </Link>
      <div className="header-navigation">
        {currentUser && (
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
