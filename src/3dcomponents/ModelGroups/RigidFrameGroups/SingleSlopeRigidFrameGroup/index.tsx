/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo } from "react";
import { useStoreSize, useUpgrade } from "store";
import { IRigidFrame } from "store/useRigidFrame";
import { SingleSlopeRigidFrameExtrude } from "3dcomponents/Models/RigidFrame/RigidFrameExtrudes/SingleSlopeRigidFrameExtrude";
import { useRigidFrameStore } from "store/useRigidFrame";

interface ISingleSlopeRigidFrameGroup {
  lWidth: number;
  lLength: number;
  lEaveHeight: number;
  lDeltaHeight: number;
  lPos: [number, number, number];
}

export const SingleSlopeRigidFrameGroup = ({
  lWidth,
  lLength,
  lEaveHeight,
  lDeltaHeight,
  lPos,
}: ISingleSlopeRigidFrameGroup) => {
  const { bayLength } = useStoreSize();
  const { addRigidFrameData, addInsetRigidFrameData } = useRigidFrameStore();

  const singleSlopeRigidFrameData = useMemo(() => {
    const mainRigidFrameCount = Array.from(
      { length: Math.floor(lLength / 28) + 2 },
      () => 0,
    );
    const mainRigidFrameInterval =
      (lLength - 0.9) / (mainRigidFrameCount.length - 1);

    const insetBayRigidFrameCount = Array.from(
      { length: Math.floor(bayLength / 28) + 1 },
      () => 0,
    );
    const insetBayRigidFrameInterval =
      (bayLength - 0.9) / insetBayRigidFrameCount.length;

    return {
      mainRigidFrameCount: mainRigidFrameCount,
      mainRigidFrameInterval: mainRigidFrameInterval,
      insetBayRigidFrameCount: insetBayRigidFrameCount,
      insetBayRigidFrameInterval: insetBayRigidFrameInterval,
    };
  }, [bayLength, lLength]);

  useEffect(() => {
    //add position data of rigidframe
    const rigidFramePos: IRigidFrame[] = [];

    singleSlopeRigidFrameData.mainRigidFrameCount.map((_item, index) => {
      rigidFramePos.push({
        pos: [
          0,
          0,
          -lLength / 2 +
            0.5 +
            index * singleSlopeRigidFrameData.mainRigidFrameInterval,
        ],
      });
    });

    addRigidFrameData(rigidFramePos);

    const insetRigidFramePos: IRigidFrame[] = [];

    addInsetRigidFrameData(insetRigidFramePos);
  }, [
    lLength,
    singleSlopeRigidFrameData.mainRigidFrameCount,
    singleSlopeRigidFrameData.mainRigidFrameInterval,
  ]);

  return (
    <group>
      {/* main rigidFrames */}
      {singleSlopeRigidFrameData.mainRigidFrameCount.map((_item, index) => (
        <SingleSlopeRigidFrameExtrude
          key={index}
          pos={[
            lPos[0],
            lPos[1],
            -lLength / 2 +
              0.5 +
              index * singleSlopeRigidFrameData.mainRigidFrameInterval,
          ]}
          lWidth={lWidth * 2}
          lEaveHeight={lEaveHeight}
          lDeltaHeight={lDeltaHeight}
        />
      ))}
      {/* insetBay rigidFrames */}
      <group
        position={[
          0,
          0,
          lLength + singleSlopeRigidFrameData.insetBayRigidFrameInterval,
        ]}
      >
        {singleSlopeRigidFrameData.insetBayRigidFrameCount.map(
          (_item, index) => (
            <SingleSlopeRigidFrameExtrude
              key={index}
              pos={[
                lPos[0],
                lPos[1],
                -lLength / 2 +
                  0.5 +
                  index * singleSlopeRigidFrameData.insetBayRigidFrameInterval,
              ]}
              lWidth={lWidth * 2}
              lEaveHeight={lEaveHeight}
              lDeltaHeight={lDeltaHeight}
            />
          ),
        )}
      </group>
    </group>
  );
};
