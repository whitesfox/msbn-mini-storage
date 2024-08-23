/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
import { useEffect } from "react";
import { usePlacement, useStoreSize, useStyle, useUpgrade } from "store";
import { useLeanTo } from "store/useLeanTo";
import { LeanToRoof } from "3dcomponents/Models/Roof/LeanToRoof";
import { LeanToEndWall } from "3dcomponents/Models/EndWall/LeanToEndWall";
import { LeanToTrimGroup } from "3dcomponents/ModelGroups/TrimGroups/LeanToTrimGroup";
import { LeanToSideWall } from "3dcomponents/Models/SideWall/LeanToSideWall";
import { LeanToDownspoutGroup } from "3dcomponents/ModelGroups/DownSpoutGroups/LeanToDownspoutGroup";
import { useDoorStore } from "store/useDoor";
import { BuildingInfo } from "store/useLeanTo";

interface ILeanTo {
  wall: string;
  type: string;
  lWidth: number;
  lLength: number;
  lEaveHeight: number;
  lDeltaHeight: number;
  lInsetBayLength: number;
  lPos: [number, number, number];
  lRot: [number, number, number];
}

export const LeanTo = ({
  wall,
  type,
  lWidth,
  lLength,
  lEaveHeight,
  lDeltaHeight,
  lInsetBayLength,
  lPos,
  lRot,
}: ILeanTo) => {
  const { label } = useStyle();
  const { insetbay, roofonly } = useUpgrade();
  const { doorData, doorCount, updateDoorData } = useDoorStore();
  const { leanToData, updateLeanToData } = useLeanTo();
  const { placement } = usePlacement();
  const {
    width,
    length,
    bayLength,
    basicLength,
    eaveHeight,
    deltaHeight,
    leanToDeltaHeight,
    leanToDropHeightSize,
    leanToPitchOptionSize,
  } = useStoreSize();

  useEffect(() => {
    let deltaH = lDeltaHeight;
    if (wall === "SideWallRight") {
      deltaH = leanToDeltaHeight[2].val;
    } else if (wall === "SideWallLeft") {
      deltaH = leanToDeltaHeight[3].val;
    } else if (wall === "EndWallFront") {
      deltaH = leanToDeltaHeight[0].val;
    } else if (wall === "EndWallBack") {
      deltaH = leanToDeltaHeight[1].val;
    }

    if (lDeltaHeight !== deltaH)
      updateLeanToData({
        wall: wall,
        type: type,
        lWidth: lWidth,
        lLength: lLength,
        lEaveHeight: lEaveHeight,
        lDeltaHeight: deltaH,
        lInsetBayLength: lInsetBayLength,
        lPos: [lPos[0], lPos[1], lPos[2]],
        lRot: [lRot[0], lRot[1], lRot[2]],
      });

    if (label === "Single Slope") {
      if (roofonly) {
        updateLeanToData({
          wall: "EndWallFront",
          type: leanToData[0].type,
          lWidth: leanToData[0].lWidth,
          lLength: leanToData[0].lLength,
          lEaveHeight:
            eaveHeight - leanToDeltaHeight[0].val - leanToDropHeightSize[0].val,
          lDeltaHeight: leanToDeltaHeight[0].val,
          lInsetBayLength: leanToData[0].lInsetBayLength,
          lPos: [
            leanToData[0].lPos[0],
            leanToData[0].lPos[1],
            leanToData[0].lPos[2],
          ],
          lRot: [
            leanToData[0].lRot[0],
            leanToData[0].lRot[1],
            leanToData[0].lRot[2],
          ],
        });
        updateLeanToData({
          wall: "EndWallBack",
          type: leanToData[1].type,
          lWidth: leanToData[1].lWidth,
          lLength: leanToData[1].lLength,
          lEaveHeight:
            eaveHeight - leanToDeltaHeight[1].val - leanToDropHeightSize[1].val,
          lDeltaHeight: leanToDeltaHeight[1].val,
          lInsetBayLength: leanToData[1].lInsetBayLength,
          lPos: [
            leanToData[1].lPos[0],
            leanToData[1].lPos[1],
            leanToData[1].lPos[2],
          ],
          lRot: [
            leanToData[1].lRot[0],
            leanToData[1].lRot[1],
            leanToData[1].lRot[2],
          ],
        });
        updateLeanToData({
          wall: "SideWallRight",
          type: leanToData[2].type,
          lWidth: leanToData[2].lWidth,
          lLength: leanToData[2].lLength,
          lEaveHeight:
            eaveHeight +
            deltaHeight -
            leanToDeltaHeight[2].val -
            leanToDropHeightSize[2].val,
          lDeltaHeight: leanToDeltaHeight[2].val,
          lInsetBayLength: leanToData[2].lInsetBayLength,
          lPos: [width / 2 - 0.6, 0, -length / 2 + leanToData[2].lLength / 2],
          lRot: [0, Math.PI, 0],
        });
        updateLeanToData({
          wall: "SideWallLeft",
          type: leanToData[3].type,
          lWidth: leanToData[3].lWidth,
          lLength: leanToData[3].lLength,
          lEaveHeight:
            eaveHeight - leanToDeltaHeight[3].val - leanToDropHeightSize[3].val,
          lDeltaHeight: leanToDeltaHeight[3].val,
          lInsetBayLength: leanToData[3].lInsetBayLength,
          lPos: [-width / 2 + 0.6, 0, -length / 2 + leanToData[3].lLength / 2],
          lRot: [0, 0, 0],
        });
      } else {
        updateLeanToData({
          wall: "EndWallFront",
          type: leanToData[0].type,
          lWidth: leanToData[0].lWidth,
          lLength: leanToData[0].lLength,
          lEaveHeight:
            eaveHeight - leanToDeltaHeight[0].val - leanToDropHeightSize[0].val,
          lDeltaHeight: leanToDeltaHeight[0].val,
          lInsetBayLength: leanToData[0].lInsetBayLength,
          lPos: [
            leanToData[0].lPos[0],
            leanToData[0].lPos[1],
            leanToData[0].lPos[2],
          ],
          lRot: [
            leanToData[0].lRot[0],
            leanToData[0].lRot[1],
            leanToData[0].lRot[2],
          ],
        });
        updateLeanToData({
          wall: "EndWallBack",
          type: leanToData[1].type,
          lWidth: leanToData[1].lWidth,
          lLength: leanToData[1].lLength,
          lEaveHeight:
            eaveHeight - leanToDeltaHeight[1].val - leanToDropHeightSize[1].val,
          lDeltaHeight: leanToDeltaHeight[1].val,
          lInsetBayLength: leanToData[1].lInsetBayLength,
          lPos: [
            leanToData[1].lPos[0],
            leanToData[1].lPos[1],
            leanToData[1].lPos[2],
          ],
          lRot: [
            leanToData[1].lRot[0],
            leanToData[1].lRot[1],
            leanToData[1].lRot[2],
          ],
        });
        updateLeanToData({
          wall: "SideWallRight",
          type: leanToData[2].type,
          lWidth: leanToData[2].lWidth - 0.6,
          lLength: leanToData[2].lLength,
          lEaveHeight:
            eaveHeight +
            deltaHeight -
            leanToDeltaHeight[2].val -
            leanToDropHeightSize[2].val,
          lDeltaHeight: leanToDeltaHeight[2].val,
          lInsetBayLength: leanToData[2].lInsetBayLength,
          lPos: [
            leanToData[2].lPos[0],
            leanToData[2].lPos[1],
            leanToData[2].lPos[2],
          ],
          lRot: [
            leanToData[2].lRot[0],
            leanToData[2].lRot[1],
            leanToData[2].lRot[2],
          ],
        });

        updateLeanToData({
          wall: "SideWallLeft",
          type: leanToData[3].type,
          lWidth: leanToData[3].lWidth,
          lLength: leanToData[3].lLength,
          lEaveHeight:
            eaveHeight - leanToDeltaHeight[3].val - leanToDropHeightSize[3].val,
          lDeltaHeight: leanToDeltaHeight[3].val,
          lInsetBayLength: leanToData[3].lInsetBayLength,
          lPos: [
            leanToData[3].lPos[0],
            leanToData[3].lPos[1],
            leanToData[3].lPos[2],
          ],
          lRot: [
            leanToData[3].lRot[0],
            leanToData[3].lRot[1],
            leanToData[3].lRot[2],
          ],
        });
      }
    } else if (label === "Gable") {
      if (roofonly) {
        updateLeanToData({
          wall: "EndWallFront",
          type: leanToData[0].type,
          lWidth: leanToData[0].lWidth,
          lLength: leanToData[0].lLength,
          lEaveHeight:
            eaveHeight - leanToDeltaHeight[0].val - leanToDropHeightSize[0].val,
          lDeltaHeight: leanToDeltaHeight[0].val,
          lInsetBayLength: leanToData[0].lInsetBayLength,
          lPos: [
            leanToData[0].lPos[0],
            leanToData[0].lPos[1],
            leanToData[0].lPos[2],
          ],
          lRot: [
            leanToData[0].lRot[0],
            leanToData[0].lRot[1],
            leanToData[0].lRot[2],
          ],
        });
        updateLeanToData({
          wall: "EndWallBack",
          type: leanToData[1].type,
          lWidth: leanToData[1].lWidth,
          lLength: leanToData[1].lLength,
          lEaveHeight:
            eaveHeight - leanToDeltaHeight[1].val - leanToDropHeightSize[1].val,
          lDeltaHeight: leanToDeltaHeight[1].val,
          lInsetBayLength: leanToData[1].lInsetBayLength,
          lPos: [
            leanToData[1].lPos[0],
            leanToData[1].lPos[1],
            leanToData[1].lPos[2],
          ],
          lRot: [
            leanToData[1].lRot[0],
            leanToData[1].lRot[1],
            leanToData[1].lRot[2],
          ],
        });
        updateLeanToData({
          wall: "SideWallRight",
          type: leanToData[2].type,
          lWidth: leanToData[2].lWidth,
          lLength: leanToData[2].lLength,
          lEaveHeight:
            eaveHeight -
            leanToDeltaHeight[2].val -
            leanToDropHeightSize[2].val +
            0.13,
          lDeltaHeight: leanToDeltaHeight[2].val,
          lInsetBayLength: leanToData[2].lInsetBayLength,
          lPos: [width / 2 - 0.6, 0, -length / 2 + leanToData[2].lLength / 2],
          lRot: [0, Math.PI, 0],
        });

        updateLeanToData({
          wall: "SideWallLeft",
          type: leanToData[3].type,
          lWidth: leanToData[3].lWidth,
          lLength: leanToData[3].lLength,
          lEaveHeight:
            eaveHeight -
            leanToDeltaHeight[3].val -
            leanToDropHeightSize[3].val +
            0.13,
          lDeltaHeight: leanToDeltaHeight[3].val,
          lInsetBayLength: leanToData[3].lInsetBayLength,
          lPos: [-width / 2 + 0.6, 0, -length / 2 + leanToData[3].lLength / 2],
          lRot: [0, 0, 0],
        });
      } else {
        updateLeanToData({
          wall: "EndWallFront",
          type: leanToData[0].type,
          lWidth: leanToData[0].lWidth,
          lLength: leanToData[0].lLength,
          lEaveHeight:
            eaveHeight - leanToDeltaHeight[0].val - leanToDropHeightSize[0].val,
          lDeltaHeight: leanToDeltaHeight[0].val,
          lInsetBayLength: leanToData[0].lInsetBayLength,
          lPos: [
            leanToData[0].lPos[0],
            leanToData[0].lPos[1],
            leanToData[0].lPos[2],
          ],
          lRot: [
            leanToData[0].lRot[0],
            leanToData[0].lRot[1],
            leanToData[0].lRot[2],
          ],
        });
        updateLeanToData({
          wall: "EndWallBack",
          type: leanToData[1].type,
          lWidth: leanToData[1].lWidth,
          lLength: leanToData[1].lLength,
          lEaveHeight:
            eaveHeight - leanToDeltaHeight[1].val - leanToDropHeightSize[1].val,
          lDeltaHeight: leanToDeltaHeight[1].val,
          lInsetBayLength: leanToData[1].lInsetBayLength,
          lPos: [
            leanToData[1].lPos[0],
            leanToData[1].lPos[1],
            leanToData[1].lPos[2],
          ],
          lRot: [
            leanToData[1].lRot[0],
            leanToData[1].lRot[1],
            leanToData[1].lRot[2],
          ],
        });
        updateLeanToData({
          wall: "SideWallRight",
          type: leanToData[2].type,
          lWidth: leanToData[2].lWidth,
          lLength: leanToData[2].lLength,
          lEaveHeight:
            eaveHeight -
            leanToDeltaHeight[2].val -
            leanToDropHeightSize[2].val +
            0.023,
          lDeltaHeight: leanToDeltaHeight[2].val,
          lInsetBayLength: leanToData[2].lInsetBayLength,
          lPos: [
            leanToData[2].lPos[0],
            leanToData[2].lPos[1],
            leanToData[2].lPos[2],
          ],
          lRot: [
            leanToData[2].lRot[0],
            leanToData[2].lRot[1],
            leanToData[2].lRot[2],
          ],
        });

        updateLeanToData({
          wall: "SideWallLeft",
          type: leanToData[3].type,
          lWidth: leanToData[3].lWidth,
          lLength: leanToData[3].lLength,
          lEaveHeight:
            eaveHeight - leanToDeltaHeight[3].val - leanToDropHeightSize[3].val,
          lDeltaHeight: leanToDeltaHeight[3].val,
          lInsetBayLength: leanToData[3].lInsetBayLength,
          lPos: [
            leanToData[3].lPos[0],
            leanToData[3].lPos[1],
            leanToData[3].lPos[2],
          ],
          lRot: [
            leanToData[3].lRot[0],
            leanToData[3].lRot[1],
            leanToData[3].lRot[2],
          ],
        });
      }
    }
  }, [
    roofonly,
    insetbay,
    leanToDeltaHeight,
    insetbay,
    bayLength,
    basicLength,
    leanToDropHeightSize,
    leanToPitchOptionSize,
  ]);

  useEffect(() => {
    doorData
      .filter((item) => item.building.startsWith("Lean-to"))
      .map((item, _index) => {
        if (placement[Number(item.building[item.building.length - 1]) - 1]) {
          let currentLeanTodata: BuildingInfo = {
            wall: "",
            type: "",
            lWidth: 0,
            lLength: 0,
            lEaveHeight: 0,
            lDeltaHeight: 0,
            lInsetBayLength: 0,
            lPos: [0, 0, 0],
            lRot: [0, 0, 0],
          };

          switch (
            placement[Number(item.building[item.building.length - 1]) - 1]
          ) {
            case "Front Sidewall":
              currentLeanTodata = leanToData.filter(
                (item) => item.wall === "SideWallRight",
              )[0];

              switch (item.wall) {
                case "EndWallGabelFront":
                  updateDoorData(
                    {
                      key: item.key,
                      name: item.name,
                      type: item.type,
                      building: item.building,
                      wall: item.wall,
                      size: item.size,
                      pos: [
                        item.pos[0],
                        item.pos[1],
                        currentLeanTodata.lPos[2] +
                          currentLeanTodata.lLength / 2 -
                          currentLeanTodata.lInsetBayLength +
                          bayLength / 2,
                      ],
                      rot: item.rot,
                      itemforRange: item.itemforRange,
                      nameForRange: item.nameForRange,
                    },
                    item.key,
                  );
                  break;
                case "EndWallGabelBack":
                  updateDoorData(
                    {
                      key: item.key,
                      name: item.name,
                      type: item.type,
                      building: item.building,
                      wall: item.wall,
                      size: item.size,
                      pos: [
                        item.pos[0],
                        item.pos[1],
                        currentLeanTodata.lPos[2] -
                          currentLeanTodata.lLength / 2 +
                          bayLength / 2,
                      ],
                      rot: item.rot,
                      itemforRange: item.itemforRange,
                      nameForRange: item.nameForRange,
                    },
                    item.key,
                  );
                  break;
                case "SideWallRight":
                  updateDoorData(
                    {
                      key: item.key,
                      name: item.name,
                      type: item.type,
                      building: item.building,
                      wall: item.wall,
                      size: item.size,
                      pos: [
                        currentLeanTodata.lPos[0] + currentLeanTodata.lWidth,
                        item.pos[1],
                        item.pos[2],
                      ],
                      rot: item.rot,
                      itemforRange: item.itemforRange,
                      nameForRange: item.nameForRange,
                    },
                    item.key,
                  );
                  break;
                default:
                  break;
              }
              break;
            case "Back Sidewall":
              currentLeanTodata = leanToData.filter(
                (item) => item.wall === "SideWallLeft",
              )[0];

              switch (item.wall) {
                case "EndWallGabelFront":
                  updateDoorData(
                    {
                      key: item.key,
                      name: item.name,
                      type: item.type,
                      building: item.building,
                      wall: item.wall,
                      size: item.size,
                      pos: [
                        item.pos[0],
                        item.pos[1],
                        currentLeanTodata.lPos[2] +
                          currentLeanTodata.lLength / 2 -
                          currentLeanTodata.lInsetBayLength +
                          bayLength / 2,
                      ],
                      rot: item.rot,
                      itemforRange: item.itemforRange,
                      nameForRange: item.nameForRange,
                    },
                    item.key,
                  );
                  break;
                case "EndWallGabelBack":
                  updateDoorData(
                    {
                      key: item.key,
                      name: item.name,
                      type: item.type,
                      building: item.building,
                      wall: item.wall,
                      size: item.size,
                      pos: [
                        item.pos[0],
                        item.pos[1],
                        currentLeanTodata.lPos[2] -
                          currentLeanTodata.lLength / 2 +
                          bayLength / 2,
                      ],
                      rot: item.rot,
                      itemforRange: item.itemforRange,
                      nameForRange: item.nameForRange,
                    },
                    item.key,
                  );
                  break;
                case "SideWallLeft":
                  updateDoorData(
                    {
                      key: item.key,
                      name: item.name,
                      type: item.type,
                      building: item.building,
                      wall: item.wall,
                      size: item.size,
                      pos: [
                        currentLeanTodata.lPos[0] - currentLeanTodata.lWidth,
                        item.pos[1],
                        item.pos[2],
                      ],
                      rot: item.rot,
                      itemforRange: item.itemforRange,
                      nameForRange: item.nameForRange,
                    },
                    item.key,
                  );
                  break;
                default:
                  break;
              }
              break;
            case "Left Endwall":
              currentLeanTodata = leanToData.filter(
                (item) => item.wall === "EndWallFront",
              )[0];

              switch (item.wall) {
                case "SideWallLeft":
                  updateDoorData(
                    {
                      key: item.key,
                      name: item.name,
                      type: item.type,
                      building: item.building,
                      wall: item.wall,
                      size: item.size,
                      pos: [
                        currentLeanTodata.lPos[0] -
                          currentLeanTodata.lLength / 2 +
                          currentLeanTodata.lInsetBayLength,
                        item.pos[1],
                        item.pos[2],
                      ],
                      rot: item.rot,
                      itemforRange: item.itemforRange,
                      nameForRange: item.nameForRange,
                    },
                    item.key,
                  );
                  break;
                case "SideWallRight":
                  updateDoorData(
                    {
                      key: item.key,
                      name: item.name,
                      type: item.type,
                      building: item.building,
                      wall: item.wall,
                      size: item.size,
                      pos: [
                        currentLeanTodata.lPos[0] +
                          currentLeanTodata.lLength / 2,
                        item.pos[1],
                        item.pos[2],
                      ],
                      rot: item.rot,
                      itemforRange: item.itemforRange,
                      nameForRange: item.nameForRange,
                    },
                    item.key,
                  );
                  break;
                case "EndWallGabelFront":
                  updateDoorData(
                    {
                      key: item.key,
                      name: item.name,
                      type: item.type,
                      building: item.building,
                      wall: item.wall,
                      size: item.size,
                      pos: [
                        item.pos[0],
                        item.pos[1],
                        currentLeanTodata.lPos[2] + currentLeanTodata.lWidth,
                      ],
                      rot: item.rot,
                      itemforRange: item.itemforRange,
                      nameForRange: item.nameForRange,
                    },
                    item.key,
                  );
                  break;
                default:
                  break;
              }
              break;
            case "Right Endwall":
              currentLeanTodata = leanToData.filter(
                (item) => item.wall === "EndWallBack",
              )[0];

              switch (item.wall) {
                case "SideWallRight":
                  updateDoorData(
                    {
                      key: item.key,
                      name: item.name,
                      type: item.type,
                      building: item.building,
                      wall: item.wall,
                      size: item.size,
                      pos: [
                        currentLeanTodata.lPos[0] +
                          currentLeanTodata.lLength / 2 -
                          currentLeanTodata.lInsetBayLength,
                        item.pos[1],
                        item.pos[2],
                      ],
                      rot: item.rot,
                      itemforRange: item.itemforRange,
                      nameForRange: item.nameForRange,
                    },
                    item.key,
                  );
                  break;
                case "SideWallLeft":
                  updateDoorData(
                    {
                      key: item.key,
                      name: item.name,
                      type: item.type,
                      building: item.building,
                      wall: item.wall,
                      size: item.size,
                      pos: [
                        currentLeanTodata.lPos[0] -
                          currentLeanTodata.lLength / 2,
                        item.pos[1],
                        item.pos[2],
                      ],
                      rot: item.rot,
                      itemforRange: item.itemforRange,
                      nameForRange: item.nameForRange,
                    },
                    item.key,
                  );
                  break;
                case "EndWallGabelBack":
                  updateDoorData(
                    {
                      key: item.key,
                      name: item.name,
                      type: item.type,
                      building: item.building,
                      wall: item.wall,
                      size: item.size,
                      pos: [
                        item.pos[0],
                        item.pos[1],
                        currentLeanTodata.lPos[2] - currentLeanTodata.lWidth,
                      ],
                      rot: item.rot,
                      itemforRange: item.itemforRange,
                      nameForRange: item.nameForRange,
                    },
                    item.key,
                  );
                  break;
                default:
                  break;
              }

              break;

            default:
              break;
          }
        }
      });
  }, [
    doorCount,
    leanToData,
    leanToDropHeightSize,
    leanToPitchOptionSize,
    leanToDeltaHeight,
  ]);

  const dropHeightSize = leanToDropHeightSize.filter(
    (item) => item.wall === wall,
  )[0].val;

  return (
    <group>
      <group
        position={[lPos[0], lPos[1], 0]}
        rotation={lRot}
      >
        <LeanToDownspoutGroup
          type={type}
          wall={wall}
          lWidth={lWidth * 2}
          lLength={lLength}
          lEaveHeight={lEaveHeight}
          lDeltaHeight={lDeltaHeight}
          lPos={lPos}
        />
      </group>
      <group
        position={[lPos[0], lPos[1], lPos[2]]}
        rotation={lRot}
      >
        <LeanToEndWall
          name={wall + "EndWallFront"}
          wall={wall}
          type={type}
          flag={true}
          lWidth={lWidth}
          lLength={lLength}
          lEaveHeight={lEaveHeight}
          lDeltaHeight={lDeltaHeight}
          lInsetBayLength={lInsetBayLength}
        />
        <LeanToEndWall
          name={wall + "EndWallBack"}
          wall={wall}
          type={type}
          flag={false}
          lWidth={lWidth}
          lLength={lLength}
          lEaveHeight={lEaveHeight}
          lDeltaHeight={lDeltaHeight}
          lInsetBayLength={lInsetBayLength}
        />
        <LeanToRoof
          flag={false}
          position={[0, 0, 0]}
          lWidth={lWidth}
          lLength={lLength}
          lEaveHeight={lEaveHeight}
          lDeltaHeight={lDeltaHeight}
          lDropHeight={dropHeightSize}
        />
        <LeanToSideWall
          name={wall + "SideWall"}
          wall={wall}
          type={type}
          flag={false}
          material={""}
          lWidth={lWidth}
          lLength={lLength}
          lEaveHeight={lEaveHeight}
          lInsetBayLength={lInsetBayLength}
          lPos={lPos}
        />

        <LeanToTrimGroup
          type={type}
          wall={wall}
          lWidth={lWidth * 2}
          lLength={lLength}
          lEaveHeight={lEaveHeight}
          lDeltaHeight={lDeltaHeight}
          lInsetBayLength={lInsetBayLength}
        />
      </group>
    </group>
  );
};
