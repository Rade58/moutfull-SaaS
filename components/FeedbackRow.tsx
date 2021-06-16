/* eslint jsx-a11y/anchor-is-valid: 1 */
import React, { useState } from "react";
import type { FC } from "react";
import { Box, Code, Switch } from "@chakra-ui/react";
import { mutate } from "swr";

import { Td } from "./Table";
import { useAuth } from "@/lib/auth";
import { updateFeedback } from "@/lib/db";

import DeleteFeedbackButton from "./DeleteFeedbackButton";

import type { FeedbackDataI } from "@/lib/db-admin";

interface FeedbackRowPropsI {
  id: string;
  route?: string;
  author: FeedbackDataI["author"];
  text: FeedbackDataI["text"];
  status: FeedbackDataI["status"];
}

const FeedbackRow: FC<FeedbackRowPropsI> = ({
  id,
  author,
  text,
  status,
  route,
}) => {
  const { user } = useAuth();

  const isChecked = status === "active";

  const toggleFeedback = async () => {
    if (!user) return;

    await updateFeedback(id, { status: isChecked ? "pending" : "active" });
    // OVDE SE DOGADJA REVALIDATE
    mutate(["/api/feedback", user.token]);
  };

  return (
    <Box as="tr" key={id}>
      <Td fontWeight="medium">{author}</Td>
      <Td>{text}</Td>
      <Td>
        <Code>{route || "/"}</Code>
      </Td>
      <Td>
        <Switch color="green" onChange={toggleFeedback} isChecked={isChecked} />
      </Td>
      <Td>
        <DeleteFeedbackButton feedbackId={id} />
      </Td>
    </Box>
  );
};

export default FeedbackRow;
