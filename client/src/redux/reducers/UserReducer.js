import { LOGGED_IN } from "../types/types";

const initialState = {
  LoggedIn: false,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN:
      let { LoggedIn } = state;
      LoggedIn = action.payload;
      return { ...state, LoggedIn };

    default:
      return state;
  }
};

export default UserReducer;
