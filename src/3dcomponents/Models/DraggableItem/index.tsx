/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { displayInches } from "./displayInches";
import { useStoreSize, useSliderUpdate } from "store";
import { useDoorStore, useSliderStatus } from "store/useDoor";
import { Window } from "3dcomponents/Models/Openings/Window";
import { WalkDoor } from "3dcomponents/Models/Openings/WalkDoor";
import { RollUpDoor } from "3dcomponents/Models/Openings/RollUpDoor";

interface IDraggableItem {
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

const color = new THREE.Color("red");
function DraggableItem({
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
}: IDraggableItem) {
  const { sliderStatus } = useSliderStatus();
  const { width, length, basicLength, eaveHeight } = useStoreSize();
  const { doorData, updateDoorData, updateSliceDoorData } = useDoorStore();

  const ref = useRef<any>();
  const colorRef = useRef<any>();
  const arrowRef = useRef<any>(!null);
  const leftCylinderRef = useRef<any>();
  const rightCylinderRef = useRef<any>();
  const rightValueRef = useRef<any>();
  const leftValueRef = useRef<any>();
  const { positionRange } = useSliderUpdate();
  const doorRotation = [0, 0, 0];
  const doOverlap = (
    rect1l: THREE.Vec2,
    rect1r: THREE.Vec2,
    rect2l: THREE.Vec2,
    rect2r: THREE.Vec2,
  ) => {
    if (
      rect1l.x === rect1r.x ||
      rect1l.y === rect1r.y ||
      rect2r.x === rect2l.x ||
      rect2l.y === rect2r.y
    )
      return false;
    if (rect1l.x > rect2r.x || rect2l.x > rect1r.x) return false;
    if (rect1r.y > rect2l.y || rect2r.y > rect1l.y) return false;
    return true;
  };
  const checkOverlapping = (pos: THREE.Vector3) => {
    const rect1Pos = side.startsWith("SideWall") ? pos.z : pos.x;
    const rect1LeftTop: THREE.Vec2 = new THREE.Vector2(
      rect1Pos - doorSize[0] / 2,
      pos.y + doorSize[1] / 2,
    );
    const rect1RightDown: THREE.Vec2 = new THREE.Vector2(
      rect1Pos + doorSize[0] / 2,
      pos.y - doorSize[1] / 2,
    );
    if (side.startsWith("SideWall")) {
      for (let i = 0; i < doorData.length; i++) {
        const item = doorData[i];
        if (item.wall === side && item.key !== index) {
          const rect2LeftTop: THREE.Vec2 = new THREE.Vector2(
            item.pos[2] - (item.size[0] / 2 + 0.1),
            item.pos[1] + (item.size[1] / 2 + 0.1),
          );
          const rect2LeftDown: THREE.Vec2 = new THREE.Vector2(
            item.pos[2] + (item.size[0] / 2 + 0.1),
            item.pos[1] - (item.size[1] / 2 + 0.1),
          );
          if (
            doOverlap(rect1LeftTop, rect1RightDown, rect2LeftTop, rect2LeftDown)
          ) {
            colorRef.current.color.set("red");
            break;
          } else {
            colorRef.current.color.set("white");
          }
        }
      }
    }
    if (side.startsWith("EndWall")) {
      for (let i = 0; i < doorData.length; i++) {
        const item = doorData[i];
        if (item.wall === side && item.key !== index) {
          const rect2LeftTop: THREE.Vec2 = new THREE.Vector2(
            item.pos[0] - (item.size[0] / 2 + 0.1),
            item.pos[1] + (item.size[1] / 2 + 0.1),
          );
          const rect2LeftDown: THREE.Vec2 = new THREE.Vector2(
            item.pos[0] + (item.size[0] / 2 + 0.1),
            item.pos[1] - (item.size[1] / 2 + 0.1),
          );
          if (
            doOverlap(rect1LeftTop, rect1RightDown, rect2LeftTop, rect2LeftDown)
          ) {
            colorRef.current.color.set("red");
            break;
          } else {
            colorRef.current.color.set("white");
          }
        }
      }
    }
  };
  useEffect(() => {
    let doorX = pos[0];
    const doorY = pos[1];
    let doorZ = pos[2];
    if (building === "MainBuilding") {
      if (side === "SideWallRight") {
        doorX = width / 2;
      } else if (side === "SideWallLeft") {
        doorX = -width / 2 - 0.1;
      } else if (side === "EndWallGabelFront") {
        doorZ = basicLength / 2;
      } else if (side === "EndWallGabelBack") {
        doorZ = -basicLength / 2;
      }
      if (doorX !== pos[0] || doorZ !== pos[2])
        updateDoorData(
          {
            key: index,
            name: name,
            type: type,
            building: building,
            wall: side,
            size: doorSize,
            pos: [doorX, doorY, doorZ],
            rot: rot,
            itemforRange: itemforRange,
            nameForRange: nameForRange,
          },
          index,
        );
    }
  }, [width, length, basicLength]);
  let doorX = pos[0];
  let doorY = pos[1];
  let doorZ = pos[2];
  const ObjectSlideFun = (axis: string, value: number) => {
    let dirNum = 1;

    switch (side) {
      case "EndWallGableFront":
        dirNum = 1;
        break;
      case "EndWallGabelBack":
        dirNum = -1;
        break;
      case "SideWallRight":
        dirNum = 1;
        break;
      case "SideWallLeft":
        dirNum = -1;
        break;
      default:
        break;
    }
    if (sliderStatus[nameForRange][itemforRange - 1]) {
      if (building === "MainBuilding") arrowRef.current.visible = true;
      if (axis === "X") {
        // Set Door at center
        if (value > -1 && value < 1) {
          if (side === "EndWallGabelBack") doorX = -0.1;
          else doorX = 0.1;
        } else {
          if (side === "EndWallGabelBack") doorX = -value;
          else doorX = value;
        }

        // Calculate common values
        const leftCylinderScaleY = doorX + width / 2 - doorSize[0] / 2;
        const leftCylinderYPosition = leftCylinderScaleY / 2 + doorSize[0] / 2;
        const rightCylinderScaleY = doorX - width / 2 + doorSize[0] / 2 + 0.2;
        const rightCylinderYPosition =
          rightCylinderScaleY / 2 - doorSize[0] / 2;

        // Set left cylinder properties
        leftCylinderRef.current.scale.set(1, leftCylinderScaleY, 1);
        leftCylinderRef.current.position.set(0, leftCylinderYPosition, 0);
        leftValueRef.current.position.set(0, leftCylinderYPosition, -0.5);
        leftValueRef.current.text = displayInches(Math.abs(leftCylinderScaleY));

        // Set right cylinder properties
        rightCylinderRef.current.scale.set(1, rightCylinderScaleY, 1);
        rightCylinderRef.current.position.set(0, rightCylinderYPosition, 0);
        rightValueRef.current.position.set(
          0,
          rightCylinderYPosition - 0.5,
          -0.5,
        );
        rightValueRef.current.text = displayInches(
          width - Math.abs(leftCylinderScaleY) - Math.round(doorSize[0]),
        );

        if (side === "EndWallGabelBack") {
          const rotationValue = Math.PI / 2;

          leftValueRef.current.rotation.set(rotationValue, rotationValue, 0);
          leftValueRef.current.position.set(0, leftCylinderYPosition, 0.5);

          rightValueRef.current.rotation.set(rotationValue, rotationValue, 0);
          rightValueRef.current.position.set(0, rightCylinderYPosition, 0.5);

          arrowRef.current.rotation.set(-rotationValue, 0, -rotationValue);
        }

        switch (type) {
          case "Walk-door":
            ref.current.position.set(doorX, doorY, doorZ + 0.25 * dirNum);
            break;
          case "Roll-up door":
            ref.current.position.set(doorX, doorY, doorZ + 0.8 * dirNum);
            break;
          case "Window":
            ref.current.position.set(doorX, doorY, doorZ + 0.25 * dirNum);
            break;
          default:
            break;
        }
      } else if (axis === "Y") doorY = value;
      else if (axis === "Z") {
        if (side === "SideWallRight") doorZ = -value;
        else doorZ = value;

        // Calculate common values
        const halfDoorSize = doorSize[0] / 2;
        const leftCylinderScaleY = doorZ + basicLength / 2 - halfDoorSize;
        const leftCylinderYPosition = leftCylinderScaleY / 2 + halfDoorSize;
        const rightCylinderScaleY =
          doorZ - basicLength / 2 + halfDoorSize + 0.1;
        const rightCylinderYPosition = rightCylinderScaleY / 2 - halfDoorSize;

        // Set left cylinder properties
        leftCylinderRef.current.scale.set(1, leftCylinderScaleY, 1);
        leftCylinderRef.current.position.set(0, leftCylinderYPosition, 0);
        leftValueRef.current.position.set(0, leftCylinderYPosition, -0.5);
        leftCylinderRef.current.rotation.set(0, 0, 0);
        leftValueRef.current.text = displayInches(Math.abs(leftCylinderScaleY));

        // Set right cylinder properties
        rightCylinderRef.current.scale.set(1, rightCylinderScaleY, 1);
        rightCylinderRef.current.position.set(0, rightCylinderYPosition, 0);
        rightValueRef.current.position.set(0, rightCylinderYPosition, -0.5);
        rightValueRef.current.text = displayInches(
          basicLength - Math.abs(leftCylinderScaleY) - Math.round(doorSize[0]),
        );

        if (side === "SideWallRight") {
          const rotationValue = -Math.PI / 2;
          rightValueRef.current.rotation.set(rotationValue, rotationValue, 0);
          leftValueRef.current.rotation.set(rotationValue, rotationValue, 0);
          arrowRef.current.rotation.set(Math.PI / 2, 0, rotationValue);
        }

        switch (type) {
          case "Walk-door":
            ref.current.position.set(doorX + 0.25 * dirNum, doorY, doorZ);
            break;
          case "Roll-up door":
            ref.current.position.set(doorX + 0.8 * dirNum, doorY, doorZ);
            break;
          case "Window":
            ref.current.position.set(doorX + 0.25 * dirNum, doorY, doorZ);
            break;
          default:
            break;
        }
      }
      checkOverlapping(new THREE.Vector3(doorX, doorY, doorZ));
      if (color.equals(colorRef.current.color)) {
        //Move door to origin position and set door color to white
        ref.current.position.set(pos[0], pos[1], pos[2]);
        colorRef.current.color.set("white");
        //Show slice door and hidden dimensions when overlap other object
        arrowRef.current.visible = false;
        if (side.startsWith("EndWall")) {
          updateSliceDoorData(
            {
              key: index,
              name: name,
              type: type,
              building: building,
              wall: side,
              size: doorSize,
              pos: [ref.current.position.x, ref.current.position.y, pos[2]],
              rot: rot,
              itemforRange: itemforRange,
              nameForRange: nameForRange,
              visible: true,
            },
            index,
          );
        } else if (side.startsWith("SideWall")) {
          updateSliceDoorData(
            {
              key: index,
              name: name,
              type: type,
              building: building,
              wall: side,
              size: doorSize,
              pos: [pos[0], ref.current.position.y, ref.current.position.z],
              rot: rot,
              itemforRange: itemforRange,
              nameForRange: nameForRange,
              visible: true,
            },
            index,
          );
        }
      } else {
        //Hidden slice door
        updateSliceDoorData(
          {
            key: index,
            name: name,
            type: type,
            building: building,
            wall: side,
            size: doorSize,
            pos: [ref.current.position.x, ref.current.position.y, pos[2]],
            rot: rot,
            itemforRange: itemforRange,
            nameForRange: nameForRange,
            visible: false,
          },
          index,
        );
      }
    } else {
      //Hidden dimensions

      arrowRef.current.visible = false;
      if (side.startsWith("EndWall")) {
        ref.current.position.set(
          ref.current.position.x,
          ref.current.position.y,
          pos[2],
        );

        //Update doorData and sliceDoorData
        updateDoorData(
          {
            key: index,
            name: name,
            type: type,
            building: building,
            wall: side,
            size: doorSize,
            pos: [ref.current.position.x, ref.current.position.y, pos[2]],
            rot: rot,
            itemforRange: itemforRange,
            nameForRange: nameForRange,
          },
          index,
        );
        updateSliceDoorData(
          {
            key: index,
            name: name,
            type: type,
            building: building,
            wall: side,
            size: doorSize,
            pos: [ref.current.position.x, ref.current.position.y, pos[2]],
            rot: rot,
            itemforRange: itemforRange,
            nameForRange: nameForRange,
            visible: true,
          },
          index,
        );
      } else if (side.startsWith("SideWall")) {
        ref.current.position.set(
          pos[0],
          ref.current.position.y,
          ref.current.position.z,
        );

        //Update doorData and sliceDoorData
        updateDoorData(
          {
            key: index,
            name: name,
            type: type,
            building: building,
            wall: side,
            size: doorSize,
            pos: [pos[0], ref.current.position.y, ref.current.position.z],
            rot: rot,
            itemforRange: itemforRange,
            nameForRange: nameForRange,
          },
          index,
        );
        updateSliceDoorData(
          {
            key: index,
            name: name,
            type: type,
            building: building,
            wall: side,
            size: doorSize,
            pos: [pos[0], ref.current.position.y, ref.current.position.z],
            rot: rot,
            itemforRange: itemforRange,
            nameForRange: nameForRange,
            visible: true,
          },
          index,
        );
      }
    }
  };

  useEffect(() => {
    if (side === "EndWallGabelFront" || side === "EndWallGabelBack") {
      ObjectSlideFun("X", positionRange[nameForRange][itemforRange - 1]);
    } else {
      ObjectSlideFun("Z", positionRange[nameForRange][itemforRange - 1]);
    }
  }, [positionRange, sliderStatus]);

  return (
    <group>
      <group
        ref={ref}
        position={pos}
        rotation={rot}
        key={index}
        type={type}
      >
        {type === "Walk-door" ? (
          <WalkDoor
            name={name}
            color={colorRef}
            rotation={[doorRotation[0], doorRotation[1], doorRotation[2]]}
          />
        ) : null}
        {type === "Window" ? (
          <Window
            name={name}
            color={colorRef}
          />
        ) : null}
        {type === "Roll-up door" ? (
          <RollUpDoor
            name={name}
            color={colorRef}
          />
        ) : null}
        <group
          visible={false}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          position={[0, 0, 0.2]}
          ref={arrowRef}
          renderOrder={-1}
        >
          <mesh
            ref={rightCylinderRef}
            scale={[1, 1, 1]}
            renderOrder={-1}
          >
            <cylinderGeometry args={[0.04, 0.04, 1, 2]} />
            <meshBasicMaterial color="black" />
          </mesh>
          <Text
            fontSize={1}
            color="black"
            anchorX="center"
            anchorY="middle"
            ref={rightValueRef}
            rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          >
            right
          </Text>
          <mesh
            ref={leftCylinderRef}
            scale={[1, 1, 1]}
            position={[0, 0, 0]}
            renderOrder={-1}
          >
            <cylinderGeometry args={[0.04, 0.04, 1, 2]} />
            <meshBasicMaterial color="black" />
          </mesh>
          <Text
            fontSize={1}
            color="black"
            anchorX="center"
            anchorY="middle"
            ref={leftValueRef}
            rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          >
            left
          </Text>
        </group>
      </group>
    </group>
  );
}

export default DraggableItem;
