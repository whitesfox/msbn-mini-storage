export const minMaxFun = (
  placement: string,
  minOrMax: string,
  width: number,
  length: number,
  type?: string,
  value?: string,
) => {
  const [leftVal, rightVal] = value?.split(" x ") as [string, string];
  let tempMinMaxValue = "";
  if (placement === "Left Endwall" || placement === "Right Endwall") {
    if (type === "rollupdoor" || type === "window") {
      if (parseInt(leftVal) >= 10 && parseInt(rightVal) >= 14) {
        tempMinMaxValue = `${minOrMax === "min" ? "-" : ""}${+width - (12.2 + (width - 20) * 0.5) - 5}`;
      } else if (parseInt(leftVal) >= 12 && parseInt(rightVal) >= 8) {
        tempMinMaxValue = `${minOrMax === "min" ? "-" : ""}${+width - (12.2 + (width - 20) * 0.5) - 4}`;
      } else {
        tempMinMaxValue = `${minOrMax === "min" ? "-" : ""}${+width - (12.2 + (width - 20) * 0.5) - 2.5}`;
      }
    } else {
      tempMinMaxValue = `${minOrMax === "min" ? "-" : ""}${+width - (12.2 + (width - 20) * 0.5)}`;
    }
  } else {
    if (type === "rollupdoor" || type === "window") {
      tempMinMaxValue = `${minOrMax === "min" ? "-" : ""}${+length - (12.2 + (length - 20) * 0.5) - 2}`;
    } else {
      tempMinMaxValue = `${minOrMax === "min" ? "-" : ""}${+length - (12.2 + (length - 20) * 0.5)}`;
    }
  }
  return tempMinMaxValue;
};
