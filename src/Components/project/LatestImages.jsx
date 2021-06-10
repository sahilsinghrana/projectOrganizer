import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { useToast } from "@chakra-ui/toast";
import { memo, useEffect, useState } from "react";
import { db, storage } from "../../firebase/config";
import { successToast } from "../../utils/toasts";
import ImageFallbackSkeleton from "../ImageFallbackSkeleton";

const LatestImages = ({ projectId, flag, setFlag }) => {
  const toast = useToast();
  const [images, setImages] = useState([1, 2, 3, 4, 5]);
  useEffect(() => {
    db.collection("projects")
      .doc(projectId)
      .collection("images")
      .get()
      .then((res) => {
        const tmp = [];
        res.docs.map((doc) => {
          tmp.push({ ...doc.data(), id: doc.id });
          return null;
        });
        setImages(tmp);
      });
  }, [flag]);

  const deleteImage = (image) => {
    let imageRef = storage.ref().child(`projectImages/${image.name}`);
    console.log("called");
    imageRef
      .delete()
      .then(() => {
        db.collection("projects")
          .doc(projectId)
          .collection("images")
          .doc(image.id)
          .delete()
          .then(() => {
            successToast(toast, "Image Deleted Successfully");
            setFlag(!flag);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <p>Latest Images</p>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {images.map((image) => {
          return (
            <div
              key={image.id}
              className="project-img-container"
              style={{
                width: "max-content",
                height: "max-content",
                margin: "10px",
                padding: "5px",
              }}
            >
              <div className="project-img-overlay">
                <Button
                  colorScheme="red"
                  m="4"
                  onClick={(e) => deleteImage(image)}
                >
                  X
                </Button>
              </div>
              <Image
                key={image.id}
                src={image.imageURL}
                alt="Something"
                w={[150, 250, 250]}
                objectFit="cover"
                h={[100, 200, 200]}
                style={{ boxShadow: "2px 4px 6px rgba(0,0,0,0.6)" }}
                // m="4"
                fallback={<ImageFallbackSkeleton />}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(LatestImages);
