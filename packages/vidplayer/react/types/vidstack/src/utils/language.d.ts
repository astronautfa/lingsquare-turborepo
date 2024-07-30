/**
 * Gets the language name corresponding to the provided language code.
 *
 * @param {string} langCode - The language code (e.g.,"en", "en-us", "es-es", "fr-fr").
 * @returns {string} The localized language name based on the user's preferred languages,
 *                   or `null` if the language code is not recognized.
 */
export declare function getLangName(langCode: string): string | null;
