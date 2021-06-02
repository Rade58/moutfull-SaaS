/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC } from "react";
import { Box, Skeleton } from "@chakra-ui/react";

import { Table, Td, Th, Tr } from "@/components/Table";

const SkelletonRow: FC<{ width: string }> = ({ width }) => {
  return (
    <Box as="tr">
      <Td>
        <Skeleton height="10px" w={width} my={4} />
      </Td>
      <Td>
        <Skeleton height="10px" w={width} my={4} />
      </Td>
      <Td>
        <Skeleton height="10px" w={width} my={4} />
      </Td>
      <Td>
        <Skeleton height="10px" w={width} my={4} />
      </Td>
    </Box>
  );
};

const SiteTableSkelleton: FC = () => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Feedback Line</Th>
          <Th>Date Added</Th>
          <Th>{""}</Th>
        </Tr>
      </thead>
      <tbody>
        <SkelletonRow width="75px" />
        <SkelletonRow width="125px" />
        <SkelletonRow width="50px" />
        <SkelletonRow width="100px" />
        <SkelletonRow width="75px" />
      </tbody>
    </Table>
  );
};

export default SiteTableSkelleton;
