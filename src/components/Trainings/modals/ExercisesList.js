import {ScrollView, View} from 'react-native'
import Button from "../../common/buttons/Button";
import styles from "./AddRoutineModal.styles"
import Exercise from "./Exercise";
import {useDispatch, useSelector} from "react-redux";
import {saveRoutinesToStorage} from "../actions";
import {trainingsSelector} from "../reducer";
import {convertWeightToKg} from "../../common/helpers/weightConvertor";

const ExercisesList = ({ exercises, setExercises, workoutTitle, setModalVisible, routineId, weightUnit }) => {

    const dispatch = useDispatch();

    const trainings = useSelector(trainingsSelector)

    const handleSubmit = () => {
        const title = workoutTitle.trim() === "" ? "Untitled workout routine" : workoutTitle;
        const creationDate = new Date();

        // Convert all weights to kilograms before saving
        const exercisesInKg = exercises.map(exercise => {
            const setsInKg = exercise.sets.map(set => {
                const weightInKg = convertWeightToKg(set[1], weightUnit);
                return [set[0], weightInKg, set[2]];
            });
            return { ...exercise, sets: setsInKg };
        });

        const updatedTrainings = [
            ...(trainings.filter(routine => routine.id !== routineId) ?? []),
            {
                title: title,
                exercises: exercisesInKg,
                creationDate: creationDate.toString(),
                id: routineId ?? Date.now().toString(),
                weightUnit: weightUnit,
            }
        ];

        dispatch(saveRoutinesToStorage(updatedTrainings));
        setModalVisible(false)
    };

    return (
        <View style={styles.exercisesDiv}>
            <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
                {exercises.map((exercise, index) => {
                    return (
                        <Exercise
                            key={`exercise-${index}`}
                            exercise={exercise}
                            exercises={exercises}
                            setExercises={setExercises}
                            weightUnit={weightUnit}
                        />
                    )
                })}
                <View style={{ marginTop: 15 }}>
                    <Button
                        title="Add workout to workout routines"
                        onClick={() => handleSubmit()}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default ExercisesList