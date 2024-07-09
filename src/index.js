import autoAnimate from "@formkit/auto-animate";

export default (Alpine) => {
  Alpine.directive(
    "animate",
    (el, { value, modifiers, expression }, { Alpine, effect, cleanup }) => {
      console.log(modifiers);
      console.log(expression);
      console.log(Alpine);
      console.log(effect);
      console.log(cleanup);
      console.log(value);

      let configs = {};
      // handling the duration modifier
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
          console.log(configs);
        } else {
          console.warn(
            "Invalid duration format. Use digits followed by 'ms' or 's'."
          );
        }
      } else {
        console.warn('The "duration" modifier was specified without a value.');
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

      if (modifiers.includes("disrespectusermotionpreference")) {
        const userMotionPrefValue =
          modifiers[modifiers.indexOf("disrespectusermotionpreference") + 1];
        configs.disrespectUserMotionPreference = userMotionPrefValue
          ? true
          : false;
      }
      // grap the duration modifier

      // grap the ease modifier

      // grap the disrespectUserMotionPreference

      // or evaluate the passed object instead eg: { duration:300, ease:linear, disrespectUserMotionPreference}

      // initialize autoAnimate(el,{configs}) and pass to it the params
      console.log(configs);
    }
  );
};
