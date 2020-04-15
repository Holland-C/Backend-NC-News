exports.formatDates = (list) => {
  return list.map(({ created_at, ...restOfKeys }) => {
    const newKeys = {
      ...restOfKeys,
      created_at: new Date(created_at),
    };
    return newKeys;
  });
};

exports.makeRefObj = (list, keyToExtract, valueWanted) => {
  const lookupObj = {};
  if (list.length > 0) {
    list.forEach((item) => {
      const key = item[keyToExtract];
      const value = item[valueWanted];
      lookupObj[key] = value;
    });
  }
  return lookupObj;
};

exports.formatComments = (comments, articleRef) => {
  return comments.map(
    ({ created_by, belongs_to, created_at, ...restOfKeys }) => {
      const formattedComments = {
        author: created_by,
        article_id: articleRef[belongs_to],
        created_at: new Date(created_at),
        ...restOfKeys,
      };
      return formattedComments;
    }
  );
};
