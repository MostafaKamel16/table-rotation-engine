import { rotateTable } from "../rotateTable";

describe("rotateTable", () => {
  // Valid cases
  test("should rotate 3x3 table correctly", () => {
    const input = { id: "1", json: "[1,2,3,4,5,6,7,8,9]" };
    const expected = { id: "1", json: "[4,1,2,7,5,3,8,9,6]", is_valid: true };
    expect(rotateTable(input)).toEqual(expected);
  });

  test("should rotate 2x2 table correctly", () => {
    const input = { id: "2", json: "[40,20,90,10]" };
    const expected = [{ id: "2", json: "[90,40,10,20]", is_valid: true }];
    expect(rotateTable(input)).toEqual(expected);
  });

  test("should handle single element table", () => {
    const input = { id: "3", json: "[-5]" };
    const expected = [{ id: "3", json: "[-5]", is_valid: true }];
    expect(rotateTable(input)).toEqual(expected);
  });

  test("should rotate 4x4 table correctly", () => {
    const input = { id: "4", json: "[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]" };
    const expected = [
      {
        id: "4",
        json: "[5,1,2,3,9,10,6,4,13,11,7,8,14,15,16,12]",
        is_valid: true,
      },
    ];
    expect(rotateTable(input)).toEqual(expected);
  });

  test("should handle negative numbers", () => {
    const input = { id: "10", json: "[-1,-2,-3,-4]" };
    const expected = [{ id: "10", json: "[-3,-1,-4,-2]", is_valid: true }];
    expect(rotateTable(input)).toEqual(expected);
  });

  // Invalid cases
  test("should handle empty array", () => {
    const input = { id: "5", json: "[]" };
    const expected = [{ id: "5", json: "[]", is_valid: false }];
    expect(rotateTable(input)).toEqual(expected);
  });

  test("should handle non-perfect square arrays", () => {
    const input = { id: "6", json: "[1,2,3,4,5]" };
    const expected = [{ id: "6", json: "[]", is_valid: false }];
    expect(rotateTable(input)).toEqual(expected);
  });

  test("should handle invalid JSON", () => {
    const input = { id: "7", json: "not_a_json_array" };
    const expected = [{ id: "7", json: "[]", is_valid: false }];
    expect(rotateTable(input)).toEqual(expected);
  });

  test("should handle non-array JSON", () => {
    const input = { id: "8", json: '{"key": "value"}' };
    const expected = [{ id: "8", json: "[]", is_valid: false }];
    expect(rotateTable(input)).toEqual(expected);
  });
});
