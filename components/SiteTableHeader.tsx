/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC } from "react";
import {
  Box,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
} from "@chakra-ui/react";

const SiteTableHeader: FC<{ isPaidAccount: boolean }> = ({ isPaidAccount }) => {
  return (
    <Box mr={4}>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink>Sites</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justifyContent="space-between">
        <Heading mb={8}>My Sites</Heading>
      </Flex>
    </Box>
  );
};

export default SiteTableHeader;

/*


<Button
          backgroundColor="gray.900"
          color="white"
          fontWeight="medium"
          _hover={{ bg: "gray.700" }}
          _active={{
            bg: "gray.800",
            transform: "scale(0.94)",
          }}
        >
          + Add Site
        </Button>


*/
