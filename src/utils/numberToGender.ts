export const numberToGender = (num: number): string => {
  switch (num) {
    case 1:
      return "Female";
    case 2:
      return "Male";
    case 0:
      return "Not specified";
    default:
      return "Not specified";
  }
};
