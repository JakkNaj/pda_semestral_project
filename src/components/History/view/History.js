import {ScrollView, StyleSheet, Text, View} from "react-native";
import ComponentHeader from "../../common/ComponentHeader";
import globalStyles from "../../common/GlobalStyles";
import HistoryCard from "./HistoryCard";
import {useSelector} from "react-redux";
import {historySelector} from "../../Trainings/reducer";
import {useSafeAreaStyles} from "../../common/View.styles";
import Button from "../../common/buttons/Button";
import styles from "../../Trainings/modals/AddRoutineModal.styles";
import {useNavigation} from "@react-navigation/native";

const History = () => {
    const historyData = useSelector(historySelector);
    const commonStyles = useSafeAreaStyles()
    const navigation = useNavigation();

    return (
        <ScrollView style={globalStyles.defaultPadding}>
            <View style={commonStyles.headerContainer}>
                <ComponentHeader title={"History"}/>
            </View>
            <View>
                {historyData.length > 0
                    ? historyData.map((history, index) => <HistoryCard key={`history-data-${index}`} history={history}/>)
                    :
                    <View style={{...styles.addExerciseDiv, marginTop: 90}}>
                        <Text style={styles.addExerciseTitle}>Start working out</Text>
                        <Text style={{...styles.addExerciseText, ...globalStyles.defaultText}}>Get started by going into
                            trainings and launching a workout</Text>
                        <View style={{width: 250}}>
                            <Button
                                title="Start a workout"
                                onClick={() => navigation.navigate('Trainings')}
                            />
                        </View>
                    </View>}
            </View>
        </ScrollView>
    )
}

export default History