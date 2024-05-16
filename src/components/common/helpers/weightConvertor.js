// Function to convert pounds to kilograms
import {useSelector} from "react-redux";
import {settingsSelector} from "../../Settings/reducer";

export const poundsToKilograms = (pounds) => {
    return (pounds * 0.45).toFixed(1);
}

// Function to convert kilograms to pounds
export const kilogramsToPounds = (kilograms) => {
    return (kilograms / 0.45).toFixed(1);
}
export const convertedWeight = (weight, routine, selectedWeight) => {
    if (routine?.weightUnit === selectedWeight) {
        return weight;
    } else {
        if (selectedWeight === "kg") {
            return poundsToKilograms(weight);
        } else {
            return kilogramsToPounds(weight);
        }
    }
}