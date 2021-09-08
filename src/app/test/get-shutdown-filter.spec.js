const { getShutdownFilter } = require("../handler");

describe("Get filter tests", () => {
  test("Should return filter with tag Shutdown when TAG_FILTER is undefined", () => {
    //arrange
    const expected = {
      Filters: [
        {
          Name: "tag:Shutdown",
          Values: ["true"],
        },
      ],
    };

    //act
    const filter = getShutdownFilter();

    //assert
    expect(filter).toEqual(expected);
  });

  test("Should return filter with tag set on TAG_FILTER environment variable", () => {
    //arrange
    process.env.TAG_FILTER = "ChangingTagFilter";
    const expected = [{ Name: "tag:ChangingTagFilter", Values: ["true"] }];
    
    //act
    const filter = getShutdownFilter();

    //assert
    expect(filter).toHaveProperty("Filters", expected);
  });
});
