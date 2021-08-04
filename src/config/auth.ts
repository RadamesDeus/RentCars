export default {
  jwt: {
    secret: process.env.JWT_KEY || 'test',
    secret_refresh: process.env.JWT_REFRESH_KEY || 'test2',
    expiresIn: '15m',
    expiresIn_Refresh: '30d',
    expiresIn_Refresh_day: 30,
  },
};
