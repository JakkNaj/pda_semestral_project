// Function to convert pounds to kilograms
export const poundsToKilograms = (pounds) => {
    return (pounds * 0.45).toFixed(1);
}

// Function to convert kilograms to pounds
export const kilogramsToPounds = (kilograms) => {
    return (kilograms / 0.45).toFixed(1);
}


export const convertWeigthForDisplay = (weight, selectedWeight) => {
    if (typeof weight === 'number' && selectedWeight === 'lbs') {
        return kilogramsToPounds(weight);
    }
    return weight;
}

export const convertWeightToKg = (weight, selectedWeight) => {
    if (typeof weight === 'number' && selectedWeight === 'lbs') {
        return poundsToKilograms(weight);
    }
    return weight;
}