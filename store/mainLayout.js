export const state = () => ({
  data: null
})

export const getters = {
  getMainLayoutData(state) {
    return state.data;
  },
}

export const actions = {
  async FETCH_MAIN_LAYOUT_DATA(context) {
    try {
      let params = {};
      const {language} = context.rootGetters['page/getPageData'] ?? {};
      const {current} = language ?? {};
      if (current) params['language'] = current;
      const {data} = await this.$axios.get('/headerfooter', {params});
      await context.commit('SET_MAIN_LAYOUT_DATA', data);
    } catch (error) {
      throw error;
    }
  },
}

export const mutations = {
  SET_MAIN_LAYOUT_DATA(state, data) {
    state.data = data;
  }
}