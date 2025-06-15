"use client";
import React, { useEffect, useRef } from "react";
import { Button, Input } from "antd";
import MinesMap from "@/app/Minesweeper/MinesMap";
import { generateMinesData } from "@/app/Minesweeper/dataFactory";

const width = 5;
const height = 5;
const DefaultMineCount = 5;

const Minesweeper = () => {
  const mounted = useRef(false);

  const [notice, setNotice] = React.useState("");
  const [mineArray, setMineArray] = React.useState<any>();
  const [inputX, setInputX] = React.useState("");
  const [inputY, setInputY] = React.useState("");
  const [currentCoordinate, setCurrentCoordinate] = React.useState("");
  const [isGameOver, setIsGameOver] = React.useState(false);
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
    console.log("safeCount:", safeCount);
    if (safeCount <= 0) {
      setIsGameOver(true);
      setNotice("Congratulations! You Win!");
    }
  }, [safeCount]);

  const generateMineArray = () => {
    setMineArray(
      generateMinesData({ width, height, mineCount: DefaultMineCount })
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
    setSafeCount(width * height - DefaultMineCount);
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
      <MinesMap
        data={mineArray}
        currentCoordinate={currentCoordinate}
        finishGame={finishGame}
        width={width}
        height={height}
        gameId={gameId}
        updateSafeCount={updateSafeCount}
      />
      {renderOperationsArea()}
      <div
        style={{
          marginTop: 20,
        }}
      >
        <span style={{ textAlign: "center" }}>{notice}</span>
      </div>
    </div>
  );
};

export default Minesweeper;
