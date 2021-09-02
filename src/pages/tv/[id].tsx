import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Grid,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { Carousel } from "../../components/Carousel/Carousel";
import { Jumbotron } from "../../components/Jumbotron/Jumbotron";
import { Layout } from "../../components/Layout/Layout";
import { PersonCard } from "../../components/PersonCard/PersonCard";
import { fetchTv } from "../../redux/slices/tv/actions/fetchTv";
import { TvCredits, TvDetails } from "../../redux/slices/tv/types";
import { wrapper } from "../../redux/store";
import getImageUrl from "../../utils/getImageUrl";

interface TvShowProps {
  tvDetails: TvDetails;
  tvCredits: TvCredits;
}

const TvShow: React.FC<TvShowProps> = ({ tvDetails, tvCredits }) => {
  const router = useRouter();

  const loading = router.isFallback;

  return (
    <Layout>
      <Jumbotron
        loading={loading}
        img={getImageUrl(1280, tvDetails ? tvDetails.backdrop_path : "")}
      >
        <Breadcrumb
          fontWeight="medium"
          color="gray.300"
          separator="|"
          fontSize="sm"
        >
          {tvDetails &&
            tvDetails.genres.map(genre => (
              <BreadcrumbItem key={genre.id}>
                <BreadcrumbLink href="#">{genre.name}</BreadcrumbLink>
              </BreadcrumbItem>
            ))}
        </Breadcrumb>
        <Heading fontWeight="black">{tvDetails.name}</Heading>
        <Text w="50%">{tvDetails.overview.slice(0, 200) + "..."}</Text>
        <Heading size="xs" fontWeight="black" mt="6">
          Seasons:
        </Heading>
        <Wrap spacing="3">
          {tvDetails &&
            tvDetails.seasons.map(season => (
              <WrapItem key={season.id}>
                <Button
                  w="140px"
                  iconSpacing="10%"
                  bg="rgba(34, 38, 54, 0.7)"
                  size="sm"
                >
                  {season.name}
                </Button>
              </WrapItem>
            ))}
        </Wrap>
      </Jumbotron>
      <Grid templateColumns="repeat(2, 1fr)" gap={6} mt="6">
        <Box w="100%">
          <Heading mb="2" size="sm">
            Descrption:
          </Heading>
          <Text lineHeight="1.2" textAlign="justify" color="gray.300">
            {tvDetails.overview}
          </Text>
        </Box>
        <Box w="100%" h="10">
          <Table variant="unstyled" size="sm">
            <Tbody>
              <Tr>
                <Td>
                  <Text fontWeight="black" color="gray.600">
                    Created by:
                  </Text>
                </Td>
                <Td>
                  {tvDetails.created_by.map((person, i) =>
                    tvDetails.created_by.length === i + 1
                      ? person.name
                      : `${person.name}, `
                  )}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Text fontWeight="black" color="gray.600">
                    Country:
                  </Text>
                </Td>
                <Td>
                  {tvDetails.production_countries &&
                    tvDetails.production_countries.map((country, i) =>
                      tvDetails.production_countries.length === i + 1
                        ? country.iso_3166_1
                        : `${country.iso_3166_1}, `
                    )}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Text fontWeight="black" color="gray.600">
                    Release Date:
                  </Text>
                </Td>
                <Td>{tvDetails.first_air_date}</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Grid>
      <Carousel title="Cast">
        {tvCredits.cast &&
          tvCredits.cast.map(cast => (
            <PersonCard
              key={cast.id}
              title={cast.name}
              subtitle={cast.character}
              img={getImageUrl(185, cast.profile_path)}
              id={cast.id}
            />
          ))}
      </Carousel>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  store => async ({ params }) => {
    const { id } = params;

    await store.dispatch(fetchTv({ id: id as string }));

    return {
      props: {
        tvDetails: store.getState().tv.tvDetails.tvData,
        tvCredits: store.getState().tv.tvDetails.tvCredits,
      },
    };
  }
);

export default TvShow;
