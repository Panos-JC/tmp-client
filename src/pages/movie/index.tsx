// React
import React, { useEffect } from "react";
import { ImCheckmark } from "react-icons/im";

// Components
import { Card } from "../../components/Card/Card";
import { Carousel } from "../../components/Carousel/Carousel";
import { Layout } from "../../components/Layout/Layout";
import { Slideshow } from "../../components/Slideshow/Slideshow";
import { TooltipIconButton } from "../../components/TooltipIconButton/TooltipIconButton";

// Redux
import { fetchMovieData } from "../../redux/slices/movie/actions/fetchMovieData";
import { see } from "../../redux/slices/movie/actions/see";
import { unsee } from "../../redux/slices/movie/actions/unsee";
import { Movie } from "../../redux/slices/movie/types";

// Local files
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { movieGenres } from "../../utils/constants/genreIds";
import getImageUrl from "../../utils/getImageUrl";

interface moviesProps {}

const Movies: React.FC<moviesProps> = ({}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMovieData({ page: 1 }));
  }, []);

  const { movies, loading } = useAppSelector(state => state.movie);

  const handleWatchMovie = (media: Movie) => {
    dispatch(
      see({
        params: {
          tmdbId: media.id.toString(),
          title: media.title,
          posterPath: media.backdrop_path,
        },
      })
    );
  };

  const handleUnwatchMovie = (media: Movie) => {
    dispatch(unsee({ tmdbId: media.id.toString() }));
  };

  return (
    <Layout>
      <Slideshow slides={movies.popularMovies.slice(0, 5)} />
      <Carousel title="Popular Movies" href="/movie/popular">
        {movies.popularMovies.map(media => (
          <Card key={media.id}>
            <Card.CardImage
              src={getImageUrl(500, media.backdrop_path)}
              alt={media.title}
              isLoading={loading}
            />
            <Card.CardTitle isLoading={loading} href={`/movie/${media.id}`}>
              {media.title}
            </Card.CardTitle>
            <Card.CardSubtitle isLoading={loading}>
              {media.genre_ids.map(id => movieGenres[id]).join(", ")}
            </Card.CardSubtitle>
            <Card.CardActionArea>
              <Card.CardSecondaryActions>
                {media.seen ? (
                  <TooltipIconButton
                    icon={<ImCheckmark />}
                    variant="primary"
                    label="Unsee"
                    onClick={() => handleUnwatchMovie(media)}
                  />
                ) : (
                  <TooltipIconButton
                    icon={<ImCheckmark />}
                    variant="solid"
                    label="Mark as seen"
                    onClick={() => handleWatchMovie(media)}
                  />
                )}
              </Card.CardSecondaryActions>
            </Card.CardActionArea>
          </Card>
        ))}
      </Carousel>
      <Carousel title="Top Rated Movies" href="/movie/topRated">
        {movies.topRatedMovies.map(media => (
          <Card key={media.id}>
            <Card.CardImage
              src={getImageUrl(500, media.backdrop_path)}
              alt={media.title}
              isLoading={loading}
            />
            <Card.CardTitle isLoading={loading} href={`/movie/${media.id}`}>
              {media.title}
            </Card.CardTitle>
            <Card.CardSubtitle isLoading={loading}>
              {media.genre_ids.map(id => movieGenres[id]).join(", ")}
            </Card.CardSubtitle>
            <Card.CardActionArea>
              <Card.CardSecondaryActions>
                {media.seen ? (
                  <TooltipIconButton
                    icon={<ImCheckmark />}
                    variant="primary"
                    label="Unsee"
                    onClick={() => handleUnwatchMovie(media)}
                  />
                ) : (
                  <TooltipIconButton
                    icon={<ImCheckmark />}
                    variant="solid"
                    label="Mark as seen"
                    onClick={() => handleWatchMovie(media)}
                  />
                )}
              </Card.CardSecondaryActions>
            </Card.CardActionArea>
          </Card>
        ))}
      </Carousel>
    </Layout>
  );
};

export default Movies;
