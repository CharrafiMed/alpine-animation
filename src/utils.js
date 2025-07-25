export function parseModifier(modifiers) {
    if (modifiers.includes("duration")) {
        
        const durationIndex = modifiers.indexOf("duration");
        const durationValue = modifiers[durationIndex + 1];
        const durationRegex = /^(\d+)(ms|s)?$/;

        if (durationRegex.test(durationValue)) {
            const match = durationRegex.exec(durationValue);
            const durationNumber = parseInt(match[1], 10);

            // Default to "ms" if unit is empty
            const durationUnit = match[2] || "ms";

            configs.duration =
                durationUnit === "s" ? durationNumber * 1000 : durationNumber;
        } else {
            console.warn(
                "Invalid duration format. Use digits followed by 'ms' or 's'."
            );
        }
    }

    // handling the easing modifier
    if (modifiers.includes("easing")) {
        const easingValue = modifiers[modifiers.indexOf("easing") + 1];
        easingValue
            ? (configs.easing = easingValue)
            : console.warn(
                'The "easing" modifier was specified without a value.'
            );
    }
    //  handling the disrespectUserMotionPreference modifier
    if (modifiers.includes("disrespectusermotionpreference")) {
        const userMotionPrefValue =
            modifiers[modifiers.indexOf("disrespectusermotionpreference") + 1];
        configs.disrespectUserMotionPreference = userMotionPrefValue
            ? true
            : false;
    }
}