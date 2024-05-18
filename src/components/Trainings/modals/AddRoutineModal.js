import {Text, TextInput, View} from "react-native";
import TopButton from "../../common/buttons/TopButton";
import CustomModal from "../../common/CustomModal";
import styles from "./AddRoutineModal.styles"
import Button from "../../common/buttons/Button";
import globalStyles from "../../common/GlobalStyles";
import {useState} from "react";
import AddExerciseModal from "./AddExerciseModal";
import ExercisesList from "./ExercisesList";
import {useSelector} from "react-redux";
import {settingsSelector} from "../../Settings/reducer";

const AddRoutineModal = ({ modalVisible, setModalVisible, routine, fromEdit = false }) => {

    const [exercisesOpen, setExercisesOpen] = useState(false)
    const [workoutTitle, setWorkoutTitle] = useState(routine ? routine.title : "Untitled Workout Routine");
    const [exercises, setExercises] = useState(routine && routine.exercises ? routine.exercises : []);
    const routineId = routine && routine.id ? routine.id : null;
    const weightUnit = routine && routine.weightUnit? routine.weightUnit : useSelector(settingsSelector).weightUnit;

    return (
        <CustomModal
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
            modalId={"add-routine-modal"}
            swipeOff={true}
        >
            <View style={styles.topButtonsContainer}>
                <TopButton
                    onPress={() => {
                        setModalVisible(!setModalVisible)
                    }}
                    icon="circle-xmark"
                />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Workout title..."
                    value={workoutTitle}
                    onChangeText={setWorkoutTitle}
                />
                <TopButton onPress={() => setExercisesOpen(true)} icon="circle-plus"/>
            </View>
            {exercises.length > 0
                ?
                <ExercisesList
                    exercises={exercises}
                    setExercises={setExercises}
                    workoutTitle={workoutTitle}
                    setModalVisible={setModalVisible}
                    routineId={routineId}
                    weightUnit={weightUnit}
                    fromEdit={fromEdit}
                />
                :
                <View style={styles.addExerciseDiv}>
                    <Text style={styles.addExerciseTitle}>Add an exercise</Text>
                    <Text style={{...styles.addExerciseText, ...globalStyles.defaultText}}>Get started by adding
                        exercises to your workout routine</Text>
                    <View style={{width: 200}}>
                        <Button
                            title="Add exercise"
                            onClick={() => setExercisesOpen(true)}
                        />
                    </View>
                </View>
            }
            <AddExerciseModal
                setExercisesOpen={setExercisesOpen}
                exercisesOpen={exercisesOpen}
                exercises={exercises}
                setExercises={setExercises}
            />
        </CustomModal>
    )
}

export default AddRoutineModal