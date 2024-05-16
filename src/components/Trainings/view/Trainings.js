import {ScrollView, View} from "react-native";
import ComponentHeader from "../../common/ComponentHeader";
import RoutineList from "../routines/RoutineList";
import TopButton from "../../common/buttons/TopButton";
import styles from "./Trainings.styles"
import {useState} from "react";
import AddRoutineModal from "../modals/AddRoutineModal";
import globalStyles from "../../common/GlobalStyles";

const Trainings = () => {
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={globalStyles.defaultPadding}>
            <View style={styles.addButtonContainer}>
                <AddRoutineModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
                <TopButton onPress={() => setModalVisible(true)} icon="circle-plus"/>
            </View>
            <ComponentHeader title={"Workout Routines"}/>
            <View>
                <RoutineList
                    setModalVisible={setModalVisible}
                />
            </View>
        </ScrollView>
    )
}

export default Trainings