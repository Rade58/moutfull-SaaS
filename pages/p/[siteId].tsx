/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FunctionComponent, SyntheticEvent } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useRef, useState } from "react";
import { useRouter } from "next/router";

import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

import { createFeedback } from "@/lib/db";

import { getAllSites, getAllFeedback } from "@/lib/db-admin";
import type { FeedbackNormalizedDataI, FeedbackDataI } from "@/lib/db-admin";

import { useAuth } from "@/lib/auth";

import Feedback from "@/components/Feedback";

interface FeedbackPagePropsI {
  initialFeedback?: FeedbackDataI[];
}

type paramsType = { siteId: string };

// PAGE
// ------------------------------------------------------------
const FeedbackPage: FunctionComponent<FeedbackPagePropsI> = ({
  initialFeedback,
}) => {
  const { user } = useAuth();
  const { query } = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [allFeedback, setAllFeedback] =
    useState<FeedbackDataI[] | undefined>(initialFeedback);

  console.log({ query });

  const submitFeedback = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!user) return;
    if (!inputRef.current) return;
    if (!inputRef.current.value) return;

    const newFeedback = {
      author: user.name,
      authorId: user.uid,
      createdAt: new Date().toISOString(),
      provider: user.provider,
      siteId: query.siteId as string,
      text: inputRef.current.value.trim(),
      status: "pending",
    };

    createFeedback(newFeedback).then((doc) => {
      console.log({ doc });

      if (inputRef.current?.value) {
        inputRef.current.value = "";
      }

      setAllFeedback((prevFeedback) => {
        if (!prevFeedback) return [newFeedback];
        return [...prevFeedback, newFeedback];
      });
    });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="full"
      maxWidth="700px"
      margin="0 auto"
      border="1px solid crimson"
    >
      {user && (
        <Box as="form" onSubmit={submitFeedback}>
          <FormControl my={8}>
            <FormLabel htmlFor="comment">Comment</FormLabel>
            <Input ref={inputRef} id="comment" placeholder="Leave a comment" />
            <Button type="submit" fontWeight="medium" mt={4}>
              Add Comment
            </Button>
          </FormControl>
        </Box>
      )}
      {allFeedback &&
        allFeedback.map(({ author, createdAt, text }, i) => {
          return (
            <Feedback
              key={
                `${i}${createdAt.toLocaleLowerCase()}` ||
                new Date().getTime().toString()
              }
              author={author}
              createdAt={createdAt}
              text={text}
            />
          );
        })}
    </Box>
  );
};
// --------------------------------------------------------

export const getStaticPaths: GetStaticPaths<paramsType> = async (ctx) => {
  const { sites } = await getAllSites();

  const paths = sites.map((site: { id: string /*, ostalo */ }) => {
    return {
      params: {
        siteId: site.id,
      },
    };
  });

  return {
    paths: paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<FeedbackPagePropsI, paramsType> =
  async (ctx) => {
    const { params } = ctx;

    const { feedback } = await getAllFeedback(params?.siteId);

    return {
      props: {
        initialFeedback: feedback,
      },
      revalidate: 1,
    };
  };

export default FeedbackPage;

// We use getStaticProps to fetch all the feedback for the site,
//  given the siteId forwarded by the dynamic route.
//  We forward that information to the component via a prop.

// We use getStaticPaths to create a page for each site.
//  If a page has not been created for a site (for example,
//  a brand new site) and the user visits the route,
//  we should generate the site on the fly.
//  This is controlled by the fallback value of true.

// We define a revalidation period of one second with revalidate.
//  Every feedback page is built statically at build time.
//  Then, when a request comes in after the revalidation period,
//  getStaticProps is re-ran behind the scenes.
//  If it completes successfully, the page is replaced
//  and updated in the cache.
//  This ensures you never have downtime and always serve
//  a static HTML file.
