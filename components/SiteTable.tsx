/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import Link from "next/link";
import { Link as ChakraLink, Box } from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import type { FC } from "react";
import type { SiteNormalizedDataI } from "@/lib/db-admin";
import { Table, Tr, Th, Td } from "@/components/Table";

const SiteTable: FC<{ sites: SiteNormalizedDataI[] }> = ({ sites }) => {
  return (
    <Box overflowX="scroll">
      <Table></Table>
    </Box>
  );
};

export default SiteTable;
