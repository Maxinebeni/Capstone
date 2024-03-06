import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, ModalFooter, Text, Input} from "@chakra-ui/react";
import React, { useState } from "react";

type CreateDatabaseModalProps= {
    open: boolean;
    handleClose: () => void;
};

const CreateDatabaseModal: React.FC<CreateDatabaseModalProps> = ({  open, handleClose }) => { 
    const [articleName, setArticleName] = useState(""); // State for article name
    const [articleLink, setArticleLink] = useState(""); // State for article link
    const [file, setFile] = useState<File | null>(null); // State for uploaded file

    // Function to handle file upload
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];
        setFile(selectedFile);
    };

    // Function to handle article name input
    const handleArticleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setArticleName(event.target.value);
    };

    // Function to handle article link input
    const handleArticleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setArticleLink(event.target.value);
    };

    // Function to handle form submission
    const handleSubmit = () => {
        // Process the submitted article name, link, and file
        console.log("Article Name:", articleName);
        console.log("Article Link:", articleLink);
        console.log("File:", file);
        handleClose(); // Close the modal after submission
    };

    return (
        <>
            <Modal isOpen={open} onClose={handleClose} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add an article to the Database</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Article Name</FormLabel>
                            <Input value={articleName} onChange={handleArticleNameChange} placeholder="Enter article name" />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Article Link</FormLabel>
                            <Input value={articleLink} onChange={handleArticleLinkChange} placeholder="Enter article link" />
                        </FormControl>
                        <Text fontSize={30} fontWeight={500} color="gray.500"> OR</Text>
                        <FormControl mt={4}>
                            <FormLabel>Upload Article (PDF)</FormLabel>
                            <Input type="file" onChange={handleFileUpload} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="solid" height="30px" onClick={handleSubmit}>Save</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreateDatabaseModal;
