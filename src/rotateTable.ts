import { TableInput, TableOutput } from "./types";

export const rotateTable = (table: TableInput): TableOutput => {
  try {
    const data = JSON.parse(table.json);

    if (!Array.isArray(data) || data.length === 0) {
      return {
        id: table.id,
        json: "[]",
        is_valid: false,
      };
    }

    const length = data.length;
    const side = Math.sqrt(length);

    if (!Number.isInteger(side)) {
      return {
        id: table.id,
        json: "[]",
        is_valid: false,
      };
    }

    if (length === 1) {
      return {
        id: table.id,
        json: JSON.stringify(data),
        is_valid: true,
      };
    }

    const rotated = rotateLeft(data, side);

    return {
      id: table.id,
      json: JSON.stringify(rotated),
      is_valid: true,
    };
  } catch (error) {
    return {
      id: table.id,
      json: "[]",
      is_valid: false,
    };
  }
};

const rotateLeft = (data: number[], side: number): number[] => {
  const result = [...data];
  const rings = Math.floor(side / 2);

  for (let r = 0; r < rings; r++) {
    const layerStart = r;
    const layerEnd = side - 1 - r;
    const ringElements: number[] = [];
    const ringIndices: number[] = [];

    for (let col = layerStart; col < layerEnd; col++) {
      ringIndices.push(layerStart * side + col);
      ringElements.push(data[layerStart * side + col]);
    }
    for (let row = layerStart; row < layerEnd; row++) {
      ringIndices.push(row * side + layerEnd);
      ringElements.push(data[row * side + layerEnd]);
    }
    for (let col = layerEnd; col > layerStart; col--) {
      ringIndices.push(layerEnd * side + col);
      ringElements.push(data[layerEnd * side + col]);
    }
    for (let row = layerEnd; row > layerStart; row--) {
      ringIndices.push(row * side + layerStart);
      ringElements.push(data[row * side + layerStart]);
    }

    if (ringElements.length > 0) {
      const lastElement = ringElements.pop()!;
      ringElements.unshift(lastElement);
    }

    for (let i = 0; i < ringIndices.length; i++) {
      result[ringIndices[i]] = ringElements[i];
    }
  }

  return result;
};
