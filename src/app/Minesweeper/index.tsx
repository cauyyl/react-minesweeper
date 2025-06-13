"use client";
import React, { useEffect, useMemo, useRef } from "react";
import MinesweeperItem from "@/app/Minesweeper/MinesweeperItem";
import { MapWidth } from "@/app/Minesweeper/utils";
import { Button, Input } from "antd";
const width = 2;
const height = 2;
const DefaultMineCount = 3;

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
  const [currentCoordinate, setCurrentCoordinate] = React.useState("");
  const [isGameOver, setIsGameOver] = React.useState(false);
  const [minesString, setMinesString] = React.useState("");
  const [gameId, setGameId] = React.useState(1);
  const [safeCount, setSafeCount] = React.useState(
    width * height - DefaultMineCount
  );

  useEffect(() => {
    if (mounted.current) return;
    generateMineArray();
    mounted.current = true;
  }, []);

  useEffect(() => {
    if (safeCount <= 0) {
      setIsGameOver(true);
      setNotice("Congratulations! You Win!");
    }
  }, [safeCount]);

  const generateMineArray = () => {
    const total = width * height;
    const array = new Array(total).fill(0);
    // 随机生成雷的位置
    for (let i = 0; i < DefaultMineCount; i++) {
      const index = Math.floor(Math.random() * total);
      if (array[index] === 0) {
        array[index] = 1;
      } else {
        i--;
      }
    }
    const mineArrayTemp: MineInterface[] = array.map((item, index) => {
      const x = Math.floor(index % width) + 1;
      const y = Math.floor(index / width) + 1;
      return {
        id: `${x}-${y}`,
        mine: item === 1,
        clicked: false,
      };
    });
    console.log("mineArrayTemp:", mineArrayTemp);
    setMineArray(mineArrayTemp);
    setMinesString(
      mineArrayTemp
        .filter(item => item.mine)
        .map(item => item.id)
        .join(" , ")
    );
  };
  const updateSafeCount = () => {
    setSafeCount(safeCount - 1);
  };
  const restartGame = () => {
    generateMineArray();
    setNotice("");
    setCurrentCoordinate("");
    setIsGameOver(false);
    setGameId(gameId + 1);
    setSafeCount(DefaultMineCount);
  };
  const finishGame = () => {
    console.log("game over");
    setNotice("Game Over");
    setIsGameOver(true);
  };

  const handleCheckCoordinates = () => {
    setCurrentCoordinate(`${inputX}-${inputY}`);
    setInputX("");
    setInputY("");
  };
  const handleXChange = (e: any) => {
    const value = e.target.value;
    if (value <= 0 || value > width) {
      setNotice("x坐标超出范围，请重新输入");
      setInputX("");
    } else {
      setNotice("");
      setInputX(e.target.value);
    }
  };

  const handleYChange = (e: any) => {
    const value = e.target.value;
    if (value <= 0 || value > height) {
      setNotice("y坐标超出范围，请重新输入");
      setInputY("");
    } else {
      setNotice("");
      setInputY(e.target.value);
    }
  };

  const renderXCoordinates = useMemo(() => {
    return (
      <>
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
        <div
          style={{
            position: "absolute",
            left: 0,
            top: -50,
            width: MapWidth,
            textAlign: "center",
          }}
        >
          X
        </div>
      </>
    );
  }, []);

  const renderYCoordinates = useMemo(() => {
    return (
      <>
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
        <div
          style={{
            position: "absolute",
            left: -40,
            top: 0,
            height: MapWidth,
            display: "flex",
            alignItems: "center",
          }}
        >
          <span>Y</span>
        </div>
      </>
    );
  }, []);

  const renderOperationsArea = () => {
    return (
      <div
        style={{
          marginTop: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Input
            placeholder="x坐标"
            style={{ width: 100 }}
            onChange={handleXChange}
            value={inputX}
          />
          <Input
            placeholder="y坐标"
            style={{ width: 100 }}
            onChange={handleYChange}
            value={inputY}
          />
        </div>

        {isGameOver ? (
          <Button
            type="primary"
            onClick={restartGame}
            style={{ marginTop: 10 }}
          >
            重新开始
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={handleCheckCoordinates}
            style={{ marginTop: 10 }}
          >
            确认
          </Button>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h4
        style={{
          marginBottom: 60,
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
            return (
              <MinesweeperItem
                {...item}
                finishGame={finishGame}
                key={item.id}
                currentCoordinate={currentCoordinate}
                gameId={gameId}
                updateSafeCount={updateSafeCount}
              />
            );
          })}
        </div>
        {renderXCoordinates}
        {renderYCoordinates}
      </div>
      {renderOperationsArea()}
      <div
        style={{
          marginTop: 20,
        }}
      >
        <span style={{ textAlign: "center" }}>{notice}</span>
      </div>
      <div
        style={{
          marginTop: 20,
        }}
      >
        <p>地雷的坐标</p>
        <span
          style={{
            textAlign: "center",
          }}
        >
          {minesString}
        </span>
      </div>
    </div>
  );
};

export default Minesweeper;
