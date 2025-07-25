import autoAnimate from '@formkit/auto-animate';
import { parseModifier } from './utils';

// Global configuration store
let globalConfig = {
  duration: 300,
  easing: 'ease-in-out',
  disrespectUserMotionPreference: false
};

function AlpineAnimation(Alpine) {
  Alpine.directive('animate', (el, { modifiers, expression }, { evaluate, cleanup }) => {
    try {
      // Start with global configuration as base
      let config = { ...globalConfig };
      
      // Override with modifier-based configuration
      const modifierConfig = parseModifier(modifiers);
      config = { ...config, ...modifierConfig };
      
      // Override with expression-based configuration (highest priority)
      if (expression?.length) {
        const evaluated = evaluate(expression);
        if (typeof evaluated === 'object' && evaluated !== null) {
          config = { ...config, ...evaluated };
        } else if (evaluated === false) {
          // Allow disabling animation with expression
          return;
        }
      }
      
      // Initialize auto-animate with final configuration
      const autoAnimateInstance = autoAnimate(el, config);
      
      // Cleanup on directive destruction
      cleanup(() => {
        if (autoAnimateInstance && typeof autoAnimateInstance.destroy === 'function') {
          autoAnimateInstance.destroy();
        }
      });
      
    } catch (error) {
      console.error('[Alpine Animation] Failed to initialize:', error);
    }
  });
}

// Add customize method to the function
AlpineAnimation.customize = function(userConfig) {
  if (typeof userConfig !== 'object' || userConfig === null) {
    console.warn('[Alpine Animation] customize() expects an object');
    return AlpineAnimation;
  }
  
  // Validate and merge user configuration
  const validKeys = ['duration', 'easing', 'disrespectUserMotionPreference'];
  const validConfig = {};
  
  Object.keys(userConfig).forEach(key => {
    if (validKeys.includes(key)) {
      validConfig[key] = userConfig[key];
    } else {
      console.warn(`[Alpine Animation] Unknown configuration key: "${key}"`);
    }
  });
  
  // Validate specific values
  if (validConfig.duration !== undefined) {
    if (typeof validConfig.duration !== 'number' || validConfig.duration < 0) {
      console.warn('[Alpine Animation] duration must be a non-negative number');
      delete validConfig.duration;
    }
  }
  
  if (validConfig.easing !== undefined) {
    if (typeof validConfig.easing !== 'string') {
      console.warn('[Alpine Animation] easing must be a string');
      delete validConfig.easing;
    }
  }
  
  if (validConfig.disrespectUserMotionPreference !== undefined) {
    validConfig.disrespectUserMotionPreference = Boolean(validConfig.disrespectUserMotionPreference);
  }
  
  // Merge with global config
  globalConfig = { ...globalConfig, ...validConfig };
  
  return AlpineAnimation; // Return for chaining
};

// Add method to get current global config
AlpineAnimation.getConfig = function() {
  return { ...globalConfig };
};

// Add method to reset to defaults
AlpineAnimation.reset = function() {
  globalConfig = {
    duration: 250,
    easing: 'ease-in-out',
    disrespectUserMotionPreference: false
  };
  return AlpineAnimation;
};

export default AlpineAnimation;