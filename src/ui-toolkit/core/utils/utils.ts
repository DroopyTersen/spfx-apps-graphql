export let debounce = function(func, wait) {
	var timeout = null;
	return function() {
		var args = arguments;
		var later = () => {
			timeout = null;
			func.apply(this, args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
};

export function ensureProperty(obj: Object, path: string): boolean {
	let value = getValue(obj, path);
	return value !== null ? true : false;
}

export function hasLength(obj: Object, path: string): boolean {
	let arrayValue = getValue(obj, path);
	return arrayValue && arrayValue.length;
}

export function getValue(obj: Object, path: string): any {
	if (!obj) return null;
	let context = obj;
	let sections = path.split(".");
	let pathLength = sections.length;
	for (var i = 0; i < pathLength; i++) {
		let propKey = sections[i];
		if (!context || !context.hasOwnProperty(propKey)) {
			return null;
		}
		context = context[propKey];
		if (context === undefined || context === null) return null;
	}
	return context;
}

export function getValues(obj: Object) {
	return Object.keys(obj).map(key => obj[key]);
}
