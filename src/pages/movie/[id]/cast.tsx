import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { Jumbotron } from "../../../components/Jumbotron/Jumbotron";
import { Layout } from "../../../components/Layout/Layout";
import { Credits, MovieDetails } from "../../../redux/slices/movie/types";
import { wrapper } from "../../../redux/store";
import {
  Heading,
  HStack,
  Image,
  VStack,
  Text,
  Button,
  Grid,
  Box,
  useColorModeValue,
  Avatar,
} from "@chakra-ui/react";
import { fetchMovie } from "../../../redux/slices/movie/actions/fetchMovie";
import { BsArrowLeft } from "react-icons/bs";
import getImageUrl from "../../../utils/getImageUrl";
import { useRouter } from "next/router";

interface MovieProps {
  movieDetails: MovieDetails;
  movieCredits: Credits;
}

const Cast: React.FC<MovieProps> = ({ movieDetails, movieCredits }) => {
  const router = useRouter();
  return (
    <Layout>
      <Jumbotron
        img="https://www.themoviedb.org/t/p/original/620hnMVLu6RSZW6a5rwO8gqpt0t.jpg"
        loading={false}
        h="150"
        p="0"
      >
        <HStack spacing="24px">
          <Image
            w="20"
            ml="5"
            src={getImageUrl(200, movieDetails.poster_path)}
            alt="Segun Adebayo"
          />
          <VStack>
            <Heading>{movieDetails.title}</Heading>
            <Button
              leftIcon={<BsArrowLeft />}
              variant="link"
              onClick={() => router.back()}
            >
              Go Back
            </Button>
          </VStack>
        </HStack>
      </Jumbotron>
      <Heading mt="6" mb="5">
        Cast
      </Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {movieCredits.cast.map((cast, i) => (
          <Box
            p="4"
            w="100%"
            bg={useColorModeValue("white", "gray.800")}
            rounded="lg"
            shadow="lg"
            key={i}
          >
            <HStack spacing="5">
              <Avatar src={getImageUrl(185, cast.profile_path)} />
              <VStack align="start" spacing="0">
                <Text fontWeight="bold">{cast.name}</Text>
                <Text>{cast.character}</Text>
              </VStack>
            </HStack>
          </Box>
        ))}
      </Grid>
      <Heading mt="6" mb="5">
        Crew
      </Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {movieCredits.crew.map((crew, i) => (
          <Box
            p="4"
            w="100%"
            bg={useColorModeValue("white", "gray.800")}
            rounded="lg"
            shadow="lg"
            key={i}
          >
            <HStack spacing="5">
              <Avatar src={getImageUrl(185, crew.profile_path)} />
              <VStack align="start" spacing="0">
                <Text fontWeight="bold">{crew.name}</Text>
                <Text>{crew.department}</Text>
              </VStack>
            </HStack>
          </Box>
        ))}
      </Grid>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default Cast;
