import {uniqueNamesGenerator, colors, starWars} from "unique-names-generator";

export function makeid(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function generateUsername(words) {
    return uniqueNamesGenerator({
        dictionaries: [colors, starWars],
        style: 'capital',
        length: words,
        separator: " "
    });
}
