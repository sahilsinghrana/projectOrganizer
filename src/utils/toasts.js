const errorToast = (toast, message) => {
  toast({
    title: message,
    status: "error",
    isClosable: true,
    duration: 3500,
    variant: "left-accent",
  });
};

const successToast = (toast, message) => {
  toast({
    title: message,
    status: "success",
    isClosable: true,
    duration: 3500,
    variant: "left-accent",
  });
};
export { errorToast, successToast };
