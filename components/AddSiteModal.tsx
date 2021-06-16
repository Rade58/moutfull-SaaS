/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC } from "react";

import { useForm } from "react-hook-form";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Input,
  // KORISTI SE ZA STATE MODALA
  useDisclosure,
} from "@chakra-ui/react";

const AddSiteModal: FC = ({ children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  // OVO IZGLEDA DA DAJE FUNCTIONALITY OUT OF THE BOX
  // handlesubmit je ZA ONO STA I GOVORI
  // (ALI OBEZBEDJIVACEMIU SE FUNKCIJA KOJU ZELIM, KAO ARGUMENT)
  // A register JE ZA REFERENCU FORM CONTROLE
  // ODNON OZA MULTIPLE CONTROLA
  const { register, handleSubmit } = useForm();

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: "gray.700" }}
        _active={{ bg: "gray.800", transform: "scale(0.95)" }}
      >
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(TODO)}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="My site"
                name="name"
                // REGISTRUJEMO FIELD DA BISMO MOGLI DA ACCESS-UJEMO VALUE
                ref={register("name", { required: true }).ref}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight="medium">
              Cancel
            </Button>
            <Button
              backgroundColor="#99FFFE"
              color="#194D4C"
              fontWeight="medium"
              type="submit"
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSiteModal;
