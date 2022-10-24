export const React = (() => {
  let idx = 0;
  const hooks = [];
  let rootComponent;
  let targetDomElement = null;
  let batchingTimeout;

  const useState = (initState) => {
    const state = hooks[idx] || initState;
    const tempIndex = idx;
    hooks[idx] = state;

    const setState = (newValueOrFunction) => {
      clearTimeout(batchingTimeout);
      if (typeof newValueOrFunction === 'function') {
        hooks[tempIndex] = newValueOrFunction(state);
      } else {
        hooks[tempIndex] = newValueOrFunction;
      }
      scheduleWork(tempIndex);
    };

    idx++;
    return [state, setState];
  };

  const useEffect = (cb, deps) => {
    let hasChanged = true;
    const prevDeps = hooks[idx];
    hooks[idx] = deps;

    if (prevDeps) {
      hasChanged = prevDeps.some((prevDep, prevDepIdx) => !Object.is(prevDep, deps[prevDepIdx]));
    }
    
    if (hasChanged) {
      cb();
    };
    idx++;
  };

  // the same as useState, but with out setState function
  const useRef = (initValue) => {
    const ref = { current: hooks[idx] || initValue };
    idx++;

    return ref;
  };

  const convertReactElementToDomNode = (reactElement, parent) => {
    const { type, props = {}, children } = reactElement;
    let domParent;

    if (typeof type === 'string') {
      domParent = document.createElement(reactElement.type);

      Object.keys(props).forEach((key) => {
        domParent[key] = props[key];
      });
    }
    if (typeof type === 'function') {
      domParent = convertReactElementToDomNode(type(props), parent);
    }

    if (!reactElement.children) return domParent;

    if (typeof children === 'string') domParent.textContent = children;
    else if (Array.isArray(children)) {
      children.forEach((child) => {
        domParent.append(convertReactElementToDomNode(child, domParent))
      })
    }
    else if (typeof children === 'object') {
      domParent = convertReactElementToDomNode(children, domParent);
    }

    return domParent;
  };

  const render = (reactElement, domTarget) => {
    targetDomElement = domTarget;
  
    const reactElementInstance = reactElement();
    const domElement = convertReactElementToDomNode(reactElementInstance, targetDomElement);
    
    rootComponent = reactElement;
    domTarget.replaceChildren(domElement);

    return domElement;
  };
  
  const scheduleWork = () => {
    // kinda batching
    batchingTimeout = setTimeout(() => {
      idx = 0;
      render(rootComponent, targetDomElement);
    }, 10);
  };

  return { useState, useEffect, render, useRef };
})();


