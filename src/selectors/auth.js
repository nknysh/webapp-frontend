const getAuthToken = (state) => state.auth.data.token;
const getCurrentUser = (state) => state.auth.data.user;
const isAuthenticated = (state) => !!state.auth.data.token;
const isAuthLoading = (state) => !!state.auth.loading;

export {
  getAuthToken,
  getCurrentUser,
  isAuthenticated,
  isAuthLoading,
};
