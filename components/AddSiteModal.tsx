/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC } from "react";

// TREBAC MI POMENUTI mutate
import { mutate } from "swr";

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
  // KORISTI SE ZA STATE MODALA (LAKSI JE HANDLING STATE-A)
  useDisclosure,

  //
  useToast,
} from "@chakra-ui/react";

import { useAuth } from "@/lib/auth";

import { createSite } from "@/lib/db";

const AddSiteModal: FC = ({ children }) => {
  const { user } = useAuth();

  // STATE MODALA
  // FUNKCIJE onClose I onOpen USTVARI PODESVAJU isOpen
  // TO BE true OR false
  const { isOpen, onClose, onOpen } = useDisclosure();

  const toast = useToast();

  // OVO IZGLEDA DA DAJE FUNCTIONALITY OUT OF THE BOX
  // handlesubmit je ZA ONO STA I GOVORI
  // (ALI OBEZBEDJIVACEMIU SE FUNKCIJA KOJU ZELIM, KAO ARGUMENT)
  // A register JE ZA REFERENCU FORM CONTROLE
  // ODNON OZA MULTIPLE CONTROLA
  const { register, handleSubmit } = useForm();

  const onCreateSite = (params: { name: string; url: string }) => {
    if (!user) return;

    const { name, url } = params;

    const newSite = {
      authorId: user.uid,
      createdAt: new Date().toISOString(),
      name,
      url,
    };

    // OVDE JE NAPRAVLJEN NETWORK REQUEST
    const { id } = createSite(newSite);
    // UNDER THE HOOD OVA FUNKCIJA NE AWAIT-UJE DA SE NETWORK REQUEST
    // IZVRSI, ONA SALJE DATA, SA KOJIMA SE PRAVI NOVI SITE

    toast({
      title: "Success!",
      description: "We've added your site.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    // OVDE NECE BITI NAPRAVLJEN NOVI NETWORK REQUEST
    // KORISTIM OVDE mutate, KAKO BI RAKO SVIM
    // useSwr-OVIMA, KOJI KORISTE KLJUC:
    //                ["/api/sites",  "user-ov jwt token"]
    // DRUGI ARGUMENT mutate-A JE FUNKCIJA, KOJOM CEMO MUTATE-OVATI CACHE
    mutate(
      ["/api/sites", user.token],
      async (oldCachedData: { sites: any[] }) => {
        // OBICNO DATA RESPONSE, JE U FORMATU {sites: ...}
        return {
          sites: [{ id, ...newSite }, ...oldCachedData.sites],
        };
      },
      // REVALIDATIO NCE BITI false
      false
    );

    // GOVORIM ODA SE MODAL ZATVORI
    onClose();
  };

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
        {/* OVDE POZIVAMO onCreateSite */}
        <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
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
