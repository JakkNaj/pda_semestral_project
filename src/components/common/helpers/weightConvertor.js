// Function to convert pounds to kilograms
export const poundsToKilograms = (pounds) => {
    return (pounds * 0.45).toFixed(1);
}

// Function to convert kilograms to pounds
export const kilogramsToPounds = (kilograms) => {
    return (kilograms / 0.45).toFixed(1);
}


export const convertWeigthForDisplay = (weight, selectedWeight) => {
    weight = parseInt(weight) ? parseInt(weight) : weight;
    if (typeof weight === 'number' && selectedWeight === 'lbs') {
        return kilogramsToPounds(weight);
    }
    return String(weight);
}

export const convertWeightToKg = (weight, selectedWeight) => {
    weight = parseInt(weight) ? parseInt(weight) : weight;
    console.log("convertWeightToKg")
    if (typeof weight === 'number' && selectedWeight === 'lbs') {
        console.log("back to kg")
        return poundsToKilograms(weight);
    }
    return String(weight);
}