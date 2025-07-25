import autoAnimate from '@formkit/auto-animate';
import { parseModifier } from './utils';

config = {};

export default (Alpine) => {
  Alpine.directive('animate', (el, { modifiers, expression }, { evaluate }) => {

    let config = parseModifier(modifiers);

    if (expression?.length) {
      const evaluated = evaluate(expression);
      if (typeof evaluated === 'object' && evaluated !== null) {
        config = { ...config, ...evaluated };
      }
    }
    autoAnimate(el, config);
  });
};
