import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import CustomModal from '../../common/CustomModal';
import colors from "../../common/colors";
import Button from "../../common/buttons/Button";
import {Row, Table} from "react-native-table-component";
import TickIcon from "./TickIcon";
import NextExerciseButton from "./NextExerciseButton";
import Icon from "react-native-vector-icons/FontAwesome6";
import {cloneDeep} from "lodash";
import SaveToHistoryModal from "../modals/SaveToHistoryModal";
import {
    scheduleInactiveUserNotification, scheduleNotificationAfterWorkoutFinished,
    scheduleTestingNotification
} from "../../common/helpers/notificationScheduler";
import {useSelector} from "react-redux";


const StartRoutineModal = ({routine, modalVisible, setModalVisible}) => {
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isTimerPaused, setIsTimerPaused] = useState(false);
    const currentExercise = routine.exercises[currentExerciseIndex];
    const exercisesCount = routine.exercises.length;
    const tableHead = ["SET", "WEIGHT", "REPS", "DONE"];
    const [startTime, setStartTime] = useState(null);
    const [finishTime, setFinishTime] = useState(null);
    const [exercisesFinishData, setExercisesFinishData] = useState([]);
    const [isSaveToHistoryModalVisible, setIsSaveToHistoryModalVisible] = useState(false);

    const inactiveDays = useSelector(state => state.settings.inactiveDays);
    const isNotificationEnabled = useSelector(state => state.settings.isNotificationEnabled);

    const [tableData, setTableData] = useState(() => {
        const currentExerciseCopy = cloneDeep(currentExercise);
        return currentExerciseCopy.sets.map((set, index) => [String(index + 1), set[1] || "-", set[2] || "-", ""])
    });

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    const addRow = () => {
        const newRow = [String(tableData.length + 1), "-", "-", ""];
        setTableData([...tableData, newRow]);
    };

    const onChangeText = (text, rowIndex, columnIndex) => {
        const newData = [...tableData];
        newData[rowIndex][columnIndex] = text;
        setTableData(newData);
    };

    const resetData = () => {
        setCurrentExerciseIndex(0);
        setSeconds(0);
        setIsTimerPaused(false);
        setStartTime(null);
        setFinishTime(null);
        setExercisesFinishData([]);
        setIsSaveToHistoryModalVisible(false);
        const currentExerciseCopy = cloneDeep(currentExercise);
        setTableData(
            currentExerciseCopy.sets.map((set, index) => [String(index + 1), set[1] || "-", set[2] || "-", ""])
        );
    };

    const endExercise = () => {
        setExercisesFinishData([
            ...exercisesFinishData,
            {
                name: currentExercise.name,
                sets: tableData,
            }
        ])
        setIsTimerPaused(true)
        setFinishTime(new Date());
        scheduleNotificationAfterWorkoutFinished(inactiveDays, isNotificationEnabled);
        scheduleTestingNotification(inactiveDays, isNotificationEnabled);        // todo - REMOVE AFTER SHOWCASE
        setIsSaveToHistoryModalVisible(true);
    }

    const nextExercise = () => {
        if (currentExerciseIndex < exercisesCount - 1) {
            setExercisesFinishData([
                ...exercisesFinishData,
                {
                    name: currentExercise.name,
                    sets: tableData,
                }
            ])
            setCurrentExerciseIndex(currentExerciseIndex + 1);
        } else {
            endExercise();
        }
    }

    useEffect(() => {
        let timer = null;
        if (modalVisible && !isTimerPaused) { // Check if isPaused is false
            setStartTime(new Date()); // Set the start time when the timer starts
            timer = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000); // Update time every second
        }

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [modalVisible, isTimerPaused]); // Add isPaused as a dependency


    useEffect(() => {
        const currentExercise = routine.exercises[currentExerciseIndex];
        setTableData(
            currentExercise?.sets.map((set, index) => [String(index + 1), set[1] || "-", set[2] || "-", ""])
        );
    }, [currentExerciseIndex]);

    return (
        <CustomModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            onClose={() => {
                resetData()
            }}
        >
            <View style={styles.topWrapper}>
                <View style={{width: 115}}>
                    <Button title={isTimerPaused ? "Resume" : "Pause"} onClick={() => setIsTimerPaused(!isTimerPaused)} />
                </View>
                <Text style={styles.time}>
                    {`${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`}
                </Text>
                <View style={{width: 115}}>
                    <Button title="Finish" onClick={() => endExercise()} />
                </View>
            </View>
            <ScrollView>
                <View style={styles.bodyWrapper}>
                    <View key={`exercise-start-${currentExerciseIndex}`}>
                        <Text style={styles.normalText}>Exercise {currentExerciseIndex + 1}/{exercisesCount}</Text>
                        <Text style={styles.exerciseName}>{currentExercise.name}</Text>

                        <Table>
                            <Row data={tableHead} textStyle={styles.tableHeadText} />
                            {tableData.map((rowData, rowIndex) => (
                                <Row
                                    key={`start-exercise-row-${rowIndex}`}
                                    data={rowData.map((cellData, columnIndex) => {
                                        if (columnIndex === 0) {
                                            return (
                                                <Text style={styles.tableText}>{cellData}</Text>
                                            );
                                        } else if (columnIndex === 3) {
                                            return (
                                                <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                                                    <TickIcon />
                                                </View>
                                            );
                                        }
                                        else {
                                            return (
                                                <View style={{ justifyContent: "center" }}>
                                                    <TextInput
                                                        style={{ textAlign: "center" }}
                                                        key={`start-exercise-${columnIndex}`}
                                                        onChangeText={(text) => onChangeText(text, rowIndex, columnIndex)}
                                                        value={cellData}
                                                        editable={columnIndex === 1 || columnIndex === 2}
                                                    />
                                                </View>
                                            );
                                        }
                                    })}
                                    style={styles.tableRow}
                                />
                            ))}
                        </Table>
                        <View style={{ alignItems: 'center' }}>
                            <Button title="+ Add set" onClick={addRow} />
                        </View>
                    </View>
                </View>
                <View style={styles.bottomWrapper}>
                    <Text style={styles.normalText}>Next exercise</Text>
                    <NextExerciseButton action={() => nextExercise()}>
                        <Text style={styles.nextExerciseText}>
                            {currentExerciseIndex + 1 !== exercisesCount ? routine.exercises[currentExerciseIndex + 1].name : "None: Finish workout "}
                        </Text>
                        <Icon style={styles.nextExerciseText} name="chevron-right" size={12} />
                    </NextExerciseButton>
                </View>
            </ScrollView>
            <SaveToHistoryModal
                modalVisible={isSaveToHistoryModalVisible}
                setModalVisible={setIsSaveToHistoryModalVisible}
                setStartExerciseModalVisible={setModalVisible}
                historyObject={
                    {
                        routineId: routine.id,
                        routineName: routine.title,
                        start: startTime?.toLocaleString(),
                        finish: finishTime?.toLocaleString(),
                        timer: `${formattedMinutes}:${formattedSeconds}`,
                        exercises: exercisesFinishData
                    }
                }/>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    bodyWrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        marginTop: 80,
    },
    workoutNameWrapper: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "nowrap"
    },
    exerciseName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.purple,
        paddingVertical: 10,
    },
    nextExerciseText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.purple,
    },
    normalText: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 10,
    },
    setsContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 20,
    },
    topWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    bottomWrapper: {
        alignSelf: "center",
        width: 270,
        display: "flex",
        flexDirection: "column",
    },
    time: {
        fontSize: 27,
        fontWeight: 'bold',
    },
    tableHeadText: {
        fontWeight: "bold",
        textAlign: "center"
    },
    tableRow: {
        padding: 5,
        marginVertical: 10,
    },
    tableText: {
        fontSize: 18,
        textAlign: "center"
    },
});

export default StartRoutineModal;