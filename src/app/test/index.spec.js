const { handler } = require("../index");
const { EC2Client, DescribeInstancesCommand } = require("@aws-sdk/client-ec2");
const { mockClient } = require("aws-sdk-client-mock");

describe("Handler tests", () => {
  test("Should return instances ids with state change message", async () => {
    //arrange
    process.env.SHUTDOWN = false;

    mockClient(EC2Client).on(DescribeInstancesCommand).resolves({
      Reservations,
    });

    //act
    const lambdaResponse = await handler();

    //expect
    expect(lambdaResponse).toEqual(
      `Instances ${instancesIds} changed successfully`
    );
  });
});

const Reservations = [
  {
    Instances: [
      {
        InstanceId: "i-00720e39d11a3d4b2",
        State: {
          Code: 16, //running
        },
      },
    ],
  },
];

const instancesIds =
  "i-00720e39d11a3d4b2";