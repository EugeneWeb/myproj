import { InferActionsType } from "./redux-store";


const initialState = {
    isInitialized: false
};

const appReducer = (state = initialState, action: AppActionsType) => {
    switch (action.type) {
        case '/app/SET_IS_INITIALIZED':
            return {
                ...state,
                isInitialized: true
            };

        default:
            return state;
    }
};

export const appActions = {
    setInitialized: () => ({
        type: "/app/SET_IS_INITIALIZED",
    } as const)
}

export default appReducer;

export type InitialStateType = typeof initialState 
export type AppActionsType = InferActionsType<typeof appActions>
