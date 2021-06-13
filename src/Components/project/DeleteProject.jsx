import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useToast,
} from "@chakra-ui/react";
import { memo, useContext, useRef, useState } from "react";
import { AuthContext } from "../../Auth";
import { db, storage } from "../../firebase/config";
import { useHistory } from "react-router-dom";
import { errorToast, successToast } from "../../utils/toasts";

function DeleteProject({ projectId }) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
  const toast = useToast();
  const deleteProject = async () => {
    try {
      await db
        .collection("projects")
        .doc(projectId)
        .collection("statuses")
        .delete();
    } catch (error) {
      console.log(error);
    }

    try {
      await db
        .collection("projects")
        .doc(projectId)
        .collection("images")
        .delete();
    } catch (error) {
      console.log(error);
    }

    try {
      await storage.ref().child(`projectImages`).child(projectId).delete();
    } catch (error) {
      console.log(error);
    }

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
      successToast(toast, "Project Deleted Successfully");
      setTimeout(() => {
        history.push("/");
      }, 1500);
      // Delete Project Images
    } catch (err) {
      errorToast(toast, "Error Deleting Project");
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
