/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
import extrudeSetting from "assets/extrudeSetting.json";
import { useMemo, useRef } from "react";
import { FrontSide, Shape } from "three";
import { useStoreColor, useStoreSize } from "store";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

interface ISingleSlopeRoof {
  flag: boolean;
  position: [number, number, number];
  lWidth: number;
  lLength: number;
  lEaveHeight: number;
  lDeltaHeight: number;
}

export const SingleSlopeRoof = ({
  flag,
  position,
  lWidth,
  lLength,
  lEaveHeight,
  lDeltaHeight,
}: ISingleSlopeRoof) => {
  const materialRef = useRef<any>();
  const { roofColor } = useStoreColor();
  const { overhangEave, overhangPurlin, bayLength } = useStoreSize();

  //Calculate roof width
  const roofWidth = useMemo(() => {
    const rWidth = Math.sqrt(
      ((lDeltaHeight * overhangEave * 2) / lWidth + lDeltaHeight) *
        ((lDeltaHeight * overhangEave * 2) / lWidth + lDeltaHeight) +
        (lWidth + overhangEave * 2) * (lWidth + overhangEave * 2),
    );

    return rWidth;
  }, [lWidth, overhangEave, lDeltaHeight]);

  //Single slope outside roof model shape
  const model = useMemo(() => {
    const modelShape = new Shape();

    modelShape.moveTo(0, 0);
    for (let i = 0; i < lLength + overhangPurlin; i++) {
      modelShape.lineTo(0 + i, 0.07);
      modelShape.lineTo(0.096 + i, 0.146);
      modelShape.lineTo(0.18 + i, 0.146);
      modelShape.lineTo(0.276 + i, 0.07);
      modelShape.lineTo(0.443 + i, 0.07);
      modelShape.lineTo(0.468 + i, 0.115);
      modelShape.lineTo(0.531 + i, 0.115);
      modelShape.lineTo(0.557 + i, 0.07);
      modelShape.lineTo(0.776 + i, 0.07);
      modelShape.lineTo(0.802 + i, 0.115);
      modelShape.lineTo(0.864 + i, 0.115);
      modelShape.lineTo(0.89 + i, 0.07);
      modelShape.lineTo(1 + i, 0.07);
    }
    modelShape.lineTo(lLength + overhangPurlin, 0);
    modelShape.closePath();

    return modelShape;
  }, [lEaveHeight, lLength, roofWidth, overhangPurlin]);

  //Single slope inside roof model shape
  const roofInsideModel = useMemo(() => {
    const modelShape = new Shape();

    modelShape.moveTo(0, -0.1);
    modelShape.lineTo(lLength + overhangPurlin, -0.1);
    modelShape.lineTo(lLength + overhangPurlin, 0.1);
    modelShape.lineTo(0, 0.1);
    modelShape.closePath();
    return modelShape;
  }, [lLength, overhangPurlin]);

  //Change the single slope roof color
  useFrame((_state, delta) =>
    easing.dampC(materialRef.current.color, roofColor, 0.2, delta),
  );

  return (
    <group
      castShadow
      receiveShadow
      position={[position[0], position[1], position[2] + bayLength / 2]}
    >
      <group rotation={[0, Math.PI / 2, 0]}>
        <mesh
          castShadow
          receiveShadow
          name={flag ? "RoofRight" : "RoofLeft"}
          position={
            flag
              ? [-(lLength + overhangPurlin) / 2, lEaveHeight + lDeltaHeight, 0]
              : [(lLength + overhangPurlin) / 2, lEaveHeight + lDeltaHeight, 0]
          }
          rotation={
            flag
              ? [Math.atan(lDeltaHeight / lWidth), 0, 0]
              : [-Math.atan(lDeltaHeight / lWidth), Math.PI, 0]
          }
          onPointerDown={(e) => e.stopPropagation()}
        >
          {/* outside roof */}
          <mesh
            name="outside"
            position={[0, 0, -overhangEave + 0.022]}
          >
            <extrudeGeometry
              args={[model, { ...extrudeSetting, depth: roofWidth }]}
            />
            <meshPhysicalMaterial
              side={FrontSide}
              metalness={0.7}
              roughness={0.5}
              ref={materialRef}
            />
          </mesh>
          {/* inside roof */}
          <mesh
            name="inside"
            position={[0, -0.4, -overhangEave + 0.2]}
          >
            <extrudeGeometry
              args={[
                roofInsideModel,
                { ...extrudeSetting, depth: roofWidth - 0.4 },
              ]}
            />
            <meshPhysicalMaterial
              side={FrontSide}
              metalness={0.7}
              roughness={0.5}
              color={"white"}
            />
          </mesh>
        </mesh>
      </group>
    </group>
  );
};
