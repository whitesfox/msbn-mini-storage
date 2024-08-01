/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { Text } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useSliderUpdate } from "store";
import { useSliderStatus } from "store/useDoor";
import { useStoreSize } from "store";
import { useLeanTo } from "store/useLeanTo";
import { BuildingInfo } from "store/useLeanTo";
import { displayInches } from "../DraggableItem/displayInches";
import { useAddLeanToMultiple } from "store";
import { usePlacement } from "store";
import { useDoorStore } from "store/useDoor";

interface IDimension {
  pos: [number, number, number];
  rot: [number, number, number];
  index: number;
  type: string;
  building: string;
  name: string;
  doorSize: [number, number, number];
  side: string;
  nameForRange: string;
  itemforRange: number;
}
export const Dimension = ({
  pos,
  rot,
  index,
  type,
  building,
  name,
  doorSize,
  side,
  nameForRange,
  itemforRange,
}: IDimension) => {
  const { width, length } = useStoreSize();
  const { leanToData } = useLeanTo();
  const { placement } = usePlacement();

  const dimensionPosRef = useRef<any>();
  const rightDimensionRef = useRef<any>();
  const rightDimensionLength = useRef<any>();
  const rightDimensionSize = useRef<any>();

  const leftDimensionRef = useRef<any>();
  const leftDimensionLength = useRef<any>();
  const leftDimensionSize = useRef<any>();

  const { sliderStatus } = useSliderStatus();
  const { positionRange } = useSliderUpdate();

  const dimensionUpdate = (axis: string, value: number) => {
    if (sliderStatus[nameForRange][itemforRange - 1]) {
      let currentLeantoData: BuildingInfo = {
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
      let leftDimensionSizeValue = 0;
      let rightDimensionSizeValue = 0;
      if (building.startsWith("Lean-to")) {
        dimensionPosRef.current.visible = true;

        switch (placement[Number(building[building.length - 1]) - 1]) {
          case "Left Endwall":
            currentLeantoData = leanToData[0];
            switch (side) {
              case "EndWallGabelFront":
                dimensionPosRef.current.position.set(value, pos[1], pos[2] + 1);

                leftDimensionSizeValue =
                  currentLeantoData.lLength / 2 +
                  value -
                  Math.round(doorSize[0]) / 2 -
                  currentLeantoData.lPos[0];

                rightDimensionSizeValue =
                  currentLeantoData.lLength -
                  leftDimensionSizeValue -
                  Math.round(doorSize[0]);

                leftDimensionRef.current.position.set(
                  -leftDimensionSizeValue / 2 - Math.round(doorSize[0]) / 2,
                  0,
                  0,
                );
                leftDimensionLength.current.scale.set(
                  1,
                  leftDimensionSizeValue,
                  1,
                );
                leftDimensionSize.current.text = displayInches(
                  Math.abs(leftDimensionSizeValue),
                );

                rightDimensionRef.current.position.set(
                  doorSize[0] / 2 + rightDimensionSizeValue / 2,
                  0,
                  0,
                );
                rightDimensionLength.current.scale.set(
                  1,
                  rightDimensionSizeValue,
                  1,
                );
                rightDimensionSize.current.text = displayInches(
                  rightDimensionSizeValue,
                );
                break;

              case "SideWallRight":
                dimensionPosRef.current.position.set(
                  pos[0] + 1,
                  pos[1],
                  -value,
                );

                rightDimensionSizeValue =
                  -value - length / 2 - Math.round(doorSize[0]) / 2;

                leftDimensionSizeValue =
                  currentLeantoData.lWidth -
                  rightDimensionSizeValue -
                  Math.round(doorSize[0]);

                leftDimensionRef.current.position.set(
                  -Math.abs(leftDimensionSizeValue) / 2 -
                    Math.round(doorSize[0]) / 2,
                  0,
                  0,
                );
                leftDimensionLength.current.scale.set(
                  1,
                  leftDimensionSizeValue,
                  1,
                );
                leftDimensionSize.current.text = displayInches(
                  leftDimensionSizeValue,
                );

                rightDimensionRef.current.position.set(
                  doorSize[0] / 2 + Math.abs(rightDimensionSizeValue) / 2,
                  0,
                  0,
                );
                rightDimensionLength.current.scale.set(
                  1,
                  Math.abs(rightDimensionSizeValue),
                  1,
                );
                rightDimensionSize.current.text = displayInches(
                  rightDimensionSizeValue,
                );
                break;

              case "SideWallLeft":
                dimensionPosRef.current.position.set(pos[0] - 1, pos[1], value);

                leftDimensionSizeValue = value - length / 2 - doorSize[0] / 2;
                rightDimensionSizeValue =
                  currentLeantoData.lWidth -
                  leftDimensionSizeValue -
                  doorSize[0];

                leftDimensionRef.current.position.set(
                  -Math.abs(leftDimensionSizeValue) / 2 - doorSize[0] / 2,
                  0,
                  0,
                );
                leftDimensionLength.current.scale.set(
                  1,
                  leftDimensionSizeValue,
                  1,
                );
                leftDimensionSize.current.text = displayInches(
                  Math.abs(leftDimensionSizeValue),
                );

                rightDimensionRef.current.position.set(
                  doorSize[0] / 2 + Math.abs(rightDimensionSizeValue) / 2,
                  0,
                  0,
                );
                rightDimensionLength.current.scale.set(
                  1,
                  Math.abs(rightDimensionSizeValue),
                  1,
                );
                rightDimensionSize.current.text = displayInches(
                  Math.abs(rightDimensionSizeValue),
                );
                break;

              default:
                break;
            }
            break;
          case "Right Endwall":
            currentLeantoData = leanToData[1];
            switch (side) {
              case "EndWallGabelBack":
                dimensionPosRef.current.position.set(
                  -value,
                  pos[1],
                  pos[2] - 1,
                );

                leftDimensionSizeValue =
                  currentLeantoData.lLength / 2 +
                  value -
                  Math.round(doorSize[0]) / 2 +
                  currentLeantoData.lPos[0];

                rightDimensionSizeValue =
                  currentLeantoData.lLength -
                  leftDimensionSizeValue -
                  Math.round(doorSize[0]);

                leftDimensionRef.current.position.set(
                  -leftDimensionSizeValue / 2 - Math.round(doorSize[0]) / 2,
                  0,
                  0,
                );
                leftDimensionLength.current.scale.set(
                  1,
                  leftDimensionSizeValue,
                  1,
                );
                leftDimensionSize.current.text = displayInches(
                  Math.abs(leftDimensionSizeValue),
                );

                rightDimensionRef.current.position.set(
                  doorSize[0] / 2 + rightDimensionSizeValue / 2,
                  0,
                  0,
                );
                rightDimensionLength.current.scale.set(
                  1,
                  rightDimensionSizeValue,
                  1,
                );
                rightDimensionSize.current.text = displayInches(
                  rightDimensionSizeValue,
                );
                break;

              case "SideWallLeft":
                dimensionPosRef.current.position.set(pos[0] - 1, pos[1], value);

                rightDimensionSizeValue =
                  -value - length / 2 - Math.round(doorSize[0]) / 2;

                leftDimensionSizeValue =
                  currentLeantoData.lWidth -
                  rightDimensionSizeValue -
                  Math.round(doorSize[0]);

                leftDimensionRef.current.position.set(
                  -Math.abs(leftDimensionSizeValue) / 2 -
                    Math.round(doorSize[0]) / 2,
                  0,
                  0,
                );
                leftDimensionLength.current.scale.set(
                  1,
                  leftDimensionSizeValue,
                  1,
                );
                leftDimensionSize.current.text = displayInches(
                  leftDimensionSizeValue,
                );

                rightDimensionRef.current.position.set(
                  doorSize[0] / 2 + Math.abs(rightDimensionSizeValue) / 2,
                  0,
                  0,
                );
                rightDimensionLength.current.scale.set(
                  1,
                  Math.abs(rightDimensionSizeValue),
                  1,
                );
                rightDimensionSize.current.text = displayInches(
                  rightDimensionSizeValue,
                );
                break;

              case "SideWallRight":
                dimensionPosRef.current.position.set(
                  pos[0] + 1,
                  pos[1],
                  -value,
                );

                leftDimensionSizeValue =
                  value - length / 2 - Math.round(doorSize[0]) / 2;
                rightDimensionSizeValue =
                  currentLeantoData.lWidth -
                  leftDimensionSizeValue -
                  Math.round(doorSize[0]);

                leftDimensionRef.current.position.set(
                  -Math.abs(leftDimensionSizeValue) / 2 -
                    Math.round(doorSize[0]) / 2,
                  0,
                  0,
                );
                leftDimensionLength.current.scale.set(
                  1,
                  leftDimensionSizeValue,
                  1,
                );
                leftDimensionSize.current.text = displayInches(
                  Math.abs(leftDimensionSizeValue),
                );

                rightDimensionRef.current.position.set(
                  doorSize[0] / 2 + Math.abs(rightDimensionSizeValue) / 2,
                  0,
                  0,
                );
                rightDimensionLength.current.scale.set(
                  1,
                  Math.abs(rightDimensionSizeValue),
                  1,
                );
                rightDimensionSize.current.text = displayInches(
                  Math.abs(rightDimensionSizeValue),
                );
                break;

              default:
                break;
            }
            break;
          case "Front Sidewall":
            currentLeantoData = leanToData[2];
            switch (side) {
              case "EndWallGabelBack":
                dimensionPosRef.current.position.set(
                  -value,
                  pos[1],
                  pos[2] - 1,
                );

                rightDimensionSizeValue =
                  Math.abs(value) - width / 2 - doorSize[0] / 2;
                leftDimensionSizeValue =
                  currentLeantoData.lWidth -
                  rightDimensionSizeValue -
                  doorSize[0];

                leftDimensionRef.current.position.set(
                  -leftDimensionSizeValue / 2 - doorSize[0] / 2,
                  0,
                  0,
                );
                leftDimensionLength.current.scale.set(
                  1,
                  leftDimensionSizeValue,
                  1,
                );
                leftDimensionSize.current.text = displayInches(
                  Math.abs(leftDimensionSizeValue),
                );

                rightDimensionRef.current.position.set(
                  doorSize[0] / 2 + rightDimensionSizeValue / 2,
                  0,
                  0,
                );
                rightDimensionLength.current.scale.set(
                  1,
                  rightDimensionSizeValue,
                  1,
                );
                rightDimensionSize.current.text = displayInches(
                  currentLeantoData.lWidth -
                    leftDimensionSizeValue -
                    Math.round(doorSize[0]),
                );
                break;

              case "EndWallGabelFront":
                dimensionPosRef.current.position.set(value, pos[1], pos[2] + 1);

                leftDimensionSizeValue = Math.abs(
                  value - width / 2 - doorSize[0] / 2,
                );
                rightDimensionSizeValue =
                  currentLeantoData.lWidth -
                  leftDimensionSizeValue -
                  doorSize[0];

                leftDimensionRef.current.position.set(
                  -Math.abs(leftDimensionSizeValue) / 2 - doorSize[0] / 2,
                  0,
                  0,
                );
                leftDimensionLength.current.scale.set(
                  1,
                  leftDimensionSizeValue,
                  1,
                );
                leftDimensionSize.current.text = displayInches(
                  Math.abs(leftDimensionSizeValue),
                );

                rightDimensionRef.current.position.set(
                  doorSize[0] / 2 + Math.abs(rightDimensionSizeValue) / 2,
                  0,
                  0,
                );
                rightDimensionLength.current.scale.set(
                  1,
                  Math.abs(rightDimensionSizeValue),
                  1,
                );
                rightDimensionSize.current.text = displayInches(
                  currentLeantoData.lWidth -
                    Math.abs(leftDimensionSizeValue) -
                    Math.round(doorSize[0]),
                );
                break;

              case "SideWallRight":
                dimensionPosRef.current.position.set(
                  pos[0] + 1,
                  pos[1],
                  -value,
                );

                rightDimensionSizeValue =
                  currentLeantoData.lPos[2] -
                  currentLeantoData.lLength / 2 +
                  doorSize[0] / 2 +
                  value;
                leftDimensionSizeValue = Math.abs(
                  currentLeantoData.lLength +
                    0.2 -
                    doorSize[0] -
                    Math.abs(rightDimensionSizeValue),
                );

                leftDimensionRef.current.position.set(
                  -Math.abs(leftDimensionSizeValue) / 2 - doorSize[0] / 2,
                  0,
                  0,
                );
                leftDimensionLength.current.scale.set(
                  1,
                  leftDimensionSizeValue,
                  1,
                );
                leftDimensionSize.current.text = displayInches(
                  Math.abs(leftDimensionSizeValue),
                );

                rightDimensionRef.current.position.set(
                  doorSize[0] / 2 + Math.abs(rightDimensionSizeValue) / 2,
                  0,
                  0,
                );
                rightDimensionLength.current.scale.set(
                  1,
                  Math.abs(rightDimensionSizeValue),
                  1,
                );
                rightDimensionSize.current.text = displayInches(
                  Math.abs(rightDimensionSizeValue),
                );
                break;

              default:
                break;
            }
            break;
          case "Back Sidewall":
            currentLeantoData = leanToData[3];
            switch (side) {
              case "EndWallGabelBack":
                dimensionPosRef.current.position.set(-value, pos[1], pos[2]);

                leftDimensionSizeValue = value - width / 2 - doorSize[0] / 2;
                rightDimensionSizeValue =
                  currentLeantoData.lWidth -
                  leftDimensionSizeValue -
                  doorSize[0];

                leftDimensionRef.current.position.set(
                  -leftDimensionSizeValue / 2 - doorSize[0] / 2,
                  0,
                  0,
                );
                leftDimensionLength.current.scale.set(
                  1,
                  leftDimensionSizeValue,
                  1,
                );
                leftDimensionSize.current.text = displayInches(
                  Math.abs(leftDimensionSizeValue),
                );

                rightDimensionRef.current.position.set(
                  doorSize[0] / 2 + rightDimensionSizeValue / 2,
                  0,
                  0,
                );
                rightDimensionLength.current.scale.set(
                  1,
                  rightDimensionSizeValue,
                  1,
                );
                rightDimensionSize.current.text = displayInches(
                  currentLeantoData.lWidth -
                    leftDimensionSizeValue -
                    Math.round(doorSize[0]),
                );
                break;

              case "EndWallGabelFront":
                dimensionPosRef.current.position.set(value, pos[1], pos[2] + 1);

                rightDimensionSizeValue = Math.abs(
                  value + width / 2 + doorSize[0] / 2,
                );
                leftDimensionSizeValue =
                  currentLeantoData.lWidth -
                  rightDimensionSizeValue -
                  doorSize[0];

                leftDimensionRef.current.position.set(
                  -Math.abs(leftDimensionSizeValue) / 2 - doorSize[0] / 2,
                  0,
                  0,
                );
                leftDimensionLength.current.scale.set(
                  1,
                  leftDimensionSizeValue,
                  1,
                );
                leftDimensionSize.current.text = displayInches(
                  Math.abs(leftDimensionSizeValue),
                );

                rightDimensionRef.current.position.set(
                  doorSize[0] / 2 + Math.abs(rightDimensionSizeValue) / 2,
                  0,
                  0,
                );
                rightDimensionLength.current.scale.set(
                  1,
                  Math.abs(rightDimensionSizeValue),
                  1,
                );
                rightDimensionSize.current.text = displayInches(
                  currentLeantoData.lWidth -
                    Math.abs(leftDimensionSizeValue) -
                    Math.round(doorSize[0]),
                );
                break;

              case "SideWallLeft":
                dimensionPosRef.current.position.set(pos[0] - 1, pos[1], value);

                leftDimensionSizeValue =
                  currentLeantoData.lPos[2] -
                  currentLeantoData.lLength / 2 +
                  doorSize[0] / 2 -
                  value;
                leftDimensionRef.current.position.set(
                  -Math.abs(leftDimensionSizeValue) / 2 - doorSize[0] / 2,
                  0,
                  0,
                );
                leftDimensionLength.current.scale.set(
                  1,
                  leftDimensionSizeValue,
                  1,
                );
                leftDimensionSize.current.text = displayInches(
                  Math.abs(leftDimensionSizeValue),
                );

                rightDimensionSizeValue = Math.abs(
                  currentLeantoData.lLength +
                    0.2 -
                    doorSize[0] -
                    Math.abs(leftDimensionSizeValue),
                );
                rightDimensionRef.current.position.set(
                  doorSize[0] / 2 + Math.abs(rightDimensionSizeValue) / 2,
                  0,
                  0,
                );
                rightDimensionLength.current.scale.set(
                  1,
                  Math.abs(rightDimensionSizeValue),
                  1,
                );
                rightDimensionSize.current.text = displayInches(
                  Math.abs(rightDimensionSizeValue),
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
    } else {
      dimensionPosRef.current.visible = false;
    }
  };

  useEffect(() => {
    if (side === "EndWallGabelFront" || side === "EndWallGabelBack") {
      dimensionUpdate("X", positionRange[nameForRange][itemforRange - 1]);
    } else {
      dimensionUpdate("Z", positionRange[nameForRange][itemforRange - 1]);
    }
  }, [positionRange, sliderStatus]);

  return (
    <mesh
      position={pos}
      rotation={rot}
      ref={dimensionPosRef}
      visible={false}
    >
      <group ref={leftDimensionRef}>
        <mesh
          ref={leftDimensionLength}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          scale={[1, 12, 1]}
        >
          <cylinderGeometry args={[0.04, 0.04, 1, 2]} />
          <meshBasicMaterial color="black" />
        </mesh>
        <Text
          ref={leftDimensionSize}
          fontSize={1}
          color="black"
          anchorX="center"
          anchorY="middle"
          position={[0, 0.7, 0]}
        >
          left
        </Text>
      </group>
      <group ref={rightDimensionRef}>
        <mesh
          ref={rightDimensionLength}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          scale={[1, 12, 1]}
        >
          <cylinderGeometry args={[0.04, 0.04, 1, 2]} />
          <meshBasicMaterial color="black" />
        </mesh>
        <Text
          ref={rightDimensionSize}
          fontSize={1}
          color="black"
          anchorX="center"
          anchorY="middle"
          position={[0, 0.7, 0]}
        >
          right
        </Text>
      </group>
    </mesh>
  );
};
