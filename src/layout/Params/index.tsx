/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useStoreSize,
  useStyle,
  useUpgrade,
  usePlacement,
  useStoreColor,
} from "store";
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
    setEaveOverhang,
    setGableOverhang,
  } = useStoreSize();
  const { label, setStyle } = useStyle();
  const { setdownspout } = useUpgrade();
  const {
    setRoofColor,
    setSideWallColor,
    setWallTrimColor,
    setBaseTrimColor,
    setRoofTrimColor,
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

      //wainscot and downspout
      const downspoutState =
        String(searchParams.get("ds")) === "false" ? false : true;
      setdownspout(downspoutState);

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
      const downspoutColorInfo = searchParams.getAll("dsc");
      setRoofColor("#" + roofColorInfo[0], roofColorInfo[1]);
      setSideWallColor("#" + sideWallColorInfo[0], sideWallColorInfo[1]);
      setWallTrimColor("#" + wallTrimColorInfo[0], wallTrimColorInfo[1]);
      setBaseTrimColor("#" + baseTrimColorInfo[0], baseTrimColorInfo[1]);
      setRoofTrimColor("#" + roofTrimColorInfo[0], roofTrimColorInfo[1]);
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
