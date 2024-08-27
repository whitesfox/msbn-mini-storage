interface SelectedItem {
  mainKey: string;
  ItemNameTitle: string;
  itemValue: string;
  itemStatus: boolean | string;
  setItemStatus: any;
  costCalculation: (
    panelName: string,
    value: string | number,
    mainKey: string,
    booleanTypeOption?: boolean,
  ) => void;
}

const ForSelectItem = ({
  ItemNameTitle,
  itemValue,
  itemStatus,
  setItemStatus,
}: SelectedItem) => {
  return (
    <div>
      <div
        className={`min-[84px] mt-4 rounded-xl px-[21px] py-[15px] text-[1.2rem] font-normal ${itemStatus ? "bg-[#B6B6B6] text-[#FFF]" : "bg-[#F7F7F7]"}`}
        onClick={() => {
          setItemStatus(!itemStatus);
        }}
      >
        <p className="px-0 pb-[3.2px] pt-px">{ItemNameTitle}</p>
        <p className="px-0 pb-[7px] pt-px text-[0.9rem]">{itemValue}</p>
      </div>
    </div>
  );
};

export default ForSelectItem;
