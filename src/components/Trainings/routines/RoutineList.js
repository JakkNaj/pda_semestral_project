import {Text, View} from "react-native";
import Routine from "./Routine";
import {useSelector} from "react-redux";
import {trainingsSelector} from "../reducer";
import styles from "../modals/AddRoutineModal.styles";
import globalStyles from "../../common/GlobalStyles";
import Button from "../../common/buttons/Button";

const RoutineList = ({setModalVisible}) => {
    const routines = useSelector(trainingsSelector)

    return (
        <View>
            {routines.length > 0 ?
                routines.map(((routine, index) =>
                        <Routine
                            key={`routine-list-${index}`}
                            routine={routine}
                        />
                ))
                :
                <View style={{...styles.addExerciseDiv, marginTop: 90}}>
                    <Text style={styles.addExerciseTitle}>Add a workout routine</Text>
                    <Text style={{...styles.addExerciseText, ...globalStyles.defaultText}}>Get started by adding a
                        workout routine</Text>
                    <View style={{width: 250}}>
                        <Button
                            title="Add a workout routine"
                            onClick={() => setModalVisible(true)}
                        />
                    </View>
                </View>
            }
        </View>
    )
}

export default RoutineList