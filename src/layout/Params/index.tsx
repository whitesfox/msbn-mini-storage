/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useStoreSize,
  useStyle,
  useUpgrade,
  useAddLeanToMultiple,
  usePlacement,
  useStoreColor,
} from "store";
import { useLeanTo } from "store/useLeanTo";
import { DoorInfo, SliceDoorInfo } from "store/useDoor";
import { useDoorStore, useDoorCombo, useDoorName } from "store/useDoor";
import { useMultipleDoorsWindows, useBuildingForWindowDoor } from "store";

export const Params = () => {
  const {
    width,
    length,
    eaveHeight,
    deltaHeight,
    pitchOptionSize,
    setWidth,
    setLength,
    setEaveHeight,
    setPitch,
    setBayLength,
    setLeanToDropHeigth,
    setLeanToPitch,
    setEaveOverhang,
    setGableOverhang,
  } = useStoreSize();
  const { label, setStyle } = useStyle();
  const {
    insetbay,
    roofonly,
    setInsetBay,
    setRoofOnly,
    setdownspout,
    setWainscot,
    setLinerPanels,
  } = useUpgrade();
  const { updateLeanToData, addLeanToState, addLeanToInsetBay } = useLeanTo();
  const { setMultipleLeanTo, setMultipleLeanToOpenStatus } =
    useAddLeanToMultiple();
  const { setPlacement } = usePlacement();
  const {
    setRoofColor,
    setSideWallColor,
    setWallTrimColor,
    setBaseTrimColor,
    setRoofTrimColor,
    setWainscotColor,
    setDownspoutColor,
  } = useStoreColor();
  const { addDoorData, addSliceDoorData } = useDoorStore();
  const {
    setMultipleWalkDoor,
    setMultipleRollUpDoor,
    setMultipleAddWindow,
    setMultipleWalkDoorOpenStatus,
    setMultipleRollUpOpenStatus,
    setMultipleAddWindowOpenStatus,
  } = useMultipleDoorsWindows();
  const { addComboData } = useDoorCombo();
  const { setRollupDoorName, setWalkDoorName, setWindowName } = useDoorName();
  const { setBuildingRollUpDoor, setBuildingWalkDoor, setBuildingWindow } =
    useBuildingForWindowDoor();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (Array.from(searchParams.keys()).length > 0) {
      //Main building
      const mainBuildingStyle = searchParams.get("mbs");
      const mainBuildingWidth = Number(searchParams.getAll("mbi")[0]);
      const mainBuildingLength = Number(searchParams.getAll("mbi")[1]);
      const mainBuildingEaveHeight = Number(searchParams.getAll("mbi")[2]);
      const mainBuildingDeltaHeight = Number(searchParams.getAll("mbi")[3]);
      const mainBuildingPitchOptionSize = String(searchParams.getAll("mbi")[4]);
      const mainBuildingInsetBay =
        String(searchParams.getAll("mbi")[5]) === "false" ? false : true;
      const mainBuildingInsetBayLength = Number(searchParams.getAll("mbi")[6]);
      const mainBuildingRoofOnly =
        String(searchParams.getAll("mbi")[7]) === "false" ? false : true;

      if (label !== mainBuildingStyle)
        setStyle(String(searchParams.get("mbs")));
      if (width !== mainBuildingWidth) setWidth(mainBuildingWidth);
      if (length !== mainBuildingLength) setLength(mainBuildingLength);
      if (eaveHeight !== mainBuildingEaveHeight)
        setEaveHeight(mainBuildingEaveHeight);
      if (
        deltaHeight !== mainBuildingDeltaHeight ||
        pitchOptionSize !== mainBuildingPitchOptionSize
      )
        setPitch({
          id: mainBuildingDeltaHeight,
          val: mainBuildingPitchOptionSize,
        });
      if (insetbay !== mainBuildingInsetBay) {
        setInsetBay(mainBuildingInsetBay);
        setBayLength(mainBuildingInsetBayLength);
      }
      if (roofonly !== mainBuildingRoofOnly) setRoofOnly(mainBuildingRoofOnly);

      //Liner panels
      const linerPanels =
        String(searchParams.get("lp")) === "false" ? false : true;
      setLinerPanels(linerPanels);

      //wainscot and downspout
      const wainscoutState =
        String(searchParams.get("ws")) === "false" ? false : true;
      const downspoutState =
        String(searchParams.get("ds")) === "false" ? false : true;
      setWainscot(wainscoutState);
      setdownspout(downspoutState);

      //Lean-to
      const leanTo1 = searchParams.getAll("lt1");
      const leanTo2 = searchParams.getAll("lt2");
      const leanTo3 = searchParams.getAll("lt3");
      const leanTo4 = searchParams.getAll("lt4");

      updateLeanToData({
        wall: leanTo1[0],
        type: leanTo1[1],
        lWidth: Number(leanTo1[2]),
        lLength: Number(leanTo1[3]),
        lEaveHeight: Number(leanTo1[4]),
        lDeltaHeight: Number(leanTo1[5]),
        lInsetBayLength: Number(leanTo1[6]),
        lPos: [Number(leanTo1[7]), Number(leanTo1[8]), Number(leanTo1[9])],
        lRot: [Number(leanTo1[10]), Number(leanTo1[11]), Number(leanTo1[12])],
      });
      updateLeanToData({
        wall: leanTo2[0],
        type: leanTo2[1],
        lWidth: Number(leanTo2[2]),
        lLength: Number(leanTo2[3]),
        lEaveHeight: Number(leanTo2[4]),
        lDeltaHeight: Number(leanTo2[5]),
        lInsetBayLength: Number(leanTo2[6]),
        lPos: [Number(leanTo2[7]), Number(leanTo2[8]), Number(leanTo2[9])],
        lRot: [Number(leanTo2[10]), Number(leanTo2[11]), Number(leanTo2[12])],
      });
      updateLeanToData({
        wall: leanTo3[0],
        type: leanTo3[1],
        lWidth: Number(leanTo3[2]),
        lLength: Number(leanTo3[3]),
        lEaveHeight: Number(leanTo3[4]),
        lDeltaHeight: Number(leanTo3[5]),
        lInsetBayLength: Number(leanTo3[6]),
        lPos: [Number(leanTo3[7]), Number(leanTo3[8]), Number(leanTo3[9])],
        lRot: [Number(leanTo3[10]), Number(leanTo3[11]), Number(leanTo3[12])],
      });
      updateLeanToData({
        wall: leanTo4[0],
        type: leanTo4[1],
        lWidth: Number(leanTo4[2]),
        lLength: Number(leanTo4[3]),
        lEaveHeight: Number(leanTo4[4]),
        lDeltaHeight: Number(leanTo4[5]),
        lInsetBayLength: Number(leanTo4[6]),
        lPos: [Number(leanTo4[7]), Number(leanTo4[8]), Number(leanTo4[9])],
        lRot: [Number(leanTo4[10]), Number(leanTo4[11]), Number(leanTo4[12])],
      });

      let leanToCount = 0;
      const tempPlacement = {} as {
        [key: number]: string;
      };
      const tempMultipleLeanTo = {} as {
        [key: number]: number | string;
      };
      const tempLeanToOpenStatus = {} as {
        [key: number]: boolean;
      };

      if (leanTo1[1] !== "Closure") {
        if (leanTo1[1] === "Inset Bay") {
          addLeanToInsetBay({
            wall: leanTo1[0],
            seted: true,
          });
        }
        addLeanToState({
          wall: leanTo1[0],
          seted: true,
        });

        if (tempLeanToOpenStatus[leanToCount]) {
          tempLeanToOpenStatus[leanToCount] =
            !tempLeanToOpenStatus[leanToCount];
        } else {
          tempLeanToOpenStatus[leanToCount] = true;
        }
        setMultipleLeanToOpenStatus(tempLeanToOpenStatus);

        tempMultipleLeanTo[leanToCount] = 1;
        setMultipleLeanTo(tempMultipleLeanTo);

        tempPlacement[leanToCount] = "Left Endwall";
        leanToCount += 1;
        setPlacement(tempPlacement);
      } else {
        addLeanToState({
          wall: leanTo1[0],
          seted: false,
        });
      }

      if (leanTo2[1] !== "Closure") {
        if (leanTo2[1] === "Inset Bay") {
          addLeanToInsetBay({
            wall: leanTo2[0],
            seted: true,
          });
        }
        addLeanToState({
          wall: leanTo2[0],
          seted: true,
        });

        if (tempLeanToOpenStatus[leanToCount]) {
          tempLeanToOpenStatus[leanToCount] =
            !tempLeanToOpenStatus[leanToCount];
        } else {
          tempLeanToOpenStatus[leanToCount] = true;
        }
        setMultipleLeanToOpenStatus(tempLeanToOpenStatus);

        tempMultipleLeanTo[leanToCount] = 1;
        setMultipleLeanTo(tempMultipleLeanTo);

        tempPlacement[leanToCount] = "Right Endwall";
        leanToCount += 1;
        setPlacement(tempPlacement);
      } else {
        addLeanToState({
          wall: leanTo2[0],
          seted: false,
        });
      }

      if (leanTo3[1] !== "Closure") {
        if (leanTo3[1] === "Inset Bay") {
          addLeanToInsetBay({
            wall: leanTo3[0],
            seted: true,
          });
        }
        addLeanToState({
          wall: leanTo3[0],
          seted: true,
        });

        if (tempLeanToOpenStatus[leanToCount]) {
          tempLeanToOpenStatus[leanToCount] =
            !tempLeanToOpenStatus[leanToCount];
        } else {
          tempLeanToOpenStatus[leanToCount] = true;
        }
        setMultipleLeanToOpenStatus(tempLeanToOpenStatus);

        tempMultipleLeanTo[leanToCount] = 1;
        setMultipleLeanTo(tempMultipleLeanTo);

        tempPlacement[leanToCount] = "Front Sidewall";
        leanToCount += 1;
        setPlacement(tempPlacement);
      } else {
        addLeanToState({
          wall: leanTo3[0],
          seted: false,
        });
      }

      if (leanTo4[1] !== "Closure") {
        if (leanTo4[1] === "Inset Bay") {
          addLeanToInsetBay({
            wall: leanTo4[0],
            seted: true,
          });
        }
        addLeanToState({
          wall: leanTo4[0],
          seted: true,
        });

        if (tempLeanToOpenStatus[leanToCount]) {
          tempLeanToOpenStatus[leanToCount] =
            !tempLeanToOpenStatus[leanToCount];
        } else {
          tempLeanToOpenStatus[leanToCount] = true;
        }
        setMultipleLeanToOpenStatus(tempLeanToOpenStatus);

        tempMultipleLeanTo[leanToCount] = 1;
        setMultipleLeanTo(tempMultipleLeanTo);

        tempPlacement[leanToCount] = "Back Sidewall";
        leanToCount += 1;
        setPlacement(tempPlacement);
      } else {
        addLeanToState({
          wall: leanTo4[0],
          seted: false,
        });
      }

      //Lean-to drop height
      const leanToDropHeight1 = searchParams.getAll("ltdr1");
      const leanToDropHeight2 = searchParams.getAll("ltdr2");
      const leanToDropHeight3 = searchParams.getAll("ltdr3");
      const leanToDropHeight4 = searchParams.getAll("ltdr4");

      setLeanToDropHeigth({ val: Number(leanToDropHeight1[1]), valueKey: 0 });
      setLeanToDropHeigth({ val: Number(leanToDropHeight2[1]), valueKey: 1 });
      setLeanToDropHeigth({ val: Number(leanToDropHeight3[1]), valueKey: 2 });
      setLeanToDropHeigth({ val: Number(leanToDropHeight4[1]), valueKey: 3 });

      //Lean-to deltaheight
      const leanToDeltaHeight1 = searchParams.getAll("ltdh1");
      const leanToDeltaHeight2 = searchParams.getAll("ltdh2");
      const leanToDeltaHeight3 = searchParams.getAll("ltdh3");
      const leanToDeltaHeight4 = searchParams.getAll("ltdh4");
      const leanToPitchOptionSize1 = searchParams.getAll("ltp1");
      const leanToPitchOptionSize2 = searchParams.getAll("ltp2");
      const leanToPitchOptionSize3 = searchParams.getAll("ltp3");
      const leanToPitchOptionSize4 = searchParams.getAll("ltp4");

      setLeanToPitch({
        id: Number(leanToDeltaHeight1[1]),
        val: leanToPitchOptionSize1[1],
        wall: leanToDeltaHeight1[0],
      });
      setLeanToPitch({
        id: Number(leanToDeltaHeight2[1]),
        val: leanToPitchOptionSize2[1],
        wall: leanToDeltaHeight2[0],
      });
      setLeanToPitch({
        id: Number(leanToDeltaHeight3[1]),
        val: leanToPitchOptionSize3[1],
        wall: leanToDeltaHeight3[0],
      });
      setLeanToPitch({
        id: Number(leanToDeltaHeight4[1]),
        val: leanToPitchOptionSize4[1],
        wall: leanToDeltaHeight4[0],
      });

      //Eavan overhang and Gable overhang
      const eaveOverHangValue = Number(searchParams.get("eoh"));
      const gableOverHangValue = Number(searchParams.get("goh"));
      setEaveOverhang(eaveOverHangValue);
      setGableOverhang(gableOverHangValue);

      //Colors
      const roofColorInfo = searchParams.getAll("rc");
      const sideWallColorInfo = searchParams.getAll("sc");
      const wallTrimColorInfo = searchParams.getAll("wtc");
      const baseTrimColorInfo = searchParams.getAll("btc");
      const roofTrimColorInfo = searchParams.getAll("rtc");
      const wainscotColorInfo = searchParams.getAll("wsc");
      const downspoutColorInfo = searchParams.getAll("dsc");
      setRoofColor("#" + roofColorInfo[0], roofColorInfo[1]);
      setSideWallColor("#" + sideWallColorInfo[0], sideWallColorInfo[1]);
      setWallTrimColor("#" + wallTrimColorInfo[0], wallTrimColorInfo[1]);
      setBaseTrimColor("#" + baseTrimColorInfo[0], baseTrimColorInfo[1]);
      setRoofTrimColor("#" + roofTrimColorInfo[0], roofTrimColorInfo[1]);
      setWainscotColor("#" + wainscotColorInfo[0], wainscotColorInfo[1]);
      setDownspoutColor("#" + downspoutColorInfo[0], downspoutColorInfo[1]);

      //Doors
      const door: Array<DoorInfo> = [];
      const sliceDoor: Array<SliceDoorInfo> = [];

      const doorNumber = Number(searchParams.get("dn"));

      let walkdoorCount = 0;
      let rollupdoorCount = 0;
      let windowCount = 0;
      const tempMultipleWalkDoor = {} as {
        [key: number]: number | string;
      };
      const tempWalkDoorOpenStatus = {} as {
        [key: number]: boolean;
      };
      const tempMultipleRollupDoor = {} as {
        [key: number]: number | string;
      };
      const tempRollupDoorOpenStatus = {} as {
        [key: number]: boolean;
      };
      const tempMultipleWindow = {} as {
        [key: number]: number | string;
      };
      const tempWindowOpenStatus = {} as {
        [key: number]: boolean;
      };

      const tempRollupDoorDoorName = {} as {
        [key: string]: string;
      };
      const tempWalkDoorDoorName = {} as {
        [key: string]: string;
      };
      const tempWindowDoorName = {} as {
        [key: string]: string;
      };

      const tempRollupDoorDoorBuilding = {} as {
        [key: string]: string;
      };
      const tempWalkDoorDoorBuilding = {} as {
        [key: string]: string;
      };
      const tempWindowDoorBuilding = {} as {
        [key: string]: string;
      };
      for (let i = 0; i < doorNumber; i++) {
        const doorInfo = searchParams.getAll("di" + i);

        switch (doorInfo[2]) {
          case "Roll-up door":
            if (tempRollupDoorOpenStatus[rollupdoorCount]) {
              tempRollupDoorOpenStatus[rollupdoorCount] =
                !tempRollupDoorOpenStatus[rollupdoorCount];
            } else {
              tempRollupDoorOpenStatus[rollupdoorCount] = true;
            }
            setMultipleRollUpOpenStatus(tempRollupDoorOpenStatus);

            tempMultipleRollupDoor[rollupdoorCount] = rollupdoorCount + 1;
            setMultipleRollUpDoor(tempMultipleRollupDoor);

            addComboData({
              key: Number(doorInfo[0]),
              type: "Roll-up door",
              size: doorInfo[1],
              placement: doorInfo[16],
              building: doorInfo[3],
            });

            tempRollupDoorDoorName[rollupdoorCount + 1] = doorInfo[1];
            setRollupDoorName(tempRollupDoorDoorName);

            tempRollupDoorDoorBuilding[rollupdoorCount] = doorInfo[3];
            setBuildingRollUpDoor(tempRollupDoorDoorBuilding);

            rollupdoorCount++;
            break;
          case "Walk-door":
            if (tempWalkDoorOpenStatus[walkdoorCount]) {
              tempWalkDoorOpenStatus[walkdoorCount] =
                !tempWalkDoorOpenStatus[walkdoorCount];
            } else {
              tempWalkDoorOpenStatus[walkdoorCount] = true;
            }
            setMultipleWalkDoorOpenStatus(tempWalkDoorOpenStatus);

            tempMultipleWalkDoor[walkdoorCount] = walkdoorCount + 1;
            setMultipleWalkDoor(tempMultipleWalkDoor);

            addComboData({
              key: Number(doorInfo[0]),
              type: "Walk-door",
              size: doorInfo[1],
              placement: doorInfo[16],
              building: doorInfo[3],
            });

            tempWalkDoorDoorName[walkdoorCount + 1] = doorInfo[1];
            setWalkDoorName(tempWalkDoorDoorName);

            tempWalkDoorDoorBuilding[walkdoorCount] = doorInfo[3];
            setBuildingWalkDoor(tempWalkDoorDoorBuilding);

            walkdoorCount++;
            break;
          case "Window":
            if (tempWindowOpenStatus[windowCount]) {
              tempWindowOpenStatus[windowCount] =
                !tempWindowOpenStatus[windowCount];
            } else {
              tempWindowOpenStatus[windowCount] = true;
            }
            setMultipleAddWindowOpenStatus(tempWindowOpenStatus);

            tempMultipleWindow[windowCount] = windowCount + 1;
            setMultipleAddWindow(tempMultipleWindow);

            addComboData({
              key: Number(doorInfo[0]),
              type: "Window",
              size: doorInfo[1],
              placement: doorInfo[16],
              building: doorInfo[3],
            });

            tempWindowDoorName[windowCount + 1] = doorInfo[1];
            setWindowName(tempWindowDoorName);

            tempWindowDoorBuilding[walkdoorCount] = doorInfo[3];
            setBuildingWindow(tempWindowDoorBuilding);

            windowCount++;
            break;

          default:
            break;
        }

        door.push({
          key: Number(doorInfo[0]),
          name: doorInfo[1],
          type: doorInfo[2],
          building: doorInfo[3],
          wall: doorInfo[4],
          nameForRange: doorInfo[5],
          itemforRange: Number(doorInfo[6]),
          size: [Number(doorInfo[7]), Number(doorInfo[8]), Number(doorInfo[9])],
          pos: [
            Number(doorInfo[10]),
            Number(doorInfo[11]),
            Number(doorInfo[12]),
          ],
          rot: [
            Number(doorInfo[13]),
            Number(doorInfo[14]),
            Number(doorInfo[15]),
          ],
        });
        sliceDoor.push({
          key: Number(doorInfo[0]),
          name: doorInfo[1],
          type: doorInfo[2],
          building: doorInfo[3],
          wall: doorInfo[4],
          nameForRange: doorInfo[5],
          itemforRange: Number(doorInfo[6]),
          visible: true,
          size: [Number(doorInfo[7]), Number(doorInfo[8]), Number(doorInfo[9])],
          pos: [
            Number(doorInfo[10]),
            Number(doorInfo[11]),
            Number(doorInfo[12]),
          ],
          rot: [
            Number(doorInfo[13]),
            Number(doorInfo[14]),
            Number(doorInfo[15]),
          ],
        });
      }
      addDoorData(door);
      addSliceDoorData(sliceDoor);
    }
  }, []);

  return null;
};
