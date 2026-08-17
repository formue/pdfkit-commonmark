export const nameForHeadingLevel = (level) => {
    switch (level) {
        case 1:
            return 'heading-bold';
        case 2:
            return 'heading-bold';
        case 3:
            return 'heading-default';
        case 4:
            return 'heading-bold';
        default:
            return 'heading-default';
    }
};

export const DEFAULT_HEADING_MULTIPLIERS = {
    1: 1.4,
    2: 1.2,
    3: 1.2
};

/**
 * Size for the given heading level as a multiple of the base font size.
 *
 * @param {number} level Heading level (1-6)
 * @param {number} [baseSize=12] Base font size
 * @param {Object.<number, number>} [headingSizes] Optional map of heading level
 *   to multiplier of baseSize. Levels not present fall back to 1x. When omitted,
 *   the library defaults (h1 1.4x, h2/h3 1.2x, else 1x) apply.
 * @returns {number} The font size to use for the heading
 */
export const sizeForHeadingLevel = (level, baseSize = 12, headingSizes) => {
    const multipliers = headingSizes || DEFAULT_HEADING_MULTIPLIERS;
    const multiplier = typeof multipliers[level] === 'number' ? multipliers[level] : 1;
    return baseSize * multiplier;
};

export const nameForCode = () => 'code';

export const sizeForCode = (options) => {
    if (!options || !options.fonts) {
        throw new Error('missing options.fonts');
    }
    // TODO: Adjusting the font-size requires adjusting the baseline to make sure
    //  inline-code is aligned with the surrounding text.
    return options.fontSize * 1;
};

/**
 * Get the defined font for the given
 * internal name from the supplied
 * options map.
 *
 * @param {string} internalName
 * @param {object} options
 * @returns {string} The actual font name to use with pdfkit
 */
export const forInternalName = (internalName, options) => {

    if (!options || !options.fonts) {
        throw new Error('missing options.fonts');
    }

    return options.fonts[internalName];

};
