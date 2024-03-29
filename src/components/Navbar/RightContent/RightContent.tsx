import { Button, Flex } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons";
import AuthModal from "@/components/Modal/Auth/AuthModal";
import { User, signOut } from "firebase/auth";
import { auth } from "@/firebase/clientApp";
import Icons from "./Icons";
import UserMenu from "./UserMenu";


type RightContentProps = {
    user?: User | null;
  };
  
  const RightContent: React.FC<RightContentProps> = ({user}) => {
    return (
      <>
      <AuthModal/>
      <Flex justify="center" alignItems="center">
      {user? <Icons/>: <AuthButtons/>
  }
    <UserMenu user = {user}/>
      </Flex>
            </>

);
};
export default RightContent;
  
