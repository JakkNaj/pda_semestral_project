import AsyncStorage from "@react-native-async-storage/async-storage";

export const GET_SETTINGS_LOADING = 'GET_SETTINGS_LOADING';
export const GET_SETTINGS_SUCCESS = 'GET_SETTINGS_SUCCESS';
export const GET_SETTINGS_FAILURE = 'GET_SETTINGS_FAILURE';

const SETTINGS_KEY = 'settings';

export const saveSettings = (settings) => async (dispatch) => {
	dispatch({
		type: 'SAVE_SETTINGS_LOADING',
	});
	try {
		await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
		dispatch({ type: 'SAVE_SETTINGS_SUCCESS'});
		dispatch({ type: 'GET_SETTINGS_SUCCESS', payload: settings });
	} catch (error) {
		console.error('Error saving settings: ', error);
		dispatch({ type: 'SAVE_SETTINGS_FAILURE', payload: error });
	}
};

export const getSettingsFromStorage = () => {
	return async (dispatch) => {
		dispatch({
			type: 'GET_SETTINGS_LOADING',
		});

		try {
			const response = await AsyncStorage.getItem(SETTINGS_KEY);
			if (response !== null) {
				let data = JSON.parse(response);

				dispatch({ type: 'GET_SETTINGS_SUCCESS', payload: data });
			} else {
				dispatch({ type: 'GET_SETTINGS_FAILURE', payload: 'No settings found' });
			}
		} catch (error) {
			console.error('Error getting settings: ', error);
			dispatch({ type: 'GET_SETTINGS_FAILURE', payload: error });
		}
	};
}