/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
import extrudeSetting from "assets/extrudeSetting.json";
import { useMemo, useRef } from "react";
import { FrontSide, Shape } from "three";
import { useStoreColor, useStoreSize } from "store";
import { PickBox } from "../PickBox";
import { FlatRidgeCap } from "3dcomponents/Models/FlatRidgeCap";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

interface IGableRoof {
  flag: boolean;
}

export const GableRoof = ({ flag }: IGableRoof) => {
  const {
    width,
    length,
    deltaHeight,
    overhangEave,
    bayLength,
    eaveHeight,
    overhangPurlin,
  } = useStoreSize();
  const materialRef = useRef<any>();
  const { roofColor, roofTrimColor } = useStoreColor();

  //Calculate gableRoof width
  const roofWidth = useMemo(() => {
    const rWidth = Math.sqrt(
      ((deltaHeight * overhangEave) / (width / 2) + deltaHeight) *
        ((deltaHeight * overhangEave) / (width / 2) + deltaHeight) +
        (width / 2 + overhangEave) * (width / 2 + overhangEave),
    );
    return rWidth;
  }, [width, overhangEave, deltaHeight]);

  //GableRoof model shape
  const model = useMemo(() => {
    const modelShape = new Shape();
    modelShape.moveTo(0, 0);
    for (let i = 0; i < length + overhangPurlin; i++) {
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
    modelShape.lineTo(length, 0);
    modelShape.closePath();

    return modelShape;
  }, [eaveHeight, length, roofWidth, overhangPurlin]);

  //Gable inside roof model shape
  const roofInsideModel = useMemo(() => {
    const modelShape = new Shape();
    modelShape.moveTo(0, -0.1);
    modelShape.lineTo(length + overhangPurlin, -0.1);
    modelShape.lineTo(length + overhangPurlin, 0.1);
    modelShape.lineTo(0, 0.1);

    modelShape.closePath();

    return modelShape;
  }, [length, overhangPurlin]);

  //Change the gable roof color
  useFrame((_state, delta) =>
    easing.dampC(materialRef.current.color, roofColor, 0.2, delta),
  );

  return (
    <group
      castShadow
      receiveShadow
      position={[0, 0, bayLength / 2]}
    >
      <group rotation={[0, Math.PI / 2, 0]}>
        <mesh
          castShadow
          receiveShadow
          name={flag ? "RoofRight" : "RoofLeft"}
          position={
            flag
              ? [-(length + overhangPurlin) / 2, eaveHeight + deltaHeight, 0.02]
              : [(length + overhangPurlin) / 2, eaveHeight + deltaHeight, 0]
          }
          rotation={
            flag
              ? [Math.atan(deltaHeight / (width / 2)), 0, 0]
              : [-Math.atan(deltaHeight / (width / 2)), Math.PI, 0]
          }
          onPointerDown={(e) => e.stopPropagation()}
        >
          {/* outside roof */}
          <mesh>
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
          <mesh position={flag ? [0, -0.4, -0.1] : [0, -0.4, 0]}>
            <extrudeGeometry
              args={[
                roofInsideModel,
                { ...extrudeSetting, depth: roofWidth - 0.1 },
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
      {/* roof cap */}
      <FlatRidgeCap
        pos={[
          0,
          eaveHeight +
            deltaHeight +
            Math.sqrt(
              ((0.22 * deltaHeight) / (width / 2 + overhangEave)) *
                ((0.22 * deltaHeight) / (width / 2 + overhangEave)) +
                0.22 * 0.22,
            ) +
            0.04,
          -(length + overhangPurlin) / 2 - Math.sin(Math.PI / 6) / 3,
        ]}
        rot={[0, 0, 0]}
        roofCapLength={length + overhangPurlin + 0.2}
        color={roofColor}
      />
      {/* front pickbox */}
      <PickBox
        pos={[
          0,
          eaveHeight +
            deltaHeight +
            Math.sqrt(
              ((0.22 * deltaHeight) / (width / 2 + overhangEave)) *
                ((0.22 * deltaHeight) / (width / 2 + overhangEave)) +
                0.22 * 0.22,
            ) +
            0.019,
          (length + overhangPurlin) / 2 + Math.sin(Math.PI / 6) / 3 - 0.06,
        ]}
        rot={[0, 0, 0]}
        roofCapLength={length}
        color={roofTrimColor}
        direction={false}
      />
      {/* back pickbox */}
      <PickBox
        pos={[
          0,
          eaveHeight +
            deltaHeight +
            Math.sqrt(
              ((0.22 * deltaHeight) / (width / 2 + overhangEave)) *
                ((0.22 * deltaHeight) / (width / 2 + overhangEave)) +
                0.22 * 0.22,
            ) +
            0.019,
          -(length + overhangPurlin) / 2 - Math.sin(Math.PI / 6) / 3 + 0.06,
        ]}
        rot={[0, 0, 0]}
        roofCapLength={length}
        color={roofTrimColor}
        direction={true}
      />
    </group>
  );
};
