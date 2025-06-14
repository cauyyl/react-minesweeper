"use client";
import React, { useEffect, useMemo, useState } from "react";
import { MineGap, MineWidth } from "@/app/Minesweeper/utils";

const MinesweeperItem = ({
  finishGame,
  mine = false,
  currentCoordinate,
  id,
  gameId,
  updateSafeCount,
  mineCount,
}: {
  finishGame: () => void;
  mine?: boolean;
  currentCoordinate: string;
  id: string;
  gameId: number;
  updateSafeCount: () => void;
  mineCount: number;
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
    setBackgroundColor("red");
    finishGame();
  };
  const handleSafe = () => {
    setBackgroundColor("green");
    updateSafeCount();
    setIsClicked(true);
  };

  const getLabel = useMemo(() => {
    if (isClicked && isMine) {
      return "雷";
    } else if (isClicked && !isMine) {
      return mineCount;
    } else {
      return "";
    }
  }, [mineCount, isClicked, isMine]);
  return (
    <div
      style={{
        width: MineWidth,
        height: MineWidth,
        margin: `${MineGap}px`,
        border: "1px solid #ccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        backgroundColor: backgroundColor,
      }}
      onClick={handleClick}
    >
      <span>{getLabel}</span>
    </div>
  );
};

export default MinesweeperItem;
