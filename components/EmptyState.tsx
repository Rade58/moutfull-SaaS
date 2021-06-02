/* eslint jsx-a11y/anchor-is-valid: 1 */
import React, { FunctionComponent } from "react";
import { Box, Heading, Stack, Text, Button } from "@chakra-ui/react";

const EmptyState: FunctionComponent = () => {
  return (
    <Box
      backgroundColor="white"
      mx={0}
      borderRadius={8}
      boxShadow="0px 4px 10px rgba(0,0,0,0.05)"
    >
      <Box
        backgroundColor="gray.50"
        borderTopLeftRadius={8}
        borderTopRightRadius={8}
        borderBottom="1px solid"
        borderBottomColor="gray.200"
        height={38}
      />
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={2}
        p={16}
        borderRadius={8}
      >
        <Heading size="lg">Add some sites...You don`t have any yet</Heading>
        <Text>
          Hello {/* eslint-disable-next-line */}
          <Text as="span" role="img" aria-label="waving hand">
            👋🏾
          </Text>{" "}
          Let`s get started
        </Text>
        <Button
          maxWidth="200px"
          backgroundColor="gray.900"
          color="white"
          mt={4}
          _hover={{ bg: "gray.700" }}
          _acctive={{
            bg: "gray.800",
            transform: "scale(0.94)",
          }}
        >
          Add your firs site
        </Button>
      </Stack>
    </Box>
  );
};

export default EmptyState;
