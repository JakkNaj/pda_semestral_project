const capitalizeFirstLetter = (string) => {
    if (typeof string !== 'string') {
        return string;
    }

    return string.charAt(0).toUpperCase() + string.slice(1);
};

export default capitalizeFirstLetter