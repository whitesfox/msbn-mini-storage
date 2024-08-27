/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { useStoreSize, useUpgrade } from "store";
import { DownspoutExtrude } from "3dcomponents/Models/Downspout/DownspoutExtrude";

export const GableDownspoutGroup = () => {
  const { width, eaveHeight, bayLength, basicLength, deltaHeight } =
    useStoreSize();

  //Calculate main downspouts count
  const mainDownspoutCount = useMemo(() => {
    return Array.from({ length: Math.floor(basicLength / 28) + 2 }, () => 0);
  }, [basicLength]);

  //Calculate inset bay downspouts count
  const insetBayDownspoutCount = Array.from(
    { length: Math.floor(bayLength / 28) + 1 },
    () => 0,
  );

  //Calculate inset bay rigid frame interval
  const insetBayRigidFrameInterval =
    (bayLength - 0.9) / insetBayDownspoutCount.length;

  //Calculate main downspouts positions
  const DownspoutPos = useMemo(() => {
    const posArray: [number, number, number][] = [];

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
  }, [width, basicLength, mainDownspoutCount]);

  //Calculate inset bay downspouts position
  const InsetBayDownspoutPos = useMemo(() => {
    const posArray: [number, number, number][] = [];

    insetBayDownspoutCount.map((_item, index) => {
      posArray.push([
        -(width / 2 + 3 / 15),
        0.3,
        index * insetBayRigidFrameInterval,
      ]);
    });

    return posArray;
  }, [width, insetBayDownspoutCount]);

  return (
    <group>
      {/* left main downspouts */}
      {DownspoutPos.map((item, index) => (
        <DownspoutExtrude
          key={index}
          pos={[item[0], item[1], item[2]]}
          flag={true}
          width={width}
          eaveHeight={eaveHeight}
          deltaHeight={deltaHeight}
          endOfInsetBay={false}
        />
      ))}
      {/* right main downspouts */}
      {DownspoutPos.map((item, index) => (
        <DownspoutExtrude
          key={index}
          pos={[item[0] + width + 0.4, item[1], item[2]]}
          flag={false}
          width={width}
          eaveHeight={eaveHeight}
          deltaHeight={deltaHeight}
          endOfInsetBay={false}
        />
      ))}
      {/* inset bay downspouts */}
      {InsetBayDownspoutPos.map((item, index) => (
        <group key={index}>
          {/* left inset bay downspouts */}
          <DownspoutExtrude
            pos={[
              item[0] + 0.7,
              item[1],
              item[2] + basicLength / 2 + insetBayRigidFrameInterval + 0.5,
            ]}
            flag={true}
            width={width}
            eaveHeight={eaveHeight}
            deltaHeight={deltaHeight}
            endOfInsetBay={true}
          />
          {/* right inset bay downspouts */}
          <DownspoutExtrude
            pos={[
              item[0] + width - 0.3,
              item[1],
              item[2] + basicLength / 2 + insetBayRigidFrameInterval + 0.5,
            ]}
            flag={false}
            width={width}
            eaveHeight={eaveHeight}
            deltaHeight={deltaHeight}
            endOfInsetBay={true}
          />
        </group>
      ))}
    </group>
  );
};
