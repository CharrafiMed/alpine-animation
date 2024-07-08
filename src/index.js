import autoAnimate from "@formkit/auto-animate";

export default (Alpine) => {
  Alpine.directive(
    "animate",
    (el, { value, modifiers, expression }, { Alpine, effect, cleanup }) => {
        console.log('here')
        let configs={};
      
        // check for modifiers

      // grap the duration modifier

      // grap the ease modifier
      
      // grap the disrespectUserMotionPreference
      
      // or evaluate the passed object instead eg: { duration:300, ease:linear, disrespectUserMotionPreference}
      
      // initialize autoAnimate(el,{configs}) and pass to it the params
    }
  );
};
