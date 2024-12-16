import {globalReducer} from './global'

export const getDefaultGlobalStructure = () => {
    return {
        isLoggedIn:false,
        name:null,
        userId:null,
    }
}

const defaultState = {
    global: getDefaultGlobalStructure()
};

function root(state = defaultState, action) {
    const global = globalReducer(state.global, action);

    return {
        global
    }
}

export default root;