// React / Next / Chakra
import React from "react";
import { Box, VStack } from "@chakra-ui/layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Text,
  Grid,
  Tbody,
  Tr,
  Td,
  Table,
  Skeleton,
} from "@chakra-ui/react";

// Components
import { Layout } from "../../../components/Layout/Layout";
import { Jumbotron } from "../../../components/Jumbotron/Jumbotron";
import { Carousel } from "../../../components/Carousel/Carousel";
import { PersonCard } from "../../../components/PersonCard/PersonCard";

// Redux
import { fetchMovie } from "../../../redux/slices/movie/actions/fetchMovie";
import { wrapper } from "../../../redux/store";
import { Credits, MovieDetails } from "../../../redux/slices/movie/types";

// Local Files
import getImageUrl from "../../../utils/getImageUrl";

interface MovieProps {
  movie: {
    movieData: MovieDetails;
    movieCredits: Credits;
    loading: boolean;
  };
}

const Movie: React.FC<MovieProps> = ({ movie }) => {
  const { movieData, movieCredits, loading } = movie;

  return (
    <Layout>
      <Jumbotron
        img={getImageUrl(1280, movieData.backdrop_path)}
        loading={loading}
      >
        <Breadcrumb
          fontWeight="medium"
          color="gray.300"
          separator="|"
          fontSize="sm"
        >
          {movieData.genres.map(genre => (
            <BreadcrumbItem key={genre.id}>
              <BreadcrumbLink href="#">{genre.name}</BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
        <Heading fontWeight="black">{movieData.title}</Heading>
      </Jumbotron>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={6}
        mt="6"
      >
        <Box w="100%">
          {loading ? (
            <>
              <Skeleton mb="2" h="20px" w="20%" />
              <VStack align="flex-start">
                <Skeleton h="16px" w="100%" />
                <Skeleton h="16px" w="100%" />
                <Skeleton h="16px" w="100%" />
                <Skeleton h="16px" w="100%" />
                <Skeleton h="16px" w="70%" />
              </VStack>
            </>
          ) : (
            <>
              <Heading mb="2" size="sm">
                Descrption:
              </Heading>
              <Text lineHeight="1.2" textAlign="justify" color="gray.300">
                {movieData.overview}
              </Text>
            </>
          )}
        </Box>
        {loading ? (
          <Box w="100%" h="10" my={{ base: "10" }}>
            <VStack spacing="4" align="flex-start">
              <Skeleton h="20px" w="100%" />
              <Skeleton h="20px" w="100%" />
              <Skeleton h="20px" w="100%" />
            </VStack>
          </Box>
        ) : (
          <Box w="100%" h="10" my={{ base: "10" }}>
            <Table variant="unstyled" size="sm">
              <Tbody>
                <Tr>
                  <Td>
                    <Text fontWeight="black" color="gray.600">
                      Direction:
                    </Text>
                  </Td>
                  <Td>
                    {movieCredits.crew.find(
                      crewMember => crewMember.job === "Director"
                    ) &&
                      movieCredits.crew.find(
                        crewMember => crewMember.job === "Director"
                      ).name}
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Text fontWeight="black" color="gray.600">
                      Country:
                    </Text>
                  </Td>
                  <Td>
                    {movieData.production_countries &&
                      movieData.production_countries.map((country, i) =>
                        movieData.production_countries.length === i + 1
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
                  <Td>{movieData.release_date}</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        )}
      </Grid>
      <Carousel title="Cast" href={`/movie/${movieData.id}/cast`}>
        {loading
          ? [...Array(20)].map(item => (
              <PersonCard
                key={item}
                id={0}
                title=""
                subtitle=""
                img=""
                loading={true}
              />
            ))
          : movieCredits.cast &&
            movieCredits.cast.map(cast => (
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

export default Movie;

export const getServerSideProps = wrapper.getServerSideProps(
  store => async ({ params }) => {
    const { id } = params;

    await store.dispatch(fetchMovie({ id: id as string }));

    return {
      props: {
        movie: store.getState().movie.movieDetails,
      },
    };
  }
);
