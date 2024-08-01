export const fontSize = {
  XSmall: 10,
  Small: 15,
  Medium: 20,
  Large: 25,
};

export const displayDistanceValue = (value: number) => {
  const feet = Math.floor(value);
  const inches = (value - feet) * 12;
  const displayInches = Math.floor(inches);
  if (inches === 0) return `${feet}'`;
  else if (feet === 0)
    return `${displayInches}"${decimalToFraction(inches - displayInches)}`;
  else
    return `${feet}'${displayInches}"${decimalToFraction(inches - displayInches)}`;
};

function decimalToFraction(decimal: number): string {
  const tolerance = 1.0e-6;
  const x = decimal;
  let h1 = 1;
  let h2 = 0;
  let k1 = 0;
  let k2 = 1;
  let b = x;

  do {
    const a = Math.floor(b);
    let temp = h1;
    h1 = a * h1 + h2;
    h2 = temp;
    temp = k1;
    k1 = a * k1 + k2;
    k2 = temp;
    b = 1 / (b - a);
  } while (Math.abs(x - h1 / k1) > x * tolerance);

  return `${h1}/${k1}`;
}
