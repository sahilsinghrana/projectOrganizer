import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  useToast,
  Image,
  Progress,
  Spinner,
} from "@chakra-ui/react";
import { memo, useContext, useEffect, useState } from "react";
import globalContext from "../../context/globalContext";
import { db, storage } from "../../firebase/config";
import { errorToast, successToast } from "../../utils/toasts";
const AddImageModal = ({ btnText, projectId, setFlag }) => {
  const { user } = useContext(globalContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadCount, setUploadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const uploadImages = () => {
    setLoading(true);
    if (selectedImages.length > 0) {
      selectedImages.forEach((img) => {
        let imageName = `${(Date.now() / 100).toFixed(0) + "-" + img.name}`;
        let uploadTask = storage
          .ref()
          .child(`projectImages/${imageName}`)
          .put(img);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // var progress =
            //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.log(error);
            errorToast(toast, "error : check Log");
          },
          async () => {
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
            addImageUrlToDb(imageName, downloadURL);
          }
        );
      });
    } else {
      alert("no image selected");
    }
  };
  const addImageUrlToDb = async (imageName, downloadURL) => {
    try {
      await db.collection("projects").doc(projectId).collection("images").add({
        imageURL: downloadURL,
        uploadedBy: user.uid,
        uploadedAt: Date.now(),
        name: imageName,
      });
      setUploadCount((prevCount) => prevCount + 1);
      setUploadProgress((prevState) => prevState + 100 / selectedImages.length);
    } catch (err) {
      console.log(err);
      errorToast(toast, "Error Uploading Image : Check Console");
    }
  };
  if (selectedImages.length !== 0 && uploadCount >= selectedImages.length) {
    console.log("success");
    successToast(toast, "Uploaded All");
    setUploadProgress(0);
    setSelectedImages([]);
    setLoading(false);
    setUploadCount(0);
    setTimeout(() => {
      onClose();
    }, 2000);
  }

  useEffect(() => () => {
    setFlag((prev) => !prev);
  });
  return (
    <>
      <div onClick={onOpen} style={{ width: "100%" }}>
        {btnText}
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Images</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                setSelectedImages(() => {
                  let tmp = [];
                  for (let i = 0; i <= e.target.files.length - 1; i++) {
                    tmp.push(e.target.files[i]);
                  }
                  console.log(tmp);
                  return tmp;
                });
              }}
            />

            <div>
              {selectedImages.map((item) => {
                return (
                  <Image
                    className="project-img"
                    key={item.name}
                    src={URL.createObjectURL(item)}
                    w={[100, 200, 200]}
                    h="auto"
                  />
                );
              })}
            </div>

            <Progress value={uploadProgress} size="xs" colorScheme="pink" />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              marginRight="4"
              onClick={uploadImages}
              disabled={loading}
            >
              {!loading ? "Upload" : <Spinner />}
            </Button>
            <Button colorScheme="red" variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default memo(AddImageModal);
