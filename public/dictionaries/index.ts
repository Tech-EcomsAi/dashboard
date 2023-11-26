import EnglishTransalations from './en.json'
import HindiTranslations from './hi.json'
import { DictionaryType } from './type';

export const translator = (locale: string) => {
    let disctionary: DictionaryType;
    switch (locale) {
        case 'hi':
            disctionary = HindiTranslations
            break;

        default:
            disctionary = EnglishTransalations
            break;
    }
    return disctionary;
}

