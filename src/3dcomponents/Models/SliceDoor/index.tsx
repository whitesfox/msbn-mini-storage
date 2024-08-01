/* eslint-disable react/no-unknown-property */
import { Subtraction } from "@react-three/csg";

interface ISliceDoor {
  pos: [number, number, number];
  rot: [number, number, number];
  size: [number, number, number];
  index: number;
}

export const SliceDoor = ({ pos, rot, size, index }: ISliceDoor) => {
  return (
    <Subtraction
      position={pos}
      rotation={rot}
      key={index}
    >
      <boxGeometry args={size} />
    </Subtraction>
  );
};
