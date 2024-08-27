/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
import { useMemo } from "react";
import { useDoorStore } from "store/useDoor";
import { useStoreSize, useUpgrade } from "store";
import { BaseTrim } from "3dcomponents/Models/Trim/BaseTrim";
import { SingleSlopeHangOnTrim } from "3dcomponents/Models/Trim/HangOnTrim/SingleSlopeHangOnTrim";
import { OutsideCornerTrim } from "3dcomponents/Models/Trim/OutsideCornerTrim";
import { SingleSlopeSculpturedRake } from "3dcomponents/Models/Trim/SculpturedRake/SingleSlopeSculpturedRake";
import { TopSingleSlopeSculpturedRake } from "3dcomponents/Models/Trim/SculpturedRake/TopSingleSlopeSculpturedRake";

interface IBaseTrimList {
  points: Array<number>;
  distance: number;
  rotY: number;
}

interface ISingleSlopeTrimGroup {
  type: string;
  lWidth: number;
  lLength: number;
  lEaveHeight: number;
  lDeltaHeight: number;
}

export const SingleSlopeTrimGroup = ({
  type,
  lWidth,
  lLength,
  lEaveHeight,
  lDeltaHeight,
}: ISingleSlopeTrimGroup) => {
  const { sliceDoorData } = useDoorStore();
  const { width, length, overhangEave, overhangPurlin, bayLength } =
    useStoreSize();

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

  const baseTrimList: Array<IBaseTrimList> = useMemo(() => {
    const pointsForFront: number[] = [];
    const baseTrimList: Array<IBaseTrimList> = [];
    sliceDoorData.filter((item) => {
      if (item.building === "MainBuilding") {
        if (item.wall === "EndWallGabelFront" && item.type !== "Window") {
          pointsForFront.push(
            item.pos[0] + item.size[0] / 2,
            item.pos[0] - item.size[0] / 2 - 0.1,
          );
        }
      }
    });
    pointsForFront.push(width / 2, -width / 2);
    pointsForFront.sort(function (a, b) {
      return a - b;
    });
    pointsForFront.reverse();
    for (let i = 0; i <= pointsForFront.length - 1; i += 2) {
      const distance = Math.abs(pointsForFront[i] - pointsForFront[i + 1]);
      baseTrimList.push({
        points: [pointsForFront[i], 0.35, lLength / 2 - 0.02],
        distance: distance,
        rotY: -Math.PI / 2,
      });
    }

    const pointsForBack: number[] = [];

    sliceDoorData.filter((item) => {
      if (item.wall === "EndWallGabelBack" && item.type !== "Window") {
        pointsForBack.push(
          item.pos[0] + item.size[0] / 2,
          item.pos[0] - item.size[0] / 2,
        );
      }
    });
    pointsForBack.push(-width / 2, width / 2);
    pointsForBack.sort(function (a, b) {
      return a - b;
    });
    for (let i = 0; i <= pointsForBack.length - 1; i += 2) {
      const distance = Math.abs(pointsForBack[i] - pointsForBack[i + 1]);
      baseTrimList.push({
        points: [pointsForBack[i], 0.35, -lLength / 2 + 0.02],
        distance: distance,
        rotY: Math.PI / 2,
      });
    }

    const pointsForRight: number[] = [];

    sliceDoorData.filter((item) => {
      if (item.wall === "SideWallRight" && item.type !== "Window") {
        pointsForRight.push(
          -item.pos[2] - item.size[0] / 2,
          -item.pos[2] + item.size[0] / 2,
        );
      }
    });
    pointsForRight.push(-lLength / 2, lLength / 2);
    pointsForRight.sort(function (a, b) {
      return a - b;
    });
    pointsForRight.reverse();
    for (let i = 0; i <= pointsForRight.length - 1; i += 2) {
      const distance = Math.abs(pointsForRight[i] - pointsForRight[i + 1]);
      baseTrimList.push({
        points: [width / 2 - 0.07, 0.35, -pointsForRight[i]],
        distance: distance,
        rotY: 0,
      });
    }

    const pointsForLeft: number[] = [];

    sliceDoorData.filter((item) => {
      if (item.wall === "SideWallLeft" && item.type !== "Window") {
        pointsForLeft.push(
          -item.pos[2] - item.size[0] / 2,
          -item.pos[2] + item.size[0] / 2,
        );
      }
    });
    pointsForLeft.push(-lLength / 2, lLength / 2);
    pointsForLeft.sort(function (a, b) {
      return a - b;
    });
    pointsForLeft.reverse();
    for (let i = 0; i <= pointsForLeft.length - 1; i += 2) {
      const distance = Math.abs(pointsForLeft[i] - pointsForLeft[i + 1]);
      baseTrimList.push({
        points: [-width / 2 + 0.02, 0.35, -pointsForLeft[i]],
        distance: -distance,
        rotY: -Math.PI,
      });
    }

    return baseTrimList;
  }, [width, lLength, sliceDoorData]);

  return (
    <group
      castShadow
      receiveShadow
    >
      <group
        name="OutsideCornerTrim"
        castShadow
        receiveShadow
      >
        <OutsideCornerTrim
          count={1}
          pos={[0 + 0.03 + 0.15, 0, lLength / 2 + 0.03 + 0.15]}
          rot={[-Math.PI / 2, 0, Math.PI]}
          eaveHeight={lEaveHeight}
          trimLength={lEaveHeight + lDeltaHeight}
        />
        <OutsideCornerTrim
          count={2}
          pos={[0 + 0.03 + 0.15, 0, -lLength / 2 - 0.03 - 0.15]}
          rot={[-Math.PI / 2, 0, -Math.PI / 2]}
          eaveHeight={lEaveHeight}
          trimLength={lEaveHeight + lDeltaHeight}
        />
        <OutsideCornerTrim
          count={3}
          pos={[-width - 0.03 - 0.15, 0, -lLength / 2 - 0.03 - 0.15]}
          rot={[-Math.PI / 2, 0, 0]}
          eaveHeight={lEaveHeight}
          trimLength={lEaveHeight}
        />
        <OutsideCornerTrim
          count={4}
          pos={[-width - 0.03 - 0.15, 0, lLength / 2 + 0.03 + 0.15]}
          rot={[-Math.PI / 2, 0, Math.PI / 2]}
          eaveHeight={lEaveHeight}
          trimLength={lEaveHeight}
        />
      </group>
      <group
        castShadow
        receiveShadow
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
          trimLength={length + overhangPurlin + 2}
          lLength={length}
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
          <SingleSlopeSculpturedRake
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
              (lLength + overhangPurlin) / 2 - 28 / 96 + bayLength,
            ]}
            rot={[
              Math.PI / 2,
              Math.PI / 2 + Math.atan(lDeltaHeight / (lWidth / 2)),
              -Math.PI / 2,
            ]}
            vec={[1, lEaveHeight + lDeltaHeight, lLength / 2]}
            trimLength={data.trLength + overhangEave + 1}
            direction={false}
            posZ={-1}
            deltaOverHangEave={0}
          />
          <group rotation={[0, Math.PI, 0]}>
            <SingleSlopeSculpturedRake
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
              trimLength={data.trLength + overhangEave + 1}
              direction={true}
              posZ={0.5}
              deltaOverHangEave={-overhangEave - 1}
            />
          </group>
          <TopSingleSlopeSculpturedRake
            pos={[
              0,
              lEaveHeight + lDeltaHeight + 0.26,
              (lLength + 2 + overhangPurlin) / 2 + bayLength,
            ]}
            rot={[0, Math.PI, -Math.atan(lDeltaHeight / (lWidth / 2))]}
            vec={[1, lEaveHeight + lDeltaHeight, lLength / 2]}
            trimLength={length + 2 + overhangPurlin}
            posZ={-1}
            deltaOverHangEave={0}
          />
        </group>
        <group
          position={[-width / 2, 0, 0]}
          receiveShadow
          castShadow
        >
          {baseTrimList.map((item, index) => (
            <BaseTrim
              key={index}
              pos={[item.points[0], item.points[1], item.points[2]]}
              rot={[0, item.rotY, 0]}
              baseTrimLength={item.distance}
            />
          ))}
        </group>
      </group>
    </group>
  );
};
