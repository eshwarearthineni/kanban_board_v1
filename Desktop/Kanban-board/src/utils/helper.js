export const convertToCamelCase = (str) => {
  return str
    .split(" ")
    .map((el) => {
      return el[0].toUpperCase() + el.slice(1).toLowerCase();
    })
    .join(" ");
};

export const cretateInitialsFromName = (name) => {
  let initials = "";
  name.split(" ").forEach((el, idx) => {
    if (idx < 2) initials += el[0].toUpperCase();
  });
  return initials;
};
