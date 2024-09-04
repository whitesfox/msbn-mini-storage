import { useStoreSize } from "store";
import { useUpgrade } from "store";
import { useStyle } from "store";
import { useStoreColor } from "store";
import { useDoorCombo, useDoorStore } from "store/useDoor";

export const SubmitButton = () => {
  const {
    width,
    length,
    eaveHeight,
    deltaHeight,
    pitchOptionSize,
    bayLength,
    overhangEave,
    overhangPurlin,
  } = useStoreSize();
  const { downspout } = useUpgrade();
  const { label } = useStyle();
  const {
    roofColor,
    roofTrimColor,
    sideWallColor,
    wallTrimColor,
    baseTrimColor,
    downspoutsColor,
    roofColorLabel,
    roofTrimColorLabel,
    sideWallColorLabel,
    wallTrimColorLabel,
    baseTrimColorLabel,
    downspoutsColorLabel,
  } = useStoreColor();
  const { doorData } = useDoorStore();
  const { doorComboData } = useDoorCombo();

  const onClickHandler = () => {
    let paramsContent = "";
    //Main building style
    paramsContent += "mbs=";
    paramsContent += label;

    //Main building size
    paramsContent += "&mbi=";
    paramsContent += width;
    paramsContent += "&mbi=";
    paramsContent += length;
    paramsContent += "&mbi=";
    paramsContent += eaveHeight;
    paramsContent += "&mbi=";
    paramsContent += deltaHeight;
    paramsContent += "&mbi=";
    paramsContent += pitchOptionSize;
    paramsContent += "&mbi=";
    paramsContent += "&mbi=";
    paramsContent += bayLength;
    paramsContent += "&mbi=";

    //Downspout
    paramsContent += "&ds=";
    if (downspout) paramsContent += "true";
    else paramsContent += "false";

    //Eave overhang
    paramsContent += "&eoh=";
    paramsContent += overhangEave;

    //Gable overhang
    paramsContent += "&goh=";
    paramsContent += overhangPurlin;

    //Roof Color
    paramsContent += "&rc=";
    paramsContent += roofColor.substring(1);
    paramsContent += "&rc=";
    paramsContent += roofColorLabel;

    //Sidewall Color
    paramsContent += "&sc=";
    paramsContent += sideWallColor.substring(1);
    paramsContent += "&sc=";
    paramsContent += sideWallColorLabel;

    //Wall Trim Color
    paramsContent += "&wtc=";
    paramsContent += wallTrimColor.substring(1);
    paramsContent += "&wtc=";
    paramsContent += wallTrimColorLabel;

    //Base Trim Color
    paramsContent += "&btc=";
    paramsContent += baseTrimColor.substring(1);
    paramsContent += "&btc=";
    paramsContent += baseTrimColorLabel;

    //Roof Trim Color
    paramsContent += "&rtc=";
    paramsContent += roofTrimColor.substring(1);
    paramsContent += "&rtc=";
    paramsContent += roofTrimColorLabel;

    //Downspouts Color
    paramsContent += "&dsc=";
    paramsContent += downspoutsColor.substring(1);
    paramsContent += "&dsc=";
    paramsContent += downspoutsColorLabel;

    //Door Data
    paramsContent += "&dn=";
    paramsContent += doorData.length;

    doorData.map((item, index) => {
      paramsContent += "&di" + index + "=";
      paramsContent += index + 1;
      paramsContent += "&di" + index + "=";
      paramsContent += item.name;
      paramsContent += "&di" + index + "=";
      paramsContent += item.type;
      paramsContent += "&di" + index + "=";
      paramsContent += item.building;
      paramsContent += "&di" + index + "=";
      paramsContent += item.wall;
      paramsContent += "&di" + index + "=";
      paramsContent += item.nameForRange;
      paramsContent += "&di" + index + "=";
      paramsContent += item.itemforRange;
      paramsContent += "&di" + index + "=";
      paramsContent += item.size[0];
      paramsContent += "&di" + index + "=";
      paramsContent += item.size[1];
      paramsContent += "&di" + index + "=";
      paramsContent += item.size[2];
      paramsContent += "&di" + index + "=";
      paramsContent += item.pos[0];
      paramsContent += "&di" + index + "=";
      paramsContent += item.pos[1];
      paramsContent += "&di" + index + "=";
      paramsContent += item.pos[2];
      paramsContent += "&di" + index + "=";
      paramsContent += item.rot[0];
      paramsContent += "&di" + index + "=";
      paramsContent += item.rot[1];
      paramsContent += "&di" + index + "=";
      paramsContent += item.rot[2];
      paramsContent += "&di" + index + "=";
      paramsContent += doorComboData[index].placement;
    });
    navigator.clipboard.writeText(paramsContent);
  };

  return (
    <div
      onClick={() => onClickHandler()}
      className="my-[15px] cursor-pointer rounded-full bg-[#196432] px-[18px] pb-[13px] pt-[11px] text-center text-[16.8px] text-white md:text-[19px]"
    >
      Submit for quote
    </div>
  );
};
