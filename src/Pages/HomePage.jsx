import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Heading } from "@chakra-ui/layout";
import { useContext, useEffect, useState } from "react";
import placeholderImage from "../assets/images/project_placeholder.jpg";
import CreateProjectModal from "../Components/CreateProjectModal";
import globalContext from "../context/globalContext";
import "./styles.css";
// import { projects } from "../data";
import { db } from "../firebase/config";
const HomePage = () => {
  const { user } = useContext(globalContext);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, []);
  const fetchProjects = async () => {
    let snapshot = await db
      .collection("users")
      .doc(user.email)
      .collection("projects")
      .get();
    let tmp = [];
    console.log(snapshot);
    snapshot.docs.forEach((doc) => {
      tmp.push(doc.data());
      console.log(doc.data());
    });
    setProjects(tmp);
  };
  return (
    <div
      style={{
        display: "flex",
        padding: "2% 10%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Heading as="h2" size="xl" marginBottom="8">
        Projects
      </Heading>

      <CreateProjectModal fetchProjects={fetchProjects} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {projects.length <= 0 ? (
          <div> No Projects to show</div>
        ) : (
          projects.map((project) => (
            <ProjectCard
              projectTitle={project.projectName}
              projectImageUrl={project.imageUrl}
              startDate={project.startDate}
            />
          ))
        )}
      </div>
    </div>
  );
};

const ProjectCard = ({ projectTitle, projectImageUrl, startDate }) => {
  return (
    <div
      className="project-card"
      style={{
        minWidth: "15vmax",
        minHeight: "20vmax",
        maxWidth: "40vmax",
        maxHeight: "40vmax",
        background: "whitesmoke",
        borderRadius: "20px",
        margin: "20px 10px",

        boxShadow:
          " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div className="project-card-overlay">
        <Button>Open Project</Button>
      </div>
      <Image
        src={projectImageUrl}
        fallbackSrc={placeholderImage}
        alt="Test"
        w={[300, 400, 400]}
        h={[250, 200, 200]}
        style={{
          // maxWidth: "100%",
          objectFit: "cover",
          boxShadow: "0px 5px 20px rgb(10 129 171 / 32%)",
        }}
      />

      <Heading as="h3" size="lg">
        {projectTitle}
      </Heading>
      <span
        style={{
          textAlign: "center",
          fontSize: "0.9rem",
          color: "grey",
        }}
      >
        Started : {startDate}
      </span>
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
export default HomePage;
