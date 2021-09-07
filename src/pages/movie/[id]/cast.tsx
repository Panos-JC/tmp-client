// React / Next
import React, { useEffect } from "react";
import { useRouter } from "next/router";
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
  SkeletonCircle,
  Skeleton,
} from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";

// Components
import { Jumbotron } from "../../../components/Jumbotron/Jumbotron";
import { Layout } from "../../../components/Layout/Layout";

// Redux
import { fetchMovie } from "../../../redux/slices/movie/actions/fetchMovie";

// Local Files
import getImageUrl from "../../../utils/getImageUrl";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";

const Cast: React.FC = () => {
  const router = useRouter();

  const { id } = router.query;

  const dispatch = useAppDispatch();

  const { movieData, movieCredits, loading } = useAppSelector(
    state => state.movie.movieDetails
  );

  useEffect(() => {
    if (id) dispatch(fetchMovie({ id: id as string }));
  }, [id]);

  return (
    <Layout>
      <Jumbotron
        img="https://www.themoviedb.org/t/p/original/620hnMVLu6RSZW6a5rwO8gqpt0t.jpg"
        loading={loading}
        h="150"
        p="0"
      >
        <HStack spacing="24px">
          <Image
            w="20"
            ml="5"
            src={getImageUrl(200, movieData.poster_path)}
            alt="Segun Adebayo"
          />
          <VStack align="flex-start">
            <Heading>{movieData.title}</Heading>
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
        {loading
          ? [...Array(50)].map(i => (
              <Box
                p="4"
                w="100%"
                bg="gray.800"
                rounded="lg"
                shadow="lg"
                key={i}
              >
                <HStack spacing="5">
                  <SkeletonCircle size="48px" />
                  <VStack align="start" spacing="3" flex="1">
                    <Skeleton h="18px" w="60%" />
                    <Skeleton h="18px" w="45%" />
                  </VStack>
                </HStack>
              </Box>
            ))
          : movieCredits.cast.map((cast, i) => (
              <Box
                p="4"
                w="100%"
                bg="gray.800"
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

export default Cast;
