import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import TopButton from "../../common/buttons/TopButton";
import CustomModal from "../../common/CustomModal";
import colors from "../../common/colors";
import Button from "../../common/buttons/Button";
import {useState} from "react";
import {saveHistoryToStorage} from "../actions";
import {useDispatch, useSelector} from "react-redux";
import {historySelector} from "../reducer";
import * as ImagePicker from 'expo-image-picker';
import {Camera} from "expo-camera";
import { Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import {settingsSelector} from "../../Settings/reducer";


const SaveToHistoryModal = ({ modalVisible, setModalVisible, setStartExerciseModalVisible, historyObject }) => {
    const dispatch = useDispatch();
    const historyData = useSelector(historySelector);
    const [photo, setPhoto] = useState(null);
    const settings = useSelector(settingsSelector);

    const openCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
            await handleAddImage(result.assets[0].uri);
        }
    };

    const handleAddImage = async (uri) => {
        if (!uri) {
            console.error("No URI provided to handleAddImage" + uri);
            return;
        }

        const fileName = uri.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.copyAsync({
                from: uri,
                to: newPath
            });
            historyObject[historyObject.routineId] = newPath;
        } catch (err) {
            console.error('Error saving the image to filesystem', err);
        }
    };

    const finalHistoryObject = {
        ...historyObject,
        photo: photo ?? null,
        weightUnit: settings.weightUnit,
    }

    const saveHistory = () => {
        dispatch(saveHistoryToStorage([
            ...historyData,
            finalHistoryObject
        ]))
    }


    return (
        <CustomModal
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
            modalId={"save-to-history-modal"}
        >
            <View style={styles.topButtonsContainer}>
                <TopButton
                    onPress={() => {
                        setStartExerciseModalVisible(false)
                    }}
                    size={24}
                    icon="trash"
                />
                <Text style={styles.boldText}>
                    {historyObject?.routineName ?? "Untitled routine"}
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        saveHistory()
                        setStartExerciseModalVisible(false)
                    }}>
                    <Text style={styles.boldPurpleText}>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <Text style={styles.boldText}>
                    Workout details
                </Text>
                <View style={styles.dataRow}>
                    <Text style={styles.boldText}>
                        Start time
                    </Text>
                    <Text style={styles.boldPurpleText}>
                        {historyObject?.start}
                    </Text>
                </View>
                <View style={styles.dataRow}>
                    <Text style={styles.boldText}>
                        End time
                    </Text>
                    <Text style={styles.boldPurpleText}>
                        {historyObject?.finish}
                    </Text>
                </View>
                <Button title={!!photo ? "Retake photo" : "Take photo"} onPress={openCamera} />
                {!!photo ? (
                    <Image
                        source={{ uri: photo }}
                        style={{ width: "100%", aspectRatio: 1}}
                    />
                ) : null}
            </View>
        </CustomModal>
    )
}

const styles = StyleSheet.create({
    topButtonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    boldText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    normalText: {
        fontSize: 16,
    },
    boldPurpleText: {
        color: colors.purple,
        fontSize: 16,
        fontWeight: "bold",
    },
    body: {
        display: "flex",
        flexDirection: "column",
        gap: 20,
        marginTop: 20,
    },
    dataRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }
})

export default SaveToHistoryModal