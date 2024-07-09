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
        console.log("duration exists");
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
        console.log("disrespectUserMotionPreference exists");
      }
      // grap the duration modifier

      // grap the ease modifier

      // grap the disrespectUserMotionPreference

      // or evaluate the passed object instead eg: { duration:300, ease:linear, disrespectUserMotionPreference}

      // initialize autoAnimate(el,{configs}) and pass to it the params
    }
  );
};
