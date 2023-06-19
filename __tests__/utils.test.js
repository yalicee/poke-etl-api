const { arrangeMovesData } = require("../__utils__/arrangeData");

describe("arrangeMovesData", () => {
  test("Should return an empty array when passed an empty array", () => {
    expect(arrangeMovesData([])).toEqual([]);
  });
  test("Should return a single move when passed an array of a single pokemon object with one move", () => {
    expect(
      arrangeMovesData([
        {
          name: "bulbasaur",
          height: 7,
          weight: 69,
          moves: ["razor-wind"],
          sprites:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
          types: ["grass", "poison"],
          id: 1,
        },
      ])
    ).toEqual([["razor-wind"]]);
  });
  test("Should return multiple moves when passed an array of a single pokemon object with multiple moves", () => {
    expect(
      arrangeMovesData([
        {
          name: "bulbasaur",
          height: 7,
          weight: 69,
          moves: ["razor-wind", "tackle", "hydro-blast"],
          sprites:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
          types: ["grass", "poison"],
          id: 1,
        },
      ])
    ).toEqual([["razor-wind"], ["tackle"], ["hydro-blast"]]);
  });
  test("Should return multiple moves when passed an array of pokemon objects", () => {
    expect(
      arrangeMovesData([
        {
          name: "bulbasaur",
          height: 7,
          weight: 69,
          moves: ["razor-wind", "tackle", "hydro-blast"],
          sprites:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
          types: ["grass", "poison"],
          id: 1,
        },
        {
          name: "pikachu",
          height: 4,
          weight: 48,
          moves: ["lightning-bolt"],
          sprites:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
          types: ["electric", "poison"],
          id: 2,
        },
      ])
    ).toEqual([
      ["razor-wind"],
      ["tackle"],
      ["hydro-blast"],
      ["lightning-bolt"],
    ]);
  });
  test("The output array shouldn't contain duplicate moves", () => {
    expect(
      arrangeMovesData([
        {
          name: "bulbasaur",
          height: 7,
          weight: 69,
          moves: ["tackle", "hydro-blast"],
          sprites:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
          types: ["grass", "poison"],
          id: 1,
        },
        {
          name: "pikachu",
          height: 4,
          weight: 48,
          moves: ["tackle", "lightning-bolt"],
          sprites:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
          types: ["electric", "poison"],
          id: 2,
        },
      ])
    ).toEqual([["tackle"], ["hydro-blast"], ["lightning-bolt"]]);
  });
  test("should return a new array", () => {
    const input = [
      {
        name: "bulbasaur",
        height: 7,
        weight: 69,
        moves: ["tackle", "hydro-blast"],
        sprites:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        types: ["grass", "poison"],
        id: 1,
      },
      {
        name: "pikachu",
        height: 4,
        weight: 48,
        moves: ["tackle", "lightning-bolt"],
        sprites:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        types: ["electric", "poison"],
        id: 2,
      },
    ];
    expect(arrangeMovesData(input)).not.toBe(input);
  });
  test("shouldn't mutate input array", () => {
    const input = [
      {
        name: "bulbasaur",
        height: 7,
        weight: 69,
        moves: ["tackle", "hydro-blast"],
        sprites:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        types: ["grass", "poison"],
        id: 1,
      },
    ];
    const copyInput = [
      {
        name: "bulbasaur",
        height: 7,
        weight: 69,
        moves: ["tackle", "hydro-blast"],
        sprites:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        types: ["grass", "poison"],
        id: 1,
      },
    ];
    arrangeMovesData(input);
    expect(input).toEqual(copyInput);
  });
});
