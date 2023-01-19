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
      <div class="events-pool-navigation">
        <div
        v-if="body.label.calendar"
        class="fs-content-1 fw-700 mb-2">
          {{ body.label.calendar }}
        </div>
        <div class="custom-v-calendar mb-4">
          <vc-date-picker
          title-position="left"
          color="green"
          mode='date'
          is-range
          is-expanded
          v-model='calendar.selectedDate'
          :attributes="calendar.attributes"/>
        </div>
        <div
        v-if="body.label.select"
        class="fs-content-1 fw-700 mb-2">
          {{ body.label.select }}
        </div>
        <div class="mb-4">
          <div class="tag-input-wrapper">
            <div class="position-relative mt-4">
              <div class="tag-input-title px-2 fs-content-1">Tag</div>
              <input
              @focus="handleShowTagSuggestion(true)"
              @blur="handleShowTagSuggestion(false)"
              class="w-100 p-2"
              v-model="tag_input"/>
            </div>
            <div
            v-if="show_tag_suggestion"
            class="tag-input-suggestions">
              <div
              v-for="(tag, index) in (tag_suggestions || [])"
              :key="index"
              class="fe-hoverable py-1 px-2"
              @click="selectTagSuggestion(tag)">
                {{ tag.name }}
              </div>
            </div>
          </div>
        </div>
        <div
        v-if="body.label.current"
        class="fs-content-1 fw-700 mb-2">
          {{ body.label.current }}
        </div>
        <div class="mb-4">
          <div class="fs-content-1 mb-2">
            <span>{{ body.label.current_date }}</span>
            &nbsp;<span class="fw-700">{{ renderFilteredDateFormat(body.date_start) }} - {{ renderFilteredDateFormat(body.date_end) }}</span>&nbsp;
            <span>{{ body.label.current_tag }}</span>
          </div>
          <div class="d-inline-flex flex-wrap">
            <template v-for="(tagId, index) in (selected_tags || [])">
              <div
              :key="index"
              class="bg-light-gray py-1 px-2 mr-1 mb-1">
                {{ renderTagTitle(tagId) }}
                <span
                @click="removeTag(tagId)"
                class="ml-1 mdi mdi-close text-danger cursor-pointer"/>
              </div>
            </template>
          </div>
        </div>
        <div class="mt-5 d-flex justify-content-end align-items-center">
          <div
          @click="doFilter(true)"
          class="fs-content-1 fw-500 text-dark-green mr-3 cursor-pointer">
            Clear Filter
          </div>
          <Button
          @click.native="doFilter(false)"
          type="dark-green"
          size="small"
          title="Filter"
          class="fs-content-1 fw-500"
          unbold/>
        </div>
      </div>
    </div>
    <div class="fe-wrapper w-100">
      <div class="row mx-0 my-4 my-md-5">
        <div class="col col-12 col-md-3">
          <div class="events-pool-navigation pr-2 pr-lg-4 mb-4 d-none d-md-block">
            <div class="fs-title-2 fw-700 font-title text-right">
              {{ body.tag_label }}
            </div>
            <div
            v-if="body.tag_label"
            class="d-flex justify-content-end mt-2 mb-4">
              <div class="fe-separator"/>
            </div>
            <div
            v-if="body.label.calendar"
            class="fs-content-1 fw-700 mb-2">
              {{ body.label.calendar }}
            </div>
            <div class="custom-v-calendar mb-4">
              <vc-date-picker
              title-position="left"
              color="green"
              mode='date'
              is-range
              is-expanded
              v-model='calendar.selectedDate'
              :attributes="calendar.attributes"/>
            </div>
            <div
            v-if="body.label.select"
            class="fs-content-1 fw-700 mb-2">
              {{ body.label.select }}
            </div>
            <div class="mb-4">
              <div class="tag-input-wrapper">
                <div class="position-relative mt-4">
                  <div class="tag-input-title px-2 fs-content-1">Tag</div>
                  <input
                  @focus="handleShowTagSuggestion(true)"
                  @blur="handleShowTagSuggestion(false)"
                  class="w-100 p-2"
                  v-model="tag_input"/>
                </div>
                <div
                v-if="show_tag_suggestion"
                class="tag-input-suggestions">
                  <div
                  v-for="(tag, index) in (tag_suggestions || [])"
                  :key="index"
                  class="fe-hoverable py-1 px-2"
                  @click="selectTagSuggestion(tag)">
                    {{ tag.name }}
                  </div>
                </div>
              </div>
            </div>
            <div
            v-if="body.label.current"
            class="fs-content-1 fw-700 mb-2">
              {{ body.label.current }}
            </div>
            <div class="mb-4">
              <div class="fs-content-1 mb-2">
                <span>{{ body.label.current_date }}</span>
                &nbsp;<span class="fw-700">{{ renderFilteredDateFormat(body.date_start) }} - {{ renderFilteredDateFormat(body.date_end) }}</span>&nbsp;
                <span>{{ body.label.current_tag }}</span>
              </div>
              <div class="d-inline-flex flex-wrap">
                <template v-for="(tagId, index) in (selected_tags || [])">
                  <div
                  :key="index"
                  class="bg-light-gray py-1 px-2 mr-1 mb-1">
                    {{ renderTagTitle(tagId) }}
                    <span
                    @click="removeTag(tagId)"
                    class="ml-1 mdi mdi-close text-danger cursor-pointer"/>
                  </div>
                </template>
              </div>
            </div>
            <div class="mt-5 d-flex justify-content-end align-items-center">
              <div
              @click="doFilter(true)"
              class="fs-content-1 fw-500 text-dark-green mr-3 cursor-pointer">
                Clear Filter
              </div>
              <Button
              @click.native="doFilter(false)"
              type="dark-green"
              size="small"
              title="Filter"
              class="fs-content-1 fw-500"
              unbold/>
            </div>
          </div>
        </div>
        <div
        v-if="(event_list && event_list.length > 0)"
        class="col col-12 col-md-9 pb-5 px-0">
          <template v-for="(row, index) in (event_list || [])">
            <fragment :key="index">
              <a
              v-if="index < 1"
              :href="row.url">
                <div class="w-100 mb-4 news-pool-headline-wrapper text-black">
                  <img alt="" :src="assetUrl + body.image_background_first_index"/>
                  <div
                  v-if="(row.date_event_format_d && row.date_event_format_m)"
                  class="position-absolute top-0 left-0 text-center text-white bg-dark-green px-3 py-2 ml-3 opacity-8">
                    <span class="h3 font-weight-bolder d-block mb-1">{{ row.date_event_format_d }}</span>
                    <span class="h6 font-weight-bold d-block mb-0">{{ row.date_event_format_m }}</span>
                  </div>
                  <a
                  v-if="row.url"
                  :href="row.url"
                  class="bg-secondary text-primary p-3 news-pool-headline-shortcut-link cursor-pointer z-index-1">
                    <i class="mdi mdi-arrow-top-right fs-9 fw-700"/>
                  </a>
                  <div class="news-pool-headline-main-content">
                    <div class="px-3 px-lg-4 py-2 py-lg-3 bg-secondary text-black mx-4 mx-lg-5 d-inline-flex">
                      <div>
                        <div class="fs-title-2 fs-md-title-2 font-title fw-700 mb-2 mb-md-4">
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
                  <div
                  v-if="(row.date_event_format_d && row.date_event_format_m)"
                  class="position-absolute top-0 left-0 text-center text-white bg-dark-green px-3 py-2 opacity-8">
                    <span class="h3 font-weight-bolder d-block mb-1">{{ row.date_event_format_d }}</span>
                    <span class="h6 font-weight-bold d-block mb-0">{{ row.date_event_format_m }}</span>
                  </div>
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
            @click.native="fetchMoreEvents"
            v-if="has_more_events && !loading_more"
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
import moment from "moment";
import {debounce} from "lodash";

