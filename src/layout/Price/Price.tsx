import React, { useEffect } from "react";
import { usePriceCalculation, usePaymentCalculation } from "store/usePrice";
import { useGetPrice } from "store/usePrice";
import PaymentCalculator from "components/Ui/PaymentCalculator/PaymentCalculator";
import { calculateDownPaymentYears } from "utils/DownPaymentCalculator";
import { VscSettings } from "react-icons/vsc";
import { formatPrice } from "utils/PriceFormat";
const Price = () => {
  const { priceList, setPriceList, totalPrice } = usePriceCalculation();
  const { setPaymentCalculationStatus } = usePaymentCalculation();
  const { dimension } = useGetPrice();
  useEffect(() => {
    let totalCost = 0;
    const squareFoot = dimension[0] * dimension[1];
    let totalAddOverHand = 0;
    let totalDoorWindow = 0;
    let totalOptionalUpgrades = 0;

    Object.keys(priceList).forEach((key) => {
      if (key === "chooseyourstyle") {
        Object.keys(priceList[key]).forEach((key2) => {
          if (priceList[key][key2]) {
            totalCost += parseFloat(priceList[key][key2] || 0);
          }
        });
      } else if (key === "chooseyoursize") {
        Object.keys(priceList[key]).forEach((key2) => {
          if (key2 === "insetbaylength" || key2 === "roofonly") {
            totalCost -= parseFloat(priceList[key][key2] || 0);
          } else if (priceList[key][key2]) {
            totalCost += parseFloat(priceList[key][key2] || 0);
          }
        });
      } else if (key === "addoverhang") {
        Object.keys(priceList[key]).forEach((key2) => {
          if (key2 === "eaveoverhang") {
            totalAddOverHand +=
              parseFloat(priceList[key][key2] || 0) * dimension[1];
          } else {
            totalAddOverHand +=
              parseFloat(priceList[key][key2] || 0) * dimension[0];
          }
        });
      } else if (key === "optionalupgrades") {
        Object.keys(priceList[key]).forEach((key2) => {
          if (key2 === "wainscot") {
            totalOptionalUpgrades +=
              parseFloat(priceList[key][key2] || 0) *
              (dimension[1] + dimension[1] + dimension[0] + dimension[0]);
          } else {
            totalOptionalUpgrades +=
              parseFloat(priceList[key][key2] || 0) *
              (dimension[1] + dimension[1]);
          }
        });
      } else if (key === "choosewindowdoor") {
        Object.keys(priceList[key]).forEach((key2) => {
          if (priceList[key][key2]) {
            totalDoorWindow += parseFloat(priceList[key][key2] || 0);
          }
        });
      }
    });
    setPriceList(
      priceList,
      totalCost * squareFoot +
        totalAddOverHand +
        totalOptionalUpgrades +
        totalDoorWindow,
    );
  }, [priceList, dimension]);
  return (
    <>
      <h3 className="mb-[0.3rem] mt-4 border-b-[1px] px-0 pb-[7px] pt-px text-2xl font-light leading-10">
        Price breakdown for your Metal Building
      </h3>
      <PaymentCalculator />
      <div className="text-lg">
        <div className="flex gap-2 border-b-[1px] pb-4 pt-4">
          <div className="flex-1">
            <p className="text-[12.8px] text-[#8B8B8B]">
              Metal Building as designed
            </p>
            <p className="text-[12.8px] text-[#4A4A4F]">
              ${formatPrice(totalPrice)}{" "}
            </p>
          </div>
          <div className="flex-1">
            <p className="text-[12.8px] text-[#8B8B8B]">
              Installation estimate
            </p>
            <p className="text-[12.8px] text-[#4A4A4F]">
              ${formatPrice(115000)}*
            </p>
          </div>
          <div className="flex-1">
            <p className="text-[12.8px] text-[#8B8B8B]">Concrete estimate</p>
            <p className="text-[12.8px] text-[#4A4A4F]">$169000</p>
          </div>
        </div>
        <div className="border-b-[1px] pb-4 pt-4">
          <p className="text-[12.8px] text-[#8B8B8B]">Estimated total cost</p>
          <p className="flex items-center text-[12.8px] text-[#4A4A4F]">
            <span>
              ${formatPrice(totalPrice)} or $
              {formatPrice(
                calculateDownPaymentYears(
                  Number(`${(totalPrice / 100) * 4}`),
                  Number(totalPrice),
                  7,
                  10,
                ),
              )}
              /mo{" "}
            </span>{" "}
            <span
              className="ml-2 cursor-pointer text-xl text-customGreen"
              onClick={() => setPaymentCalculationStatus(true)}
            >
              <VscSettings />
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Price;
