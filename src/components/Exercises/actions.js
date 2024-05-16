
import {handleResponse} from "../../api/response";

export const GET_EXERCISES_LOADING = 'GET_EXERCISES_LOADING';
export const GET_EXERCISES_SUCCESS = 'GET_EXERCISES_SUCCESS';
export const GET_EXERCISES_FAILURE = 'GET_EXERCISES_FAILURE';
export const getExercises = () => {
    return async (dispatch) => {
        dispatch({
            type: GET_EXERCISES_LOADING
        });

        try {
            const response = await fetch(`${process.env.RAPID_API_URL}/exercises?limit=1500`, {
                headers: {
                    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                    'X-RapidAPI-Host': process.env.RAPID_API_HOST,
                },
            });
            console.log(process.env.RAPID_API_KEY)

            const data = await handleResponse(response);
            dispatch({ type: GET_EXERCISES_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: GET_EXERCISES_FAILURE, payload: error.message });
        }
    };
};