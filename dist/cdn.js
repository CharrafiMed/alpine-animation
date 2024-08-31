(() => {
  // node_modules/@formkit/auto-animate/index.mjs
  var parents = new Set();
  var coords = new WeakMap();
  var siblings = new WeakMap();
  var animations = new WeakMap();
  var intersections = new WeakMap();
  var intervals = new WeakMap();
  var options = new WeakMap();
  var debounces = new WeakMap();
  var enabled = new WeakSet();
  var root;
  var scrollX = 0;
  var scrollY = 0;
  var TGT = "__aa_tgt";
  var DEL = "__aa_del";
  var NEW = "__aa_new";
  var handleMutations = (mutations2) => {
    const elements = getElements(mutations2);
    if (elements) {
      elements.forEach((el) => animate(el));
    }
  };
  var handleResizes = (entries) => {
    entries.forEach((entry) => {
      if (entry.target === root)
        updateAllPos();
      if (coords.has(entry.target))
        updatePos(entry.target);
    });
  };
  function observePosition(el) {
    const oldObserver = intersections.get(el);
    oldObserver === null || oldObserver === void 0 ? void 0 : oldObserver.disconnect();
    let rect = coords.get(el);
    let invocations = 0;
    const buffer = 5;
    if (!rect) {
      rect = getCoords(el);
      coords.set(el, rect);
    }
    const {offsetWidth, offsetHeight} = root;
    const rootMargins = [
      rect.top - buffer,
      offsetWidth - (rect.left + buffer + rect.width),
      offsetHeight - (rect.top + buffer + rect.height),
      rect.left - buffer
    ];
    const rootMargin = rootMargins.map((px) => `${-1 * Math.floor(px)}px`).join(" ");
    const observer = new IntersectionObserver(() => {
      ++invocations > 1 && updatePos(el);
    }, {
      root,
      threshold: 1,
      rootMargin
    });
    observer.observe(el);
    intersections.set(el, observer);
  }
  function updatePos(el) {
    clearTimeout(debounces.get(el));
    const optionsOrPlugin = getOptions(el);
    const delay = isPlugin(optionsOrPlugin) ? 500 : optionsOrPlugin.duration;
    debounces.set(el, setTimeout(async () => {
      const currentAnimation = animations.get(el);
      try {
        await (currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.finished);
        coords.set(el, getCoords(el));
        observePosition(el);
      } catch {
      }
    }, delay));
  }
  function updateAllPos() {
    clearTimeout(debounces.get(root));
    debounces.set(root, setTimeout(() => {
      parents.forEach((parent) => forEach(parent, (el) => lowPriority(() => updatePos(el))));
    }, 100));
  }
  function poll(el) {
    setTimeout(() => {
      intervals.set(el, setInterval(() => lowPriority(updatePos.bind(null, el)), 2e3));
    }, Math.round(2e3 * Math.random()));
  }
  function lowPriority(callback) {
    if (typeof requestIdleCallback === "function") {
      requestIdleCallback(() => callback());
    } else {
      requestAnimationFrame(() => callback());
    }
  }
  var mutations;
  var resize;
  var supportedBrowser = typeof window !== "undefined" && "ResizeObserver" in window;
  if (supportedBrowser) {
    root = document.documentElement;
    mutations = new MutationObserver(handleMutations);
    resize = new ResizeObserver(handleResizes);
    window.addEventListener("scroll", () => {
      scrollY = window.scrollY;
      scrollX = window.scrollX;
    });
    resize.observe(root);
  }
  function getElements(mutations2) {
    const observedNodes = mutations2.reduce((nodes, mutation) => {
      return [
        ...nodes,
        ...Array.from(mutation.addedNodes),
        ...Array.from(mutation.removedNodes)
      ];
    }, []);
    const onlyCommentNodesObserved = observedNodes.every((node) => node.nodeName === "#comment");
    if (onlyCommentNodesObserved)
      return false;
    return mutations2.reduce((elements, mutation) => {
      if (elements === false)
        return false;
      if (mutation.target instanceof Element) {
        target(mutation.target);
        if (!elements.has(mutation.target)) {
          elements.add(mutation.target);
          for (let i = 0; i < mutation.target.children.length; i++) {
            const child = mutation.target.children.item(i);
            if (!child)
              continue;
            if (DEL in child) {
              return false;
            }
            target(mutation.target, child);
            elements.add(child);
          }
        }
        if (mutation.removedNodes.length) {
          for (let i = 0; i < mutation.removedNodes.length; i++) {
            const child = mutation.removedNodes[i];
            if (DEL in child) {
              return false;
            }
            if (child instanceof Element) {
              elements.add(child);
              target(mutation.target, child);
              siblings.set(child, [
                mutation.previousSibling,
                mutation.nextSibling
              ]);
            }
          }
        }
      }
      return elements;
    }, new Set());
  }
  function target(el, child) {
    if (!child && !(TGT in el))
      Object.defineProperty(el, TGT, {value: el});
    else if (child && !(TGT in child))
      Object.defineProperty(child, TGT, {value: el});
  }
  function animate(el) {
    var _a;
    const isMounted = el.isConnected;
    const preExisting = coords.has(el);
    if (isMounted && siblings.has(el))
      siblings.delete(el);
    if (animations.has(el)) {
      (_a = animations.get(el)) === null || _a === void 0 ? void 0 : _a.cancel();
    }
    if (NEW in el) {
      add(el);
    } else if (preExisting && isMounted) {
      remain(el);
    } else if (preExisting && !isMounted) {
      remove(el);
    } else {
      add(el);
    }
  }
  function raw(str) {
    return Number(str.replace(/[^0-9.\-]/g, ""));
  }
  function getScrollOffset(el) {
    let p = el.parentElement;
    while (p) {
      if (p.scrollLeft || p.scrollTop) {
        return {x: p.scrollLeft, y: p.scrollTop};
      }
      p = p.parentElement;
    }
    return {x: 0, y: 0};
  }
  function getCoords(el) {
    const rect = el.getBoundingClientRect();
    const {x, y} = getScrollOffset(el);
    return {
      top: rect.top + y,
      left: rect.left + x,
      width: rect.width,
      height: rect.height
    };
  }
  function getTransitionSizes(el, oldCoords, newCoords) {
    let widthFrom = oldCoords.width;
    let heightFrom = oldCoords.height;
    let widthTo = newCoords.width;
    let heightTo = newCoords.height;
    const styles = getComputedStyle(el);
    const sizing = styles.getPropertyValue("box-sizing");
    if (sizing === "content-box") {
      const paddingY = raw(styles.paddingTop) + raw(styles.paddingBottom) + raw(styles.borderTopWidth) + raw(styles.borderBottomWidth);
      const paddingX = raw(styles.paddingLeft) + raw(styles.paddingRight) + raw(styles.borderRightWidth) + raw(styles.borderLeftWidth);
      widthFrom -= paddingX;
      widthTo -= paddingX;
      heightFrom -= paddingY;
      heightTo -= paddingY;
    }
    return [widthFrom, widthTo, heightFrom, heightTo].map(Math.round);
  }
  function getOptions(el) {
    return TGT in el && options.has(el[TGT]) ? options.get(el[TGT]) : {duration: 250, easing: "ease-in-out"};
  }
  function getTarget(el) {
    if (TGT in el)
      return el[TGT];
    return void 0;
  }
  function isEnabled(el) {
    const target2 = getTarget(el);
    return target2 ? enabled.has(target2) : false;
  }
  function forEach(parent, ...callbacks) {
    callbacks.forEach((callback) => callback(parent, options.has(parent)));
    for (let i = 0; i < parent.children.length; i++) {
      const child = parent.children.item(i);
      if (child) {
        callbacks.forEach((callback) => callback(child, options.has(child)));
      }
    }
  }
  function getPluginTuple(pluginReturn) {
    if (Array.isArray(pluginReturn))
      return pluginReturn;
    return [pluginReturn];
  }
  function isPlugin(config) {
    return typeof config === "function";
  }
  function remain(el) {
    const oldCoords = coords.get(el);
    const newCoords = getCoords(el);
    if (!isEnabled(el))
      return coords.set(el, newCoords);
    let animation;
    if (!oldCoords)
      return;
    const pluginOrOptions = getOptions(el);
    if (typeof pluginOrOptions !== "function") {
      const deltaX = oldCoords.left - newCoords.left;
      const deltaY = oldCoords.top - newCoords.top;
      const [widthFrom, widthTo, heightFrom, heightTo] = getTransitionSizes(el, oldCoords, newCoords);
      const start = {
        transform: `translate(${deltaX}px, ${deltaY}px)`
      };
      const end = {
        transform: `translate(0, 0)`
      };
      if (widthFrom !== widthTo) {
        start.width = `${widthFrom}px`;
        end.width = `${widthTo}px`;
      }
      if (heightFrom !== heightTo) {
        start.height = `${heightFrom}px`;
        end.height = `${heightTo}px`;
      }
      animation = el.animate([start, end], {
        duration: pluginOrOptions.duration,
        easing: pluginOrOptions.easing
      });
    } else {
      const [keyframes] = getPluginTuple(pluginOrOptions(el, "remain", oldCoords, newCoords));
      animation = new Animation(keyframes);
      animation.play();
    }
    animations.set(el, animation);
    coords.set(el, newCoords);
    animation.addEventListener("finish", updatePos.bind(null, el));
  }
  function add(el) {
    if (NEW in el)
      delete el[NEW];
    const newCoords = getCoords(el);
    coords.set(el, newCoords);
    const pluginOrOptions = getOptions(el);
    if (!isEnabled(el))
      return;
    let animation;
    if (typeof pluginOrOptions !== "function") {
      animation = el.animate([
        {transform: "scale(.98)", opacity: 0},
        {transform: "scale(0.98)", opacity: 0, offset: 0.5},
        {transform: "scale(1)", opacity: 1}
      ], {
        duration: pluginOrOptions.duration * 1.5,
        easing: "ease-in"
      });
    } else {
      const [keyframes] = getPluginTuple(pluginOrOptions(el, "add", newCoords));
      animation = new Animation(keyframes);
      animation.play();
    }
    animations.set(el, animation);
    animation.addEventListener("finish", updatePos.bind(null, el));
  }
  function cleanUp(el, styles) {
    var _a;
    el.remove();
    coords.delete(el);
    siblings.delete(el);
    animations.delete(el);
    (_a = intersections.get(el)) === null || _a === void 0 ? void 0 : _a.disconnect();
    setTimeout(() => {
      if (DEL in el)
        delete el[DEL];
      Object.defineProperty(el, NEW, {value: true, configurable: true});
      if (styles && el instanceof HTMLElement) {
        for (const style in styles) {
          el.style[style] = "";
        }
      }
    }, 0);
  }
  function remove(el) {
    var _a;
    if (!siblings.has(el) || !coords.has(el))
      return;
    const [prev, next] = siblings.get(el);
    Object.defineProperty(el, DEL, {value: true, configurable: true});
    const finalX = window.scrollX;
    const finalY = window.scrollY;
    if (next && next.parentNode && next.parentNode instanceof Element) {
      next.parentNode.insertBefore(el, next);
    } else if (prev && prev.parentNode) {
      prev.parentNode.appendChild(el);
    } else {
      (_a = getTarget(el)) === null || _a === void 0 ? void 0 : _a.appendChild(el);
    }
    if (!isEnabled(el))
      return cleanUp(el);
    const [top, left, width, height] = deletePosition(el);
    const optionsOrPlugin = getOptions(el);
    const oldCoords = coords.get(el);
    if (finalX !== scrollX || finalY !== scrollY) {
      adjustScroll(el, finalX, finalY, optionsOrPlugin);
    }
    let animation;
    let styleReset = {
      position: "absolute",
      top: `${top}px`,
      left: `${left}px`,
      width: `${width}px`,
      height: `${height}px`,
      margin: "0",
      pointerEvents: "none",
      transformOrigin: "center",
      zIndex: "100"
    };
    if (!isPlugin(optionsOrPlugin)) {
      Object.assign(el.style, styleReset);
      animation = el.animate([
        {
          transform: "scale(1)",
          opacity: 1
        },
        {
          transform: "scale(.98)",
          opacity: 0
        }
      ], {duration: optionsOrPlugin.duration, easing: "ease-out"});
    } else {
      const [keyframes, options2] = getPluginTuple(optionsOrPlugin(el, "remove", oldCoords));
      if ((options2 === null || options2 === void 0 ? void 0 : options2.styleReset) !== false) {
        styleReset = (options2 === null || options2 === void 0 ? void 0 : options2.styleReset) || styleReset;
        Object.assign(el.style, styleReset);
      }
      animation = new Animation(keyframes);
      animation.play();
    }
    animations.set(el, animation);
    animation.addEventListener("finish", cleanUp.bind(null, el, styleReset));
  }
  function adjustScroll(el, finalX, finalY, optionsOrPlugin) {
    const scrollDeltaX = scrollX - finalX;
    const scrollDeltaY = scrollY - finalY;
    const scrollBefore = document.documentElement.style.scrollBehavior;
    const scrollBehavior = getComputedStyle(root).scrollBehavior;
    if (scrollBehavior === "smooth") {
      document.documentElement.style.scrollBehavior = "auto";
    }
    window.scrollTo(window.scrollX + scrollDeltaX, window.scrollY + scrollDeltaY);
    if (!el.parentElement)
      return;
    const parent = el.parentElement;
    let lastHeight = parent.clientHeight;
    let lastWidth = parent.clientWidth;
    const startScroll = performance.now();
    function smoothScroll() {
      requestAnimationFrame(() => {
        if (!isPlugin(optionsOrPlugin)) {
          const deltaY = lastHeight - parent.clientHeight;
          const deltaX = lastWidth - parent.clientWidth;
          if (startScroll + optionsOrPlugin.duration > performance.now()) {
            window.scrollTo({
              left: window.scrollX - deltaX,
              top: window.scrollY - deltaY
            });
            lastHeight = parent.clientHeight;
            lastWidth = parent.clientWidth;
            smoothScroll();
          } else {
            document.documentElement.style.scrollBehavior = scrollBefore;
          }
        }
      });
    }
    smoothScroll();
  }
  function deletePosition(el) {
    const oldCoords = coords.get(el);
    const [width, , height] = getTransitionSizes(el, oldCoords, getCoords(el));
    let offsetParent = el.parentElement;
    while (offsetParent && (getComputedStyle(offsetParent).position === "static" || offsetParent instanceof HTMLBodyElement)) {
      offsetParent = offsetParent.parentElement;
    }
    if (!offsetParent)
      offsetParent = document.body;
    const parentStyles = getComputedStyle(offsetParent);
    const parentCoords = coords.get(offsetParent) || getCoords(offsetParent);
    const top = Math.round(oldCoords.top - parentCoords.top) - raw(parentStyles.borderTopWidth);
    const left = Math.round(oldCoords.left - parentCoords.left) - raw(parentStyles.borderLeftWidth);
    return [top, left, width, height];
  }
  function autoAnimate(el, config = {}) {
    if (mutations && resize) {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const isDisabledDueToReduceMotion = mediaQuery.matches && !isPlugin(config) && !config.disrespectUserMotionPreference;
      if (!isDisabledDueToReduceMotion) {
        enabled.add(el);
        if (getComputedStyle(el).position === "static") {
          Object.assign(el.style, {position: "relative"});
        }
        forEach(el, updatePos, poll, (element) => resize === null || resize === void 0 ? void 0 : resize.observe(element));
        if (isPlugin(config)) {
          options.set(el, config);
        } else {
          options.set(el, {duration: 250, easing: "ease-in-out", ...config});
        }
        mutations.observe(el, {childList: true});
        parents.add(el);
      }
    }
    return Object.freeze({
      parent: el,
      enable: () => {
        enabled.add(el);
      },
      disable: () => {
        enabled.delete(el);
      },
      isEnabled: () => enabled.has(el)
    });
  }

  // src/index.js
  var src_default = (Alpine) => {
    Alpine.directive("animate", (el, {value, modifiers, expression}, {Alpine: Alpine2, effect, evaluate, evaluateLater, cleanup}) => {
      let configs = {};
      if (modifiers.includes("duration")) {
        const durationIndex = modifiers.indexOf("duration");
        const durationValue = modifiers[durationIndex + 1];
        const durationRegex = /^(\d+)(ms|s)?$/;
        if (durationRegex.test(durationValue)) {
          const match = durationRegex.exec(durationValue);
          const durationNumber = parseInt(match[1], 10);
          const durationUnit = match[2] || "ms";
          configs.duration = durationUnit === "s" ? durationNumber * 1e3 : durationNumber;
        } else {
          console.warn("Invalid duration format. Use digits followed by 'ms' or 's'.");
        }
      }
      if (modifiers.includes("easing")) {
        const easingValue = modifiers[modifiers.indexOf("easing") + 1];
        easingValue ? configs.easing = easingValue : console.warn('The "easing" modifier was specified without a value.');
      }
      if (modifiers.includes("disrespectusermotionpreference")) {
        const userMotionPrefValue = modifiers[modifiers.indexOf("disrespectusermotionpreference") + 1];
        configs.disrespectUserMotionPreference = userMotionPrefValue ? true : false;
      }
      if (String(expression).length) {
        configs = {...configs, ...evaluate(expression)};
      }
      autoAnimate(el, configs);
    });
  };

  // builds/cdn.js
  document.addEventListener("alpine:initializing", () => {
    src_default(window.Alpine);
  });
})();
