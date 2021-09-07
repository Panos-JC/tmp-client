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
import { fetchTvData } from "../../redux/slices/tv/actions/fetchTvData";
import { watchTv } from "../../redux/slices/tv/actions/watchTv";
import { Tv } from "../../redux/slices/tv/types";

// Local files
import { movieGenres } from "../../utils/constants/genreIds";
import getImageUrl from "../../utils/getImageUrl";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

interface TvShowProps {}

const TvShow: React.FC<TvShowProps> = ({}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTvData({ page: 1 }));
  }, []);

  const { popularTv, topRatedTv, loading } = useAppSelector(
    state => state.tv.tv
  );

  const handleWatchTv = (media: Tv) => {
    dispatch(
      watchTv({
        params: {
          tmdbId: media.id.toString(),
          title: media.name,
          posterPath: media.backdrop_path,
        },
      })
    );
  };

  return (
    <Layout>
      <Slideshow slides={popularTv.slice(0, 5)} loading={loading} />
      <Carousel title="Popular Tv" href="/tv/popular">
        {popularTv.length ? (
          popularTv.map(media => (
            <Card key={media.id}>
              <Card.CardImage
                src={getImageUrl(500, media.backdrop_path)}
                alt={media.name}
                isLoading={loading}
              />
              <Card.CardTitle isLoading={loading} href={`/tv/${media.id}`}>
                {media.name}
              </Card.CardTitle>
              <Card.CardSubtitle isLoading={loading}>
                {media.genre_ids.map(id => movieGenres[id]).join(", ")}
              </Card.CardSubtitle>
              <Card.CardActionArea>
                <Card.CardSecondaryActions>
                  <TooltipIconButton
                    icon={<ImCheckmark />}
                    variant={media.seen ? "primary" : "solid"}
                    label={media.seen ? "Unsee" : "Mark as seen"}
                    onClick={() => handleWatchTv(media)}
                  />
                </Card.CardSecondaryActions>
              </Card.CardActionArea>
            </Card>
          ))
        ) : (
          <>
            <Card loading={loading} />
            <Card loading={loading} />
            <Card loading={loading} />
            <Card loading={loading} />
            <Card loading={loading} />
          </>
        )}
      </Carousel>
      <Carousel title="Top Rated Tv" href="/tv/topRated">
        {topRatedTv.length ? (
          topRatedTv.map(media => (
            <Card key={media.id}>
              <Card.CardImage
                src={getImageUrl(500, media.backdrop_path)}
                alt={media.name}
                isLoading={loading}
              />
              <Card.CardTitle isLoading={loading} href={`/tv/${media.id}`}>
                {media.name}
              </Card.CardTitle>
              <Card.CardSubtitle isLoading={loading}>
                {media.genre_ids.map(id => movieGenres[id]).join(", ")}
              </Card.CardSubtitle>
              <Card.CardActionArea>
                <Card.CardSecondaryActions>
                  <TooltipIconButton
                    icon={<ImCheckmark />}
                    variant={media.seen ? "primary" : "solid"}
                    label={media.seen ? "Unsee" : "Mark as seen"}
                    onClick={() => handleWatchTv(media)}
                  />
                </Card.CardSecondaryActions>
              </Card.CardActionArea>
            </Card>
          ))
        ) : (
          <>
            <Card loading={loading} />
            <Card loading={loading} />
            <Card loading={loading} />
            <Card loading={loading} />
            <Card loading={loading} />
          </>
        )}
      </Carousel>
    </Layout>
  );
};

export default TvShow;
