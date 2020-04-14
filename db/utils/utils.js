exports.formatDates = (list) => {
  return list.map(({ created_at, ...restOfKeys }) => {
    const newKeys = {
      ...restOfKeys,
      created_at: new Date(created_at),
    };
    return newKeys;
  });
};

exports.makeRefObj = (list) => {};

exports.formatComments = (comments, articleRef) => {};