export default {
  name: 'EventsPool',
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
      calendar: {
        selectedDate: '',
        attributes: []
      },
      selected_tags: [],
      tag_input: '',
      tag_suggestions: [],
      show_tag_suggestion: false,
      event_list: [],
      more_events_api: '',
      loading_more: false,
      has_more_events: false,
      sidebar_open: false
    }
  },
  computed: {
    assetUrl() {
      return this.$store.getters['page/getAssetUrl'];
    },
    body() {
      return this.data.body;
    },
    tags() {
      return this.body.tags;
    }
  },
  watch: {
    tag_input: debounce(function(val){
      if (val) this.show_tag_suggestion = true;
      this.collectTagSuggestions();
    }, 400)
  },
  created() {
    const {date_start, date_end, calendar_pinned, selected_tags, items, pagination} = this.body;
    this.calendar.attributes.push({
      dot: 'green',
      dates: (calendar_pinned.items || []).map((dateString) => new Date(dateString)),
    });
    if (date_start && date_end && date_start != date_end) {
      this.calendar.selectedDate = {start: new Date(date_start), end: new Date(date_end)};
    }
    if (selected_tags && selected_tags.length > 0) this.selected_tags = selected_tags;
    this.collectTagSuggestions();
    this.event_list = items || [];
    this.has_more_events = pagination?.has_more_pages || false;
    this.more_events_api = pagination?.next_page_url || '';
  },
  methods: {
    renderTagTitle(tagId) {
      const tags = this.tags || [];
      const {name} = tags.find(({id}) => tagId == id);
      return name ? name : '';
    },
    renderFilteredDateFormat(dateString) {
      if (dateString) return moment(dateString).format('Do MMM');
      return '';
    },
    collectTagSuggestions() {
      const searchText = this.tag_input ? this.tag_input.toLowerCase() : '';
      this.tag_suggestions = searchText ? this.tags.filter(({name}) => (name.toLowerCase()).includes(searchText)) : this.tags;
    },
    handleShowTagSuggestion: debounce(function(val) {
      this.show_tag_suggestion = val;
    }, 200),
    selectTagSuggestion(tag) {
      if (!this.selected_tags.includes(tag.id)) this.selected_tags = [...this.selected_tags, tag.id];
    },
    removeTag(id) {
      this.selected_tags = this.selected_tags.filter((tagId) => tagId != id);
    },
    getFilteredQueryString(forApi = false) {
      const {selectedDate} = this.calendar;
      const {start, end} = (selectedDate && typeof selectedDate == 'object') ? selectedDate : {};
      if (forApi) {
        return false;
      } else {
        let params = {};
        if (start && end) {
          params['date_start'] = moment(start).format('YYYY-MM-DD');
          params['date_end'] = moment(end).format('YYYY-MM-DD');
        }
        if (this.selected_tags && this.selected_tags.length > 0) params['tags'] = this.selected_tags.join(',');
        return params;
      }
    },
    doFilter(clear = false) {
      const {query, path} = this.$route;
      let thePath = '';
      if (clear) {
        thePath = path;
      } else {
        const params = {
          ...query,
          ...this.getFilteredQueryString(),
        };
        const queryString = this.$helpers.convertQueryString(params);
        thePath = path + (queryString ? '?'+queryString : '');
      }
      window.location = window.location.origin + thePath;
    },
    async fetchMoreEvents() {
      if (!this.has_more_events) return;
      try {
        this.$nuxt.$loading.start();
        this.loading_more = true;
        const {data} = await this.$axios.get(this.more_events_api);
        const {items, pagination} = data ?? {};
        this.more_events_api = pagination?.next_page_url ?? this.more_events_api;
        this.has_more_events = pagination?.has_more_pages ?? false;
        if (items && items.length > 0) this.event_list = [...this.event_list, ...items];
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
