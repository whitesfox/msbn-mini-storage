/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { Shape } from "three";
import { easing } from "maath";
import { useStoreSize } from "store";
import { useStoreColor } from "store";
import { useLeanTo } from "store/useLeanTo";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

interface IOutsideCornerTrim {
  count: number;
  pos: [number, number, number];
  rot: [number, number, number];
  eaveHeight: number;
  trimLength: number;
}

const trimRadius = 0.03;
const trimThickness = 0.01;

export const OutsideCornerTrim = ({
  pos,
  rot,
  count,
  eaveHeight,
  trimLength,
}: IOutsideCornerTrim) => {
  const trimRef = useRef<any>();
  const { leanToData } = useLeanTo();
  const { wallTrimColor } = useStoreColor();
  const { width, length, basicLength, bayLength } = useStoreSize();

  const trimModel = useMemo(() => {
    const modelShape = new Shape();

    modelShape.moveTo(0, 0);
    modelShape.lineTo(0, -0.4);
    modelShape.lineTo(0.1, -0.5);
    modelShape.lineTo(0.1, -0.5075);
    modelShape.bezierCurveTo(
      0.1,
      -0.55,
      0.1 + trimThickness * 2 + trimRadius,
      -0.55,
      0.1 + trimThickness * 2 + trimRadius,
      -0.5075,
    );
    modelShape.lineTo(0.1 + trimThickness * 2 + trimRadius, -0.5025);
    modelShape.lineTo(0.1 + trimThickness + trimRadius, -0.5025);
    modelShape.lineTo(0.1 + trimThickness + trimRadius, -0.5075);
    modelShape.bezierCurveTo(
      0.1 + trimThickness + trimRadius,
      -0.55,
      0.1 + trimThickness,
      -0.55,
      0.1 + trimThickness,
      -0.5075,
    );
    modelShape.lineTo(0.1 + trimThickness, -0.5);
    modelShape.lineTo(trimThickness, -0.4);
    modelShape.lineTo(trimThickness, -trimThickness);
    modelShape.lineTo(0.4, -trimThickness);
    modelShape.lineTo(0.5, -0.1);
    modelShape.lineTo(0.5075, -0.1 - trimThickness);
    modelShape.bezierCurveTo(
      0.55,
      -0.1 - trimThickness,
      0.55,
      -0.1 - trimThickness - trimRadius,
      0.5075,
      -0.1 - trimThickness - trimRadius,
    );
    modelShape.lineTo(0.5025, -0.1 - trimThickness - trimRadius);
    modelShape.lineTo(0.5025, -0.1 - 2 * trimThickness - trimRadius);
    modelShape.lineTo(0.5075, -0.1 - 2 * trimThickness - trimRadius);
    modelShape.bezierCurveTo(
      0.55,
      -0.1 - 2 * trimThickness - trimRadius,
      0.55,
      -0.1,
      0.5075,
      -0.1,
    );
    modelShape.lineTo(0.5, -0.1);
    modelShape.lineTo(0.4, 0);
    modelShape.closePath();

    return modelShape;
  }, []);

  useFrame((_state, delta) => {
    if (trimRef.current)
      easing.dampC(trimRef.current.color, wallTrimColor, 0.2, delta);
  });

  const trimLengthData = useMemo(() => {
    interface lengthDataType {
      value: number;
      posY: number;
    }
    const lengthData: Array<lengthDataType> = [];
    if (count === 1) {
      const endWallLength: Array<lengthDataType> = [
        { value: eaveHeight, posY: 0 },
      ];
      const sideWallLength: Array<lengthDataType> = [
        { value: eaveHeight, posY: 0 },
      ];
      leanToData.map((item) => {
        if (item.wall === "EndWallFront") {
          if (item.type === "Enclosed" || item.type === "Inset Bay") {
            if (item.lLength === width) {
              endWallLength[0].value =
                eaveHeight - item.lEaveHeight - item.lDeltaHeight;
              endWallLength[0].posY = item.lEaveHeight + item.lDeltaHeight;
            }
          }
        }
        if (item.wall === "SideWallRight") {
          if (item.type === "Enclosed") {
            if (item.lLength / 2 + item.lPos[2] === length / 2 - bayLength) {
              sideWallLength[0].value =
                eaveHeight - item.lEaveHeight - item.lDeltaHeight;
              sideWallLength[0].posY = item.lEaveHeight + item.lDeltaHeight;
            }
          }
          if (item.type === "Inset Bay") {
            if (item.lLength - item.lInsetBayLength === basicLength) {
              sideWallLength[0].value =
                eaveHeight - item.lEaveHeight - item.lDeltaHeight;
              sideWallLength[0].posY = item.lEaveHeight + item.lDeltaHeight;
            }
          }
        }
      });

      if (endWallLength[0].value > sideWallLength[0].value) {
        lengthData.push({
          value: sideWallLength[0].value,
          posY: sideWallLength[0].posY,
        });
      } else {
        lengthData.push({
          value: endWallLength[0].value,
          posY: endWallLength[0].posY,
        });
      }
    }

    if (count === 2) {
      const endWallLength: Array<lengthDataType> = [
        { value: eaveHeight, posY: 0 },
      ];
      const sideWallLength: Array<lengthDataType> = [
        { value: eaveHeight, posY: 0 },
      ];
      leanToData.map((item) => {
        if (item.wall === "EndWallBack") {
          if (item.type === "Enclosed") {
            if (item.lLength === width) {
              endWallLength[0].value =
                eaveHeight - item.lEaveHeight - item.lDeltaHeight;
              endWallLength[0].posY = item.lEaveHeight + item.lDeltaHeight;
            }
          }
          if (item.type === "Inset Bay") {
            if (item.lLength - item.lInsetBayLength === width) {
              endWallLength[0].value =
                eaveHeight - item.lEaveHeight - item.lDeltaHeight;
              endWallLength[0].posY = item.lEaveHeight + item.lDeltaHeight;
            }
          }
        }
        if (item.wall === "SideWallRight") {
          if (item.type === "Enclosed" || item.type === "Inset Bay") {
            if (item.lPos[2] - item.lLength / 2 === -length / 2) {
              sideWallLength[0].value =
                eaveHeight - item.lEaveHeight - item.lDeltaHeight;
              sideWallLength[0].posY = item.lEaveHeight + item.lDeltaHeight;
            }
          }
        }
      });

      if (endWallLength[0].value > sideWallLength[0].value) {
        lengthData.push({
          value: sideWallLength[0].value,
          posY: sideWallLength[0].posY,
        });
      } else {
        lengthData.push({
          value: endWallLength[0].value,
          posY: endWallLength[0].posY,
        });
      }
    }

    if (count === 3) {
      const endWallLength: Array<lengthDataType> = [
        { value: eaveHeight, posY: 0 },
      ];
      const sideWallLength: Array<lengthDataType> = [
        { value: eaveHeight, posY: 0 },
      ];
      leanToData.map((item) => {
        if (item.wall === "EndWallBack") {
          if (item.type === "Enclosed" || item.type === "Inset Bay") {
            if (item.lLength === width) {
              endWallLength[0].value =
                eaveHeight - item.lEaveHeight - item.lDeltaHeight;
              endWallLength[0].posY = item.lEaveHeight + item.lDeltaHeight;
            }
          }
        }
        if (item.wall === "SideWallLeft") {
          if (item.type === "Enclosed" || item.type === "Inset Bay") {
            if (item.lPos[2] - item.lLength / 2 === -length / 2) {
              sideWallLength[0].value =
                eaveHeight - item.lEaveHeight - item.lDeltaHeight;
              sideWallLength[0].posY = item.lEaveHeight + item.lDeltaHeight;
            }
          }
        }
      });

      if (endWallLength[0].value > sideWallLength[0].value) {
        lengthData.push({
          value: sideWallLength[0].value,
          posY: sideWallLength[0].posY,
        });
      } else {
        lengthData.push({
          value: endWallLength[0].value,
          posY: endWallLength[0].posY,
        });
      }
    }

    if (count === 4) {
      const endWallLength: Array<lengthDataType> = [
        { value: eaveHeight, posY: 0 },
      ];
      const sideWallLength: Array<lengthDataType> = [
        { value: eaveHeight, posY: 0 },
      ];
      leanToData.map((item) => {
        if (item.wall === "EndWallFront") {
          if (item.type === "Enclosed") {
            if (item.lLength === width) {
              endWallLength[0].value =
                eaveHeight - item.lEaveHeight - item.lDeltaHeight;
              endWallLength[0].posY = item.lEaveHeight + item.lDeltaHeight;
            }
          }
          if (item.type === "Inset Bay") {
            if (item.lLength - item.lInsetBayLength === width) {
              endWallLength[0].value =
                eaveHeight - item.lEaveHeight - item.lDeltaHeight;
              endWallLength[0].posY = item.lEaveHeight + item.lDeltaHeight;
            }
          }
        }
        if (item.wall === "SideWallLeft") {
          if (item.type === "Enclosed") {
            if (item.lLength / 2 + item.lPos[2] === length / 2 - bayLength) {
              sideWallLength[0].value =
                eaveHeight - item.lEaveHeight - item.lDeltaHeight;
              sideWallLength[0].posY = item.lEaveHeight + item.lDeltaHeight;
            }
          }
          if (item.type === "Inset Bay") {
            if (item.lLength - item.lInsetBayLength === basicLength) {
              sideWallLength[0].value =
                eaveHeight - item.lEaveHeight - item.lDeltaHeight;
              sideWallLength[0].posY = item.lEaveHeight + item.lDeltaHeight;
            }
          }
        }
      });

      if (endWallLength[0].value > sideWallLength[0].value) {
        lengthData.push({
          value: sideWallLength[0].value,
          posY: sideWallLength[0].posY,
        });
      } else {
        lengthData.push({
          value: endWallLength[0].value,
          posY: endWallLength[0].posY,
        });
      }
    }

    return lengthData;
  }, [basicLength, count, eaveHeight, leanToData, length, width]);

  return (
    <group>
      {trimLengthData.map((item, index) => (
        <mesh
          key={index}
          rotation={rot}
          position={[pos[0], item.posY, pos[2]]}
          castShadow
          receiveShadow
        >
          <extrudeGeometry
            args={[
              trimModel,
              {
                depth: item.value + (trimLength - eaveHeight),
                steps: 1,
                bevelEnabled: false,
                bevelThickness: 0,
                bevelSize: 0,
                bevelOffset: 0,
                bevelSegments: 1,
              },
            ]}
          />
          <meshStandardMaterial
            metalness={0.7}
            roughness={0.5}
            ref={trimRef}
          />
        </mesh>
      ))}
    </group>
  );
};
