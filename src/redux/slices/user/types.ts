export interface User {
  id: number;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  movieCount: number;
  tvCount: number;
}

// Movies and tv shows as stores in db
export interface DbMedia {
  id: number;
  tmdbId: string;
  title: string;
  posterPath: string;
  createdAt: string;
  updatedAt: string;
}
