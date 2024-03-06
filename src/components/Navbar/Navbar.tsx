import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import Directory from "./Directory/Directory";
import DatabaseDirectory from "./Directory/DatabaseDirectory";
import useDirectory from "@/hooks/useDirectory";
import { defaultMenuItem } from "@/atoms/directoryMenuAtom";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory(); // Call the useDirectory hook to get the returned object

  return (
    <Flex bg="white" height="44px" padding="6px 12px" justify={{ md: "space-between" }} mr={{ base: 0, md: 2 }}>
      <Flex
        align="center"
        width={{ base: "40px", md: "auto" }}
        onClick={() => onSelectMenuItem(defaultMenuItem)}
        cursor="pointer"
      >
        <Image src="/images/2.png" height="30px" />
        <Image
          src="/images/3.png"
          height="46px"
          display={{ base: "none", md: "unset" }}
        />
      </Flex>
      {user && <Directory />}
      {user && <DatabaseDirectory />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  );
};

export default Navbar;
