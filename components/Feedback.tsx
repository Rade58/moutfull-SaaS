/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import { FunctionComponent } from "react";
import { Box, Heading, Text, Divider } from "@chakra-ui/react";
import { format, parseISO } from "date-fns";

import { FeedbackDataI } from "@/lib/db-admin";

const Feedback: FunctionComponent<FeedbackDataI> = ({
  author,
  text,
  createdAt,
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
