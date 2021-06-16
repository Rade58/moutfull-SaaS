/* eslint jsx-a11y/anchor-is-valid: 1 */
import React, { useState, useRef } from "react";
import type { FC } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  IconButton,
  Button,
  Icon,
} from "@chakra-ui/react";

const DeleteFeedbackButton: FC<{ feedbackId: string }> = ({ feedbackId }) => {
  const [isOpen, setIsopen] = useState<boolean>(false);

  const cancelRef = useRef<HTMLButtonElement>(null);

  const onClose = () => setIsopen(false);

  const onDelete = () => {
    // TODO

    onClose();
  };

  return (
    <>
      <IconButton
        aria-label="Delete feedback"
        icon={<Icon type="delete" />}
        variant="ghost"
        onClick={() => setIsopen(true)}
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Feedback
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure? You can{"'t"} undo this action aftewards.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              fontWeight="bold"
              variantColor="red"
              ml={3}
              onClick={onDelete}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteFeedbackButton;
