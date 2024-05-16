import {Text, TouchableOpacity, View} from "react-native";
import styles from "./Routine.styles"
import globalStyles from "../../common/GlobalStyles";
import Icon from "react-native-vector-icons/FontAwesome6";
import capitalizeFirstLetter from "../../common/helpers/capitalizeFirstLetter";
import colors from "../../common/colors";
import Button from "../../common/buttons/Button";
import RoutineMenu from "../modals/RoutineMenu";
import React, {useState} from "react";
import RoutineDetailModal from "../modals/RoutineDetailModal";
import AddRoutineModal from "../modals/AddRoutineModal";
import StartRoutineModal from "../startRoutine/StartRoutineModal";
import Tooltip from 'react-native-walkthrough-tooltip';
import {useSelector} from "react-redux";
import {settingsSelector} from "../../Settings/reducer";

const Routine = ({ routine }) => {
    const [showRoutinePopover, setShowRoutinePopover] = useState(false);
    const [isRoutineDetailModalVisible, setIsRoutineDetailModalVisible] = useState(false);
    const [isAddRoutineModalVisible, setIsAddRoutineModalVisible] = useState(false);
    const [isStartRoutineModalVisible, setIsStartRoutineModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <View style={{ padding: 15, flex: 4 }}>
                <Text style={styles.title}>{routine?.title}</Text>
                <View>
                    {routine?.exercises?.map((e, index) =>
                        <View key={`routine-exercise-${index}`} style={styles.bulletContainer}>
                            <Icon name="circle" size={6} style={styles.bulletIcon} />
                            <Text style={globalStyles.defaultText}>{capitalizeFirstLetter(e?.name)}</Text>
                        </View>
                    )}
                </View>
            </View>
            <View style={styles.rightPart}>
                <View>
                    <Tooltip
                        isVisible={showRoutinePopover}
                        onClose={() => setShowRoutinePopover(false)}
                        arrowSize={{ width: 0, height: 0 }}
                        content={
                            <RoutineMenu
                                routine={routine}
                                showView={true}
                                closeMenu={() => setShowRoutinePopover(false)}
                                setIsRoutineDetailModalVisible={() => setIsRoutineDetailModalVisible(true)}
                                setIsAddRoutineModalVisible={() => setIsAddRoutineModalVisible(true)}
                            />
                        }
                        placement="bottom"
                        showChildInTooltip={false}
                        contentStyle={{ padding: 0 }}
                        backgroundColor={"transparent"}
                    >
                        <TouchableOpacity style={{ width: 30, position: "absolute", right: 0, top: 0}} onPress={() => setShowRoutinePopover(true)}>
                            <Icon name="ellipsis" size={25} color={colors.purple} />
                        </TouchableOpacity>
                    </Tooltip>
                </View>

                <AddRoutineModal
                    modalVisible={isAddRoutineModalVisible}
                    setModalVisible={setIsAddRoutineModalVisible}
                    routine={routine}
                    key={`add-routine-modal-${routine.id}`}
                />
                <RoutineDetailModal
                    key={routine.id}
                    routine={routine}
                    modalVisible={isRoutineDetailModalVisible}
                    setModalVisible={setIsRoutineDetailModalVisible}
                />
                <View style={{ position: "absolute", bottom: -10, right: -10 }}>
                    <Button title="Start" onPress={() => setIsStartRoutineModalVisible(true)} />
                </View>
                <StartRoutineModal
                    routine={routine}
                    modalVisible={isStartRoutineModalVisible}
                    setModalVisible={setIsStartRoutineModalVisible}
                />
            </View>
        </View>
    )
}

export default Routine