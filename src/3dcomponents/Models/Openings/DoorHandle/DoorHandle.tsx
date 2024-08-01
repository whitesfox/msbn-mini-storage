/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Cylinder__0: THREE.Mesh;
  };
  materials: {
    ["Scene_-_Root"]: THREE.MeshStandardMaterial;
  };
};

interface IDoorHandle {
  scale: [number, number, number];
  rotation: [number, number, number];
  position: [number, number, number];
}

export const DoorHandle = ({ scale, rotation, position }: IDoorHandle) => {
  const { nodes, materials } = useGLTF("/glb/doorHandle.glb") as GLTFResult;

  return (
    <group
      scale={scale}
      position={position}
      rotation={rotation}
      dispose={null}
    >
      <group scale={0.01}>
        <mesh
          geometry={nodes.Cylinder__0.geometry}
          material={materials["Scene_-_Root"]}
          position={[455.748, 78.319, 1398.69]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={74.147}
        />
      </group>
    </group>
  );
};

useGLTF.preload("/glb/doorHandle.glb");
