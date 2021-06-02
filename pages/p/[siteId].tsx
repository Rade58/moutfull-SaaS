/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import { FunctionComponent } from "react";
import { useRouter } from "next/router";

import { Box } from "@chakra-ui/react";

const FeedbackPage: FunctionComponent = () => {
  const { query } = useRouter();

  return <Box>Page ID: {query.siteId}</Box>;
};

export default FeedbackPage;
