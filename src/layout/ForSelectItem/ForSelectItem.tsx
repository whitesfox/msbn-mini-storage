import { useMemo } from "react";
import { useUpgrade, useStoreSize } from "store";
import { useLeanTo } from "store/useLeanTo";
interface SelectedItem {
  index: number;
  itemStatus: boolean | string;
  itemName: string;
  itemValue: string;
  mainKey: string;
  ItemNameTitle: string;
  setItemStatus: any;
  costCalculation: (
    panelName: string,
    value: string | number,
    mainKey: string,
    booleanTypeOption?: boolean,
  ) => void;
  setValue?: any;
}

const ForSelectItem = ({
  index,
  setItemStatus,
  itemStatus,
  itemName,
  itemValue,
  ItemNameTitle,
  setValue,
}: SelectedItem) => {
  const { setRoofOnly, setInsetBay } = useUpgrade();
  const { setBayLength } = useStoreSize();
  const { leanToData, addLeanToInsetBay } = useLeanTo();

  const leanToType = useMemo(() => {
    if (typeof itemStatus === "string") {
      let placementWall = "";
      switch (itemStatus) {
        case "Left Endwall":
          placementWall = "EndWallFront";
          break;
        case "Right Endwall":
          placementWall = "EndWallBack";
          break;
        case "Back Sidewall":
          placementWall = "SideWallLeft";
          break;
        case "Front Sidewall":
          placementWall = "SideWallRight";
          break;
        default:
          break;
      }
      const leanToType = leanToData.filter(
        (item) => item.wall === placementWall,
      )[0].type;
      return leanToType;
    }
  }, [itemStatus, leanToData]);

  return (
    <div>
      {itemName === "insetbay" && (
        <div
          className={`min-[84px] mt-4 rounded-xl px-[21px] py-[15px] text-[1.2rem] font-normal ${itemStatus ? "bg-[#B6B6B6] text-[#FFF]" : "bg-[#F7F7F7]"}`}
          onClick={() => {
            setRoofOnly(false);
            itemStatus ? setBayLength(0) : setBayLength(10);
            setItemStatus(!itemStatus);
          }}
        >
          <p className="px-0 pb-[3.2px] pt-px">{ItemNameTitle}</p>
          <p className="px-0 pb-[7px] pt-px text-[0.9rem]">{itemValue}</p>
        </div>
      )}
      {itemName === "roofonly" && (
        <div
          className={`min-[84px] mt-4 rounded-xl px-[21px] py-[15px] text-[1.2rem] font-normal ${itemStatus ? "bg-[#B6B6B6] text-[#FFF]" : "bg-[#F7F7F7]"}`}
          onClick={() => {
            setInsetBay(false);
            setBayLength(0);
            setItemStatus(!itemStatus);
          }}
        >
          <p className="px-0 pb-[3.2px] pt-px">{ItemNameTitle}</p>
          <p className="px-0 pb-[7px] pt-px text-[0.9rem]">{itemValue}</p>
        </div>
      )}
      {itemName === "linerpanels" && (
        <div
          className={`min-[84px] mt-4 rounded-xl px-[21px] py-[15px] text-[1.2rem] font-normal ${itemStatus ? "bg-[#B6B6B6] text-[#FFF]" : "bg-[#F7F7F7]"}`}
          onClick={() => {
            setItemStatus(!itemStatus);
          }}
        >
          <p className="px-0 pb-[3.2px] pt-px">{ItemNameTitle}</p>
          <p className="px-0 pb-[7px] pt-px text-[0.9rem]">{itemValue}</p>
        </div>
      )}
      {itemName === "leantoinsetbay" && (
        <div
          className={`min-[84px] mt-4 rounded-xl px-[21px] py-[15px] text-[1.2rem] font-normal ${leanToType === "Inset Bay" ? "bg-[#B6B6B6] text-[#FFF]" : "bg-[#F7F7F7]"}`}
          onClick={() => {
            let placementWall = "";
            switch (itemStatus) {
              case "Left Endwall":
                placementWall = "EndWallFront";
                break;
              case "Right Endwall":
                placementWall = "EndWallBack";
                break;
              case "Back Sidewall":
                placementWall = "SideWallLeft";
                break;
              case "Front Sidewall":
                placementWall = "SideWallRight";
                break;
              default:
                break;
            }

            if (leanToType === "Enclosed" || leanToType === "Open") {
              setItemStatus("Inset Bay", "", index);
              const currentLeanToLength = leanToData.filter(
                (item) => item.wall === placementWall,
              )[0].lLength;
              if (currentLeanToLength > 20) setValue(10, index, "Inset Bay");
              addLeanToInsetBay({ wall: placementWall, seted: true });
            }
            if (leanToType === "Inset Bay") {
              setItemStatus("Enclosed", "", index);
              setValue(0, index, "Enclosed");
              addLeanToInsetBay({ wall: placementWall, seted: false });
            }
          }}
        >
          <p className="px-0 pb-[3.2px] pt-px">{ItemNameTitle}</p>
          <p className="px-0 pb-[7px] pt-px text-[0.9rem]">{itemValue}</p>
        </div>
      )}
      {itemName === "leantoroofonly" && (
        <div
          className={`min-[84px] mt-4 rounded-xl px-[21px] py-[15px] text-[1.2rem] font-normal ${leanToType === "Open" ? "bg-[#B6B6B6] text-[#FFF]" : "bg-[#F7F7F7]"}`}
          onClick={() => {
            let placementWall = "";
            switch (itemStatus) {
              case "Left Endwall":
                placementWall = "EndWallFront";
                break;
              case "Right Endwall":
                placementWall = "EndWallBack";
                break;
              case "Back Sidewall":
                placementWall = "SideWallLeft";
                break;
              case "Front Sidewall":
                placementWall = "SideWallRight";
                break;
              default:
                break;
            }
            if (leanToType === "Enclosed" || leanToType === "Inset Bay") {
              setItemStatus("Open", "", index);
              addLeanToInsetBay({ wall: placementWall, seted: false });
            }
            if (leanToType === "Open") {
              setValue(0, index, "Enclosed");
              setItemStatus("Enclosed", "", index);
            }
          }}
        >
          <p className="px-0 pb-[3.2px] pt-px">{ItemNameTitle}</p>
          <p className="px-0 pb-[7px] pt-px text-[0.9rem]">{itemValue}</p>
        </div>
      )}
      {itemName === "wainscot" && (
        <div
          className={`min-[84px] mt-4 rounded-xl px-[21px] py-[15px] text-[1.2rem] font-normal ${itemStatus ? "bg-[#B6B6B6] text-[#FFF]" : "bg-[#F7F7F7]"}`}
          onClick={() => {
            setItemStatus(!itemStatus);
          }}
        >
          <p className="px-0 pb-[3.2px] pt-px">{ItemNameTitle}</p>
          <p className="px-0 pb-[7px] pt-px text-[0.9rem]">{itemValue}</p>
        </div>
      )}
      {itemName === "gutters" && (
        <div
          className={`min-[84px] mt-4 rounded-xl px-[21px] py-[15px] text-[1.2rem] font-normal ${itemStatus ? "bg-[#B6B6B6] text-[#FFF]" : "bg-[#F7F7F7]"}`}
          onClick={() => {
            setItemStatus(!itemStatus);
          }}
        >
          <p className="px-0 pb-[3.2px] pt-px">{ItemNameTitle}</p>
          <p className="px-0 pb-[7px] pt-px text-[0.9rem]">{itemValue}</p>
        </div>
      )}
    </div>
  );
};

export default ForSelectItem;
