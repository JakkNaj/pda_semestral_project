import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome6";
import colors from "../../common/colors";
import HistoryMenu from "../modals/HistoryMenu";
import HistoryDetailModal from "../modals/HistoryDetailModal";
import Tooltip from "react-native-walkthrough-tooltip";
import { Image } from 'react-native';

const HistoryCard = ({ history }) => {
const [showHistoryMenu, setShowHistoryMenu] = useState(false);
const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

    return (
        <View style={styles.card}>
            <View style={styles.topWrapper}>
                <View style={styles.leftCol}>
                    <Text style={styles.trainingName}>{history.routineName}</Text>
                    <Text style={styles.secondRow}>{history.finish}</Text>
                </View>
                <Tooltip
                    isVisible={showHistoryMenu}
                    onClose={() => setShowHistoryMenu(false)}
                    arrowSize={{ width: 0, height: 0 }}
                    content={
                        <HistoryMenu
                            history={history}
                            setIsDetailModalVisible={() => setIsDetailModalVisible(true)}
                        />
                    }
                    placement="bottom"
                    showChildInTooltip={false}
                    contentStyle={{ padding: 0 }}
                    backgroundColor={"transparent"}
                >
                    <View style={styles.rightCol}>
                        <TouchableOpacity onPress={() => setShowHistoryMenu(true)}>
                            <Icon name="ellipsis" size={25} color={colors.purple} />
                        </TouchableOpacity>
                        <Text style={styles.secondRow}>{history.timer}</Text>
                    </View>
                </Tooltip>
            </View>
            <View style={styles.photo}>
                {history.photo ? (
                    <Image
                        source={{ uri: history.photo }}
                        style={{ width: "100%", height: "100%" }}
                    />
                ) : (
                    <Icon name="camera" size={160} color={colors.purple} />
                )}
            </View>
            <HistoryDetailModal
                history={history}
                modalVisible={isDetailModalVisible}
                setModalVisible={setIsDetailModalVisible}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: 16,
        backgroundColor: "#F1F4F8",
        borderRadius: 8,
    },
    topWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#DCDCDC",
    },
    leftCol: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
    },
    rightCol: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
    },
    trainingName: {
        fontSize: 24,
        fontWeight: "bold",
        color: colors.purple,
    },
    secondRow: {
        fontSize: 12,
        color: colors.grey,
    },
    photo: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
        height: 300,
    },
})

export default HistoryCard;