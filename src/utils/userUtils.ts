const generateInitials = (fullName: string) =>
  fullName
    .split(" ")
    .map((item) => item.slice(0, 1))
    .join("");

export { generateInitials };
