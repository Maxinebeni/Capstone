import { authModalState } from "@/atoms/authModalAtom";
import { useDisclosure, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import ResetPassword from "./ResetPassword";

const AuthModal: React.FC = () => {
    const [modalState, setModalState] = useRecoilState(authModalState);
    const[user, loading, error] = useAuthState(auth);

    const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
};

useEffect(() => {
    if (user) handleClose();
    console.log("user", user)
  }, [user]);



  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}> {/* Use isOpen and onClose */}
        <ModalOverlay />
        <ModalContent
          width="400px" // Set width of the modal
          maxW="90vw" // Set maximum width of the modal
        position="absolute" // Position the modal absolutely
          top="10%" // Place the modal at 10% from the top
          left="50%" // Place the modal at 50% from the left
          transform="translateX(-50%)" // Center the modal horizontally
        >
          <ModalHeader textAlign= 'center'>
          {modalState.view === "login" && "Login"}
          {modalState.view === "signup" && "Sign Up"}
          {modalState.view === "resetPassword" && "Reset Password"}

          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" alignItems="center" justifyContent="center" pb={6}>
            <Flex direction= 'column' align= 'center' justify= 'center' width="70%" >
            {modalState.view == 'login' || modalState.view == 'signup'? (
            <>
            <OAuthButtons/>
            <Text color= "gray.500" fontWeight={800}>OR</Text>
            <AuthInputs/>
         </>
            ):(
                <ResetPassword/>     
            )}        
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
