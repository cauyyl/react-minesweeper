"use client";
import React, { useEffect, useRef } from "react";
import { Button, Input } from "antd";
import MinesMap from "@/app/Minesweeper/MinesMap";
import { generateMinesData } from "@/app/Minesweeper/dataFactory";
import { MineInterface } from "@/app/Minesweeper/mine";
import {
  DefaultHeight,
  DefaultMineCount,
  DefaultWidth,
} from "@/app/Minesweeper/utils";

const Minesweeper = () => {
  const mounted = useRef(false);

  const [notice, setNotice] = React.useState("");
  const [mineArray, setMineArray] = React.useState<any>();
  const [inputX, setInputX] = React.useState("");
  const [inputY, setInputY] = React.useState("");
  const [currentCoordinate, setCurrentCoordinate] = React.useState("");
  const [isGameOver, setIsGameOver] = React.useState(false);
  const [gameId, setGameId] = React.useState(1);
  const [spendTime, setSpendTime] = React.useState(0);
  const [safeCount, setSafeCount] = React.useState(
    DefaultWidth * DefaultHeight - DefaultMineCount
  );
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (mounted.current) return;
    generateMineArray();
    mounted.current = true;
    return () => {
      clearTimer();
    };
  }, []);

  useEffect(() => {
    console.log("safeCount:", safeCount);
    if (safeCount <= 0) {
      setIsGameOver(true);
      setNotice("Congratulations! You Win!");
    }
  }, [safeCount]);

  useEffect(() => {
    updateSafeCount(mineArray);
  }, [mineArray]);

  useEffect(() => {
    if (isGameOver) {
      clearTimer();
    }
  }, [isGameOver]);
  const startTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setSpendTime(prev => prev + 1);
      }, 1000);
    }
  };

  const clearTimer = () => {
    if (timerRef?.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const updateSafeCount = (data: MineInterface[][]) => {
    if (Array.isArray(data) && data.length > 0) {
      let countTemp = 0;
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
          if (!data[i][j].isSwept && !data[i][j].mine) {
            countTemp++;
          }
        }
        console.log("countTemp:", countTemp);
      }

      setSafeCount(countTemp);
    }
  };
  const generateMineArray = () => {
    setMineArray(
      generateMinesData({
        width: DefaultWidth,
        height: DefaultHeight,
        mineCount: DefaultMineCount,
      })
    );
  };
  const onClickBox = (item: MineInterface) => {
    if (!timerRef.current) {
      startTimer();
    }
    // 传过来x，y，都是从0开始的， mine为true表示为雷，mineCount表示当前格子周围雷的数量
    if (item.mine) {
      // 当前格子是地雷，游戏结束，不需要做处理。
    } else if (item.mineCount > 0) {
      // setSafeCount(safeCount - 1);
      // 当前格子周围有雷，只需要记录格子的点击状态
      // console.log(`格子${item.x}-${item.y}周围有雷`);
      mineArray[item.y][item.x].isSwept = true;
      setMineArray(mineArray);
      updateSafeCount(mineArray);
    } else {
      // setSafeCount(safeCount - 1);
      // 当前格子周围没有雷，需要把周围的格子全部翻开
      // console.log(`格子${item.x}-${item.y}周围没有雷`);
      searchEmptyBox(mineArray, item.y, item.x);
    }
  };

  const searchEmptyBox = (data: MineInterface[][], x: number, y: number) => {
    data[x][y].isSwept = true;
    if (data[x][y].mineCount == 0) {
      // 翻转上方的格子
      if (x - 1 >= 0 && !data[x - 1][y].isSwept) {
        searchEmptyBox(data, x - 1, y);
      }
      // 翻转下方的格子
      if (x + 1 < DefaultHeight && !data[x + 1][y].isSwept) {
        searchEmptyBox(data, x + 1, y);
      }
      // 翻转左方的格子
      if (y - 1 >= 0 && !data[x][y - 1].isSwept) {
        searchEmptyBox(data, x, y - 1);
      }
      // 翻转右方的格子
      if (y + 1 < DefaultWidth && !data[x][y + 1].isSwept) {
        searchEmptyBox(data, x, y + 1);
      }
      // 翻转左上方的格子
      if (x - 1 >= 0 && y - 1 >= 0 && !data[x - 1][y - 1].isSwept) {
        searchEmptyBox(data, x - 1, y - 1);
      }
      // 翻转左下方的格子
      if (x + 1 < DefaultHeight && y - 1 >= 0 && !data[x + 1][y - 1].isSwept) {
        searchEmptyBox(data, x + 1, y - 1);
      }
      // 翻转右上方的格子
      if (x - 1 >= 0 && y + 1 < DefaultWidth && !data[x - 1][y + 1].isSwept) {
        searchEmptyBox(data, x - 1, y + 1);
      }
      // 翻转右下方的格子
      if (
        x + 1 < DefaultHeight &&
        y + 1 < DefaultWidth &&
        !data[x + 1][y + 1].isSwept
      ) {
        searchEmptyBox(data, x + 1, y + 1);
      }
    }
    setMineArray(data);
    updateSafeCount(data);
  };

  const restartGame = () => {
    generateMineArray();
    setNotice("");
    setCurrentCoordinate("");
    setIsGameOver(false);
    setGameId(gameId + 1);
    setSafeCount(DefaultWidth * DefaultHeight - DefaultMineCount);
    setSpendTime(0);
  };

  const finishGame = () => {
    console.log("game over");
    setNotice("Game Over");
    setIsGameOver(true);
  };

  const handleCheckCoordinates = () => {
    setCurrentCoordinate(`${Number(inputX) - 1}-${Number(inputY) - 1}`);
    setInputX("");
    setInputY("");
  };
  const handleXChange = (e: any) => {
    const value = e.target.value;
    if (value < 1 || value > DefaultWidth) {
      setNotice("x坐标超出范围，请重新输入");
      setInputX("");
    } else {
      setNotice("");
      setInputX(e.target.value);
    }
  };

  const handleYChange = (e: any) => {
    const value = e.target.value;
    if (value < 1 || value > DefaultHeight) {
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
        <Button
          type="primary"
          onClick={restartGame}
          style={{ marginTop: 10, marginRight: 20 }}
        >
          重新开始
        </Button>
        {isGameOver ? null : (
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
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          marginBottom: 60,
          textAlign: "center",
        }}
      >
        <h4
          style={{
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Minesweeper
        </h4>
        <span>safe box count：{safeCount}</span>
      </div>
      <MinesMap
        data={mineArray}
        currentCoordinate={currentCoordinate}
        finishGame={finishGame}
        width={DefaultWidth}
        height={DefaultHeight}
        gameId={gameId}
        onClickBox={onClickBox}
        isGameOver={isGameOver}
      />
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
          position: "absolute",
          top: 0,
          right: 0,
        }}
      >
        {spendTime}s
      </div>
    </div>
  );
};

export default Minesweeper;
