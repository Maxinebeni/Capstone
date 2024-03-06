import React, { useState } from "react";
import { Box, Divider, Flex, Icon, MenuItem, Text } from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";
import CreateDatabaseModal from "@/components/Modal/DatabaseModal/CreateDatabaseModal";

type DatabaseProps = {};

const Database: React.FC<DatabaseProps> = () => {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  return (
    <>
      <CreateDatabaseModal open={open} handleClose={() => setOpen(false)} />
      <MenuItem
        width="100%"
        fontSize={10}
        _hover={{ bg: "gray.100" }}
        onClick={handleOpenModal} // Handle click event to open modal
      >
        <Flex align="center">
          <Icon fontSize={20} mr={2} as={GrAdd} />
          Add Resources
        </Flex>
      </MenuItem>
      <Divider />
      <MenuItem
        width="100%"
        fontSize={10}
        _hover={{ bg: "gray.100" }}
      >
        <Flex align="center">
          <Icon fontSize={20} mr={2} as={GrAdd} />
          See Resources
        </Flex>
      </MenuItem>
    </>
  );
};

export default Database;
