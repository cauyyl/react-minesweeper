export interface MineInterface {
  id?: string; // x-y坐标 例如 '1-2' 表示第一行第二列的格子是否为雷
  mine: boolean;
  clicked?: boolean;
  mineCount: number;
  x: number;
  y: number;
  isSwept?: boolean;
}

export interface MinesMapProps {
  data: any;
  finishGame: () => void;
  currentCoordinate: string;
  gameId: number;
  onClickBox: (item: MineInterface) => void;
  width: number;
  height: number;
  isGameOver: boolean;
}
