export const calculateGenericLeftPosition = (imageHeight: number, imageWidth: number, normalLeftPositionPercentage: number) => {
    const screenResolution = window.innerWidth / window.innerHeight;
    const imageResolution = imageWidth / imageHeight;

    if (screenResolution > imageResolution) return `calc(${normalLeftPositionPercentage}%)`;

    const imageRatio = window.innerHeight / imageHeight;
    const imageActualWidth = imageWidth * imageRatio;
    const imageLeftestPosition = 0 - (imageActualWidth - window.innerWidth) / 2;
    const leftPosition = `${imageLeftestPosition + (imageActualWidth * normalLeftPositionPercentage / 100)}px`;
    return leftPosition;
}

export const calculateGenericTopPosition = (imageHeight: number, imageWidth: number, normalTopPositionPercentage: number) => {
    const screenResolution = window.innerWidth / window.innerHeight;
    const imageResolution = imageWidth / imageHeight;

    if (screenResolution < imageResolution) return `${normalTopPositionPercentage}%`;

    const imageRatio = window.innerWidth / imageWidth;
    const imageActualHeight = imageHeight * imageRatio;
    const imageHighestPosition = 0 - (imageActualHeight - window.innerHeight) / 2;
    const topPosition = `${imageHighestPosition + (imageActualHeight * normalTopPositionPercentage / 100)}px`;
    return topPosition;
}