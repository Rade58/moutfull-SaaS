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
      <Table w="full">
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Site Link</Th>
            <Th>Feedback Link</Th>
            <Th>Daata Added</Th>
            <Th width="50px">{""}</Th>
          </Tr>
        </thead>
        <tbody>
          {sites.map(({ name, url, userId, createdAt, id }) => {
            return (
              <Box as="tr" key={id}>
                <Td fontWeight="medium">{name}</Td>
                <Td>
                  <ChakraLink href={url}>{url}</ChakraLink>
                </Td>
                <Td>
                  <Link href={`/p/${id}`} passHref>
                    <ChakraLink color="blue.500" fontWeight="medium">
                      View Feedback
                    </ChakraLink>
                  </Link>
                </Td>
                <Td>{format(parseISO(createdAt), "PPpp")}</Td>
              </Box>
            );
          })}
        </tbody>
      </Table>
    </Box>
  );
};

export default SiteTable;
