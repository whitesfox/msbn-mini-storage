/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useMemo } from "react";
import { useStoreSize } from "store";
import { LeanToDownspoutExtrude } from "3dcomponents/Models/Downspout/LeanToDownspoutExtrude";
import { useRigidFrameStore } from "store/useRigidFrame";

interface ILeanToDownspout {
  type: string;
  wall: string;
  lWidth: number;
  lLength: number;
  lEaveHeight: number;
  lDeltaHeight: number;
  lPos: [number, number, number];
}

export const LeanToDownspoutGroup = ({
  type,
  wall,
  lWidth,
  lLength,
  lEaveHeight,
  lDeltaHeight,
  lPos,
}: ILeanToDownspout) => {
  const { length, basicLength, bayLength } = useStoreSize();
  const { rigidFrameData, insetRigidFrameData } = useRigidFrameStore();

  //Calculate lean to downspouts position
  const leanToDownspoutsPos = useMemo(() => {
    const frameData: number[] = [];

    if (wall === "SideWallRight") {
      rigidFrameData.map((item, _index) => {
        if (
          item.pos[2] + bayLength / 2 > -(lPos[2] + lLength / 2) &&
          item.pos[2] + bayLength / 2 < -(lPos[2] - lLength / 2)
        ) {
          frameData.push(item.pos[2] + bayLength / 2);
        }
      });
      insetRigidFrameData.map((item, _index) => {
        if (
          item.pos[2] - basicLength / 2 > -(lPos[2] + lLength / 2) &&
          item.pos[2] - basicLength / 2 < -(lPos[2] - lLength / 2)
        ) {
          frameData.push(item.pos[2] - basicLength / 2);
        }
      });
    } else if (wall === "SideWallLeft") {
      rigidFrameData.map((item, _index) => {
        if (
          item.pos[2] - bayLength / 2 + 0.3 < lPos[2] + lLength / 2 &&
          item.pos[2] - bayLength / 2 + 0.3 > lPos[2] - lLength / 2
        ) {
          frameData.push(item.pos[2] - bayLength / 2);
        }
      });
      insetRigidFrameData.map((item, _index) => {
        if (
          -item.pos[2] + basicLength / 2 - 0.3 < lPos[2] + lLength / 2 &&
          -item.pos[2] + basicLength / 2 - 0.3 > lPos[2] - lLength / 2
        ) {
          frameData.push(-item.pos[2] + basicLength / 2);
        }
      });
    } else {
      const gableRigidFrame = Array.from(
        { length: Math.floor(lLength / 28) + 2 },
        () => 0,
      );

      const gableRigidFrameInterval =
        (lLength - 0.9) / (gableRigidFrame.length - 1);

      gableRigidFrame.map((_item, index) => {
        frameData.push(-lLength / 2 + 0.5 + index * gableRigidFrameInterval);
      });
    }

    return frameData;
  }, [
    wall,
    rigidFrameData,
    insetRigidFrameData,
    bayLength,
    lPos,
    lLength,
    basicLength,
  ]);

  return (
    <group>
      {leanToDownspoutsPos.map((item, index) => (
        <LeanToDownspoutExtrude
          type={type}
          key={index}
          pos={
            type === "Open"
              ? [-(lWidth / 2 - 5 / 15), 0.3, item]
              : [-(lWidth / 2 + 3 / 15), 0.3, item]
          }
          flag={true}
          width={lWidth}
          eaveHeight={lEaveHeight}
          deltaHeight={lDeltaHeight}
        />
      ))}
    </group>
  );
};
