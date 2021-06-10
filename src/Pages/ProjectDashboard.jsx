import { Heading } from "@chakra-ui/layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Organizer from "../Components/project/Organizer";
import Tasks from "../Components/project/Tasks";
import { db } from "../firebase/config";

const ProjectDashboard = () => {
  let { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState();
  useEffect(() => {
    db.collection("projects")
      .doc(projectId)
      .get()
      .then((response) => {
        setProjectDetails(response.data());
        console.log(response.data());
      });
  }, []);

  return (
    <div style={{}}>
      <Heading
        as="h2"
        size="xl"
        textColor="white"
        letterSpacing="wide"
        paddingX="8"
        marginBottom="4"
        style={{ textShadow: "1px 3px 5px rgba(0,0,0,0.8)" }}
      >
        {projectDetails?.projectName} &nbsp;
        <span
          style={{
            fontSize: "1rem",
            textShadow: "none",
            fontWeight: "lighter",
            color: "teal",
            letterSpacing: "unset",
          }}
        >
          {projectDetails?.projectDescription}
        </span>
      </Heading>
      <Tabs>
        <TabList overflow="auto" overflowY="hidden">
          <Tab>Organizer</Tab>
          <Tab>Tasks</Tab>
          <Tab>Poll</Tab>
          <Tab>Lucky Option</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Organizer projectId={projectId} />
          </TabPanel>
          <TabPanel>
            <Tasks projectId={projectId} />
          </TabPanel>
          <TabPanel>{/* Poll Component */}</TabPanel>
          <TabPanel>{/* Lucky Options Component */}</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default ProjectDashboard;
