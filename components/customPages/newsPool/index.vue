<template>
  <section
  :id="data.slug_id"
  class="fe-section position-relative">
    <div class="d-block d-md-none position-sticky fw-shadow">
      <div class="d-flex align-items-center bg-light-gray p-3">
        <span 
        @click="sidebar_open = !sidebar_open"
        :class="`mdi mdi-menu${sidebar_open ? '-open' : ''} fs-7 cursor-pointer`"/>
        <span class="fs-subtitle-2 fw-600 text-right ml-2">
          {{ body.tag_label }}
        </span>
      </div>
    </div>
    <div
    v-if="sidebar_open"
    class="position-absolute left-0 z-index-1 d-block d-md-none w-75 h-75 px-4 py-3 bg-white fe-shadow">
      <template v-for="(tag, index) in (body.tags || [])">
        <div
        :key="index"
        :class="`w-100 text-left mb-3 news-pool-menu-item ${hasActiveChild(tag.child) ? 'collapsed' : ''}`">
          <span class="fs-subtitle-2 fw-500 cursor-pointer">
            <span @click="handleShowSubMenu">
              <span v-if="(tag.child && tag.child.length > 0)" class="mdi mdi-menu-right hide-child-icon"/>
              <span v-if="(tag.child && tag.child.length > 0)" class="mdi mdi-menu-down show-child-icon"/>
            </span>
            <span
            v-if="(tag.child && tag.child.length > 0)"
            @click="handleShowSubMenu"
            :class="`text-black ${currentSlug == tag.slug ? 'fw-700' : ''}`">
              {{ tag.name }}
            </span>
            <a
            v-else
            :href="tag.url"
            :class="`text-black ${currentSlug == tag.slug ? 'fw-700' : ''}`">
              {{ tag.name }}
            </a>
          </span>
          <div :class="`news-pool-sub-menu mr-4 ${hasActiveChild(tag.child) ? 'active' : ''}`">
            <template v-for="(child, i) in (tag.child || [])">
              <div :key="i" class="w-100 text-left">
                <a :href="child.url"
                :class="`fs-content-1 text-black ${currentSlug == child.slug ? 'fw-700' : 'fw-500'}`">
                  {{ child.name }}
                </a>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
    <div class="fe-wrapper w-100 my-4 my-md-5">
      <div class="row mx-0">
        <div class="col col-12 col-md-3">
          <div class="news-pool-navigation pr-2 pr-lg-4 mb-4 d-none d-md-block">
            <div class="fs-title-2 fw-700 font-title text-right">
              {{ body.tag_label }}
            </div>
            <div
            v-if="body.tag_label"
            class="d-flex justify-content-end mt-2 mb-3">
              <div class="fe-separator"/>
            </div>
            <template v-for="(tag, index) in (body.tags || [])">
              <div
              :key="index"
              :class="`w-100 text-right mb-3 news-pool-menu-item ${hasActiveChild(tag.child) ? 'collapsed' : ''}`">
                <span class="fs-subtitle-2 fw-500 cursor-pointer">
                  <span
                  v-if="(tag.child && tag.child.length > 0)"
                  @click="handleShowSubMenu"
                  :class="`text-black ${currentSlug == tag.slug ? 'fw-700' : ''}`">
                    {{ tag.name }}
                  </span>
                  <a
                  v-else
                  :href="tag.url"
                  :class="`text-black ${currentSlug == tag.slug ? 'fw-700' : ''}`">
                    {{ tag.name }}
                  </a>
                  <span @click="handleShowSubMenu">
                    <span v-if="(tag.child && tag.child.length > 0)" class="mdi mdi-menu-right hide-child-icon"/>
                    <span v-if="(tag.child && tag.child.length > 0)" class="mdi mdi-menu-down show-child-icon"/>
                  </span>
                </span>
                <div :class="`news-pool-sub-menu mr-4 ${hasActiveChild(tag.child) ? 'active' : ''}`">
                  <template v-for="(child, i) in (tag.child || [])">
                    <div :key="i" class="w-100 text-right">
                      <a :href="child.url"
                      :class="`fs-content-1 text-black ${currentSlug == child.slug ? 'fw-700' : 'fw-500'}`">
                        {{ child.name }}
                      </a>
                    </div>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div
        v-if="(news_list && news_list.length > 0)"
        class="col col-12 col-md-9 pb-5 px-0">
          <template
          v-for="(row, index) in (news_list || [])">
            <fragment :key="index">
              <a
              v-if="index < 1"
              :href="row.url">
                <div class="w-100 mb-4 news-pool-headline-wrapper text-black">
                  <img alt="" :src="assetUrl + body.image_background_first_index"/>
                  <a
                  v-if="row.url"
                  :href="row.url"
                  class="bg-secondary text-primary p-3 news-pool-headline-shortcut-link cursor-pointer z-index-1">
                    <i class="mdi mdi-arrow-top-right fs-title-2 fw-700"/>
                  </a>
                  <div class="news-pool-headline-main-content">
                    <div class="px-3 px-lg-4 py-2 py-lg-3 bg-secondary text-black mx-4 mx-lg-5 d-inline-flex">
                      <div>
                        <div class="fs-title-1 fs-md-title-2 font-title fw-700 mb-2 mb-md-4">
                          {{ row.title }}
                        </div>
                        <div class="d-inline-flex flex-wrap">
                          <span
                          v-if="row.date_format"
                          class="mr-3 fs-content-1 fw-700 d-inline-flex align-items-center">
                            <i class="mdi mdi-calendar fs-content-1 mr-1"/>
                            {{ row.date_format }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                    v-if="row.summary"
                    class="news-pool-headline-main-content-footer bg-primary text-white fs-content-1 fw-500 px-3 px-lg-5 py-2 py-lg-4">
                      {{ row.summary }}
                    </div>
                  </div>
                </div>
              </a>
              <div
              :key="index"
              v-else
              class="bg-light-gray rounded w-100 mb-3 position-relative fe-zoom-effect">
                <a :href="row.url" class="text-black">
                  <a
                  v-if="row.url"
                  :href="row.url"
                  class="bg-secondary text-primary p-0 p-md-3 position-absolute cursor-pointer top-0 right-0 z-index-1">
                    <i class="mdi mdi-arrow-top-right fs-subtitle-2 fs-md-title-2 fw-700"/>
                  </a>
                  <div class="d-inline-flex p-3">
                    <img
                    draggable="false"
                    class="responsive-news-thumbnail-square"
                    alt=""
                    v-if="row.image_featured"
                    :src="assetUrl + row.image_featured"/>
                    <div class="pl-3">
                      <div class="fs-title-2 font-title fw-700 mb-1 mb-md-2">
                        {{ row.title }}
                      </div>
                      <div class="d-inline-flex flex-wrap mb-2 mb-md-3">
                        <span
                        v-if="row.date_format"
                        class="mr-3 fs-content-2 fw-700 d-inline-flex align-items-center">
                          <i class="mdi mdi-calendar fs-content-2 mr-1"/>
                          {{ row.date_format }}
                        </span>
                      </div>
                      <p class="fw-600 fs-content-1">{{ row.summary }}</p>
                    </div>
                  </div>
                </a>
              </div>
            </fragment>
          </template>
          <div class="d-flex">
            <div v-if="loading_more" class="fe-loading mx-auto"/>
            <Button
            @click.native="fetchMoreNews"
            v-if="has_more_news && !loading_more"
            class="fs-content-1 fw-600 mx-auto"
            title="Load More"
            type="secondary"
            iconCls="mdi-arrow-right-bold-circle"/>
          </div>
        </div>
        <div v-else class="col col-9">
          <EmptyItems/>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import {Fragment} from 'vue-fragment';
export default {
  name: 'NewsPool',
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  components: {
    Fragment
  },
  data() {
    return {
      news_list: [],
      loading_more: false,
      has_more_news: false,
      more_news_api: '',
      sidebar_open: false
    };
  },
  computed: {
    assetUrl() {
      return this.$store.getters['page/getAssetUrl'];
    },
    body() {
      return this.data.body;
    },
    currentSlug() {
      const currentPath = this.$route.path;
      const currentPathSplit = currentPath.split('/');
      return currentPathSplit.length > 0 ? currentPathSplit[currentPathSplit.length - 1] : '';
    }
  },
  created() {
    this.news_list = this.body?.items || [];
    this.has_more_news = this.body?.pagination?.has_more_pages || false;
    this.more_news_api = this.body?.pagination?.next_page_url || '';
  },
  methods: {
    handleShowSubMenu (e) {
      const menuParent = e.target.closest('.news-pool-menu-item');
      const subMenu = menuParent.querySelector('.news-pool-sub-menu');
      if (menuParent) {
        if (menuParent.classList.contains('collapsed')) {
          menuParent.classList.remove('collapsed');
        } else {
          menuParent.classList.add('collapsed');
        }
      }
      if (subMenu) {
        if (subMenu.classList.contains('active')) {
          subMenu.classList.remove('active');
        } else {
          subMenu.classList.add('active');
        }
      }
    },
    hasActiveChild(child) {
      let me = this;
      return (child && child.length > 0) ? !!child.find(({slug}) => slug == me.currentSlug) :  false;
    },
    async fetchMoreNews() {
      if (!this.has_more_news) return;
      try {
        this.$nuxt.$loading.start();
        this.loading_more = true;
        const {data} = await this.$axios.get(this.more_news_api);
        const {items, pagination} = data ?? {};
        this.more_news_api = pagination?.next_page_url ?? this.more_news_api;
        this.has_more_news = pagination?.has_more_pages ?? false;
        if (items && items.length > 0) this.news_list = [...this.news_list, ...items];
        this.$nuxt.$loading.finish();
      } catch (error) {
        this.$nuxt.$loading.fail();
        throw error;
      } finally {
        this.loading_more = false;
      }
    }
  }
}
</script>
