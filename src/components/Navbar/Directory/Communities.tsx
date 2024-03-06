import React, { useState } from "react";
import { Box, Flex, Icon, MenuItem, Text } from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";
import CreateCommunityModal from "@/components/Modal/CreateCommunity/CreateCommunityModal";
import MenuListItem from "./MenuListItem";
import { useRecoilValue } from "recoil";
import { communityState } from "@/atoms/communitiesAtom";
import { MdHealthAndSafety } from "react-icons/md";


type CommunitiesProps = {
};

const Communities: React.FC<CommunitiesProps> = () => {
    const [open, setOpen] = useState(false);
    const mySnippets = useRecoilValue(communityState).mySnippets;
  return(
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)}/>
      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
          COMMUNITIES CREATED
        </Text>
        {mySnippets.filter((snippet) => snippet.isModerator).map((snippet) => (
              <MenuListItem
                key={snippet.communityId}
                displayText={`${snippet.communityId}`}
                link={`/healthclique/${snippet.communityId}`}
                imageURL={snippet.imageURL}
                icon={MdHealthAndSafety}
                iconColor="brand.100"
              />
            ))}

        </Box>
      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
          COMMUNITIES JOINED
        </Text>
      <MenuItem width= "100%" fontSize={10} _hover={{bg: "gray.100"}}
        onClick={() => setOpen(true)}
      >
      <Flex align= "center">
        <Icon fontSize={20} mr ={2} as={GrAdd}/>
        Create Community
      </Flex>
      </MenuItem>  
      {mySnippets.map((snippet) => (
          <MenuListItem
            key={snippet.communityId}
            displayText={`${snippet.communityId}`}
            link={`/healthclique/${snippet.communityId}`}
            imageURL={snippet.imageURL}
            icon={MdHealthAndSafety}
            iconColor="blue.500"


          />
        ))}
   
      

</Box>
</>


  );
};
export default Communities;
