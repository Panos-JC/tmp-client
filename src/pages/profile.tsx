import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Card } from "../components/Card/Card";
import { Carousel } from "../components/Carousel/Carousel";
import { Layout } from "../components/Layout/Layout";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchUserData } from "../redux/slices/user/actions/fetchUserData";
import getImageUrl from "../utils/getImageUrl";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

  const { credentials, movies, tv } = useAppSelector(state => state.user);

  return (
    <Layout>
      <Box w="full" rounded="lg" shadow="lg" p="10" bg={"backgroundLight"}>
        <VStack spacing="0">
          <Avatar size="2xl" mb="5" />
          <Text fontWeight="bold">{credentials.username}</Text>
          <VStack spacing="10">
            <Text color="gray.500">{credentials.email}</Text>

            <HStack spacing="10" marginTop="5">
              <VStack
                p="3"
                bg="gray.800"
                rounded="lg"
                minW="150px"
                _hover={{ shadow: "lg" }}
              >
                <Text fontWeight="bold">Movies</Text>
                <Text>{credentials.movieCount}</Text>
              </VStack>
              <VStack
                p="3"
                marginTop="5"
                bg="gray.800"
                rounded="lg"
                minW="150px"
                _hover={{ shadow: "lg" }}
              >
                <Text fontWeight="bold">Tv Shows</Text>
                <Text>{credentials.tvCount}</Text>
              </VStack>
            </HStack>
          </VStack>
        </VStack>
      </Box>
      <Carousel title="Movies">
        {movies.map((movie, i) => (
          <Card key={i}>
            <Card.CardImage
              src={getImageUrl(500, movie.posterPath)}
              alt={movie.title}
            />
            <Card.CardTitle>{movie.title}</Card.CardTitle>
            <Card.CardSubtitle> </Card.CardSubtitle>
          </Card>
        ))}
      </Carousel>
      <Carousel title="Tv">
        {tv.map((movie, i) => (
          <Card key={i}>
            <Card.CardImage
              src={getImageUrl(500, movie.posterPath)}
              alt={movie.title}
            />
            <Card.CardTitle>{movie.title}</Card.CardTitle>
            <Card.CardSubtitle> </Card.CardSubtitle>
          </Card>
        ))}
      </Carousel>
    </Layout>
  );
};

export default Profile;
