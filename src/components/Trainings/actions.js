import AsyncStorage from "@react-native-async-storage/async-storage";

const ROUTINES_KEY = 'routines';

const HISTORY_KEY = 'history';

export const SAVE_ROUTINES_LOADING = 'SAVE_ROUTINES_LOADING';
export const SAVE_ROUTINES_SUCCESS = 'SAVE_ROUTINES_SUCCESS';
export const SAVE_ROUTINES_FAILURE = 'SAVE_ROUTINES_FAILURE';
export const saveRoutinesToStorage = (routines) => async (dispatch) => {
    dispatch({
        type: SAVE_ROUTINES_LOADING
    })

    try {
        await AsyncStorage.setItem(ROUTINES_KEY, JSON.stringify(routines));

        dispatch({ type: SAVE_ROUTINES_SUCCESS });
        dispatch({ type: GET_TRAININGS_SUCCESS, payload: routines });
    } catch (error) {
        console.error('Error saving routines: ', error);
        dispatch({ type: SAVE_ROUTINES_FAILURE, payload: error });
    }
}

export const SAVE_HISTORY_LOADING = 'SAVE_HISTORY_LOADING';
export const SAVE_HISTORY_SUCCESS = 'SAVE_HISTORY_SUCCESS';
export const SAVE_HISTORY_FAILURE = 'SAVE_HISTORY_FAILURE';
export const saveHistoryToStorage = (history) => async (dispatch) => {
    dispatch({
        type: SAVE_HISTORY_LOADING
    })

    try {
        await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));

        dispatch({ type: SAVE_HISTORY_SUCCESS });
        dispatch({ type: GET_HISTORY_SUCCESS, payload: history });
    } catch (error) {
        console.error('Error saving history: ', error);
        dispatch({ type: SAVE_HISTORY_FAILURE, payload: error });
    }
}

export const GET_TRAININGS_LOADING = 'GET_TRAININGS_LOADING';
export const GET_TRAININGS_SUCCESS = 'GET_TRAININGS_SUCCESS';
export const GET_TRAININGS_FAILURE = 'GET_TRAININGS_FAILURE';

export const getTrainingsFromStorage = () => {
    return async (dispatch) => {
        dispatch({
            type: GET_TRAININGS_LOADING
        });

        try {
            const response = await AsyncStorage.getItem(ROUTINES_KEY);
            if (response !== null) {
                let data = JSON.parse(response);

                const isValidDate = (dateString) => {
                    const date = new Date(dateString);
                    return !isNaN(date.getTime());
                };

                data = data.map(routine => ({
                    ...routine,
                    creationDate: isValidDate(routine.creationDate)
                        ? new Date(routine.creationDate).toISOString()
                        : new Date().toISOString()
                }));

                dispatch({ type: GET_TRAININGS_SUCCESS, payload: data });
            } else {
                dispatch({ type: GET_TRAININGS_SUCCESS, payload: [] });
            }
        } catch (error) {
            console.error('Error getting routines from storage: ', error);
            dispatch({ type: GET_TRAININGS_FAILURE, payload: error.message });
        }
    };
};

export const GET_HISTORY_LOADING = 'GET_HISTORY_LOADING';
export const GET_HISTORY_SUCCESS = 'GET_HISTORY_SUCCESS';
export const GET_HISTORY_FAILURE = 'GET_HISTORY_FAILURE';

export const getHistoryFromStorage = () => {
    return async (dispatch) => {
        dispatch({
            type: GET_HISTORY_LOADING
        });

        try {
            const response = await AsyncStorage.getItem(HISTORY_KEY);
            if (response !== null) {
                let data = JSON.parse(response);
                dispatch({ type: GET_HISTORY_SUCCESS, payload: data });
            } else {
                dispatch({ type: GET_HISTORY_SUCCESS, payload: [] });
            }
        } catch (error) {
            console.error('Error getting history from storage: ', error);
            dispatch({ type: GET_HISTORY_FAILURE, payload: error.message });
        }
    };
};
