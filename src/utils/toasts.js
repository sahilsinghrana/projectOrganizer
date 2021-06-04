const errorToast = (toast, message) => {
  toast({
    title: message,
    status: "error",
    isClosable: true,
    duration: 5000,
    variant: "left-accent",
  });
};

const successToast = (toast, message) => {
  toast({
    title: message,
    status: "success",
    isClosable: true,
    duration: 5000,
    variant: "left-accent",
  });
};
export { errorToast, successToast };
