/* eslint-disable react/no-unknown-property */
import { useMemo, useRef } from "react";
import { FrontSide, RepeatWrapping, TextureLoader, Vector2 } from "three";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

interface IPatternBumpMaterial {
  color: string;
  rotation: number;
}

const repeat = [1, 1];
const offset = new Vector2(0, 0.14);

export const PatternBumpMaterial = ({
  color,
  rotation,
}: IPatternBumpMaterial) => {
  const ref = useRef<any>();

  //Import bump map
  const bumpMap = useMemo(() => {
    const texture = new TextureLoader().load("/material/panelBumpMat.jpg");

    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(repeat[0], repeat[1]);
    texture.rotation = rotation;
    texture.offset = offset;

    return texture;
  }, [rotation]);

  //Import basic map
  const basicMap = useMemo(() => {
    const texture = new TextureLoader().load("/material/panelBasicMat.jpg");

    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(repeat[0], repeat[1]);
    texture.rotation = rotation;
    texture.offset = offset;

    return texture;
  }, [rotation]);

  //Change the material color
  useFrame((_state, delta) =>
    easing.dampC(ref.current.color, color, 0.2, delta),
  );

  return (
    <meshPhysicalMaterial
      map={basicMap}
      bumpMap={bumpMap}
      side={FrontSide}
      metalness={0.7}
      roughness={0.5}
      ref={ref}
    />
  );
};
