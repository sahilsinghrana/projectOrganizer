import { useParams } from "react-router-dom";

const ProjectSubCategory = () => {
  const { projectId, statusName } = useParams();
  return (
    <div>
      <span>Project Sub category</span>
    </div>
  );
};

export default ProjectSubCategory;
