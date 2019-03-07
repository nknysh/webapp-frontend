export const withRequestHelpers = client => {
  client.uploadFile = (url, file) => {
    const params = new FormData();
    params.append('file', file, file.name);

    return client.post(url, params);
  };

  client.order = order => {
    client.query.order = order;
    return client;
  };

  client.limit = limit => {
    client.query.limit = limit;
    return client;
  };

  client.query = params => {
    client.query = {
      ...client.query,
      ...params,
    };
    return client;
  };

  return client;
};
