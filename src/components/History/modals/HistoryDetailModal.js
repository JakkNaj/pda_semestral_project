import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomModal from '../../common/CustomModal';
import {MaterialIcons} from "@expo/vector-icons";
import colors from "../../common/colors";
import ComponentHeader from "../../common/ComponentHeader";
import SetRow from "../../Trainings/modals/SetRow";
import {convertWeigthForDisplay} from "../../common/helpers/weightConvertor";
import {useSelector} from "react-redux";
import {settingsSelector} from "../../Settings/reducer";

const HistoryDetailModal = ({ history, modalVisible, setModalVisible }) => {
    const selectedWeight = useSelector(settingsSelector).weightUnit;

    return (
        <CustomModal modalVisible={modalVisible} setModalVisible={setModalVisible} animation={"Right"}>
            <View>
                <View style={styles.arrowBackWrapper}>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <MaterialIcons name="arrow-back" size={24} color={colors.purple} />
                    </TouchableOpacity>
                </View>
                <ComponentHeader title={history?.routineName} />
            </View>
            <ScrollView>
                <View style={styles.head}>
                    <Text style={styles.boldPurpleText}>
                        Workout details
                    </Text>
                    <View style={styles.dataRow}>
                        <Text style={styles.boldText}>
                            Start time
                        </Text>
                        <Text style={styles.boldPurpleText}>
                            {history?.start}
                        </Text>
                    </View>
                    <View style={styles.dataRow}>
                        <Text style={styles.boldText}>
                            End time
                        </Text>
                        <Text style={styles.boldPurpleText}>
                            {history?.finish}
                        </Text>
                    </View>
                </View>

                {history?.exercises.map((exercise, index) => (
                    <View key={`routine-popup-${index}`}>
                        <Text style={styles.exerciseName}>{exercise.name}</Text>
                        <View style={styles.setsContainer}>
                            <SetRow set={{weight: "WEIGHT", reps: "REPS"}} index={"SET"} key={`set-row-head}`} />
                            {exercise.sets.map((set, index) => (
                                <SetRow set={{weight: convertWeigthForDisplay(set[1], selectedWeight), reps: set[2]}} index={index + 1} key={`set-row-${index}`}/>
                            ))}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
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
    arrowBackWrapper: {
        paddingVertical: 10,
        maxWidth: 40,
    },
    boldText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    boldPurpleText: {
        color: colors.purple,
        fontSize: 16,
        fontWeight: "bold",
    },
    head: {
        display: "flex",
        flexDirection: "column",
        gap: 20,
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#DCDCDC",
    },
    dataRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }
});

export default HistoryDetailModal;