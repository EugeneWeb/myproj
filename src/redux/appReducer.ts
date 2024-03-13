const SET_IS_INITIALIZED = "/app/SET_IS_INITIALIZED";

const initialState = {
    isInitialized: false
};

const appReducer = (state = initialState, action: ActionsType) => {
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

type setInitializedType = ReturnType<typeof setInitialized>
export const setInitialized = () => ({
    type: SET_IS_INITIALIZED,
} as const);


export default appReducer;

export type InitialStateType = typeof initialState 
type ActionsType = setInitializedType
