import { Grid } from "@chakra-ui/react";
import { NextPage } from "next";
import React, { useEffect } from "react";
import { ImCheckmark } from "react-icons/im";
import { Card } from "../../components/Card/Card";
import { Layout } from "../../components/Layout/Layout";
import { TooltipIconButton } from "../../components/TooltipIconButton/TooltipIconButton";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchTvData } from "../../redux/slices/tv/actions/fetchTvData";
import { unwatchTv } from "../../redux/slices/tv/actions/unwatchTv";
import { watchTv } from "../../redux/slices/tv/actions/watchTv";
import { Tv } from "../../redux/slices/tv/types";
import { movieGenres } from "../../utils/constants/genreIds";
import getImageUrl from "../../utils/getImageUrl";

interface Props {}

const Popular: NextPage<Props> = ({}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTvData({ page: 1 }));
  }, []);

  const { popularTv, loading } = useAppSelector(state => state.tv.tv);

  const handleSee = (tv: Tv) => {
    dispatch(
      watchTv({
        params: {
          tmdbId: tv.id.toString(),
          title: tv.name,
          posterPath: tv.backdrop_path,
        },
      })
    );
  };

  const handleUnsee = (tv: Tv) => {
    dispatch(unwatchTv({ tmdbId: tv.id.toString() }));
  };

  if (loading) {
    return (
      <Layout>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
            xl: "repeat(5, 1fr)",
          }}
          gap={4}
        >
          {[...Array(20)].map(item => (
            <Card key={item} width="full" minW="0">
              <Card.CardImage src="" alt="" isLoading={true} />
              <Card.CardTitle isLoading={true}></Card.CardTitle>
              <Card.CardSubtitle isLoading={true}></Card.CardSubtitle>
              <Card.CardActionArea>
                <Card.CardSecondaryActions>
                  <TooltipIconButton
                    icon={<ImCheckmark />}
                    variant="solid"
                    label="Unsee"
                  />
                </Card.CardSecondaryActions>
              </Card.CardActionArea>
            </Card>
          ))}
        </Grid>
      </Layout>
    );
  }

  return (
    <Layout>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
          xl: "repeat(5, 1fr)",
        }}
        gap={6}
      >
        {popularTv.map((tv, i) => (
          <Card key={i} width="full" minW="0">
            <Card.CardImage
              src={getImageUrl(500, tv.backdrop_path)}
              alt={tv.name}
            />
            <Card.CardTitle>{tv.name}</Card.CardTitle>
            <Card.CardSubtitle>
              {tv.genre_ids.map(id => movieGenres[id]).join(", ")}
            </Card.CardSubtitle>
            <Card.CardActionArea>
              <Card.CardSecondaryActions>
                {tv.seen ? (
                  <TooltipIconButton
                    icon={<ImCheckmark />}
                    variant="primary"
                    label="Unsee"
                    onClick={() => handleUnsee(tv)}
                  />
                ) : (
                  <TooltipIconButton
                    icon={<ImCheckmark />}
                    variant="solid"
                    label="Mark as seen"
                    onClick={() => handleSee(tv)}
                  />
                )}
              </Card.CardSecondaryActions>
            </Card.CardActionArea>
          </Card>
        ))}
      </Grid>
    </Layout>
  );
};

export default Popular;
