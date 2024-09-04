/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { Text } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useSliderUpdate } from "store";
import { useSliderStatus } from "store/useDoor";
import { useStoreSize } from "store";
import { displayInches } from "../DraggableItem/displayInches";
import { usePlacement } from "store";

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
    dimensionPosRef.current.visible = false;
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
