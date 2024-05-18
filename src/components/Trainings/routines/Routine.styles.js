import {StyleSheet} from "react-native";
import colors from "../../common/colors";

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderStyle: "solid",
        borderColor: colors.lightGrey,
        borderWidth: 1.5,
        borderRadius: 15,
        marginBottom: 30,
        display: "flex",
        flexDirection: "row",
        minHeight: 130
    },
    title: {
        color: colors.purple,
        fontWeight: "500",
        fontSize: 20,
        marginBottom: 5,
    },
    bulletIcon: {
        marginTop: 9,
        marginRight: 5
    },
    bulletContainer: {
        display: "flex",
        flexDirection: "row"
    },
    rightPart: {
        flex: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        width: 120
    }
});

export default styles