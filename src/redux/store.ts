import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import drawerReducer from "./slices/drawer/drawerSlice";
import trendingMediaReducer from "./slices/trending/trendingMediaSlice";
import tvReducer from "./slices/tv/tvSlice";
import movieReducer from "./slices/movie/movieSlice";
import authReducer from "./slices/auth/authSlice";
import personReducer from "./slices/person/personSlice";
import { createWrapper } from "next-redux-wrapper";
import searchReducer from "./slices/search/searchSlice";
import toastReducer from "./slices/toast/toastSlice";
import userReducer from "./slices/user/userSlice";

const reducer = {
  movie: movieReducer,
  tv: tvReducer,
  person: personReducer,
  trendingMedia: trendingMediaReducer,
  drawer: drawerReducer,
  auth: authReducer,
  search: searchReducer,
  toast: toastReducer,
  user: userReducer,
};

const makeStore = () =>
  configureStore({
    reducer,
    devTools: true,
  });

const store = makeStore();

export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);

export default store;
