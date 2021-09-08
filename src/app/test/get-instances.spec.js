const { getInstances } = require("../handler");

describe("Get instances tests", () => {
  test("Should return turn on behavior when SHUTDOWN is set to false", () => {
    //act
    const instances = getInstances(Reservations);

    //assert
    expect(instances).toHaveLength(3);
  });
});

//arrange
const Reservations = [
  {
    Instances: [
      {
        InstanceId: "i-070a1c15814252af5",
        State: {
          Code: 48, //Terminated
        },
      },
      {
        InstanceId: "i-00720e39d11a3d4b2",
        State: {
          Code: 16, // running
        },
      },
    ],
  },
  {
    Instances: [
      {
        InstanceId: "i-070a1c15814252ag6",
        State: {
          Code: 32, //shutting-down
        },
      },
      {
        InstanceId: "i-00801e39d11a3d4b4",
        State: {
          Code: 16, //running
        },
      },
    ],
  },
];
