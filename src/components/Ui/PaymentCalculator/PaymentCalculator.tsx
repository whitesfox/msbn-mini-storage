import React, { useEffect, useState, useRef } from "react";
import { Input, Label, Field } from "@headlessui/react";
import TermsField from "./TermsField";
import { IoClose } from "react-icons/io5";
import { usePaymentCalculation, usePriceCalculation } from "store/usePrice";
import { calculateDownPaymentYears } from "utils/DownPaymentCalculator";
import { formatPrice } from "utils/PriceFormat";
import "./PaymentCalculator.css";

const PaymentCalculator: React.FC = () => {
  const rangeRef = useRef<HTMLInputElement>(null);
  const inputRangeRef = useRef<HTMLInputElement>(null);
  const { totalPrice } = usePriceCalculation();
  const { paymentCalculationStatus, setPaymentCalculationStatus } =
    usePaymentCalculation();
  const [terms, setTerms] = useState("10");
  const [interestRate, setInterestRate] = useState("7.0");
  const [downPayment, setDownPayment] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");

  useEffect(() => {
    const monthlyPayment = calculateDownPaymentYears(
      Number(`${(totalPrice / 100) * 4}`),
      Number(totalPrice),
      Number(interestRate),
      Number(terms),
    );
    setMonthlyPayment(String(monthlyPayment));
  }, [totalPrice, paymentCalculationStatus]);
  useEffect(() => {
    const monthlyPayment = calculateDownPaymentYears(
      Number(downPayment),
      Number(totalPrice),
      Number(interestRate),
      Number(terms),
    );
    setMonthlyPayment(String(monthlyPayment));
  }, [downPayment]);

  const termsHandler = (data: string) => {
    setTerms(data);
    const monthlyPayment = calculateDownPaymentYears(
      Number(downPayment),
      Number(totalPrice),
      Number(interestRate),
      Number(data),
    );
    setMonthlyPayment(String(monthlyPayment));
  };
  const filterInterestRate = (value: string): boolean => {
    if (String(value).includes(".")) {
      if (String(value).length <= 16) {
        return true;
      }
    } else {
      if (Number(value) <= 100) {
        return true;
      }
    }
    return false;
  };
  function countLetter(str: string) {
    let totalStrLen = 0;
    str.split("").forEach((itm) => {
      if (itm === "1" || itm === ".") {
        totalStrLen += 8;
      } else if (itm === "2") {
        totalStrLen += 11;
      } else if (itm === "3") {
        totalStrLen += 12;
      } else {
        totalStrLen += 11;
      }
    });
    return totalStrLen;
  }
  const interestRateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const monthlyPayment = calculateDownPaymentYears(
      Number(downPayment),
      Number(totalPrice),
      Number(e.target.value),
      Number(terms),
    );
    setMonthlyPayment(String(monthlyPayment));
    if (filterInterestRate(e.target.value)) {
      const regex = /^[0-9]*\.?[0-9]*$/;
      if (regex.test(e.target.value)) {
        setInterestRate(e.target.value);

        if (rangeRef.current) {
          if (regex.test(e.target.value)) {
            const value = e.target.value;
            const left = countLetter(value) + 10;
            rangeRef.current.style.left = left + "px";
          }
        }
      }
    }
  };
  const downPaymentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setDownPayment(e.target.value);
    const monthlyPayment = calculateDownPaymentYears(
      Number(e.target.value),
      Number(totalPrice),
      Number(interestRate),
      Number(terms),
    );
    setMonthlyPayment(String(monthlyPayment));
  };

  useEffect(() => {
    if (document.getElementById("range")) {
      const range = document.getElementById("range") as HTMLInputElement;
      const rangeV = document.getElementById("rangeV") as HTMLInputElement;
      range.value = `${String(totalPrice - 80 * (1 / 100) * totalPrice)}`;
      setDownPayment(`${totalPrice - Number(range.value)}`);

      const rangeVPer = document.getElementById(
        "rangeVPer",
      ) as HTMLInputElement;
      const setValue = () => {
        const newValue = Number(
            ((Number(range.value) - Number(range.min)) * 100) /
              (Number(range.max) - Number(range.min)),
          ),
          newPosition = 10 - newValue * 0.2;
        rangeV.innerHTML = `<span>$${formatPrice(parseInt(Number(range.value).toString()))}</span>`;
        rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
        rangeVPer.innerHTML = `<span>${parseInt(((Number(range.value) / totalPrice) * 100).toString())}%</span>`;
        rangeVPer.style.left = `calc(${newValue}% + (${newPosition}px))`;
      };
      setValue();
      document.addEventListener("DOMContentLoaded", setValue);

      range.addEventListener("input", setValue);
    }
  }, [paymentCalculationStatus, totalPrice]);

  return (
    <>
      {paymentCalculationStatus && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-50 overflow-y-scroll bg-black bg-opacity-50">
          <div className="paymentCalBody">
            <div className="formWrapper relative mb-4 rounded-lg bg-white px-14 py-12 pb-8">
              <div
                className="sticky right-4 top-8 cursor-pointer"
                onClick={() => setPaymentCalculationStatus(false)}
              >
                <IoClose className="absolute right-[-10px] top-[-20px] text-slate-500" />
              </div>
              <h1 className="mainTitle mb-4 text-4xl">Payment Calculator</h1>
              <p className="mainPara mb-8 text-sm tracking-wider text-slate-500">
                <span className="font-bold">Plan Your Payments:</span> Estimate
                costs before you buy.
              </p>
              <div className="border-t-2 pt-6">
                <p className="estimatedCostBody mb-8 flex justify-between">
                  <span className="estimatedCost">Estimated cost</span>
                  <span className="estimatedCost">
                    ${formatPrice(totalPrice)}
                  </span>
                </p>
                <div className="inputFieldContainer mb-8 flex items-start justify-between">
                  <div className="inputFieldTerm w-[50%]">
                    <Field>
                      <Label className="z-100 text-sm tracking-wider text-slate-500">
                        Term
                      </Label>
                      <TermsField
                        termsHandler={termsHandler}
                        options={[
                          { label: "10 years", value: "10" },
                          { label: "15 years", value: "15" },
                          { label: "20 years", value: "20" },
                        ]}
                      />
                    </Field>
                  </div>
                  <div className="inputFieldInterestRate ml-2 w-[50%] pt-3">
                    <Field className="interestRateInputContainer relative flex flex-col">
                      <Label className="text-sm tracking-wider text-slate-500">
                        Interest rate
                      </Label>
                      <Input
                        ref={inputRangeRef}
                        onChange={interestRateHandler}
                        value={interestRate}
                        type="text"
                        name="interestrate"
                        className="interestRateInput mt-3 rounded-lg border px-2 py-[22px] text-lg outline-none"
                      />
                      {
                        <span
                          ref={rangeRef}
                          onClick={() => inputRangeRef.current?.focus()}
                          className="interestRatePer cursor-text"
                        >
                          {interestRate !== "" && "%"}
                        </span>
                      }
                    </Field>
                  </div>
                </div>
                <div className="downPaymentSlider mb-14">
                  <div className="relative flex w-full flex-col outline-none">
                    <label className="mb-2 text-sm tracking-wider text-slate-500">
                      Down payment
                    </label>

                    <div className="range-wrap">
                      <div
                        className="range-value"
                        id="rangeV"
                      >
                        <span>${formatPrice(Number(downPayment))}</span>
                      </div>
                      <div
                        className="range-value-percentage"
                        id="rangeVPer"
                      >
                        <span>{(Number(downPayment) / totalPrice) * 100}</span>
                      </div>
                      <input
                        step={totalPrice / 100}
                        min="0"
                        max={totalPrice}
                        type="range"
                        className="payment-slider-thumb relative mx-auto mt-2 h-[0.1rem] w-[90%] appearance-none rounded-full bg-gray-300 outline-none transition duration-200 hover:opacity-100 focus:border-transparent focus:bg-gray-300 focus:ring-transparent"
                        id="range"
                        // value={downPayment}
                        onChange={downPaymentHandler}
                      />
                    </div>

                    <span className="percentageMediaMin absolute left-[0px] top-[45%] text-sm text-slate-500">
                      0%
                    </span>
                    <span className="percentageMediaMax absolute right-[-20px] top-[45%] text-sm text-slate-500">
                      100%
                    </span>
                  </div>
                </div>
                <div className="downPaymentWrapper z-100 mb-8 flex flex-col">
                  <div className="downPaymentBody mb-2 flex items-end">
                    <p className="downPayment text-4xl">
                      $
                      {monthlyPayment && monthlyPayment !== "NaN"
                        ? formatPrice(Number(monthlyPayment))
                        : "0"}
                      /mo
                    </p>
                    <p className="totalMortage ml-6 text-lg">
                      $
                      {formatPrice(
                        parseInt(
                          (Number(totalPrice) - Number(downPayment)).toString(),
                        ),
                      )}{" "}
                      total mortgage
                    </p>
                  </div>
                  <p className="downPaymentTaxIncluded text-sm text-slate-500">
                    Tax and insurance not included
                  </p>
                </div>

                <div
                  onClick={() => setPaymentCalculationStatus(false)}
                  className="cursor-pointer rounded-full bg-[#196432] px-[18px] pb-[13px] pt-[11px] text-center text-[16.8px] text-white md:text-[19px]"
                >
                  Design Yours
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentCalculator;
