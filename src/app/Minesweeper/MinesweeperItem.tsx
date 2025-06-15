"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  GodMode,
  MineGap,
  MineHeight,
  MineWidth,
} from "@/app/Minesweeper/utils";
import { Button } from "antd";
import Image from "next/image";
import { MineInterface } from "@/app/Minesweeper/mine";
import MineImage from "@/public/images/icons/icon_mine.jpg";

const MinesweeperItem = ({
  finishGame,
  mine = false,
  currentCoordinate,
  id,
  gameId,
  onClickBox,
  mineCount,
  isGameOver,
  x,
  y,
  isSwept,
}: {
  finishGame: () => void;
  mine?: boolean;
  currentCoordinate: string;
  id?: string;
  gameId: number;
  onClickBox: (item: MineInterface) => void;
  mineCount: number;
  isGameOver: boolean;
  x: number;
  y: number;
  isSwept?: boolean;
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
    if (GodMode && mine) {
      setBackgroundColor("#a3d3f1");
    }
  }, [mine]);

  useEffect(() => {
    if (isSwept) {
      handleClick();
    }
  }, [isSwept]);

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
    setBackgroundColor("#FFF");
    setIsClicked(true);
    finishGame();
  };
  const handleSafe = () => {
    if (mineCount > 0) {
      setBackgroundColor("#b9f3b9");
    } else {
      setBackgroundColor("#eee");
    }

    onClickBox({
      x,
      y,
      mine,
      mineCount,
    });
    setIsClicked(true);
  };

  const getLabel = useMemo(() => {
    // console.log("isClicked, isMine", isClicked, "-", isMine);
    if (isClicked && isMine) {
      return (
        <Image width={MineWidth} height={MineHeight} src={MineImage} alt={""} />
      );
    } else if (isClicked && !isMine) {
      return mineCount > 0 ? mineCount : "";
    } else {
      return "";
    }
  }, [mineCount, isClicked, isMine]);

  const handleMouseUp = (e: any) => {
    // console.log("x:", x);
    // console.log("y:", y);
    // console.log("id: ", id);
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
      // onClick={handleClick}
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
