import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {convertWeigthForDisplay} from "../../common/helpers/weightConvertor";
import {settingsSelector} from "../../Settings/reducer";
import {useSelector} from "react-redux";

const WorkoutSetRow = ({ set }) => {
	const selectedWeight = useSelector(settingsSelector).weightUnit;

	return (
		<View style={styles.container}>
			<Text>{set[0]}</Text>
			<Text>{convertWeigthForDisplay(set[1], selectedWeight)}</Text>
			<Text>{set[2]}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		width: 320,
		padding: 16,
		paddingHorizontal: 16,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		borderBottomWidth: 1,
		borderBottomColor: "#DCDCDC",
	},
});

export default WorkoutSetRow;