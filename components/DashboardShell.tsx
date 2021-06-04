/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FunctionComponent } from "react";

import Link from "next/link";

import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Button,
  Flex,
  Link as ChakraLink,
  Avatar,
  Icon,
} from "@chakra-ui/react";

import { useAuth } from "@/lib/auth";

const DashboardShell: FunctionComponent = ({ children }) => {
  const { user } = useAuth();

  return (
    <Box backgroundColor="gray.100" h="100vh">
      <Flex
        backgroundColor="white"
        mb={[8, 16]}
        w="full"
        borderTop="5px solid #0AF5F4"
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          pt={4}
          pb={4}
          maxW="1250px"
          margin="0 auto"
          w="full"
          px={8}
          h="60px"
        >
          <Flex align="center">
            <Link href="/" passHref>
              <ChakraLink>
                <Icon name="logo" size="24px" mr={8} />
              </ChakraLink>
            </Link>
            <Link href="/sites" passHref>
              <ChakraLink mr={4}>Sites</ChakraLink>
            </Link>
            <Link href="/feedback" passHref>
              <ChakraLink>Feedback</ChakraLink>
            </Link>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            {user && (
              <Link href="/account" passHref>
                <Button as="a" variant="ghost" mr={2}>
                  Account
                </Button>
              </Link>
            )}
            <Avatar size="sm" src={user?.photoUrl} />
          </Flex>
        </Flex>
      </Flex>
      <Flex margin="0 auto" direction="column" maxW="1250px" px={[0, 8, 8]}>
        {children}
      </Flex>
    </Box>
  );
};

export default DashboardShell;
