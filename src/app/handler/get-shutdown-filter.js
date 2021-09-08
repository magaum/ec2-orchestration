const getShutdownFilter = () => {
  const tagFilter = `tag:${process.env.TAG_FILTER || "Shutdown"}`;

  return {
    Filters: [
      {
        Name: tagFilter,
        Values: ["true"],
      },
    ],
  };
};

module.exports = getShutdownFilter;
