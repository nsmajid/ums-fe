export const state = () => ({
  loading: false,
  data: null
})

export const getters = {
  pageIsLoading(state) {
    return state.loading;
  },
  getPageData(state) {
    return state.data?.data;
  },
  getPageMeta(state) {
    return state.data?.data?.meta;
  },
  getPageStatus(state) {
    return state.data?.status;
  },
  getPageContents(state) {
    return state.data?.contents;
  },
  getPageSections(state) {
    return state.data?.contents?.sections ?? [];
  },
  getAssetUrl(state) {
    return state.data?.data?.url_assets ?? null;
  },
  getPageType(state) {
    return state.data?.data?.type ?? null;
  },
  pageIsPreview(state) {
    return state.data?.data?.preview ?? false;
  },
}

export const actions = {
  async FETCH_PAGE_DATA(context, {params}) {
    try {
      await context.commit('SET_LOADING', true);
      const {data} = await this.$axios.get('/content', {params});
      await context.commit('SET_DATA', data);
      await context.commit('SET_LOADING', false);
      await context.dispatch('mainLayout/FETCH_MAIN_LAYOUT_DATA', null, {root: true});
    } catch (error) {
      throw error;
    }
  },
  async FETCH_PAGE_PREVIEW_DATA(context, {id, params}) {
    try {
      await context.commit('SET_LOADING', true);
      const {data} = await this.$axios.get('/section/' + id, {params});
      await context.commit('SET_DATA', data);
      await context.commit('SET_LOADING', false);
    } catch (error) {
      throw error;
    }
  }
}

export const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading ? true : false;
  },
  SET_DATA(state, payload) {
    state.data = payload;
  },
}