import { Button } from "@chakra-ui/button";
import { Image, Progress, useToast } from "@chakra-ui/react";

import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Textarea } from "@chakra-ui/textarea";
import { memo, useContext, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import { errorToast, successToast } from "../utils/toasts";

import { db, storage } from "../firebase/config";
import { AuthContext } from "../Auth";

const animatedComponents = makeAnimated();

function CreateProjectModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState();
  const [tempSelectedImageURL, setTempSelectedImageURL] = useState();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    projectName: "",
    projectDescription: "",
    users: [],
    imageUrl: "",
  });

  const toast = useToast();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const createProject = (e) => {
    e.preventDefault();

    if (selectedImage) {
      let uploadTask = storage
        .ref()
        .child(`projectHeader/${selectedImage.name}`)
        .put(selectedImage);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setUploadProgress(progress);
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
          errorToast(toast, "error : check Log");
          setUploadProgress(0);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            // console.log("File available at", downloadURL);
            addToDB({ ...formData, imageUrl: downloadURL });
            setUploadProgress(0);
          });
        }
      );
    } else {
      addToDB(formData);
    }
  };
  const defaultStatuses = {
    All: {
      name: "All",
      isDeletable: false,
    },
    Completed: {
      name: "Completed",
    },
    Pending: {
      name: "Pending",
    },
    Archive: {
      name: "Archive",
      isDeletable: false,
    },
    Rejected: {
      name: "Rejected",
      isDeletable: false,
    },
  };
  const addToDB = (data) => {
    // Adding to projects document
    db.collection("projects")
      .add(data)
      .then(async (docRef) => {
        Object.values(defaultStatuses).forEach(async (status) => {
          try {
            await db
              .collection("projects")
              .doc(docRef.id)
              .collection("stauses")
              .doc(status.name)
              .set(status);
          } catch (err) {
            console.log(err);
            return;
          }
        });
        return docRef;
      })
      .then((docRef) => {
        db.collection("users")
          .doc(currentUser.email)
          .collection("projects")
          .doc(docRef.id)
          .set({ projectId: docRef.id, ...data });
      })
      .then(() => {
        console.log("success");
        successToast(toast, "Project Created Successfully");
        onClose();
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Button
        mb="4"
        onClick={onOpen}
        rightIcon={
          <i
            className="fa
        fa-plus"
          />
        }
        colorScheme="teal"
        variant="outline"
      >
        Create Project
      </Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Progress value={uploadProgress} size="lg" colorScheme="pink" />
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <FormControl id="projectName" isRequired>
                <FormLabel>Project Name</FormLabel>
                <Input placeholder="Project Name" onChange={handleChange} />
              </FormControl>
              <FormControl id="projectDescription" isRequired>
                <FormLabel>Project Description</FormLabel>
                <Textarea
                  placeholder="Project Description"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="users">
                <FormLabel>Add Users</FormLabel>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  style={{ width: "100%" }}
                  options={[
                    { value: "chocolate", label: "Chocolate" },
                    { value: "strawberry", label: "Strawberry" },
                    { value: "vanilla", label: "Vanilla" },
                  ]}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Header Image</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setSelectedImage(e.target.files[0]);
                    setTempSelectedImageURL(
                      URL.createObjectURL(e.target.files[0])
                    );
                    console.log(e.target.files[0]);
                  }}
                />
              </FormControl>
              <Image src={tempSelectedImageURL} w={[100, 200, 200]} h="auto" />
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={createProject}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default memo(CreateProjectModal);
