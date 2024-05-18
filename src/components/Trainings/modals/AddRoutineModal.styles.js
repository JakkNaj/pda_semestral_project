import {StyleSheet} from "react-native";
import colors from "../../common/colors";

const styles = StyleSheet.create({
    container: {

    },
    topButtonsContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    searchInput: {
        height: 40,
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        marginTop: 7,
        borderBottomColor: colors.lightGrey,
        backgroundColor: colors.lightGrey,
        width: "70%",
        borderRadius: 10
    },
    addExerciseDiv: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90%"
    },
    exercisesDiv: {
        display: "flex",
        alignItems: "center",
        height: "90%"
    },
    addExerciseTitle: {
        color: colors.purple,
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center"
    },
    addExerciseText: {
        textAlign: "center",
        width: 300,
        marginVertical: 20
    },
    exerciseTableContainer: {
        width: "100%",
        display: "flex",
        alignItems: "center"
    },
    tableRow: {
        marginVertical: 10
    },
    tableText: {
        fontSize: 18,
        textAlign: "center"
    },
    tableHeadText: {
        fontWeight: "bold",
        textAlign: "center"

    },
    topContainer: {
        padding: 10,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }
});

export default styles