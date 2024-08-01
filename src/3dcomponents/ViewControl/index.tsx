/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { CameraControls } from "@react-three/drei";
import { isMobile } from "react-device-detect";
import { useStoreCameraControl, useStoreSize } from "store";

export const ViewControl = () => {
  const { cameraRef } = useStoreCameraControl();
  const { width, length, eaveHeight } = useStoreSize();
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    //Block Mouse Right Button and Wheel
    cameraRef.current.mouseButtons.right = 0;
    cameraRef.current.mouseButtons.wheel = 0;

    if (isMobile) {
      let max = length;
      if (width > length) max = width;
      const tempCameraPos = max * 1.5;
      setDistance(tempCameraPos * 2.2);
      cameraRef.current?.setLookAt(
        ...[tempCameraPos, 10, tempCameraPos],
        ...[0, eaveHeight / 2, 0],
        true,
      );
    } else {
      let max = length * 2.3;
      if (width > length) max = width * 2.3;
      const tempCameraPos = max;
      setDistance(tempCameraPos * 1.4);
      cameraRef.current?.setLookAt(
        ...[tempCameraPos, 10, tempCameraPos],
        ...[0, eaveHeight / 2, 0],
        true,
      );
    }
  }, [length, eaveHeight, width]);

  return (
    <CameraControls
      ref={cameraRef}
      enabled={true}
      minPolarAngle={0}
      maxPolarAngle={Math.PI / 2}
      dampingFactor={1}
      makeDefault
      minDistance={distance}
      maxDistance={distance}
    />
  );
};
