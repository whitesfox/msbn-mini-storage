export const displayInches = (value: number) => {
  const feet = Math.floor(value);
  const inch = Math.round((value - feet) * 12);
  let displayVal = "";

  if (feet === 0) displayVal = `${inch}"`;
  else if (inch === 0) displayVal = `${feet}'`;
  else if (inch === 12) displayVal = `${feet + 1}'`;
  else displayVal = `${feet}'${inch}"`;

  return displayVal;
};
