/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import { FunctionComponent } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
// import { useRouter } from "next/router";

import { Box, Text } from "@chakra-ui/react";

import { getAllSites, getAllFeedback } from "@/lib/db-admin";

import type { FeedbackNormalizedDataI } from "@/lib/db-admin";

import Feedback from "@/components/Feedback";

interface EmbededFeedbackPagePropsI {
  feedback: FeedbackNormalizedDataI[];
}

// TYPE-OVAO SAM OVO KAO ARRAY OD STRINGS
// JER BI TREBALO DA IMAS ATRRAY
// KADA SE RADI O CATCH ALL ROUTES
// DAKLI SVAKI OD ROUTE-OVA CE BITI U ARRAY-U
// KADA
type paramsType = { site: string[] };

export const getStaticPaths: GetStaticPaths<paramsType> = async (ctx) => {
  try {
    const { sites } = await getAllSites();

    const paths = sites.map((site: { id: string /*, ostalo */ }) => {
      return {
        params: {
          // KADA SU U PITNJU CATCH ALL ROUTES
          // OVDE SE MORA OBEZBEDITI ARRAY
          // A DAJES PARMAETAR, ONAKO KAKO TI SE ZOVE FILE
          // [...site].tsx
          site: [site.id.toString()],
        },
      };
    });

    return {
      paths: paths,
      fallback: true,
    };
  } catch (error) {
    // throw new Error("Something went wrong with getting sites");
    return {
      paths: [],
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps<
  EmbededFeedbackPagePropsI,
  paramsType
> = async (ctx) => {
  const { params } = ctx;

  if (!params || (params && !params.site)) {
    throw new Error("params, or sites not existing");
  }

  try {
    // KADA SU U PITANJU CATCH ALL ROUTES, TREBA DA DOBIJAS ARRAY
    // DAKLE U ARRAY-U JE SVAKI OD
    // DAKLE KOLIKO GOT CATCH ALL ROUTES
    // SVE TE ROUTES CE BITI DEO OVOG ARRAY-A
    const [siteId, posibleRoute] = params.site;

    const { feedback } = await getAllFeedback(siteId, posibleRoute);

    return {
      props: {
        feedback,
      },
      revalidate: 1,
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        feedback: [],
      },
      revalidate: 1,
    };
  }
};

const EmbededFeedbackPage: FunctionComponent<EmbededFeedbackPagePropsI> = ({
  feedback,
}) => {
  console.log({ feedback });

  // const { query } = useRouter();

  return (
    <Box display="flex" flexDirection="column" width="full">
      {feedback && feedback.length ? (
        feedback.map(({ id, ...restOfOneFeedback }) => {
          return <Feedback key={id} id={id} {...restOfOneFeedback} />;
        })
      ) : (
        <Text>There are no comments for this site.</Text>
      )}
    </Box>
  );
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
