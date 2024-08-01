/* eslint-disable react/no-unknown-property */
import { useMemo } from "react";
import { useStoreSize } from "store";
import { SculpturedRake } from "3dcomponents/Models/Trim/SculpturedRake";
import { HangOnTrim } from "3dcomponents/Models/Trim/HangOnTrim";
import { BaseTrim } from "3dcomponents/Models/Trim/BaseTrim";
import { OutsideCornerTrim } from "3dcomponents/Models/Trim/OutsideCornerTrim";
import { useDoorStore } from "store/useDoor";
import { useUpgrade } from "store";

export const GableTrimGroup = () => {
  const {
    width,
    length,
    basicLength,
    eaveHeight,
    overhangEave,
    overhangPurlin,
    deltaHeight,
    bayLength,
  } = useStoreSize();

  const { sliceDoorData } = useDoorStore();
  const { roofonly } = useUpgrade();

  const data = useMemo(() => {
    const trLength =
      Math.sqrt(
        ((deltaHeight * overhangEave) / (width / 2) + deltaHeight) *
          ((deltaHeight * overhangEave) / (width / 2) + deltaHeight) +
          (width / 2 + overhangEave) * (width / 2 + overhangEave),
      ) + Math.sqrt((deltaHeight * deltaHeight) / (width * width) + 0.25);
    const xValue =
      (overhangEave *
        Math.sqrt(deltaHeight * deltaHeight + (width * width) / 4)) /
      (width / 2);
    const xLength =
      Math.sqrt(xValue * xValue + 0.01) *
      Math.sin(Math.atan(0.1 / xValue) + Math.atan(width / 2 / deltaHeight));
    const yLength =
      Math.sqrt(xValue * xValue + 0.01) *
      Math.cos(Math.atan(0.1 / xValue) + Math.atan(width / 2 / deltaHeight));
    return {
      trLength: trLength,
      xValue: xValue,
      xLength: xLength,
      yLength: yLength,
    };
  }, [width, overhangEave, deltaHeight]);

  interface BaseTrimListProps {
    points: Array<number>;
    distance: number;
    rotY: number;
  }

  const baseTrimList: Array<BaseTrimListProps> = useMemo(() => {
    const pointsForFront: number[] = [];
    const baseTrimList: Array<BaseTrimListProps> = [];
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
        points: [pointsForFront[i], 0.35, basicLength / 2 - 0.02],
        distance: distance,
        rotY: -Math.PI / 2,
      });
    }

    const pointsForBack: number[] = [];

    sliceDoorData.filter((item) => {
      if (item.building === "MainBuilding") {
        if (item.wall === "EndWallGabelBack" && item.type !== "Window") {
          pointsForBack.push(
            item.pos[0] + item.size[0] / 2,
            item.pos[0] - item.size[0] / 2,
          );
        }
      }
    });
    pointsForBack.push(-width / 2, width / 2);
    pointsForBack.sort(function (a, b) {
      return a - b;
    });
    for (let i = 0; i <= pointsForBack.length - 1; i += 2) {
      const distance = Math.abs(pointsForBack[i] - pointsForBack[i + 1]);
      baseTrimList.push({
        points: [pointsForBack[i], 0.35, -basicLength / 2 + 0.02],
        distance: distance,
        rotY: Math.PI / 2,
      });
    }

    const pointsForRight: number[] = [];

    sliceDoorData.filter((item) => {
      if (item.building === "MainBuilding") {
        if (item.wall === "SideWallRight" && item.type !== "Window") {
          pointsForRight.push(
            -item.pos[2] - item.size[0] / 2,
            -item.pos[2] + item.size[0] / 2,
          );
        }
      }
    });
    pointsForRight.push(-basicLength / 2, basicLength / 2);
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
      if (item.building === "MainBuilding") {
        if (item.wall === "SideWallLeft" && item.type !== "Window") {
          pointsForLeft.push(
            -item.pos[2] - item.size[0] / 2,
            -item.pos[2] + item.size[0] / 2,
          );
        }
      }
    });
    pointsForLeft.push(-basicLength / 2, basicLength / 2);
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
  }, [width, basicLength, sliceDoorData]);

  return (
    <group
      castShadow
      receiveShadow
    >
      <group
        name="OutsideCornerTrim"
        castShadow
        receiveShadow
        visible={roofonly ? false : true}
      >
        <OutsideCornerTrim
          count={1}
          pos={[width / 2 + 0.03 + 0.15, 0, basicLength / 2 + 0.03 + 0.15]}
          rot={[-Math.PI / 2, 0, Math.PI]}
          eaveHeight={eaveHeight}
          trimLength={eaveHeight}
        />
        <OutsideCornerTrim
          count={2}
          pos={[width / 2 + 0.03 + 0.15, 0, -basicLength / 2 - 0.03 - 0.15]}
          rot={[-Math.PI / 2, 0, -Math.PI / 2]}
          eaveHeight={eaveHeight}
          trimLength={eaveHeight}
        />
        <OutsideCornerTrim
          count={3}
          pos={[-width / 2 - 0.03 - 0.15, 0, -basicLength / 2 - 0.03 - 0.15]}
          rot={[-Math.PI / 2, 0, 0]}
          eaveHeight={eaveHeight}
          trimLength={eaveHeight}
        />
        <OutsideCornerTrim
          count={4}
          pos={[-width / 2 - 0.03 - 0.15, 0, basicLength / 2 + 0.03 + 0.15]}
          rot={[-Math.PI / 2, 0, Math.PI / 2]}
          eaveHeight={eaveHeight}
          trimLength={eaveHeight}
        />
      </group>
      <group
        castShadow
        receiveShadow
        position={[0, 0, bayLength / 2]}
      >
        <HangOnTrim
          pos={[
            -(width / 2) -
              data.xLength -
              (3 / 16) * Math.cos(Math.atan(deltaHeight / (width / 2))) -
              0.01,
            eaveHeight -
              data.yLength -
              (3 / 16) * Math.sin(Math.atan(deltaHeight / (width / 2))) +
              0.07,
            -(length + overhangPurlin) / 2 - 0.5,
          ]}
          rot={[0, 0, Math.atan(deltaHeight / (width / 2))]}
          trimLength={length + overhangPurlin + 2}
          direction={"SideWallLeft"}
        />
        <group rotation={[0, Math.PI, 0]}>
          <HangOnTrim
            pos={[
              -(width / 2) -
                data.xLength -
                (3 / 16) * Math.cos(Math.atan(deltaHeight / (width / 2))) -
                0.03,
              eaveHeight -
                data.yLength -
                (3 / 16) * Math.sin(Math.atan(deltaHeight / (width / 2))) +
                0.07,
              -(length + overhangPurlin) / 2 - 0.5,
            ]}
            rot={[0, 0, Math.atan(deltaHeight / (width / 2))]}
            trimLength={length + overhangPurlin + 2}
            direction={"SideWallRight"}
          />
        </group>
      </group>
      <group
        castShadow
        receiveShadow
      >
        <group
          name="roofTrim"
          position={[0, 0, bayLength / 2]}
        >
          <SculpturedRake
            pos={[
              0,
              deltaHeight +
                eaveHeight +
                Math.sqrt(
                  ((0.25 * deltaHeight) / (width / 2 + overhangEave)) *
                    ((0.25 * deltaHeight) / (width / 2 + overhangEave)) +
                    0.25 * 0.25,
                ),
              (length + overhangPurlin) / 2 - 28 / 96,
            ]}
            rot={[
              Math.PI / 2,
              Math.PI / 2 - Math.atan(deltaHeight / (width / 2)),
              -Math.PI / 2,
            ]}
            vec={[-1, eaveHeight + deltaHeight, length / 2]}
            trimLength={data.trLength}
            direction={true}
            posZ={0.5}
          />
          <SculpturedRake
            pos={[
              -data.trLength * Math.cos(Math.atan(deltaHeight / (width / 2))),
              -data.trLength * Math.sin(Math.atan(deltaHeight / (width / 2))) +
                deltaHeight +
                eaveHeight +
                Math.sqrt(
                  ((0.25 * deltaHeight) / (width / 2 + overhangEave)) *
                    ((0.25 * deltaHeight) / (width / 2 + overhangEave)) +
                    0.25 * 0.25,
                ),
              (length + overhangPurlin) / 2 - 28 / 96,
            ]}
            rot={[
              Math.PI / 2,
              Math.PI / 2 + Math.atan(deltaHeight / (width / 2)),
              -Math.PI / 2,
            ]}
            vec={[1, eaveHeight + deltaHeight, length / 2]}
            trimLength={data.trLength}
            direction={false}
            posZ={-1}
            deltaOverHangEave={0.012}
          />
          <group rotation={[0, Math.PI, 0]}>
            <SculpturedRake
              pos={[
                0,
                deltaHeight +
                  eaveHeight +
                  Math.sqrt(
                    ((0.25 * deltaHeight) / (width / 2 + overhangEave)) *
                      ((0.25 * deltaHeight) / (width / 2 + overhangEave)) +
                      0.25 * 0.25,
                  ),
                (length + overhangPurlin) / 2 - 28 / 96,
              ]}
              rot={[
                Math.PI / 2,
                Math.PI / 2 - Math.atan(deltaHeight / (width / 2)),
                -Math.PI / 2,
              ]}
              vec={[1, eaveHeight + deltaHeight, -length / 2]}
              trimLength={data.trLength}
              direction={true}
              posZ={0.5}
              deltaOverHangEave={-0.022}
            />
          </group>
          <group rotation={[0, Math.PI, 0]}>
            <SculpturedRake
              pos={[
                -data.trLength * Math.cos(Math.atan(deltaHeight / (width / 2))),
                -data.trLength *
                  Math.sin(Math.atan(deltaHeight / (width / 2))) +
                  deltaHeight +
                  eaveHeight +
                  Math.sqrt(
                    ((0.25 * deltaHeight) / (width / 2 + overhangEave)) *
                      ((0.25 * deltaHeight) / (width / 2 + overhangEave)) +
                      0.25 * 0.25,
                  ),
                (length + overhangPurlin) / 2 - 28 / 96,
              ]}
              rot={[
                Math.PI / 2,
                Math.PI / 2 + Math.atan(deltaHeight / (width / 2)),
                -Math.PI / 2,
              ]}
              vec={[-1, eaveHeight + deltaHeight, -length / 2]}
              trimLength={data.trLength}
              direction={false}
              posZ={-1}
            />
          </group>
        </group>
        <group
          receiveShadow
          castShadow
          visible={roofonly ? false : true}
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
