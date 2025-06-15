const generateMinesData = ({
  width,
  height,
  mineCount,
}: {
  width: number;
  height: number;
  mineCount: number;
}) => {
  // 根据width和height生成一个二维数组,1代表雷，0代表空
  const numArrWithMine = generateSimpleArray(width, height, mineCount);
  // 统计每个格子周围的地雷数
  const mineCountArray = getMineCount(numArrWithMine);
  // 组装数据
  return generateMinesArray(numArrWithMine, mineCountArray, width, height);
};

// 生成一个二维数组，1代表雷，0代表空
function generateSimpleArray(
  width: number,
  height: number,
  total: number
): number[][] {
  if (total > width * height) {
    throw new Error("雷的总数不能大于格数");
  }
  const array = new Array(height).fill(0).map(() => new Array(width).fill(0));
  let count = total;
  while (count > 0) {
    const xIndex = Math.floor(Math.random() * width);
    const yIndex = Math.floor(Math.random() * height);
    if (array[yIndex][xIndex] === 0) {
      array[yIndex][xIndex] = 1;
      count--;
    }
  }
  console.log("array:", array);
  return array;
}

// 统计每个格子周围的地雷数
function getMineCount(data: number[][]) {
  // 定义result，复制data
  const result = JSON.parse(JSON.stringify(data));
  // 遍历二维数组，统计每个格子周围的地雷数
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] === 1) {
        continue;
      }
      let count = 0;
      // 上方
      if (i > 0 && data[i - 1][j] === 1) {
        count++;
      }
      // 下方
      if (i < data.length - 1 && data[i + 1][j] === 1) {
        count++;
      }
      // 左方
      if (j > 0 && data[i][j - 1] === 1) {
        count++;
      }
      // 右方
      if (j < data[i].length - 1 && data[i][j + 1] === 1) {
        count++;
      }
      // 左上
      if (i > 0 && j > 0 && data[i - 1][j - 1] === 1) {
        count++;
      }
      // 右上
      if (i > 0 && j < data[i].length - 1 && data[i - 1][j + 1] === 1) {
        count++;
      }
      // 左下
      if (i < data.length - 1 && j > 0 && data[i + 1][j - 1] === 1) {
        count++;
      }
      // 右下
      if (
        i < data.length - 1 &&
        j < data[i].length - 1 &&
        data[i + 1][j + 1] === 1
      ) {
        count++;
      }
      result[i][j] = count;
    }
  }
  console.log("result:", result);
  return result;
}

function generateMinesArray(
  mineArray: number[][],
  countArray: number[][],
  width: number,
  height: number
): number[][] {
  const result = JSON.parse(JSON.stringify(mineArray));
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      result[i][j] = {
        id: `${i}-${j}`,
        x: i,
        y: j,
        mine: mineArray[i][j] == 1,
        clicked: false,
        mineCount: countArray[i][j],
      };
    }
  }
  return result;
}

export { generateMinesData };
