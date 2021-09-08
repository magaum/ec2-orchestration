const {
  StopInstancesCommand,
  StartInstancesCommand,
} = require("@aws-sdk/client-ec2");

const getInstancesBehavior = (currentHour, instancesIds) => {
  const shutdownTime = process.env.TIME_TO_SHUTDOWN || 21;
  const shoudShutdownNow = JSON.parse(process.env.SHUTDOWN);

  console.log("Current hour: ", currentHour);

  let instancesBehavior = new StartInstancesCommand({
    InstanceIds: instancesIds,
  });

  if (shoudShutdownNow && currentHour >= shutdownTime) {
    instancesBehavior = new StopInstancesCommand({
      InstanceIds: instancesIds,
    });
  }

  return instancesBehavior;
};

module.exports = getInstancesBehavior;
