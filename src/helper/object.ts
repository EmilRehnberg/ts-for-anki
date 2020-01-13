export function forEach(object, callback) {
  Object.keys(object).forEach(function(key) {
    callback(object[key]);
  });
}
