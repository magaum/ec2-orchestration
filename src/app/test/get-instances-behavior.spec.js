const { StartInstancesCommand, StopInstancesCommand } = require("@aws-sdk/client-ec2");
const { getInstancesBehavior } = require("../handler");

describe("Get instances behavior tests", () => {
  test("Should return turn on behavior when SHUTDOWN is set to false", () => {
    //arrange
    process.env.SHUTDOWN = false;
    const currentHour = 11;
    const instancesIds = ["id1", "id2", "id3"];

    //act
    const behavior = getInstancesBehavior(currentHour, instancesIds);

    //expect
    expect(behavior).toBeInstanceOf(StartInstancesCommand);
  });

  test("Should return turn off behavior when SHUTDOWN is set to true and it's time", () => {
    //arrange
    process.env.SHUTDOWN = true;
    const currentHour = 21;
    const instancesIds = ["id1", "id2", "id3"];

    //act
    const behavior = getInstancesBehavior(currentHour, instancesIds);

    //expect
    expect(behavior).toBeInstanceOf(StopInstancesCommand);
  });
});
