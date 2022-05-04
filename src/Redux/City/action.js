import axios from "axios";
import {
  DETAILS_SUBMIT_FAILURE,
  DETAILS_SUBMIT_REQUEST,
  DETAILS_SUBMIT_SUCCESS
} from "./actionTypes";

const submitRequest = () => ({
  type: DETAILS_SUBMIT_REQUEST
});

const submitSuccess = (data) => ({
  type: DETAILS_SUBMIT_SUCCESS,
  payload: data
});

const submitFailure = () => ({
  type: DETAILS_SUBMIT_FAILURE
});

const sortingFilter = (type) => async (dispatch) => {
  try {
    const submitAction = submitRequest();
    dispatch(submitAction);
    console.log("type of sort", type);
    let response = await axios.get(
      `https://country--city-population.herokuapp.com/cities?_sort=population&_order=${type}`
    );
    if (response.status === 200) {
      const successAction = submitSuccess(response.data);
      dispatch(successAction);
    } else {
      const failedAction = submitFailure();
      dispatch(failedAction);
    }
  } catch (err) {
    const failedAction = submitFailure();
    dispatch(failedAction);
  }
};

const deletingFromServer = (id) => async (dispatch) => {
  try {
    const submitAction = submitRequest();
    dispatch(submitAction);

    let response = await axios.delete(
      `https://country--city-population.herokuapp.com/cities/${id}`
    );
    if (response.status === 200) {
      // alert("Deleted Successfully");
      const getDataFromAPI = gettingFromServer();
      dispatch(getDataFromAPI);
    } else {
      const failedAction = submitFailure();
      dispatch(failedAction);
    }
  } catch (err) {
    const failedAction = submitFailure();
    dispatch(failedAction);
  }
};

const postingToServer = (details) => async (dispatch) => {
  try {
    const submitAction = submitRequest();
    dispatch(submitAction);

    let response = await axios.post(
      `https://country--city-population.herokuapp.com/cities`,
      details
    );
    if (response.status === 201) {
      // alert("Details Successfully Added");
      const getDataFromAPI = gettingFromServer();
      dispatch(getDataFromAPI);
    } else {
      const failedAction = submitFailure();
      dispatch(failedAction);
    }
  } catch (err) {
    console.log("ERR", err);
    const failedAction = submitFailure();
    dispatch(failedAction);
  }
};

const gettingFromServer = () => async (dispatch) => {
  try {
    const submitAction = submitRequest();
    dispatch(submitAction);

    let response = await axios.get(
      `https://country--city-population.herokuapp.com/cities`
    );
    if (response.status === 200) {
      const successAction = submitSuccess(response.data);
      dispatch(successAction);
    } else {
      const failedAction = submitFailure();
      dispatch(failedAction);
    }
  } catch (err) {
    const failedAction = submitFailure();
    dispatch(failedAction);
  }
};

export {
  submitRequest,
  submitSuccess,
  submitFailure,
  gettingFromServer,
  postingToServer,
  deletingFromServer,
  sortingFilter
};
