import React, { FC, useMemo } from "react";

import MinesweeperItem from "@/app/Minesweeper/MinesweeperItem";

interface MineInterface {
  id: string; // x-y坐标 例如 '1-2' 表示第一行第二列的格子是否为雷
  mine: boolean;
  clicked: boolean;
  mineCount: number;
}

interface MinesMapProps {
  data: any;
  finishGame: () => void;
  currentCoordinate: string;
  gameId: number;
  updateSafeCount: () => void;
  width: number;
  height: number;
  isGameOver: boolean;
}

const MinesMap: FC<MinesMapProps> = ({
  data,
  finishGame,
  currentCoordinate,
  gameId,
  updateSafeCount,
  width,
  height,
  isGameOver,
}) => {
  const renderRow = (rowData: MineInterface[], index: number) => {
    return (
      <div
        key={"row" + index}
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {rowData?.map((item: MineInterface) => {
          return (
            <MinesweeperItem
              {...item}
              finishGame={finishGame}
              key={item.id}
              currentCoordinate={currentCoordinate}
              gameId={gameId}
              updateSafeCount={updateSafeCount}
              isGameOver={isGameOver}
            />
          );
        })}
      </div>
    );
  };

  const renderXCoordinates = useMemo(() => {
    return (
      <>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: -30,
            display: "flex",
            width: "100%",
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
            textAlign: "center",
            width: "100%",
          }}
        >
          X
        </div>
      </>
    );
  }, [width]);

  const renderYCoordinates = useMemo(() => {
    return (
      <>
        <div
          style={{
            position: "absolute",
            left: -30,
            top: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          {new Array(height).fill(0).map((_, index) => {
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
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span>Y</span>
        </div>
      </>
    );
  }, [height]);

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {data?.map((rowData: MineInterface[], index: number) => {
          return renderRow(rowData, index);
        })}
      </div>
      {renderXCoordinates}
      {renderYCoordinates}
    </div>
  );
};

export default MinesMap;
