/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import Loading from "components/Ui/Loading";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
interface OptionPropsType {
  itm: any;
  priceData: any;
  titleDb: string;
  loadingForPrice: { [key: string]: string | boolean };
  onChangePriceHandler: (e: any, id: string | number, titleDb: string) => void;
  onUpdateBtnHandler: (
    e: any,
    titleDb: string,
    id: number,
    name: string,
    value: string,
    rowData: any,
  ) => void;
}

const Option = ({
  itm,
  priceData,
  titleDb,
  loadingForPrice,
  onChangePriceHandler,
  onUpdateBtnHandler,
}: OptionPropsType) => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpenDropdownHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <h4
        className={
          "border-black-100 mb-3 flex cursor-pointer items-center justify-between rounded-lg border border-solid border-opacity-20 bg-white p-2 shadow"
        }
        onClick={onOpenDropdownHandler}
      >
        {itm.name}
        <span className={"mr-4"}>
          {!isOpen ? <FaAngleDown /> : <FaAngleUp />}
        </span>
      </h4>
      {isOpen && (
        <div className={"flex w-full flex-wrap"}>
          {Array.isArray(itm.value) && (
            <>
              {itm.value.map((val: any, index: number) => {
                return (
                  <div
                    key={index}
                    className={`sm:w-50 md:w-30 lg:w-30 mb-4`}
                  >
                    <label
                      className={`text-base sm:text-sm md:text-base lg:text-lg xl:text-xl`}
                    >
                      {val.label ? val.label : val}
                    </label>
                    <div className={`relative flex items-center`}>
                      <input
                        className="block w-full rounded-md border border-solid border-gray-300 bg-white leading-8 outline-none transition-all duration-100 ease-in-out sm:p-1 sm:text-sm md:p-2"
                        onChange={(e) =>
                          onChangePriceHandler(e, itm.id, titleDb)
                        }
                        value={
                          priceData[titleDb]
                            ? priceData[titleDb][itm.id]
                              ? priceData[titleDb][itm.id][
                                  val.value ? val.value : val
                                ]
                              : ""
                            : ""
                        }
                        type="text"
                        name={val.value ? val.value : val}
                      ></input>

                      {loadingForPrice?.id === (val.value ? val.value : val) &&
                        loadingForPrice?.status === true && (
                          <div className="top-6.5 absolute right-36">
                            <Loading />
                          </div>
                        )}
                      <div className="top-6.5 text-red absolute right-[7.8rem]">
                        $
                      </div>

                      <button
                        className="mx-8 my-4 inline-block cursor-pointer rounded-full border border-transparent bg-customGreen px-6 py-2 text-sm text-white sm:px-4 sm:py-1 sm:text-xs md:px-3 md:py-2 md:text-sm"
                        onClick={(e) =>
                          onUpdateBtnHandler(
                            e,
                            titleDb,
                            itm.id,
                            val.value ? val.value : val,
                            priceData[titleDb][itm.id][
                              val.value ? val.value : val
                            ],
                            priceData[titleDb],
                          )
                        }
                        type="submit"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {!Array.isArray(itm.value) && (
            <>
              <div className={`sm:w-50 md:w-30 lg:w-30 mb-4`}>
                <label
                  className={`text-base sm:text-sm md:text-base lg:text-lg xl:text-xl`}
                >
                  {itm.value}
                </label>
                <div className={`relative flex items-center`}>
                  <input
                    value={
                      priceData[titleDb]
                        ? priceData[titleDb][itm.id]
                          ? priceData[titleDb][itm.id][itm.value]
                          : ""
                        : ""
                    }
                    onChange={(e) => onChangePriceHandler(e, itm.id, titleDb)}
                    className="block w-full rounded-md border border-solid border-gray-300 bg-white leading-8 outline-none transition-all duration-100 ease-in-out sm:p-1 sm:text-sm md:p-2"
                    type="text"
                    name={itm.value}
                  ></input>
                  {loadingForPrice?.id === itm.value &&
                    loadingForPrice?.status === true && (
                      <div className="top-6.5 absolute right-36">
                        <Loading />
                      </div>
                    )}
                  <div className="top-6.5 text-red absolute right-36">$</div>
                  <button
                    className="mx-8 my-4 inline-block cursor-pointer rounded-full border border-transparent bg-customGreen px-6 py-2 text-sm text-white sm:px-4 sm:py-1 sm:text-xs md:px-3 md:py-2 md:text-sm"
                    type="submit"
                    onClick={(e) =>
                      onUpdateBtnHandler(
                        e,
                        titleDb,
                        itm.id,
                        itm.value,
                        priceData[titleDb][itm.id][itm.value],
                        priceData[titleDb],
                      )
                    }
                  >
                    Update
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Option;
