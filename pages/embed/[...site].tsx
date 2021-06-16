/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import { FunctionComponent } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import { Box } from "@chakra-ui/react";

import { getAllSites, getAllFeedback } from "../../lib/db-admin";

interface FeedbackPagePropsI {
  initialFeedback: any;
}

type paramsType = { siteId: string };

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

const EmbededFeedbackPage: FunctionComponent<FeedbackPagePropsI> = ({
  initialFeedback,
}) => {
  console.log({ initialFeedback });

  const { query } = useRouter();

  return <Box>Page ID: {query.siteId}</Box>;
};

export default EmbededFeedbackPage;

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
