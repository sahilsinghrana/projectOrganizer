import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { memo, useContext, useRef, useState } from "react";
import { AuthContext } from "../../Auth";
import { db } from "../../firebase/config";
import { useHistory } from "react-router-dom";

function DeleteProject({ projectId }) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
  const deleteProject = async () => {
    try {
      // Delete from projects
      await db.collection("projects").doc(projectId).delete();
      // delete from users project list
      await db
        .collection("users")
        .doc(currentUser.email)
        .collection("projects")
        .doc(projectId)
        .delete();
      console.log("Deleted Project");
      history.push("/");
      // Delete Project Images
    } catch (err) {
      console.log(err);
    }

    onClose();
  };

  return (
    <>
      <Button w="100%" colorScheme="red" onClick={() => setIsOpen(true)}>
        Delete Project
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Project
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={deleteProject} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default memo(DeleteProject);
