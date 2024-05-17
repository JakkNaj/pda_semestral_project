import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomModal from '../../common/CustomModal';
import colors from "../../common/colors";
import ComponentHeader from "../../common/ComponentHeader";
import SetRow from "./SetRow";
import Icon from "react-native-vector-icons/FontAwesome6";
import RoutineMenu from "./RoutineMenu";
import AddRoutineModal from "./AddRoutineModal";
import Tooltip from "react-native-walkthrough-tooltip";
import capitalizeFirstLetter from "../../common/helpers/capitalizeFirstLetter";
import TopButton from "../../common/buttons/TopButton";
import {useSelector} from "react-redux";
import {settingsSelector} from "../../Settings/reducer";
import {convertWeigthForDisplay} from "../../common/helpers/weightConvertor";

const RoutineDetailModal = ({routine, modalVisible, setModalVisible}) => {
    const selectedWeight = useSelector(settingsSelector).weightUnit;
    const date = new Date(routine.creationDate);
    const [showRoutineMenu, setShowRoutineMenu] = useState(false);
    const [isAddRoutineModalVisible, setIsAddRoutineModalVisible] = useState(false);


    return (
        <CustomModal modalVisible={modalVisible} setModalVisible={setModalVisible} animation={"Right"}>
            <View>
                <View style={styles.arrowBackWrapper}>
                    <TopButton onPress={() => setModalVisible(false)} icon="chevron-left"/>
                </View>
                <ComponentHeader title={"Workout Routine"}/>
            </View>
            <ScrollView>
                <View style={styles.descContainer}>
                    <View>
                        <View style={styles.workoutNameWrapper}>
                            <Text style={styles.workoutName}>{routine.title}</Text>
                            <View>
                                <Tooltip
                                    isVisible={showRoutineMenu}
                                    onClose={() => setShowRoutineMenu(false)}
                                    arrowSize={{width: 0, height: 0}}
                                    content={
                                        <RoutineMenu
                                            routine={routine}
                                            showView={false}
                                            closeMenu={() => setShowRoutineMenu(false)}
                                            setIsRoutineDetailModalVisible={() => setIsRoutineDetailModalVisible(true)}
                                            setIsAddRoutineModalVisible={() => setIsAddRoutineModalVisible(true)}
                                        />
                                    }
                                    placement="bottom"
                                    contentStyle={{padding: 0}}
                                    backgroundColor={"transparent"}
                                >
                                    <TouchableOpacity onPress={() => setShowRoutineMenu(true)}>
                                        <Icon name="ellipsis" size={25} color={colors.purple}/>
                                    </TouchableOpacity>
                                </Tooltip>
                            </View>
                        </View>
                        <Text
                            style={styles.workoutTarget}>{routine.creationDate ? `Created ${date.toDateString()}` : ""}</Text>
                    </View>
                </View>
                <AddRoutineModal
                    modalVisible={isAddRoutineModalVisible}
                    setModalVisible={setIsAddRoutineModalVisible}
                    routine={routine}
                    fromEdit={true}
                />

                {routine.exercises.map((exercise, index) => (
                    <View key={`routine-popup-${index}`}>
                        <Text style={styles.exerciseName}>{capitalizeFirstLetter(exercise.name)}</Text>
                        <View style={styles.setsContainer}>
                            <SetRow set={{weight: `WEIGHT (${selectedWeight})`, reps: "REPS"}} index={"SET"}
                                    key={`set-row-head}`}/>
                            {exercise.sets.map((set, index) => (
                                <SetRow
                                    set={{weight: convertWeigthForDisplay(set[1], selectedWeight), reps: set[2]}}
                                    index={index + 1}
                                    key={`set-row-${index}`}
                                />
                            ))}
                        </View>
                    </View>
                ))}
            </ScrollView>
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
        borderBottomWidth: 1,
        borderBottomColor: "#DCDCDC",
    },
    workoutNameWrapper: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "nowrap"
    },
    workoutName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.purple,
    },
    workoutTarget: {
        fontSize: 12,
        color: colors.grey,
        alignSelf: "center"
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

export default RoutineDetailModal;