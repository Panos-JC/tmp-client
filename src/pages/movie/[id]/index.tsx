import React from "react";
import { useRouter } from "next/router";
import { Layout } from "../../../components/Layout/Layout";
import { Box } from "@chakra-ui/layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Heading,
  HStack,
  Text,
  Grid,
  Tbody,
  Tr,
  Td,
  Table,
} from "@chakra-ui/react";
import { IoMdCheckmark } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import { Jumbotron } from "../../../components/Jumbotron/Jumbotron";
import { fetchMovie } from "../../../redux/slices/movie/actions/fetchMovie";
import { Carousel } from "../../../components/Carousel/Carousel";
import { PersonCard } from "../../../components/PersonCard/PersonCard";
import getImageUrl from "../../../utils/getImageUrl";
import { GetServerSideProps } from "next";
import { wrapper } from "../../../redux/store";
import { Credits, MovieDetails } from "../../../redux/slices/movie/types";

interface MovieProps {
  movieDetails: MovieDetails;
  movieCredits: Credits;
}

const Movie: React.FC<MovieProps> = ({ movieDetails, movieCredits }) => {
  const router = useRouter();

  const loading = router.isFallback;

  return (
    <Layout>
      <Jumbotron
        img={getImageUrl(1280, movieDetails.backdrop_path)}
        loading={loading}
      >
        <Breadcrumb
          fontWeight="medium"
          color="gray.300"
          separator="|"
          fontSize="sm"
        >
          {movieDetails.genres.map(genre => (
            <BreadcrumbItem key={genre.id}>
              <BreadcrumbLink href="#">{genre.name}</BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
        <Heading fontWeight="black">{movieDetails.title}</Heading>
        <HStack spacing="6">
          <Button
            leftIcon={<FaPlay />}
            w="160px"
            iconSpacing="10%"
            bg="rgba(34, 38, 54, 0.7)"
            size="sm"
          >
            Watch Trailer
          </Button>
          <Button
            leftIcon={<IoMdCheckmark />}
            w="160px"
            iconSpacing="10%"
            bg="rgba(34, 38, 54, 0.7)"
            size="sm"
          >
            Mark as Seen
          </Button>
        </HStack>
      </Jumbotron>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={6}
        mt="6"
      >
        <Box w="100%">
          <Heading mb="2" size="sm">
            Descrption:
          </Heading>
          <Text lineHeight="1.2" textAlign="justify" color="gray.300">
            {movieDetails.overview}
          </Text>
        </Box>
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
                  {movieDetails.production_countries &&
                    movieDetails.production_countries.map((country, i) =>
                      movieDetails.production_countries.length === i + 1
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
                <Td>{movieDetails.release_date}</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Grid>
      <Carousel title="Cast" href={`/movie/${movieDetails.id}/cast`}>
        {movieCredits.cast &&
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

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  store => async ({ params }) => {
    const { id } = params;

    await store.dispatch(fetchMovie({ id: id as string }));

    return {
      props: {
        movieDetails: store.getState().movie.movieDetails.movieData,
        movieCredits: store.getState().movie.movieDetails.movieCredits,
      },
    };
  }
);

export default Movie;
