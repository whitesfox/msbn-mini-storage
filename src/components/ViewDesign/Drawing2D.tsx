/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useDoorStore } from "store/useDoor";
import { useEffect, useRef } from "react";
import { useStoreSize, useViewDesign } from "store";
import { drawArc, drawLine, drawDoor } from "./draw";
import { savePDF } from "@progress/kendo-react-pdf";
import { displayDistanceValue } from "./displayDistanceValue";

export const Drawing = (props: any) => {
  const canvasRef = useRef<any>(null);
  const documentRef = useRef<any>(null);
  const { setIsOpen } = useViewDesign();
  const { doorData } = useDoorStore();
  const { width, basicLength } = useStoreSize();

  const canvasLength = 700;
  const currDate = new Date().toLocaleDateString();
  const currTime = new Date().toLocaleTimeString();
  const canvasWidth = (width / basicLength) * canvasLength;

  const downloadAsPdf = () => {
    const currentElement = documentRef.current;
    if (currentElement) currentElement.style.height = "auto";
    savePDF(currentElement, {
      paperSize: "auto",
      pageTemplate: "auto",
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.lineWidth = 5;

    // Draw building outline
    ctx.strokeRect(150, 100, canvasLength, canvasWidth);

    // Draw labels and dimensions
    ctx.font = `18px Arial`;
    ctx.fillStyle = "black";
    // ctx.fillText("LEFT SIDE", canvasLength / 2 + 100, 20);

    ctx.save();
    ctx.font = `20px Arial`;
    ctx.translate(20, canvasWidth / 2 + 100);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("FRONT", 0, 0);
    ctx.restore();

    ctx.save();
    ctx.font = `20px Arial`;
    ctx.translate(150 + canvasLength + 150, canvasWidth / 2 + 100);
    ctx.rotate(Math.PI / 2);
    ctx.fillText("BACK", 0, 0);
    ctx.fillText(`${width}'`, 150 + canvasLength + 110, canvasWidth / 2 + 100);
    ctx.restore();

    ctx.save();
    ctx.font = `20px Arial`;
    ctx.fillText("RIGHT SIDE", canvasLength / 2 + 100, 100 + canvasWidth + 200);
    ctx.fillText(
      `${basicLength}'`,
      canvasLength / 2 + 150,
      100 + canvasWidth + 170,
    );
    ctx.restore();
    //distanceDoor2Left
    ctx.lineWidth = 0.5;

    //FRONT Lines
    drawLine(ctx, 75, 100, 95, 100);
    drawLine(ctx, 70, 95, 87, 107);

    drawLine(ctx, 75, 100, 75, 100 + canvasWidth);

    drawLine(ctx, 75, 100 + canvasWidth, 95, 100 + canvasWidth);
    drawLine(ctx, 70, 95 + canvasWidth, 87, 107 + canvasWidth);
    //FRONT lines

    //Left edit lines
    drawLine(ctx, 150, 25, 150, 45);
    drawLine(ctx, 150 + canvasLength, 25, 150 + canvasLength, 45);
    drawLine(ctx, 150, 25, 150 + canvasLength, 25);

    drawLine(ctx, 155, 20, 143, 32);
    drawLine(ctx, 155 + canvasLength, 20, 143 + canvasLength, 32);

    //Left edit lines

    //BACK edit lines
    drawLine(
      ctx,
      150 + canvasLength + 70,
      100,
      150 + canvasLength + 70,
      100 + canvasWidth,
    );
    drawLine(ctx, 150 + canvasLength + 50, 100, 150 + canvasLength + 70, 100);
    drawLine(
      ctx,
      150 + canvasLength + 70,
      100 + canvasWidth,
      150 + canvasLength + 50,
      100 + canvasWidth,
    );
    drawLine(ctx, 150 + canvasLength + 65, 95, 150 + canvasLength + 77, 107);
    drawLine(
      ctx,
      150 + canvasLength + 65,
      95 + canvasWidth,
      150 + canvasLength + 77,
      107 + canvasWidth,
    );

    //BACK edit lines

    //BACK lines
    drawLine(
      ctx,
      150 + canvasLength + 110,
      100,
      150 + canvasLength + 110,
      100 + canvasWidth,
    );
    drawLine(ctx, 150 + canvasLength + 90, 100, 150 + canvasLength + 110, 100);
    drawLine(
      ctx,
      150 + canvasLength + 110,
      100 + canvasWidth,
      150 + canvasLength + 90,
      100 + canvasWidth,
    );
    drawLine(ctx, 150 + canvasLength + 105, 95, 150 + canvasLength + 117, 107);
    drawLine(
      ctx,
      150 + canvasLength + 105,
      95 + canvasWidth,
      150 + canvasLength + 117,
      107 + canvasWidth,
    );
    //BACK lines

    //Right lines

    drawLine(
      ctx,
      150,
      100 + canvasWidth + 150,
      150 + canvasLength,
      100 + canvasWidth + 150,
    );

    drawLine(ctx, 150, 100 + canvasWidth + 150, 150, 100 + canvasWidth + 130);
    drawLine(
      ctx,
      150 + canvasLength,
      100 + canvasWidth + 150,
      150 + canvasLength,
      100 + canvasWidth + 130,
    );
    drawLine(ctx, 153, 100 + canvasWidth + 145, 145, 100 + canvasWidth + 153);
    drawLine(
      ctx,
      153 + canvasLength,
      100 + canvasWidth + 145,
      145 + canvasLength,
      100 + canvasWidth + 153,
    );
    //Right lines

    //Right edit lines
    drawLine(
      ctx,
      150,
      100 + canvasWidth + 90,
      150 + canvasLength,
      100 + canvasWidth + 90,
    );

    drawLine(ctx, 150, 100 + canvasWidth + 90, 150, 100 + canvasWidth + 70);
    drawLine(ctx, 153, 100 + canvasWidth + 85, 145, 100 + canvasWidth + 93);

    drawLine(
      ctx,
      153 + canvasLength,
      100 + canvasWidth + 85,
      145 + canvasLength,
      100 + canvasWidth + 93,
    );
    drawLine(
      ctx,
      150 + canvasLength,
      100 + canvasWidth + 90,
      150 + canvasLength,
      100 + canvasWidth + 70,
    );
    //Right edit lines

    doorData.map((item) => {
      const doorwidth = (item.size[0] * canvasWidth) / width;
      if (item.wall === "EndWallGabelFront") {
        const positionY =
          100 +
          canvasWidth / 2 -
          ((-item.pos[0] + item.size[0] / 2) * canvasWidth) / width;

        drawDoor(ctx, 147.5, positionY, 5, doorwidth);

        drawLine(ctx, 75, positionY, 85, positionY);
        drawLine(ctx, 75, positionY + doorwidth, 85, positionY + doorwidth);
        drawLine(ctx, 70, positionY - 5, 80, positionY + 5);
        drawLine(
          ctx,
          70,
          positionY - 5 + doorwidth,
          80,
          positionY + 5 + doorwidth,
        );

        const points: number[] = [];
        doorData.filter((item) => {
          if (item.wall === "EndWallGabelFront") {
            points.push(
              item.pos[0] - item.size[0] / 2,
              item.pos[0] + item.size[0] / 2,
            );
          }
        });
        points.push(-width / 2);
        points.push(width / 2);
        points.sort(function (a, b) {
          return a - b;
        });
        let value = 100;
        for (let i = 0; i <= points.length - 2; i++) {
          const distance = points[i] - points[i + 1];

          ctx.fillText(
            `${displayDistanceValue(Math.abs(distance))}`,
            40,
            value + ((Math.abs(distance) / width) * canvasWidth) / 2,
          );
          value += (Math.abs(distance) / width) * canvasWidth;
        }

        if (item.name === "Door") {
          drawLine(
            ctx,
            147.5,
            positionY + doorwidth,
            147.5 - doorwidth,
            positionY + doorwidth,
          );
          drawArc(
            ctx,
            147.5,
            positionY + doorwidth,
            doorwidth,
            Math.PI,
            -Math.PI / 2,
          );

          ctx.fillText("D2", 120, positionY + doorwidth / 2 + 5);
        }
        if (item.name === "RollUpDoor") {
          ctx.fillText("D1", 120, positionY + doorwidth / 2 + 5);
        }
        if (item.name === "Window") {
          ctx.fillText("W1", 117, positionY + doorwidth / 2 + 5);
        }
      }
      if (item.wall === "EndWallGabelBack") {
        const positionY =
          100 +
          canvasWidth / 2 -
          ((-item.pos[0] + item.size[0] / 2) * canvasWidth) / width;

        drawDoor(ctx, 147.5 + canvasLength, positionY, 5, doorwidth);

        drawLine(
          ctx,
          150 + canvasLength + 70,
          positionY,
          150 + canvasLength + 60,
          positionY,
        );
        drawLine(
          ctx,
          150 + canvasLength + 70,
          positionY + doorwidth,
          150 + canvasLength + 60,
          positionY + doorwidth,
        );
        drawLine(
          ctx,
          150 + canvasLength + 65,
          positionY - 5,
          150 + canvasLength + 75,
          positionY + 5,
        );
        drawLine(
          ctx,
          150 + canvasLength + 65,
          positionY + doorwidth - 5,
          150 + canvasLength + 75,
          positionY + doorwidth + 5,
        );

        const points: number[] = [];
        doorData.filter((item) => {
          if (item.wall === "EndWallGabelBack") {
            points.push(
              item.pos[0] - item.size[0] / 2,
              item.pos[0] + item.size[0] / 2,
            );
          }
        });
        points.push(-width / 2);
        points.push(width / 2);
        points.sort(function (a, b) {
          return a - b;
        });
        let value = 100;
        for (let i = 0; i <= points.length - 2; i++) {
          const distance = points[i] - points[i + 1];
          ctx.fillText(
            `${displayDistanceValue(Math.abs(distance))}`,
            100 +
              canvasLength +
              150 -
              ctx.measureText(`${displayDistanceValue(Math.abs(distance))}`)
                .width,
            value + ((Math.abs(distance) / width) * canvasWidth) / 2,
          );
          value += (Math.abs(distance) / width) * canvasWidth;
        }

        if (item.name === "Door") {
          drawLine(
            ctx,
            147.5 + canvasLength,
            positionY,
            147.5 + canvasLength + doorwidth,
            positionY,
          );
          drawArc(
            ctx,
            147.5 + canvasLength,
            positionY,
            doorwidth,
            0,
            Math.PI / 2,
          );
          ctx.fillText("D2", 153 + canvasLength, positionY + doorwidth / 2 + 5);
        }
        if (item.name === "RollUpDoor") {
          ctx.fillText("D1", 153 + canvasLength, positionY + doorwidth / 2 + 5);
        }
        if (item.name === "Window") {
          ctx.fillText("W1", 153 + canvasLength, positionY + doorwidth / 2 + 5);
        }
      }
      if (item.wall === "SideWallRight") {
        const positionX =
          190 +
          canvasLength / 2 -
          ((item.pos[2] + item.size[0]) * canvasLength) / basicLength;

        drawDoor(ctx, positionX, 97.5 + canvasWidth, doorwidth, 5);

        const points: number[] = [];
        doorData.filter((item) => {
          if (item.wall === "SideWallRight") {
            points.push(
              -item.pos[2] - item.size[0] / 2,
              -item.pos[2] + item.size[0] / 2,
            );
          }
        });
        points.push(basicLength / 2);
        points.push(-basicLength / 2);
        points.sort(function (a, b) {
          return a - b;
        });
        let value = 150;
        for (let i = 0; i <= points.length - 2; i++) {
          const distance = points[i] - points[i + 1];
          ctx.fillText(
            `${displayDistanceValue(Math.abs(distance))}`,
            value +
              ((Math.abs(distance) / basicLength) * canvasLength) / 2 -
              ctx.measureText(`${displayDistanceValue(Math.abs(distance))}`)
                .width /
                2,
            100 + canvasWidth + 110,
          );

          value += (Math.abs(distance) / basicLength) * canvasLength;
        }
        drawLine(
          ctx,
          positionX,
          125 + canvasWidth + 55,
          positionX,
          135 + canvasWidth + 55,
        );
        drawLine(
          ctx,
          positionX + doorwidth,
          125 + canvasWidth + 55,
          positionX + doorwidth,
          135 + canvasWidth + 55,
        );

        drawLine(
          ctx,
          positionX + 3,
          100 + canvasWidth + 85,
          positionX - 3,
          100 + canvasWidth + 93,
        );

        drawLine(
          ctx,
          positionX + doorwidth + 3,
          100 + canvasWidth + 85,
          positionX + doorwidth - 3,
          100 + canvasWidth + 93,
        );

        if (item.name === "Door") {
          ctx.fillText("D2", positionX + doorwidth / 2 - 5, 120 + canvasWidth);

          drawLine(
            ctx,
            positionX + doorwidth,
            97.5 + canvasWidth,
            positionX + doorwidth,
            97.5 + canvasWidth + doorwidth,
          );
          drawArc(
            ctx,
            positionX + doorwidth,
            97.5 + canvasWidth,
            doorwidth,
            Math.PI / 2,
            Math.PI,
          );
        }
        if (item.name === "RollUpDoor") {
          ctx.fillText("D1", positionX + doorwidth / 2 - 5, 120 + canvasWidth);
        }
        if (item.name === "Window") {
          ctx.fillText("W1", positionX + doorwidth / 2 - 10, 120 + canvasWidth);
        }
      }
      if (item.wall === "SideWallLeft") {
        const positionX =
          190 +
          canvasLength / 2 -
          ((item.pos[2] + item.size[0]) * canvasLength) / basicLength;

        drawDoor(ctx, positionX, 97.5, doorwidth, 5);

        drawLine(ctx, positionX, 25, positionX, 35);
        drawLine(ctx, positionX + doorwidth, 25, positionX + doorwidth, 35);

        drawLine(ctx, positionX + 3, 22, positionX - 3, 30);

        drawLine(
          ctx,
          positionX + doorwidth + 3,
          22,
          positionX + doorwidth - 3,
          30,
        );

        const points: number[] = [];
        doorData.filter((item) => {
          if (item.wall === "SideWallLeft") {
            points.push(
              -item.pos[2] - item.size[0] / 2,
              -item.pos[2] + item.size[0] / 2,
            );
          }
        });
        points.push(basicLength / 2);
        points.push(-basicLength / 2);
        points.sort(function (a, b) {
          return a - b;
        });
        let value = 150;
        for (let i = 0; i <= points.length - 2; i++) {
          const distance = points[i] - points[i + 1];
          ctx.fillText(
            `${displayDistanceValue(Math.abs(distance))}`,
            value +
              ((Math.abs(distance) / basicLength) * canvasLength) / 2 -
              ctx.measureText(`${displayDistanceValue(Math.abs(distance))}`)
                .width /
                2,
            20,
          );
          value += (Math.abs(distance) / basicLength) * canvasLength;
        }

        if (item.name === "Door") {
          drawLine(ctx, positionX, 100, positionX, 100 - doorwidth);
          drawArc(ctx, positionX, 100, doorwidth, -Math.PI / 2, 0);
          ctx.fillText("D2", positionX + doorwidth / 2 - 8, 95);
        }
        if (item.name === "RollUpDoor") {
          ctx.fillText("D1", positionX + doorwidth / 2 - 8, 95);
        }

        if (item.name === "Window") {
          ctx.fillText("W1", positionX + doorwidth / 2 - 10, 95);
        }
      }
    });
  }, [basicLength, width]);

  return (
    <div className=" select-none p-3">
      <div
        ref={documentRef}
        className=" h-max overflow-y-auto overflow-x-hidden "
      >
        <div className="flex p-3">
          {currDate},{currTime}
          <div className="mx-auto items-center justify-center">
            MBSN-Your Saved Custom Building Design - Wesley Raines - Outlook
          </div>
        </div>
        <div className=" ">
          <p className=" translate-x-2/4 text-lg font-bold">LEFT SIDE</p>
        </div>
        <canvas
          ref={canvasRef}
          {...props}
          width={1020}
          height={(width / basicLength) * 1000 + 100}
          className=" bg-white p-4"
        />
      </div>
      <div className="">
        <button
          onPointerDown={() => setIsOpen(false)}
          className="text-blue-800 underline outline-none "
        >
          Open Your Custom Design
        </button>
        <button
          onPointerDown={downloadAsPdf}
          className=" p-3"
        >
          DownloadToPDF
        </button>
      </div>
    </div>
  );
};

export default Drawing;
