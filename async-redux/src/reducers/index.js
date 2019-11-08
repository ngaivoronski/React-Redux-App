const initialState = {
    images: [],
    error: '',
    isFetching: false,
    amount: 5,
    breed: 'hound',
  };

function reducer(state = initialState, action) {
    console.log("reducer", action);
    switch (action.type) {
        case "FETCHING_DATA":
            return {
                ...state,
                error: '',
                isFetching: 'true',
            };
        case "FETCH_FAIL":
            return {
                ...state,
                error: action.payload,
                isFetching: false,
            };
        case "FETCH_SUCCESS":
            return {
                ...state,
                error: '',
                isFetching: false,
                images: action.payload,
            };
        case "BREED_CHANGE":
            return {
                ...state,
                breed: action.payload,
            };
        case "AMOUNT_CHANGE":
            return {
                ...state,
                amount: action.payload,
            }
        default:
            return state;
    }
}

export default reducer;