export function getElements(selector) {
  return [].slice.call(document.querySelectorAll(selector), 0);
}
export function getClassList(elem) {
  return elem.className.split(" ").map(c => c.trim());
}

export function hasClass(elem, className) {
  return getClassList(elem).indexOf(className) > -1;
}

export function addClass(elem, className) {
  if (!hasClass(elem, className)) {
    var classes = getClassList(elem);
    classes.push(className);
    elem.className = classes.join(" ");
  }
  return elem;
}

export function removeClass(elem, className) {
  var classes = getClassList(elem).filter(c => c !== className);
  elem.className = classes.join(" ");
  return elem;
}

export function toggleClass(elem, className) {
  if (hasClass(elem, className)) removeClass(elem, className);
  else addClass(elem, className);
  return elem;
}

export function addStyle(elem, styles) {
  let styleAttributes = Object.keys(styles);
  styleAttributes.map(function(key) {
    elem.style[key] = styles[key];
  });
  return elem;
}

export function removeStyle(elem, styles) {
  let styleAttributes = Object.keys(styles);
  styleAttributes.map(function(key) {
    elem.style[key] = "";
  });
  return elem;
}

export function removeElement(elem) {
  if (elem) {
    let parentElem = elem.parentNode;
    if (parentElem) parentElem.removeChild(elem);
  }
}

export let getClosest = function(elem: Element, selector: string) {
  let target = elem;
  try {
    while (!target.matches(selector)) {
      if (!target.parentElement) throw new Error("Top of DOM Tree");
      target = target.parentElement;
    }
  } catch (err) {
    target = null;
  }
  return target;
};
export let getNextSiblings = function(elem: Element, selectorFilter: string) {
  if (!selectorFilter) throw new Error("You must pass a selector filter");
  let siblings = [];
  let sibling: Node = elem;
  while ((sibling = sibling.nextSibling)) {
    if (sibling.nodeType === 1 && (<Element>sibling).matches(selectorFilter)) {
      siblings.push(<Element>sibling);
    }
  }
  return siblings;
};

if (!Element.prototype.matches) {
  Element.prototype.matches =
    (<any>Element).prototype.matchesSelector ||
    (<any>Element).prototype.mozMatchesSelector ||
    (<any>Element).prototype.msMatchesSelector ||
    (<any>Element).prototype.oMatchesSelector ||
    (<any>Element).prototype.webkitMatchesSelector ||
    function(s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
        i = matches.length;
      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1;
    };
}
