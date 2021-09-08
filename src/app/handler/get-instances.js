const getInstances = (reservations) => {
  const terminatedStatus = 48;

  const instances = reservations?.reduce(
    (acc, reservation) => acc.concat(reservation.Instances),
    []
  );

  console.log("Instances received: ", instances);

  const instancesIds = instances
    ?.filter((instance) => instance.State.Code != terminatedStatus)
    .map((instance) => instance.InstanceId);

  console.log("Instances ids: ", instancesIds);

  return instancesIds;
};

module.exports = getInstances;
