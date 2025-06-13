"use client";
import React, { useEffect, useState } from "react";
import { MineGap, MineWidth } from "@/app/Minesweeper/utils";

const MinesweeperItem = ({
  finishGame,
  mine = false,
}: {
  finishGame: () => void;
  mine?: boolean;
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isMine, setIsMine] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("white");
  useEffect(() => {
    if (mine) {
      setIsMine(true);
    }
  }, [mine]);

  const handleClick = () => {
    if (isMine) {
      setBackgroundColor("red");
      finishGame();
    } else if (!isClicked) {
      setBackgroundColor("green");
      setIsClicked(true);
      // 这里可以添加点击后的逻辑，例如揭露周围格子等
    }
  };
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
      <span></span>
    </div>
  );
};

export default MinesweeperItem;
