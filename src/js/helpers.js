import { TIMEOUT_SECONDS } from "./config";


const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
/*
export const getJSON = async function(url) {
    //
    try {
        const promise = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);

        const data = await promise.json();

        if (!promise.ok) throw new Error(`${data.message} (${promise.status})`);
        return data;
    } catch (error) {
        // console.error(error);
        throw error;
    }
};

export const sendJSON = async function(url, uploadData) {
    //
    try {
        const fetchPromise = fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(uploadData)
        });

        const promise = await Promise.race([fetchPromise, timeout(TIMEOUT_SECONDS)]);

        const data = await promise.json();

        if (!promise.ok) throw new Error(`${data.message} (${promise.status})`);
        return data;
    } catch (error) {
        // console.error(error);
        throw error;
    }
};
*/
export const JSONofAJAX = async function(url, uploadData = undefined) {
    try {
        const fetchPromise = uploadData ?
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(uploadData)
            }) :
            fetch(url);

        const promise = await Promise.race([fetchPromise, timeout(TIMEOUT_SECONDS)]);

        const data = await promise.json();

        if (!promise.ok) throw new Error(`${data.message} (${promise.status})`);
        return data;
    } catch (error) {
        // console.error(error);
        throw error;
    }
};