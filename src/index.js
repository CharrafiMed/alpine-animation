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

      // check for modifiers
      if (modifiers.includes("easing")) {
        console.log("easing exists");
        keyIndex = modifiers.indexOf("easing");
        valueIndex = modifiers[keyIndex + 1];
      }
      if (modifiers.includes("duration")) {
        console.log("duration exists");
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
