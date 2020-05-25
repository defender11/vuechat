
export function getThumb (img, width, height) {
    let canvas = document.createElement('canvas'),
        newProportion = getNewProportion(img.width, img.height, width, height);

    canvas.width = width;
    canvas.height = height;

    canvas
        .getContext("2d")
        .drawImage(img,0,0,newProportion.width,newProportion.height);

    const dataURI = canvas.toDataURL("image/jpeg");

    return dataURI;
}

function getNewProportion(srcWidth, srcHeight, width, height) {
    let w = parseFloat(width),
        h = parseFloat(height),
        ratio = w / h;

    // Original image dimensions.
    let oldWidth = parseFloat(srcWidth),
        oldHeight = parseFloat(srcHeight),
        oldRatio = oldWidth / oldHeight;

    let newWidth, newHeight;

    // Determine new image dimensions to scale to.
    // Also determine cropping coordinates.
    if (ratio > oldRatio) {
        newWidth = w;
        newHeight = (w / oldWidth) * oldHeight;
    } else {
        newWidth = (h / oldHeight) * oldWidth;
        newHeight = h;
    }

    return {
        width: Number(newWidth),
        height: Number(newHeight)
    };
}

export function getDateTimeNow() {
    return new Date().toLocaleString();    
}

export function nl2br (str, is_xhtml) {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}