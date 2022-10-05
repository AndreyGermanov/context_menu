/**
 * @ignore
 * Function used to create a custom event from raw Javascript DOM event.
 * @param origEvent {Event} Original DOM event to get as a base
 * @param params {object} Params to add to event
 */
export const createEvent = (origEvent,params={}) => {
    const result = {};
    for (let key in origEvent) {
        if (key !== "type" && key !== "target") {
            result[key] = origEvent[key];
        }
    }
    Object.keys(params).forEach((key) => {
        result[key] = params[key];
    })
    return result;
}

export const blobToDataURL = (blob) =>{
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = function(e) {resolve(e.target.result);}
        reader.readAsDataURL(blob);
    })
}
