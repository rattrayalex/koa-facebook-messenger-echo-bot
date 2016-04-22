
export function d(obj) {
  console.dir(obj, {  // eslint-disable-line no-console
    depth: null,
  });
}

export function l(...args) {
  console.log(args);  // eslint-disable-line no-console
}
