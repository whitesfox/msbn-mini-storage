/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
import { useMemo } from "react";
import { useStoreSize } from "store";
import { SculpturedRake } from "3dcomponents/Models/Trim/SculpturedRake";
import { SingleSlopeHangOnTrim } from "3dcomponents/Models/Trim/HangOnTrim/SingleSlopeHangOnTrim";
import { SingleSlopeOutsideCornerTrim } from "3dcomponents/Models/Trim/OutsideCornerTrim/SingleSlopeOutsideCornerTrim";

interface ISingleSlopeTrimGroup {
  type: string;
  wall: string;
  lWidth: number;
  lLength: number;
  lEaveHeight: number;
  lDeltaHeight: number;
  lInsetBayLength: number;
}

export const LeanToTrimGroup = ({
  type,
  wall,
  lWidth,
  lLength,
  lEaveHeight,
  lDeltaHeight,
  lInsetBayLength,
}: ISingleSlopeTrimGroup) => {
  const { overhangEave, overhangPurlin, bayLength } = useStoreSize();

  const data = useMemo(() => {
    const trLength =
      Math.sqrt(
        ((lDeltaHeight * overhangEave) / (lWidth / 2) + lDeltaHeight) *
          ((lDeltaHeight * overhangEave) / (lWidth / 2) + lDeltaHeight) +
          (lWidth / 2 + overhangEave) * (lWidth / 2 + overhangEave),
      ) + Math.sqrt((lDeltaHeight * lDeltaHeight) / (lWidth * lWidth) + 0.25);
    const xValue =
      (overhangEave *
        Math.sqrt(lDeltaHeight * lDeltaHeight + (lWidth * lWidth) / 4)) /
      (lWidth / 2);
    const xLength =
      Math.sqrt(xValue * xValue + 0.01) *
      Math.sin(Math.atan(0.1 / xValue) + Math.atan(lWidth / 2 / lDeltaHeight));
    const yLength =
      Math.sqrt(xValue * xValue + 0.01) *
      Math.cos(Math.atan(0.1 / xValue) + Math.atan(lWidth / 2 / lDeltaHeight));
    return {
      trLength: trLength,
      xValue: xValue,
      xLength: xLength,
      yLength: yLength,
    };
  }, [lWidth, bayLength, lEaveHeight, overhangEave, lDeltaHeight]);

  return (
    <group
      castShadow
      receiveShadow
    >
      <group
        name="OutsideCornerTrim"
        castShadow
        receiveShadow
        visible={type === "Open" ? false : true}
      >
        <SingleSlopeOutsideCornerTrim
          pos={[
            -lWidth / 2 - 0.03 - 0.15,
            0,
            wall === "SideWallLeft"
              ? lLength / 2 - lInsetBayLength + 0.03 + 0.15
              : lLength / 2 + 0.03 + 0.15,
          ]}
          rot={[-Math.PI / 2, 0, Math.PI / 2]}
          trimLength={lEaveHeight}
        />
        <SingleSlopeOutsideCornerTrim
          pos={[
            -lWidth / 2 - 0.03 - 0.15,
            0,
            wall === "SideWallLeft"
              ? -lLength / 2 - 0.03 - 0.15
              : -lLength / 2 + lInsetBayLength - 0.03 - 0.15,
          ]}
          rot={[-Math.PI / 2, 0, 0]}
          trimLength={lEaveHeight}
        />
      </group>
      <group
        castShadow
        receiveShadow
        position={[0, 0, 0]}
      >
        <SingleSlopeHangOnTrim
          pos={[
            -(lWidth / 2) -
              data.xLength -
              (3 / 16) * Math.cos(Math.atan(lDeltaHeight / (lWidth / 2))) -
              0.03,
            lEaveHeight -
              data.yLength -
              (3 / 16) * Math.sin(Math.atan(lDeltaHeight / (lWidth / 2))) +
              0.07,
            -(lLength + overhangPurlin) / 2 - 0.5,
          ]}
          rot={[0, 0, Math.atan(lDeltaHeight / (lWidth / 2))]}
          trimLength={lLength + overhangPurlin + 2}
          lLength={lLength}
        />
      </group>
      <group
        castShadow
        receiveShadow
      >
        <group
          name="roofTrim"
          position={[0, 0, 0]}
        >
          <SculpturedRake
            pos={[
              -data.trLength * Math.cos(Math.atan(lDeltaHeight / (lWidth / 2))),
              -data.trLength *
                Math.sin(Math.atan(lDeltaHeight / (lWidth / 2))) +
                lDeltaHeight +
                lEaveHeight +
                Math.sqrt(
                  ((0.25 * lDeltaHeight) / (lWidth / 2 + overhangEave)) *
                    ((0.25 * lDeltaHeight) / (lWidth / 2 + overhangEave)) +
                    0.25 * 0.25,
                ),
              (lLength + overhangPurlin) / 2 - 28 / 96,
            ]}
            rot={[
              Math.PI / 2,
              Math.PI / 2 + Math.atan(lDeltaHeight / (lWidth / 2)),
              -Math.PI / 2,
            ]}
            vec={[1, lEaveHeight + lDeltaHeight, lLength / 2]}
            trimLength={data.trLength}
            direction={false}
            posZ={-1}
          />
          <group rotation={[0, Math.PI, 0]}>
            <SculpturedRake
              pos={[
                0,
                lDeltaHeight +
                  lEaveHeight +
                  Math.sqrt(
                    ((0.25 * lDeltaHeight) / (lWidth / 2 + overhangEave)) *
                      ((0.25 * lDeltaHeight) / (lWidth / 2 + overhangEave)) +
                      0.25 * 0.25,
                  ),
                (lLength + overhangPurlin) / 2 - 28 / 96,
              ]}
              rot={[
                Math.PI / 2,
                Math.PI / 2 - Math.atan(lDeltaHeight / (lWidth / 2)),
                -Math.PI / 2,
              ]}
              vec={[1, lEaveHeight + lDeltaHeight, -lLength / 2]}
              trimLength={data.trLength}
              direction={true}
              posZ={0.5}
            />
          </group>
        </group>
        {/* <group
          receiveShadow
          castShadow
          visible={type === "Open" ? false : true}
        >
          {baseTrimList.map((item, index) => (
            <BaseTrim
              key={index}
              pos={[item.points[0], item.points[1], item.points[2]]}
              rot={[0, item.rotY, 0]}
              baseTrimLength={item.distance}
            />
          ))}
        </group> */}
      </group>
    </group>
  );
};
