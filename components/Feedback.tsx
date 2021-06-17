/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import { FunctionComponent } from "react";
import { Box, Heading, Text, Divider } from "@chakra-ui/react";
import { format, parseISO } from "date-fns";

import { FeedbackDataI, FeedbackNormalizedDataI } from "@/lib/db-admin";

// import DeleteFeedbackButton from "@/components/DeleteFeedbackButton";
// import FeedbckRow from './FeedbackRow'

/* interface FeedbackPropsI {
  id: string;
  author: FeedbackDataI["author"];
  text: FeedbackDataI["text"];
  createdAt: FeedbackDataI["createdAt"];
} */

const Feedback: FunctionComponent<FeedbackNormalizedDataI> = ({
  author,
  text,
  createdAt,
  id,
}) => {
  return (
    <Box borderRadius={4} maxWidth="700px" w="full">
      <Heading size="sm" as="h3" mb={0} color="gray.900" fontWeight="medium">
        {author}
      </Heading>
      <Text color="gray.500" mb={4} fontSize="xs">
        {format(parseISO(createdAt), "PPpp")}
      </Text>
      <Text color="gray.800">{text}</Text>
      {/* <DeleteFeedbackButton feedbackId={id} /> */}
      {/* <FeedbckRow id={id} author={author} text={text}  /> */}
      <Divider
        borderColor="gray.200"
        backgroundColor="gray.200"
        mt={8}
        mb={8}
      />
    </Box>
  );
};

export default Feedback;
