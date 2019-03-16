import actionTypes from './ActionTypes';
import axios from '../../AxiosSettings';

export const getPersons = () => {

    return dispatch => {

        dispatch(getPersonsStart());
        
        axios.get("/persons")
            .then(response => {
        
                dispatch(setPersons(response.data));
                
            })
            .catch(error => {
                dispatch(setError("There's something wrong with the server."));
            });
    }
};

export const getPersonsStart = () => {
    return {
        type: actionTypes.GET_DATAS_START
    }
};

export const setPersons = (datas) => {
    return {
        type: actionTypes.SET_PERSONS,
        payload: datas
    }
};

export const getDatas = () => {

    return dispatch => {

        dispatch(getDatasStart());
        
        axios.get("/transfers")
            .then(response => {
        
                dispatch(setDatas(sortDatas(response.data)));
                
            })
            .catch(error => {
                dispatch(setError("There's something wrong with the server."));
            });
    }
};

const sortDatas = (datas) => {

    let sorted = datas.concat();

    return sorted.sort((a, b) => new Date(b["date"]) - new Date(a["date"]));
};

export const getDatasStart = () => {
    return {
        type: actionTypes.GET_DATAS_START
    }
};

export const setDatas = (datas) => {
    return {
        type: actionTypes.SET_DATAS,
        payload: datas
    }
};

export const setFilteredDatas = (datas) => {
    return {
        type: actionTypes.SET_FILTERED_DATAS,
        payload: datas
    }
};

export const setError = error => {
    return {
        type: actionTypes.ERROR,
        error: error
    }
};

export const setSender = (sender) => {
    return {
        type: actionTypes.SET_SENDER,
        payload: sender
    }
};