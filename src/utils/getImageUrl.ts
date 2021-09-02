const getImageUrl = (width: number, imagePath: string): string => {
  const tmdbImageUrl = `https://image.tmdb.org/t/p/w${width}${imagePath}`;

  return tmdbImageUrl;
};

export default getImageUrl;
