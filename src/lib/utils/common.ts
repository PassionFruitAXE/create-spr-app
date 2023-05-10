export function mergeObject<T = Object>(obj1: T, obj2: T): Object {
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    throw new Error("TypeError: obj1 ans obj2存在数组类型");
  } else if (obj1 instanceof Object && obj2 instanceof Object) {
    const map = new Map(Object.entries(obj1));
    Object.entries(obj2).forEach(([key, value]) => {
      if (map.has(key)) {
        const mapValue = map.get(key);
        if (value instanceof Object && mapValue instanceof Object) {
          map.set(key, mergeObject(value, mapValue));
        } else {
          map.set(key, value);
        }
      } else {
        map.set(key, value);
      }
    });
    return Object.fromEntries(map);
  } else {
    throw new Error("TypeError: obj1 ans obj2类型不同");
  }
}
