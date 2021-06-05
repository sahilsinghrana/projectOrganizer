import { Heading } from "@chakra-ui/layout";
import { memo } from "react";
import placeholderImage from "../../assets/images/project_placeholder.jpg";

const Organizer = () => {
  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <FolderCard title={"All"} />
          <FolderCard title={"Selected"} />
          <FolderCard title={"Done"} />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <SmallCard title={"Rejected"} />
          <SmallCard title={"Archive"} />
        </div>
      </div>
      <div>All Images of the project</div>
    </div>
  );
};

const SmallCard = ({ title, styles }) => {
  return (
    <div
      className="project-card"
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(13,66,113,0.9), rgba(10,129,171,0.3)),url(${placeholderImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "10rem",
        height: "5rem",
        borderRadius: "20px",
        margin: "20px 10px",
        boxShadow:
          " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        ...styles,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          flex: "1",
        }}
      >
        <Heading
          as="h5"
          size="md"
          textColor="white"
          letterSpacing="wider"
          blendMode="screen"
          paddingX="8"
          textShadow="md"
        >
          {title}
        </Heading>
      </div>
      <div
        style={{
          background: "#0c4271",
          width: "100%",
          height: "15px",
          display: "flex",
          justifyContent: "center",
        }}
      ></div>
    </div>
  );
};

const FolderCard = ({ title, imageURL, styles }) => {
  return (
    <div
      className="project-card"
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(13,66,113,0.9), rgba(10,129,171,0.3)),url(${placeholderImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "15rem",
        height: "6rem",
        // background: "whitesmoke",
        borderRadius: "20px",
        margin: "10px 10px",
        boxShadow:
          " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "space-evenly",
        ...styles,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          flex: "1",
        }}
      >
        <Heading
          as="h4"
          size="xl"
          textColor="white"
          letterSpacing="wider"
          blendMode="screen"
          textShadow="md"
          paddingX="8"
        >
          {title}
        </Heading>
      </div>
      <div
        style={{
          background: "#0c4271",
          width: "100%",
          height: "15px",
          display: "flex",
          justifyContent: "center",
        }}
      ></div>
    </div>
  );
};

export default memo(Organizer);
