/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
import { easing } from "maath";
import { DoubleSide, Shape } from "three";
import { useLeanTo } from "store/useLeanTo";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import extrudeSetting from "assets/extrudeSetting.json";
import { useStoreColor, useStoreSize, useUpgrade } from "store";

interface IDownspout {
  pos: [number, number, number];
  flag: boolean;
  width: number;
  eaveHeight: number;
  deltaHeight: number;
  endOfInsetBay: boolean;
}

export const DownspoutExtrude = ({
  pos,
  flag,
  width,
  eaveHeight,
  deltaHeight,
  endOfInsetBay,
}: IDownspout) => {
  const downspoutRef = useRef<any>();
  const { roofonly, downspout } = useUpgrade();
  const downspoutVisible = useRef(true);
  const { leanToData } = useLeanTo();
  const { bayLength, overhangEave, leanToDropHeightSize } = useStoreSize();
  const { downspoutsColor } = useStoreColor();

  const roofSlopeAngle = Math.atan((2 * deltaHeight) / width);

  const downspoutMainHeight =
    eaveHeight - (overhangEave / (width / 2)) * deltaHeight;

  const downspoutModel = useMemo(() => {
    const model = new Shape();

    model.moveTo(-1 / 6, -1 / 6);
    model.lineTo(1 / 6, -1 / 6);
    model.lineTo(1 / 6, 1 / 6);
    model.lineTo(-1 / 6, 1 / 6);
    model.closePath();

    return model;
  }, []);

  const downspoutHeight = useMemo(() => {
    let downspoutH = 0;

    if (!flag) {
      const item = leanToData.filter(
        (item, _index) => item.wall === "SideWallRight",
      );
      const rightLeanToDropHeight = leanToDropHeightSize.filter(
        (item, _index) => item.wall === "SideWallRight",
      );
      if (item[0].type !== "Closure") {
        if (
          pos[2] > item[0].lPos[2] - item[0].lLength / 2 + bayLength / 2 &&
          pos[2] < item[0].lPos[2] + item[0].lLength / 2 + bayLength / 2
        ) {
          if (rightLeanToDropHeight[0].val !== 0) {
            downspoutH =
              eaveHeight -
              (overhangEave / (width / 2)) * deltaHeight -
              item[0].lEaveHeight -
              item[0].lDeltaHeight;
            downspoutVisible.current = true;
          } else {
            downspoutVisible.current = false;
          }
        } else {
          downspoutH = eaveHeight - (overhangEave / (width / 2)) * deltaHeight;
        }
      } else {
        downspoutH = eaveHeight - (overhangEave / (width / 2)) * deltaHeight;
        downspoutVisible.current = true;
      }
    }

    if (flag) {
      const item = leanToData.filter(
        (item, _index) => item.wall === "SideWallLeft",
      );
      const leftLeanToDropHeight = leanToDropHeightSize.filter(
        (item, _index) => item.wall === "SideWallLeft",
      );
      if (item[0].type !== "Closure") {
        if (
          pos[2] > item[0].lPos[2] - item[0].lLength / 2 + bayLength / 2 &&
          pos[2] < item[0].lPos[2] + item[0].lLength / 2 + bayLength / 2
        ) {
          if (leftLeanToDropHeight[0].val !== 0) {
            downspoutH =
              eaveHeight -
              (overhangEave / (width / 2)) * deltaHeight -
              item[0].lEaveHeight -
              item[0].lDeltaHeight;
            downspoutVisible.current = true;
          } else {
            downspoutVisible.current = false;
          }
        } else {
          downspoutH = eaveHeight - (overhangEave / (width / 2)) * deltaHeight;
        }
      } else {
        downspoutH = eaveHeight - (overhangEave / (width / 2)) * deltaHeight;
        downspoutVisible.current = true;
      }
    }

    return downspoutH;
  }, [deltaHeight, eaveHeight, leanToData, overhangEave, width]);

  //Change the downspout color
  useFrame((_state, delta) =>
    easing.dampC(downspoutRef.current.color, downspoutsColor, 0.2, delta),
  );

  return (
    <group visible={downspout}>
      <group visible={downspoutVisible.current}>
        <mesh
          position={pos}
          rotation={
            flag
              ? [Math.PI / 2, Math.PI / 2, 0]
              : [-Math.PI / 2, -Math.PI / 2, 0]
          }
        >
          {/* main spout */}
          <mesh
            position={[downspoutMainHeight - downspoutHeight, 0, -0.1]}
            rotation={[0, Math.PI / 2, 0]}
          >
            <extrudeGeometry
              args={[
                downspoutModel,
                { ...extrudeSetting, depth: downspoutHeight - 1 },
              ]}
            />
            <meshStandardMaterial
              metalness={0.7}
              roughness={0.5}
              ref={downspoutRef}
              color={downspoutsColor}
              side={DoubleSide}
            />
          </mesh>
          {/* middle spout */}
          <mesh position={[downspoutMainHeight - 1.17, 0, 0]}>
            <extrudeGeometry
              args={[
                downspoutModel,
                {
                  ...extrudeSetting,
                  depth: roofonly
                    ? -overhangEave - 0.4 + 0.5 * Math.sin(roofSlopeAngle)
                    : endOfInsetBay
                      ? -overhangEave - 0.5
                      : -overhangEave + 0.2,
                },
              ]}
            />
            <meshStandardMaterial
              metalness={0.7}
              roughness={0.5}
              ref={downspoutRef}
              color={downspoutsColor}
              side={DoubleSide}
            />
          </mesh>
          {/* top spout */}
          <mesh
            position={
              roofonly
                ? [
                    downspoutMainHeight - 1.337,
                    0,
                    -overhangEave - 0.55 + 0.5 * Math.sin(roofSlopeAngle),
                  ]
                : endOfInsetBay
                  ? [downspoutMainHeight - 1.337, 0, -overhangEave - 0.4]
                  : [downspoutMainHeight - 1.337, 0, -overhangEave + 0.1]
            }
            rotation={[0, Math.PI / 2, 0]}
          >
            <extrudeGeometry
              args={[
                downspoutModel,
                { ...extrudeSetting, depth: 0.7 * Math.cos(roofSlopeAngle) },
              ]}
            />
            <meshStandardMaterial
              metalness={0.7}
              roughness={0.5}
              ref={downspoutRef}
              color={downspoutsColor}
              side={DoubleSide}
            />
          </mesh>
        </mesh>
      </group>
    </group>
  );
};
