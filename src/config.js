const config = {
  timeout: 10000,
  apiProtocol: 'http',
  apiPort: 3001,
  get apiUrl() {
    return `${this.apiProtocol}://${location.hostname}:${this.apiPort}`;
  },
  fetchDefaultOptions: {
    method: 'post',
    headers: {'Content-Type': 'application/json; charset=utf-8'}
  }
};

export default config;
