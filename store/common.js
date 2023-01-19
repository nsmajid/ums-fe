export const state = () => ({
  pageWidth: 0,
  toggleSearchbox: false
})

export const getters = {
  getPageWidth(state) {
    return state.pageWidth;
  },
  getToggleSearchbox(state) {
    return state.toggleSearchbox;
  },
}

export const actions = {
  INIT_PAGE_WIDTH_LISTENER(context) {
    window.addEventListener('resize', function(){
      context.commit('SET_PAGE_WIDTH', window.innerWidth);
    });
  },
  TOGGLE_SEACRHBOX(context, value) {
    context.commit('SET_TOGGLE_SEARCHBOX', Boolean(value));
  }
}

export const mutations = {
  SET_PAGE_WIDTH(state, width) {
    state.pageWidth = width ?? 0;
  },
  SET_TOGGLE_SEARCHBOX(state, value) {
    state.toggleSearchbox = value;
  }
}