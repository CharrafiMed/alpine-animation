import autoAnimate from "@formkit/auto-animate";
import { parseModifier } from "./utils";

export default (Alpine) => {
  Alpine.directive("animate", (el, { value, modifiers, expression }, { Alpine, effect, evaluate, evaluateLater, cleanup }) => {
    let configs = {};
    // handling the duration modifier
    console.log(modifiers);

    if (String(expression).length) {
      configs = { ...configs, ...evaluate(expression) };
    }

    autoAnimate(el, configs);
  }
  );
};
