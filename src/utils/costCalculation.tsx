export const costCalculationFun = (
  panelName: string,
  value: string | number,
  mainKey: string,
  priceList: { [key: string]: any },
  priceData: { [key: string]: { [key: string]: any } },
  booleanTypeOption?: boolean,
  eaveHeight?: number,
) => {
  const tempPriceList = { ...priceList };

  if (
    (mainKey === "optionalupgrades" && booleanTypeOption) ||
    (mainKey === "interiorlinerpanels" && booleanTypeOption)
  ) {
    if (panelName === "gutters") {
      tempPriceList[mainKey]["eaveheight"] = 0;
    } else {
      tempPriceList[mainKey][panelName] = 0;
    }
  } else if (mainKey === "choosewindowdoor") {
    if (booleanTypeOption) {
      if (tempPriceList[mainKey][panelName]) {
        tempPriceList[mainKey][panelName] =
          parseInt(tempPriceList[mainKey][panelName]) +
          parseInt(priceData[mainKey][panelName][value]);
      } else {
        tempPriceList[mainKey][panelName] = priceData[mainKey][panelName][value]
          ? priceData[mainKey][panelName][value]
          : 0;
      }
    } else {
      if (
        tempPriceList[mainKey][panelName] &&
        parseInt(tempPriceList[mainKey][panelName]) > 0
      ) {
        tempPriceList[mainKey][panelName] =
          parseInt(tempPriceList[mainKey][panelName]) -
          parseInt(priceData[mainKey][panelName][value]);
      }
    }
  } else {
    if (mainKey === "addleanto") {
      // if (
      //   panelName !== "closure" &&
      //   tempPriceList[mainKey]["closure"][`${placement}`] > 0
      // ) {
      //   tempPriceList[mainKey][panelName][`${placement}`] = priceData[mainKey][
      //     panelName
      //   ][value]
      //     ? priceData[mainKey][panelName][value]
      //     : 0;
      // } else {
      //   if (panelName === "closure") {
      //     if (value === "Closure") {
      //       tempPriceList[mainKey] = {
      //         closure: { Front: "0", Back: "0", Left: "0", Right: "0" },
      //         width: { Front: "", Back: "", Left: "", Right: "" },
      //         length: { Front: "", Back: "", Left: "", Right: "" },
      //         dropheight: { Front: "", Back: "", Left: "", Right: "" },
      //         roofpitch: { Front: "", Back: "", Left: "", Right: "" },
      //       };
      //     } else {
      //       tempPriceList[mainKey]["width"][`${placement}`] = priceData[
      //         mainKey
      //       ]["width"][`${leanToWidth}`]
      //         ? priceData[mainKey]["width"][`${leanToWidth}`]
      //         : 0;
      //       tempPriceList[mainKey]["length"][`${placement}`] = priceData[
      //         mainKey
      //       ]["length"][`${leanToLength}`]
      //         ? priceData[mainKey]["length"][`${leanToLength}`]
      //         : 0;
      //       tempPriceList[mainKey]["dropheight"][`${placement}`] = priceData[
      //         mainKey
      //       ]["dropheight"][`${leanToEaveHeight}`]
      //         ? priceData[mainKey]["dropheight"][`${leanToEaveHeight}`]
      //         : 0;
      //       tempPriceList[mainKey]["roofpitch"][`${placement}`] = priceData[
      //         mainKey
      //       ]["roofpitch"][`${leanToPitchList}`]
      //         ? priceData[mainKey]["roofpitch"][`${leanToPitchList}`]
      //         : 0;
      //       tempPriceList[mainKey][panelName][`${placement}`] = priceData[
      //         mainKey
      //       ][panelName][value]
      //         ? priceData[mainKey][panelName][value]
      //         : 0;
      //     }
      //   }
      // }
    } else if (mainKey === "optionalupgrades") {
      if (panelName === "gutters") {
        if (typeof eaveHeight !== "undefined") {
          tempPriceList[mainKey]["eaveheight"] = priceData[mainKey][
            "eaveheight"
          ][eaveHeight]
            ? priceData[mainKey]["eaveheight"][eaveHeight]
            : 0;
        }
      } else {
        tempPriceList[mainKey][panelName] = priceData[mainKey][panelName][value]
          ? priceData[mainKey][panelName][value]
          : 0;
      }
    } else if (mainKey === "chooseyoursize") {
      if (panelName === "width") {
        if (Number(value) >= 20 && Number(value) <= 40)
          tempPriceList[mainKey][panelName] = priceData[mainKey][panelName][
            "20-40"
          ]
            ? priceData[mainKey][panelName]["20-40"]
            : 0;
        else if (Number(value) >= 41 && Number(value) <= 60)
          tempPriceList[mainKey][panelName] = priceData[mainKey][panelName][
            "41-60"
          ]
            ? priceData[mainKey][panelName]["41-60"]
            : 0;
        else
          tempPriceList[mainKey][panelName] = priceData[mainKey][panelName][
            "61-80"
          ]
            ? priceData[mainKey][panelName]["61-80"]
            : 0;
      } else if (panelName === "roofpitch") {
        tempPriceList[mainKey][panelName] = priceData[mainKey][panelName][
          String(value).replace(" / ", ":")
        ]
          ? priceData[mainKey][panelName][String(value).replace(" / ", ":")]
          : 0;
      } else if (panelName === "insetbay") {
        tempPriceList[mainKey]["insetbaylength"] = "3";
      } else if (panelName === "insetbaylength" || panelName === "roofonly") {
        tempPriceList[mainKey][panelName] = priceData[mainKey][panelName][value]
          ? priceData[mainKey][panelName][value]
          : 0;
      } else {
        if (panelName === "eaveheight") {
          if (typeof eaveHeight !== "undefined") {
            if (Number(tempPriceList["optionalupgrades"]["eaveheight"]) > 0) {
              tempPriceList["optionalupgrades"]["eaveheight"] =
                priceData["optionalupgrades"]["eaveheight"][value];
            }
          }
        }
        tempPriceList[mainKey][panelName] = priceData[mainKey][panelName][value]
          ? priceData[mainKey][panelName][value]
          : 0;
      }
    } else if (mainKey === "addoverhang") {
      tempPriceList[mainKey][panelName] = priceData[mainKey][panelName][value]
        ? Number(value) * Number(priceData[mainKey][panelName][value])
        : 0;
    } else {
      tempPriceList[mainKey][panelName] = priceData[mainKey][panelName][value]
        ? priceData[mainKey][panelName][value]
        : 0;
    }
  }

  return { tempPriceList, totalCost: 0 };
};
