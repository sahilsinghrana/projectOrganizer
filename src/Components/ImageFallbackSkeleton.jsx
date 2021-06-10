import { Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { memo } from "react";
const ImageFallbackSkeleton = () => {
  return (
    <Stack w={[150, 250, 250]} h={[100, 200, 200]}>
      <Skeleton h="20%" w="100%" />
      <Skeleton h="20%" w="100%" />
      <Skeleton h="20%" w="100%" />
      <Skeleton h="20%" w="100%" />
      <Skeleton h="20%" w="100%" />
    </Stack>
  );
};

export default memo(ImageFallbackSkeleton);
