const SET_IS_INITIALIZED = "/app/SET_IS_INITIALIZED";

const initialState = {
    isInitialized: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_INITIALIZED:
            return {
                ...state,
                isInitialized: true
            };

        default:
            return state;
    }
};

export const setInitialized = () => ({
    type: SET_IS_INITIALIZED,
});


export default appReducer;
