import React from 'react';
import { View, Text } from 'react-native';
import ComponentHeader from '../../common/ComponentHeader';
import CustomModal from '../../common/CustomModal';
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../common/colors";
import { useSafeAreaStyles } from "../../common/View.styles";
import { StyleSheet } from "react-native";
import WorkoutSetRow from "../helpers/WorkoutSetRow";
import Button from '../../common/buttons/Button';
import TopButton from "../../common/buttons/TopButton";
import capitalizeFirstLetter from "../../common/helpers/capitalizeFirstLetter";
import {settingsSelector} from "../../Settings/reducer";
import {useSelector} from "react-redux";

const WorkoutDetailModal = ({ setSelectedWorkout, workout, isAdded, onAdd, setModalVisible, modalVisible }) => {
	const selectedWeight = useSelector(settingsSelector).weightUnit;
	const commonStyles = useSafeAreaStyles();

	return (
		<CustomModal
			setModalVisible={setModalVisible}
			modalVisible={modalVisible}
			modalId={"workout-detail-modal"}
			swipeOff={true}
			onClose={() => {
				setSelectedWorkout(null);
			}}
		>
				<View>
				<View style={commonStyles.headerContainer}>
					<View style={styles.arrowBackWrapper}>
						<TopButton onPress={() => setModalVisible(false)} icon="chevron-left" />
					</View>
					<ComponentHeader title={"Workout Routine"} />
				</View>
				<View style={styles.descContainer}>
					<View>
						<Text style={styles.workoutName}>{workout.title}</Text>
						<Text style={styles.workoutTarget}>{workout.target}</Text>
					</View>
					{isAdded ? (
						<View style={styles.iconWrapper}>
							<MaterialIcons name="check" size={24} color="green" style={styles.icon}/>
							<Text style={{color: "green"}}>Added</Text>
						</View>
					) : (
						<Button title="Add" onClick={onAdd} />
					)}
				</View>

				{workout.exercises.map((exercise, index) => (
					<View key={index}>
						<Text style={styles.exerciseName}>{capitalizeFirstLetter(exercise.name)}</Text>
						<View style={styles.setsContainer}>
							<WorkoutSetRow set={["SET", `WEIGHT ${selectedWeight}`,"REPS"]} />
							{exercise.sets.map((set, index) => (
								<WorkoutSetRow set={set} key={index} selectedWeight={selectedWeight}/>
							))}
						</View>
					</View>
				))}
				</View>
		</CustomModal>
	);
};


const styles = StyleSheet.create({
	descContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: "center",
		justifyContent: "space-between",
		marginHorizontal: 20,
		gap: 20,
		minHeight: 80,
	},
	workoutName: {
		fontSize: 24,
		fontWeight: 'bold',
		color: colors.purple,
	},
	workoutTarget: {
		fontSize: 18,
		color: colors.grey,
	},
	exerciseName: {
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: 20,
		marginBottom: 10,
		marginLeft: 20,
	},
	setsContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		marginBottom: 20,
	},
	iconWrapper: {
		padding: 8,
		marginHorizontal: 15,
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	arrowBackWrapper: {
		paddingVertical: 10,
		maxWidth: 40,
	},
});

export default WorkoutDetailModal;