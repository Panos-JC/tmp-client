// React
import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import {
  Heading,
  Image,
  VStack,
  Text,
  Grid,
  Box,
  useColorModeValue,
  GridItem,
  Table,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

// Redux
import { fetchPersonDetails } from "../../redux/slices/person/fetchPersonDetails";
import { fetchPersonCredits } from "../../redux/slices/person/fetchPersonCredits";

// Components
import { Carousel } from "../../components/Carousel/Carousel";
import { Card } from "../../components/Card/Card";

// Local files
import { movieGenres } from "../../utils/constants/genreIds";
import { numberToGender } from "../../utils/numberToGender";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import getImageUrl from "../../utils/getImageUrl";
import { CastInterface } from "../../redux/slices/person/types";

interface MovieProps {}

const Cast: React.FC<MovieProps> = () => {
  const { query } = useRouter();

  const [sortedCreditsByRating, setSortedCreditsByRating] = useState<
    Partial<CastInterface>[]
  >([]);
  const [sortedCreditsByDate, setSortedCreditsByDate] = useState<
    Partial<CastInterface>[]
  >([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPersonDetails({ id: query.id as string }));
    dispatch(fetchPersonCredits({ id: query.id as string }));
  }, [query]);

  const { personDetails, personCredits } = useAppSelector(
    state => state.person
  );

  useEffect(() => {
    const { cast } = personCredits;

    if (cast) {
      const sortedByRating = [...cast]
        .sort((a, b) => (a.vote_count < b.vote_count ? 1 : -1))
        .slice(0, 7);

      setSortedCreditsByRating(sortedByRating);

      const sortedByDate = [...cast].sort((a, b) => {
        if (a.first_air_date || a.release_date) {
          return (
            new Date(b.first_air_date || b.release_date).getTime() -
            new Date(a.first_air_date || a.release_date).getTime()
          );
        } else {
          return -1;
        }
      });

      setSortedCreditsByDate(sortedByDate);
    }
  }, [personCredits]);
  return (
    <Layout>
      <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={6}>
        <GridItem justifyContent="center">
          <Image
            rounded="lg"
            w={{ base: "50%", md: "100%" }}
            src={`https://www.themoviedb.org/t/p/original${personDetails.profile_path}`}
            alt={personDetails.name}
          />
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 3 }} overflow="hidden">
          <VStack align="start" spacing={6}>
            <Heading>{personDetails.name}</Heading>

            <div>
              <Heading fontSize="xl">Bio:</Heading>
              <Text lineHeight="5" textAlign="justify">
                {personDetails.biography}
              </Text>
            </div>
          </VStack>
          <Carousel title="Known for:">
            {sortedCreditsByRating.map((credit, i) => (
              <Card key={i}>
                <Card.CardImage
                  src={getImageUrl(500, credit.backdrop_path)}
                  alt={credit.title}
                />
                <Card.CardTitle>{credit.title || credit.name}</Card.CardTitle>
                <Card.CardSubtitle>
                  {/* {credit.genre_ids.map(id => movieGenres[id]).join(", ")} */}
                </Card.CardSubtitle>
              </Card>
            ))}
          </Carousel>
        </GridItem>
        <GridItem colSpan={1} my={{ base: "10", md: "0" }}>
          <Box
            rounded="lg"
            shadow="lg"
            bg={useColorModeValue("white", "gray.800")}
            p="4"
          >
            <Heading fontSize="3xl">Personal Info</Heading>
            <Heading mt="6" fontSize="xl">
              Known For
            </Heading>
            <Text>{personDetails.known_for_department}</Text>
            <Heading mt="6" fontSize="xl">
              Gender
            </Heading>
            <Text>{numberToGender(personDetails.gender)}</Text>
            <Heading mt="6" fontSize="xl">
              Place of Birth
            </Heading>
            <Text>{personDetails.place_of_birth}</Text>
          </Box>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 3 }}>
          <Box
            rounded="lg"
            shadow="lg"
            bg={useColorModeValue("white", "gray.800")}
            p="4"
          >
            <Heading mb="3">Filmography</Heading>
            <Table variant="unstyled">
              <Tbody>
                {sortedCreditsByDate.map((credit, index) => {
                  let year =
                    new Date(credit.first_air_date).getFullYear() ||
                    new Date(credit.release_date).getFullYear();
                  let nextYear = year;
                  if (sortedCreditsByDate[index + 1]) {
                    nextYear =
                      new Date(
                        sortedCreditsByDate[index + 1].first_air_date
                      ).getFullYear() ||
                      new Date(
                        sortedCreditsByDate[index + 1].release_date
                      ).getFullYear();
                  }

                  return (
                    <Tr
                      key={index}
                      borderBottom={
                        year !== nextYear ? `1px solid #222636` : "0px"
                      }
                    >
                      <Td>{year || "-"}</Td>
                      <Td>{credit.title || credit.name}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Box>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default Cast;
