import {
  DETAILS_SUBMIT_FAILURE,
  DETAILS_SUBMIT_REQUEST,
  DETAILS_SUBMIT_SUCCESS
} from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  dataFromAPI: []
};

const reducer = (currentState = initState, action) => {
  switch (action.type) {
    case DETAILS_SUBMIT_REQUEST: {
      return {
        ...currentState,
        isLoading: true,
        isError: false
      };
    }

    case DETAILS_SUBMIT_SUCCESS: {
      return {
        // ...currentState,
        isLoading: false,
        isError: false,
        dataFromAPI: action.payload
      };
    }

    case DETAILS_SUBMIT_FAILURE: {
      return {
        ...currentState,
        isLoading: false,
        isError: true
      };
    }

    default: {
      return currentState;
    }
  }
};

export default reducer;
