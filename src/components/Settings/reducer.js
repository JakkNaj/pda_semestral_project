const initialState = {
	isNotificationEnabled: false,
	weightUnit: 'kg',
	inactiveDays: 3,
};

const settingsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_NOTIFICATION_ENABLED':
			return { ...state, isNotificationEnabled: action.payload };
		case 'SET_WEIGHT_UNIT':
			return { ...state, weightUnit: action.payload };
		case 'SET_INACTIVE_DAYS':
			return { ...state, inactiveDays: action.payload };
		default:
			return state;
	}
};

export const settingsSelector = state => state.settings;

export default settingsReducer;