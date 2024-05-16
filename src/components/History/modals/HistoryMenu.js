import React from 'react';
import {Share, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../common/colors";
import Toast from "react-native-toast-message";
import {saveHistoryToStorage} from "../../Trainings/actions";
import {useDispatch, useSelector} from "react-redux";
import {historySelector} from "../../Trainings/reducer";
import capitalizeFirstLetter from "../../common/helpers/capitalizeFirstLetter";

const HistoryMenu = ({ history, setIsDetailModalVisible }) => {
    const dispatch = useDispatch();
    const allHistory = useSelector(historySelector)

    const handleViewClick = () => {
        setIsDetailModalVisible(true);
    };

    const handleShareClick = async () => {
        try {
            const historyMessage = history?.exercises.map((exercise, index) => {
                const exerciseSets = exercise.sets.map((set, setIndex) => {
                    const weight = set[1] !== "-" ? `Weight: ${set[1]} ` : "";
                    const reps = set[2] !== "-" ? `Reps: ${set[2]} ` : "";
                    return `Set ${setIndex + 1}: ${weight} ${reps}`;
                }).join('\n');
                return `Exercise ${index + 1}: ${capitalizeFirstLetter(exercise.name)}\n${exerciseSets}`;
            }).join('\n\n');

            const result = await Share.share({
                message: `Check out this workout i did: ${history?.routineName}\n\nStart time: ${history?.start}\nEnd time: ${history?.finish}\nDuration: ${history?.timer}\n\n${historyMessage}`,
            });

            if (result.action === Share.sharedAction) {
                Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'Thanks for sharing us!',
                    visibilityTime: 5000,
                });
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDeleteClick = () => {
        dispatch(saveHistoryToStorage(allHistory.filter(h => h.start !== history.start)));
    };

    const options = [
        { name: 'View', icon: 'eye', action: handleViewClick },
        { name: 'Share', icon: 'share', action: handleShareClick },
        { name: 'Delete', icon: 'trash', action: handleDeleteClick },
    ];

    return (
        <View style={[styles.container, {height: 150}]}>
            {options.map((option, index) => (
                <TouchableOpacity
                    key={option.name}
                    onPress={option.action}
                    style={[
                        styles.row,
                        index === options.length - 1 && styles.lastRow
                    ]}
                >
                    <Icon name={option.icon} size={20} style={{color: colors.purple}} />
                    <Text style={[styles.text, {color: colors.purple}]}>{option.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#DCDCDC',
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        paddingBottom: 12,
        paddingTop: 12,
        paddingLeft: 16,
        paddingRight: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#DCDCDC',
    },
    lastRow: {
        borderBottomWidth: 0,
    },
    text: {
        fontSize: 18,
        paddingLeft: 16,
    },
});

export default HistoryMenu;