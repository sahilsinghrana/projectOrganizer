import { CircularProgress } from "@chakra-ui/react";

const Loader = () => {
  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        background: "rgba(0,0,0,0.8)",
        zIndex: "100",
        top: 0,
        left: 0,
        // opacity: 0.1,
      }}
    >
      <CircularProgress
        isIndeterminate
        color="green.300"
        style={{
          justifyContent: "center",
          top: "55vh",
          left: "48vw",
          position: "sticky",
        }}
        size={20}
      />
    </div>
  );
};
export default Loader;
