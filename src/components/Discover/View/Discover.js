import {View, Text, StyleSheet, ScrollView} from "react-native";
import ComponentHeader from "../../common/ComponentHeader";
import { useSafeAreaStyles } from "../../common/View.styles";
import WorkoutRow from "../helpers/WorkoutRow";
import { popularWorkouts, forBeginners, upperBodyOnly } from "../mockData/mockWorkouts";
import styles from "./Discover.styles";
import { useState } from "react";
import WorkoutDetailModal from "../modals/WorkoutDetailModal";
import {useDispatch, useSelector} from "react-redux";
import {addTraining} from "../../Trainings/actions";
import {trainingsSelector} from "../../Trainings/reducer";
import {getTrainingsFromStorage} from "../../Trainings/actions"; //todo connect to actual redux store

const Discover = () => {

    const dispatch = useDispatch();
    const trainings = useSelector(trainingsSelector);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState(null);

    const commonStyles = useSafeAreaStyles();

    const handleAdd = (workout) => {
        console.log(`Adding ${workout.title} from Discover page`);
        dispatch(addTraining(workout));
        dispatch(getTrainingsFromStorage());
    }

    const isWorkoutAdded = (workout) => {
        return trainings.some(training => training.title === workout.title);
    }

    const handleWorkoutClick = (workout) => {
        setSelectedWorkout(workout);
        setModalVisible(true);
    }

    return (
        <ScrollView>
            <View style={commonStyles.headerContainer}>
                <ComponentHeader title={"Discover"} />
            </View>
            <Text style={styles.helperText}>Click on workout to see the details!</Text>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Popular Workouts:</Text>
                {popularWorkouts.map((workout, index) => (
                    <WorkoutRow
                        key={index}
                        workout={workout}
                        onAdd={() => handleAdd(workout)}
                        onClick={() => handleWorkoutClick(workout)}
                        isAdded={isWorkoutAdded(workout)}
                    />
                ))}
            </View>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>For Beginners:</Text>
                {forBeginners.map((workout, index) => (
                    <WorkoutRow
                        key={index}
                        workout={workout}
                        onAdd={() => handleAdd(workout)}
                        onClick={() => handleWorkoutClick(workout)}
                        isAdded={isWorkoutAdded(workout)}
                    />
                ))}
            </View>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Upper-body only:</Text>
                {upperBodyOnly.map((workout, index) => (
                    <WorkoutRow
                        key={index}
                        workout={workout}
                        onAdd={() => handleAdd(workout)}
                        onClick={() => handleWorkoutClick(workout)}
                        isAdded={isWorkoutAdded(workout)}
                    />
                ))}
            </View>
            {modalVisible && <WorkoutDetailModal modalVisible={modalVisible} setModalVisible={setModalVisible} workout={selectedWorkout} isAdded={isWorkoutAdded(selectedWorkout)} onAdd={() => handleAdd(selectedWorkout)} />}
        </ScrollView>
    )
}

export default Discover