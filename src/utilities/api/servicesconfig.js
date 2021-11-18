export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export function fetchProducts() {
    return function (dispatch) {
      dispatch({ type: FETCH_PRODUCTS });
      return axios
        .post(BASE_URL, { value: 0, isComplete: false })
        .then(function (response) {
          var response = response.data;
          dispatch({ type: FETCH_PRODUCTS, payload: response });
        })
        .catch(function (error) {
          dispatch({ type: FETCH_PRODUCTS, payload: error });
        });
    };
}

export default api;