export const formatPlaceText = (place) => {
    const formattedPlace = place !== undefined ? `${place.trim()[0].toUpperCase()}${place.trim().slice(1).replaceAll('_', ' ')}` : undefined
    return formattedPlace
}

// export default formatPlaceText;