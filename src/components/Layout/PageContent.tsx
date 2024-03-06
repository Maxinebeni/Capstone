import React from "react";
import { Box, Flex } from "@chakra-ui/react";

interface PageContentProps {
  maxWidth?: string;
  children: React.ReactNode; // Define the children prop
}

const PageContent: React.FC<PageContentProps> = ({ children, maxWidth }) => {
  console.log("Here are Children", children);

  const childrenArray = React.Children.toArray(children);

  return (
    <Flex justify="center" p="16px 0px">
      <Flex width="95%" justify="center" maxWidth={maxWidth || "860px"}>
        <Flex
          direction="column"
          width={{ base: "100%", md: "65%" }}
          mr={{ base: 0, md: 6 }}
        >
          {childrenArray && childrenArray[0]}
        </Flex>
        {/* Right Content */}
        <Box
          display={{ base: "none", md: "flex" }}
          flexDirection="column"
          flexGrow={1}
        >
          {childrenArray && childrenArray[1]}
        </Box>
      </Flex>
    </Flex>
  );
};

export default PageContent;
