// React / next
import React, { useEffect } from "react";
import { Grid } from "@chakra-ui/react";
import { ImCheckmark } from "react-icons/im";

// Components
import { Card } from "../../components/Card/Card";
import { Layout } from "../../components/Layout/Layout";
import { TooltipIconButton } from "../../components/TooltipIconButton/TooltipIconButton";

// Redux
import { fetchMovieData } from "../../redux/slices/movie/actions/fetchMovieData";
import { see } from "../../redux/slices/movie/actions/see";
import { unsee } from "../../redux/slices/movie/actions/unsee";
import { Movie } from "../../redux/slices/movie/types";
import { wrapper } from "../../redux/store";

// Local files
import { useAppDispatch } from "../../hooks/hooks";
import { movieGenres } from "../../utils/constants/genreIds";
import getImageUrl from "../../utils/getImageUrl";

interface PopularProps {
  movieData: {
    popularMovies: Movie[];
    topRatedMovies: Movie[];
    loading: boolean;
  };
}

const Popular: React.FC<PopularProps> = ({ movieData }) => {
  const dispatch = useAppDispatch();

  const { popularMovies, loading } = movieData;

  useEffect(() => {
    console.log("loading ", loading);
  }, [loading]);

  const handleSee = (movie: Movie) => {
    dispatch(
      see({
        params: {
          tmdbId: movie.id.toString(),
          title: movie.title,
          posterPath: movie.backdrop_path,
        },
      })
    );
  };

  const handleUnsee = (movie: Movie) => {
    dispatch(unsee({ tmdbId: movie.id.toString() }));
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
        gap={4}
      >
        {popularMovies.map((movie, i) => (
          <Card key={i} width="full" minW="0">
            <Card.CardImage
              src={getImageUrl(500, movie.backdrop_path)}
              alt={movie.title}
            />
            <Card.CardTitle>{movie.title}</Card.CardTitle>
            <Card.CardSubtitle>
              {movie.genre_ids.map(id => movieGenres[id]).join(", ")}
            </Card.CardSubtitle>
            <Card.CardActionArea>
              <Card.CardSecondaryActions>
                {movie.seen ? (
                  <TooltipIconButton
                    icon={<ImCheckmark />}
                    variant="primary"
                    label="Unsee"
                    onClick={() => handleUnsee(movie)}
                  />
                ) : (
                  <TooltipIconButton
                    icon={<ImCheckmark />}
                    variant="solid"
                    label="Mark as seen"
                    onClick={() => handleSee(movie)}
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

export const getServerSideProps = wrapper.getServerSideProps(
  store => async ({ req }) => {
    console.log("req ", req);
    await store.dispatch(fetchMovieData({ page: 1 }));

    return {
      props: {
        movieData: store.getState().movie.movies,
      },
    };
  }
);
