import {GET_SETTINGS_SUCCESS} from './actions';

const initialState = {
	isNotificationEnabled: false,
	weightUnit: 'kg',
	inactiveDays: 3,
};

const settingsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_SETTINGS_SUCCESS:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};

export const settingsSelector = state => state.settings;

export default settingsReducer;