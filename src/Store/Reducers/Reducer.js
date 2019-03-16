import actionTypes from '../Actions/ActionTypes';

const initialState = {
    persons: [],
    datas: [],
    filteredDatas: [],
    sender: 'Harmat Erika',
    error: null,
    loading: true
};

const getPersonsStart = (state) => {

    return {
        ...state,
        loading: true
    }
};

const setPersons = (state, action) => {

    return {
        ...state,
        persons: action.payload,
        loading: false
    }
};

const getDatasStart = (state) => {

    return {
        ...state,
        loading: true
    }
};

const setDatas = (state, action) => {

    return {
        ...state,
        datas: action.payload,
        filteredDatas: action.payload,
        loading: false
    }
};

const setFilteredDatas = (state, action) => {
    return {
        ...state,
        filteredDatas: action.payload,
        loading: false
    }
};

const error = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading: false
    }
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_PERSONS_START : return getPersonsStart(state);
        case actionTypes.SET_PERSONS : return setPersons(state, action);
        case actionTypes.GET_DATAS_START : return getDatasStart(state);
        case actionTypes.SET_DATAS : return setDatas(state, action);
        case actionTypes.SET_FILTERED_DATAS : return setFilteredDatas(state, action);
        case actionTypes.ERROR : return error(state, action);
        default: return state;
    }
};

export default reducer;