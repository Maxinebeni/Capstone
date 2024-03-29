import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, Button, MenuList, MenuItem, Icon, Flex, MenuDivider } from "@chakra-ui/react";
import { User, signOut } from "firebase/auth";
import { set } from "firebase/database";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { Text } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { auth } from "@/firebase/clientApp";
import { authModalState } from "@/atoms/authModalAtom";
import { IoPerson } from "react-icons/io5";
import { communityState } from "@/atoms/communitiesAtom";



type UserMenuProps ={

user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({user})  =>{
    const setAuthModalState = useSetRecoilState(authModalState);
    const resetCommunityState = useResetRecoilState(communityState);


    const logout = async () => {
      await signOut(auth);
      resetCommunityState();
    };
  




    return(
      <Menu>
        <MenuButton cursor='pointer' padding ='0px 6px' borderRadius={4} _hover={{outline: '1px solid', outlineColor: 'blue.200'}}>
        <Flex align= 'center'>
                <Flex align= 'center'>
            {user? (
                <>
                <Icon fontSize={20} as={IoPerson } mr ={1} color="gray.600"
                />
                <Flex          
                  display={{ base: "none", lg: "flex" }}
                  direction="column"
                  fontSize="8pt"
                  alignItems="flex-start"
                  mr={8}
                >
                  <Text 
                  fontWeight={700}>
                    {user?.displayName || user?.email?.split("@")[0]}
                  </Text>
                </Flex>
                </>
            ): (
                <Icon fontSize={24} color= 'gray.400' mr={1} as={VscAccount}/>
            )
            }
              </Flex>
              <ChevronDownIcon/>
               </Flex>
            </MenuButton>
            <MenuList>
            {user? (
                <>
                <MenuItem
                fontSize="10pt"
                fontWeight={700}
                _hover={{bg: "blue.500", color: "white"}}
                >
                <Flex align= "center" >
                <Icon fontSize={20} mr={2} as={CgProfile}/>
                Profile        
                    </Flex>
                    </MenuItem>
                    <MenuDivider/>
                    <MenuItem
                fontSize="10pt"
                fontWeight={700}
                _hover={{bg: "blue.500", color: "white"}}
                onClick={logout} 
                >
                <Flex align= "center" >
                <Icon fontSize={20} mr={2} as={MdOutlineLogin}/>
                Log Out 
                    </Flex>
                    </MenuItem>
                </>
            ): (
                <>
                <MenuItem
                fontSize="10pt"
                fontWeight={700}
                _hover={{bg: "blue.500", color: "white"}}
                onClick={() => setAuthModalState({open:true, view: "login"}) }
                >
                <Flex align= "center" >
                <Icon fontSize={20} mr={2} as={CgProfile}/>
                Login/Sign Up        
                    </Flex>
                    </MenuItem>
                    </>
            )}
 </MenuList>
</Menu>

    );
};
export default UserMenu;









