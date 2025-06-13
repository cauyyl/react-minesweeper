"use client";
import React, { useEffect, useMemo, useRef } from "react";
import MinesweeperItem from "@/app/Minesweeper/MinesweeperItem";
import { MapWidth } from "@/app/Minesweeper/utils";
const width = 5;
const height = 5;
const mineCount = 5;

interface MineInterface {
  id: string; // x-y坐标 例如 '1-2' 表示第一行第二列的格子是否为雷
  mine: boolean;
  clicked: boolean;
}

const Minesweeper = () => {
  const mounted = useRef(false);

  const [notice, setNotice] = React.useState("");
  const [mineArray, setMineArray] = React.useState<any>();
  const [inputX, setInputX] = React.useState("");
  const [inputY, setInputY] = React.useState("");

  useEffect(() => {
    if (mounted.current) return;
    generateMineArray();
    mounted.current = true;
  }, []);

  const generateMineArray = () => {
    const total = width * height;
    const array = new Array(total).fill(0);
    // 随机生成雷的位置
    for (let i = 0; i < mineCount; i++) {
      const index = Math.floor(Math.random() * total);
      if (array[index] === 0) {
        array[index] = 1;
      } else {
        i--;
      }
    }
    const mineArrayTemp: MineInterface[] = array.map((item, index) => {
      const x = Math.floor(index / width) + 1;
      const y = Math.floor(index % width) + 1;
      return {
        id: `${x}-${y}`,
        mine: item === 1,
        clicked: false,
      };
    });
    console.log("mineArrayTemp:", mineArrayTemp);
    setMineArray(mineArrayTemp);
  };
  const finishGame = () => {
    console.log("game over");
    setNotice("Game Over");
  };

  const renderXCoordinates = useMemo(() => {
    return (
      <div
        style={{
          position: "absolute",
          left: 0,
          top: -30,
          width: MapWidth,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {new Array(width).fill(0).map((_, index) => {
          return (
            <span
              style={{ color: "#000", width: "30px", textAlign: "center" }}
              key={`x-${index}`}
            >
              {index + 1}
            </span>
          );
        })}
      </div>
    );
  }, []);

  const renderYCoordinates = useMemo(() => {
    return (
      <div
        style={{
          position: "absolute",
          left: -30,
          top: 0,
          height: MapWidth,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {new Array(width).fill(0).map((_, index) => {
          return (
            <span
              style={{ color: "#000", width: "30px", textAlign: "center" }}
              key={`y-${index}`}
            >
              {index + 1}
            </span>
          );
        })}
      </div>
    );
  }, []);

  return (
    <div>
      <h4
        style={{
          marginBottom: 40,
          textAlign: "center",
        }}
      >
        Minesweeper
      </h4>
      <div
        style={{
          position: "relative",
          width: MapWidth,
        }}
      >
        <div
          style={{
            width: MapWidth,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {mineArray?.map((item: MineInterface, i: Number) => {
            console.log("item:", item);
            return (
              <MinesweeperItem
                {...item}
                finishGame={finishGame}
                key={item.id}
              />
            );
          })}
        </div>
        {renderXCoordinates}
        {renderYCoordinates}
      </div>
      <div>
        <span
          style={{
            textAlign: "center",
          }}
        >
          {notice}
        </span>
      </div>
    </div>
  );
};

export default Minesweeper;
