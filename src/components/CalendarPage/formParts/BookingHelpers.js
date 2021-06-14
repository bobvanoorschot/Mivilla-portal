export function createPeronsArray(persons) {
  return Array.apply(null, { length: persons + 1 }).map(Number.call, Number);
};

export function initializeBookingFields(bookingFields) {
  let obj = {};
  bookingFields.map((field) => {
    obj[field.id] = "";
  });
  return obj;
}

export function byString(o, s) {
  s = s.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
  s = s.replace(/^\./, ""); // strip a leading dot
  var a = s.split(".");
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
}