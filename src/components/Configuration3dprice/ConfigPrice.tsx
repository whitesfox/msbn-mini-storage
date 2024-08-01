/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { sidebarData } from "./constants/constants";
import Option from "./Option";
import Loading from "components/Ui/Loading/Progress";
import { useGetPrice } from "../../store/usePrice";
const Config3dPriceComponent = () => {
  const {
    priceData,
    fetchPrice,
    updatePrice,
    setPrice,
    isPriceLoaded,
    loadingForPrice,
  } = useGetPrice();

  useEffect(() => {
    fetchPrice();
  }, []);

  const onUpdateBtnHandler = async (
    e: any,
    titleDb: string,
    id: string | number,
    name: string,
    value: string,
    rowData: any,
  ) => {
    e.preventDefault();
    updatePrice({ titleDb, id, name, value, rowData });
  };

  const onChangePriceHandler = (
    e: any,
    id: string | number,
    titleDb: string,
  ) => {
    const tempObj = { ...priceData } as any;
    tempObj[titleDb][id][e.target.name] = e.target.value;

    setPrice(tempObj);
  };

  return (
    <>
      {isPriceLoaded && <Loading customStyle={"bgcolorHeavy"} />}
      <div
        className={`mt-5 flex w-full flex-col justify-center px-3 pb-20 md:px-5`}
      >
        <h2 className={`text-center text-4xl font-bold`}>
          MBSN Designer Pricing
        </h2>
        <form className={`flex flex-col justify-center`}>
          {sidebarData.map((item) => {
            return (
              <div
                key={item.title}
                className={`my-2`}
              >
                <h3 className={`mb-1 p-0`}>{item.title}</h3>
                {item.objectValue.map((itm) => {
                  return (
                    <Option
                      loadingForPrice={loadingForPrice}
                      key={itm.id}
                      titleDb={item.titleDb}
                      itm={itm}
                      priceData={priceData}
                      onChangePriceHandler={onChangePriceHandler}
                      onUpdateBtnHandler={onUpdateBtnHandler}
                    />
                  );
                })}
              </div>
            );
          })}
        </form>
      </div>
    </>
  );
};

export default Config3dPriceComponent;
