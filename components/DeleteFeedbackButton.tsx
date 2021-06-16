/* eslint jsx-a11y/anchor-is-valid: 1 */
import React, { useState, useRef } from "react";
import type { FC } from "react";
import { mutate } from "swr";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { deleteFeedback } from "@/lib/db";

import { useAuth } from "@/lib/auth";

const DeleteFeedbackButton: FC<{ feedbackId: string }> = ({ feedbackId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const cancelRef = useRef<HTMLButtonElement>(null);

  const onClose = () => setIsOpen(false);

  const { user } = useAuth();

  const onDelete = () => {
    if (!user) return;

    deleteFeedback(feedbackId);

    // OVO NE ZNAM ZASTO JE OVDE S OBZIROM DA FEEDBACKS NISU CACHED
    // OVO TI GOVORIM, JER U FEEDBACK LOADED KAO PROPS
    // INSIDE getStaticProps
    mutate(
      // TAKODJE ROUTE /api/feedback TRENUTNO NE POSTOJI
      ["/api/feedback", user.token],
      async function (cachedFeedbacks: any[]) {
        return {
          feedback: cachedFeedbacks.filter((feedback) => {
            return feedback.id !== feedbackId;
          }),
        };
      },
      false
    );

    onClose();
  };

  return (
    <>
      <IconButton
        aria-label="Delete feedback"
        icon={<DeleteIcon />}
        variant="ghost"
        onClick={() => setIsOpen(true)}
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
