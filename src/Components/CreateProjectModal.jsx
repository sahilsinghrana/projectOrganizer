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

  const createProject = async (e) => {
    e.preventDefault();
    await addToDB(formData);
  };

  const addImageHeader = async (pId) => {
    if (selectedImage) {
      let uploadTask = await storage
        .ref()
        .child(`projectImages/${pId}/header-${selectedImage.name}`)
        .put(selectedImage);

      setUploadProgress(100);
      const downloadUrl = await uploadTask.ref.getDownloadURL();
      return downloadUrl;
    } else {
      return;
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
  const addToDB = async (data) => {
    // Adding to projects document

    // TEH problem is that you will get doc idafter creating the doc.
    // So you wiill have to update the doc again
    // Try using TRANSACTIONS

    try {
      let batch = db.batch();
      const projectRef = await db.collection("projects").add(data);

      const imageUrl = await addImageHeader(projectRef.id);

      // Right now the Header image is stored in two different places .. MAKE A BETTER STRUCTURE

      if (imageUrl)
        await batch.update(db.collection("projects").doc(projectRef.id), {
          imageUrl,
        });
      Object.values(defaultStatuses).forEach(async (status) => {
        batch.set(
          db
            .collection("projects")
            .doc(projectRef.id)
            .collection("statuses")
            .doc(status.name),
          status
        );
      });

      batch.set(
        db
          .collection("users")
          .doc(currentUser.email)
          .collection("projects")
          .doc(projectRef.id),
        { ...data, projectId: projectRef.id, imageUrl: imageUrl }
      );

      await batch.commit();

      successToast(toast, "Project Created Successfully");

      onClose();
    } catch (err) {
      errorToast(toast, "Error Occcured while Creating Project");
      console.log(err);
    }
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
                <Input
                  autoComplete="off"
                  placeholder="Project Name"
                  onChange={handleChange}
                />
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
