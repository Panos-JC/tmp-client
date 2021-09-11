import { Grid } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ImCheckmark } from "react-icons/im";
import { Card } from "../components/Card/Card";
import { Layout } from "../components/Layout/Layout";
import { TooltipIconButton } from "../components/TooltipIconButton/TooltipIconButton";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { see } from "../redux/slices/movie/actions/see";
import { unsee } from "../redux/slices/movie/actions/unsee";
import { fetchSearchResults } from "../redux/slices/search/fetchSearchResults";
import { MovieSearch, TvSearch } from "../redux/slices/search/types";
import { unwatchTv } from "../redux/slices/tv/actions/unwatchTv";
import { watchTv } from "../redux/slices/tv/actions/watchTv";
import { movieGenres } from "../utils/constants/genreIds";
import getImageUrl from "../utils/getImageUrl";

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (router.query.query) {
      const query = router.query.query as string;
      dispatch(fetchSearchResults({ query }));
    }
  }, [router]);

  const { media, loading } = useAppSelector(state => state.search);

  function isMovie(media: MovieSearch | TvSearch): media is MovieSearch {
    return (media as MovieSearch).title !== undefined;
  }

  const handleSee = (media: MovieSearch | TvSearch) => {
    const query = router.query.query as string;

    if (isMovie(media)) {
      dispatch(
        see({
          params: {
            title: media.title,
            posterPath: media.backdrop_path,
            tmdbId: media.id.toString(),
          },
        })
      );
      dispatch(fetchSearchResults({ query }));
    } else {
      dispatch(
        watchTv({
          params: {
            title: media.name,
            posterPath: media.backdrop_path,
            tmdbId: media.id.toString(),
          },
        })
      );
      dispatch(fetchSearchResults({ query }));
    }
  };

  const handleUnsee = (media: MovieSearch | TvSearch) => {
    isMovie(media)
      ? dispatch(unsee({ tmdbId: media.id.toString() }))
      : dispatch(unwatchTv({ tmdbId: media.id.toString() }));
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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
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
        gap={4}
      >
        {media.map((media, index) => (
          <Card key={index} width="full" minW="0">
            <Card.CardImage
              src={getImageUrl(500, media.backdrop_path)}
              alt=""
            />
            <Card.CardTitle>
              {isMovie(media) ? media.title : media.name}
            </Card.CardTitle>
            <Card.CardSubtitle>
              {media.genre_ids.map(id => movieGenres[id]).join(", ")}
            </Card.CardSubtitle>
            <Card.CardActionArea>
              <Card.CardSecondaryActions>
                {media.seen ? (
                  <TooltipIconButton
                    icon={<ImCheckmark />}
                    variant="primary"
                    label="Unsee"
                    onClick={() => handleUnsee(media)}
                  />
                ) : (
                  <TooltipIconButton
                    icon={<ImCheckmark />}
                    variant="solid"
                    label="Mark as seen"
                    onClick={() => handleSee(media)}
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

export default Search;
