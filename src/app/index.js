const { EC2Client, DescribeInstancesCommand } = require("@aws-sdk/client-ec2");
const {
  getInstances,
  getInstancesBehavior,
  getShutdownFilter,
} = require("./handler");

const handler = async (event) => {
  const currentDate = new Date();

  console.log("Event ", event);
  console.log("Lambda starting at: ", currentDate);

  const ec2Client = new EC2Client({
    region: process.env.REGION || "us-east-1",
  });

  const instancesToStopFilter = new DescribeInstancesCommand(
    getShutdownFilter()
  );

  const { Reservations } = await ec2Client.send(instancesToStopFilter);

  const instancesIds = getInstances(Reservations);
  
  const currentHour = new Date().getUTCHours();

  const instancesBehavior = getInstancesBehavior(currentHour, instancesIds);

  await ec2Client.send(instancesBehavior);

  return `Instances ${instancesIds} changed successfully`;
};

module.exports = {
  handler,
};
