export function parseModifier(modifiers) {
    let
        duration = 300,
        easing = 'ease-in-out',
        disrespectUserMotionPreference = false;

    if (modifiers.includes('duration')) {
        const durationIndex = modifiers.indexOf('duration');
        const durationValue = modifiers[durationIndex + 1];
        const durationRegex = /^(\d+)(ms|s)?$/;

        // console.log(durationRegex.test(durationValue))

        if (!durationRegex.test(durationValue)) {
            console.warn('The \'duration\' modifier was specified without a valid value.')
        } else {
            const match = durationRegex.exec(durationValue);
            const durationNumber = parseInt(match[1], 10);

            // Default to 'ms' if unit is empty
            const durationUnit = match[2] || 'ms';

            duration = durationUnit === 's' ? durationNumber * 1000 : durationNumber;
        }
    }

    // handling the easing modifier
    if (modifiers.includes('easing')) {
        const easingValue = modifiers[modifiers.indexOf('easing') + 1];
        easingValue
            ? (easing = easingValue)
            : console.warn('The \'easing\' modifier was specified without a value.');
    }
    //  handling the disrespectUserMotionPreference modifier
    if (modifiers.includes('disrespectusermotionpreference')) {
        const userMotionPrefValue =
            modifiers[modifiers.indexOf('disrespectusermotionpreference') + 1];
        disrespectUserMotionPreference = userMotionPrefValue
            ? true
            : false;
    }
    return {
        duration, easing, disrespectUserMotionPreference
    }
}
