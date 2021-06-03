/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC } from "react";
import { Box, Text } from "@chakra-ui/react";
import type { TextProps, BoxProps } from "@chakra-ui/react";

export const Th: FC<TextProps> = (props) => {
  return (
    <Text
      as="th"
      textTransform="uppercase"
      fontSize="xs"
      color="gray.500"
      fontWeight="medium"
      px={4}
      {...props}
    />
  );
};

export const Td: FC<BoxProps> = (props) => {
  return (
    <Box
      as="td"
      color="gray.900"
      p={4}
      borderBottom="1px solid"
      borderBottomColor="gray.100"
      {...props}
    />
  );
};

export const Tr: FC<BoxProps> = (props) => {
  return (
    <Box
      as="tr"
      backgroundColor="gray.50"
      borderTopLeftRadius={8}
      borderTopRightRadius={8}
      borderBottom="1px solid"
      borderBottomColor="gray.200"
      height="40px"
      {...props}
    />
  );
};

export const Table: FC<BoxProps> = (props) => {
  return (
    <Box
      as="table"
      textAlign="left"
      backgroundColor="white"
      mx={0}
      borderRadius={8}
      boxShadow="0px 4px 10px rgba(0,0,0,0.08)"
      {...props}
    />
  );
};
