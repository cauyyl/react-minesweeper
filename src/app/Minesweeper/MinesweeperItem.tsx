"use client";
import React, { useEffect, useMemo, useState } from "react";
import { MineGap, MineHeight, MineWidth } from "@/app/Minesweeper/utils";
import { Button } from "antd";

const MinesweeperItem = ({
  finishGame,
  mine = false,
  currentCoordinate,
  id,
  gameId,
  updateSafeCount,
  mineCount,
  isGameOver,
}: {
  finishGame: () => void;
  mine?: boolean;
  currentCoordinate: string;
  id: string;
  gameId: number;
  updateSafeCount: () => void;
  mineCount: number;
  isGameOver: boolean;
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isMine, setIsMine] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("white");
  useEffect(() => {
    // 开启新一轮游戏了，通过gameId重置方格的状态
    setIsClicked(false);
    setBackgroundColor("white");
  }, [gameId]);

  useEffect(() => {
    setIsMine(mine);
    if (mine) {
      setBackgroundColor("#eee");
    }
  }, [mine]);

  useEffect(() => {
    if (currentCoordinate == id) {
      handleClick();
    }
  }, [currentCoordinate, id]);

  const handleClick = () => {
    if (isMine) {
      handleIsMine();
    } else if (!isClicked) {
      handleSafe();
    }
  };

  const handleIsMine = () => {
    setBackgroundColor("#efabab");
    setIsClicked(true);
    finishGame();
  };
  const handleSafe = () => {
    setBackgroundColor("#b9f3b9");
    updateSafeCount();
    setIsClicked(true);
  };

  const getLabel = useMemo(() => {
    console.log("isClicked, isMine", isClicked, "-", isMine);
    if (isClicked && isMine) {
      return "雷";
    } else if (isClicked && !isMine) {
      return mineCount;
    } else {
      return "";
    }
  }, [mineCount, isClicked, isMine]);

  const handleMouseUp = (e: any) => {
    e.preventDefault();
    if (e.button === 2) {
      console.log("右键");
      // 暂时不支持右键标记为雷，因为这样，需要引入更复杂的逻辑，暂时不实现
      handleClick();
    } else {
      console.log("左键");
      handleClick();
    }
  };
  return (
    <Button
      disabled={isGameOver}
      style={{
        width: MineWidth,
        height: MineHeight,
        margin: `${MineGap}px`,
        border: "1px solid #ccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        backgroundColor: backgroundColor,
      }}
      onClick={handleClick}
      // onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onContextMenu={e => {
        e.preventDefault();
      }}
    >
      {getLabel}
    </Button>
  );
};

export default MinesweeperItem;
