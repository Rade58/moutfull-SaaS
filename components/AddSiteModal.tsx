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
  // A register JE ZA REFERENCU FORM CONTROLE
  // ODNON OZA MULTIPLE CONTROLA
  const { register, handleSubmit } = useForm();

  return (
    <>
      <Button>{children}</Button>
      <Modal></Modal>
    </>
  );
};

export default AddSiteModal;
