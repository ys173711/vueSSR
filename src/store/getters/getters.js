export default {
  fullName (state, getters, rootState) {
    return `${state.firstName}  ${state.lastName}`
  }
};
