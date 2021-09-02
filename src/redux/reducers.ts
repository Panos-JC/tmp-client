import { combineReducers } from "redux";
import drawerReducer from "./slices/drawer/drawerSlice";
import trendingMediaReducer from "./slices/trending/trendingMediaSlice";
import tvReducer from "./slices/tv/tvSlice";
import movieReducer from "./slices/movie/movieSlice";
import searchReducer from "./slices/search/searchSlice";
import userReducer from "./slices/user/userSlice";

export const rootReducer = combineReducers({
  movie: movieReducer,
  tv: tvReducer,
  trendingMedia: trendingMediaReducer,
  drawer: drawerReducer,
  search: searchReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
