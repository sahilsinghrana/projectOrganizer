import { Button } from "@chakra-ui/button";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { memo } from "react";
import AddImageModal from "./AddImageModal";

const ProjectFloatingMenu = ({ projectId, setFlag }) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "5%",
        right: "3%",
      }}
    >
      <Menu>
        <MenuButton colorScheme="orange" as={Button}>
          <i className="fas fa-plus"> </i>
        </MenuButton>
        <MenuList>
          <MenuItem>
            <i className="fas fa-images"> </i> &nbsp;{" "}
            <AddImageModal
              btnText={"Add Image"}
              projectId={projectId}
              setFlag={setFlag}
            />
          </MenuItem>
          <MenuItem>
            <i className="fas fa-file-alt"> </i> &nbsp; Open Text Editor
          </MenuItem>
        </MenuList>
      </Menu>{" "}
    </div>
  );
};

export default memo(ProjectFloatingMenu);
