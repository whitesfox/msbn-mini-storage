import { useMemo } from "react";
import { useStoreSize } from "store";
import { DownspoutExtrude } from "3dcomponents/Models/Downspout/DownspoutExtrude";

export const SingleSlopeDownspoutGroup = () => {
  const { width, eaveHeight, basicLength, deltaHeight } = useStoreSize();

  //Calculate main downspouts count
  const mainDownspoutCount = useMemo(() => {
    return Array.from({ length: Math.floor(basicLength / 28) + 2 }, () => 0);
  }, [basicLength]);

  //Calculate main downspouts position
  const mainDownspoutPos = useMemo(() => {
    const posArray: any[] = [];

    mainDownspoutCount.map((_item, index) => {
      let deltaPos = 0;
      switch (index) {
        case 0:
          deltaPos = 4 / 3;
          break;
        case mainDownspoutCount.length - 1:
          deltaPos = -4 / 3;
          break;
        default:
          deltaPos = 0;
          break;
      }

      posArray.push([
        -(width / 2 + 3 / 15),
        0.3,
        -basicLength / 2 +
          0.5 +
          index * ((basicLength - 0.9) / (mainDownspoutCount.length - 1)) +
          deltaPos,
      ]);
    });

    return posArray;
  }, [basicLength, width, mainDownspoutCount]);

  return (
    <group>
      {/* main downspouts */}
      {mainDownspoutPos.map((item, index) => (
        <DownspoutExtrude
          key={index}
          pos={[item[0], item[1], item[2]]}
          flag={true}
          width={width}
          eaveHeight={eaveHeight}
          deltaHeight={deltaHeight / 2}
          endOfInsetBay={false}
        />
      ))}
    </group>
  );
};
