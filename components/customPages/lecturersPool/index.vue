<template>
  <section
  :id="data.slug_id"
  class="my-5 fe-wrapper fe-section">
    <div class="row mx-0">
      <div class="col col-12 px-0 bg-light-gray rounded w-100 p-3 p-lg-4 mb-3">
        <div class="fs-content-1 fw-600 mb-2">{{ body.label_section.by }}</div>
        <div class="w-100" 
        v-if="(body.option_filters && body.option_filters.by && body.option_filters.by.length > 0)">
          <b-form-group>
            <template v-for="(row, index) in body.option_filters.by">
              <b-form-radio
              :key="index"
              v-model="filter"
              class="d-inline-block mr-3 fs-content-1 fw-500"
              :value="row.value">
                {{ row.name }}
              </b-form-radio>
            </template>
          </b-form-group>
        </div>
        <div class="row mx-0 bg-white align-items-center my-3">
          <div class="col col-10 col-md-11 px-0">
            <input
            v-model="keyword"
            class="w-100 border-0 p-3 fs-content-1 fw-500"
            :placeholder="body.label_section.value"/>
          </div>
          <div
          @click="doFilter()"
          class="col col-2 col-md-1 pr-0 text-center">
            <button class="border-0 bg-white w-100 h-100">
              <span class="mdi mdi-magnify fs-subtitle-1 fw-700"/>
            </button>
          </div>
        </div>
        <div
        @click="show_advanced_filters = !show_advanced_filters"
        class="fs-content-1 fw-600 cursor-pointer mb-2">
          <span :class="`mdi mdi-chevron-${show_advanced_filters ? 'up' : 'down'}`"/>
          <span>{{ body.label_section.advance }}</span>
        </div>
        <b-collapse :visible="show_advanced_filters">
          <div class="mb-3">
            <div class="fs-content-1 fw-600 mb-2">{{ body.label_section.jenis }}</div>
            <div class="row mx-0">
              <b-form-select v-model="status" class="col col-6 col-md-4 col-xl-3" :options="statusOptions"/>
            </div>
          </div>
          <div class="mb-3">
            <div class="row mx-0">
              <div class="col col-6 col-md-4 pl-0 pr-2">
                <div class="fs-content-1 fw-600 mb-2">{{ body.label_section.fakultas }}</div>
                <b-form-select v-model="faculty" :options="facultiesOptions"/>
              </div>
              <div class="col col-6 col-md-4 px-0">
                <div class="fs-content-1 fw-600 mb-2">{{ body.label_section.prodi }}</div>
                <b-form-select v-model="prodi" :options="prodiOptions" :disabled="!faculty"/>
              </div>
            </div>
          </div>
        </b-collapse>
        <div class="mt-4 d-flex justify-content-end align-items-center">
          <div
          @click="doFilter(true)"
          class="fs-content-1 fw-500 text-primary mr-3 cursor-pointer">
            Clear Filter
          </div>
          <Button
          @click.native="doFilter()"
          type="primary"
          size="small"
          title="Filter"
          class="fs-content-1 fw-500"
          unbold/>
        </div>
      </div>
      <div
      v-if="(lecturers_list && lecturers_list.length > 0)"
      class="col col-12 px-0">
        <template v-for="(row, index) in (lecturers_list || [])">
          <SectionsSectionLecturersItem
          :key="index"
          :data="row"
          :labels="body.label_items"/>
        </template>
        <div class="d-flex">
          <div v-if="loading_more" class="fe-loading mx-auto"/>
          <Button
          @click.native="fetchMoreLecturers"
          v-if="has_more_lecturers && !loading_more"
          class="fs-content-1 fw-600 mx-auto"
          title="Load More"
          type="secondary"
          iconCls="mdi-arrow-right-bold-circle"/>
        </div>
      </div>
      <div v-else class="col col-12 px-0">
        <EmptyItems/>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'LecturersPool',
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      keyword: '',
      filter: '',
      status: null,
      faculty: null,
      prodi: null,
      lecturers_list: [],
      loading_more: false,
      has_more_lecturers: false,
      more_lecturers_api: '',
      filters: [],
      show_advanced_filters: false
    }
  },
  created() {
    const {items, pagination, filtered} = this.body;
    const {by, jenis, prodi, value} = filtered ?? {};
    this.lecturers_list = items || [];
    this.has_more_lecturers = pagination?.has_more_pages || false;
    this.more_lecturers_api = pagination?.next_page_url || '';
    if (by) this.filter = by;
    if (jenis) this.status = jenis;
    if (value) {
      this.keyword = value.trim();
    } else {
      this.filter = '';
    }
    if (prodi) {
      const prodiData = (this.body?.option_filters?.prodi || []).find((row) => row.uniid == prodi) ?? {};
      this.faculty = prodiData?.fakultas ?? null;
      let me = this;
      setTimeout(() => {
        me.prodi = prodi;
      }, 200);
    }
  },
  watch: {
    faculty() {
      this.prodi = null;
    }
  },
  computed: {
    body() {
      return this.data.body;
    },
    statusOptions() {
      return (this.body?.option_filters?.jenis || []).map((row) => {
        return {
          value: row.value,
          text: row.name
        }
      });
    },
    facultiesOptions() {
      return (this.body?.option_filters?.fakultas || []).map((row) => {
        return {
          value: row.nama,
          text: row.nama
        }
      });
    },
    prodiOptions() {
      if (!this.faculty) return [];
      let me = this;
      return (this.body?.option_filters?.prodi || []).reduce((arr, row) => {
        if (me.faculty === row.fakultas) {
          arr.push({
            value: row.uniid,
            text: row.nama
          });
        }
        return arr;
      }, []);
    },
  },
  methods: {
    async fetchMoreLecturers() {
      if (!this.has_more_lecturers) return;
      try {
        this.$nuxt.$loading.start();
        this.loading_more = true;
        const {data} = await this.$axios.get(this.more_lecturers_api);
        const {items, pagination} = data ?? {};
        this.more_lecturers_api = pagination?.next_page_url ?? this.more_lecturers_api;
        this.has_more_lecturers = pagination?.has_more_pages ?? false;
        if (items && items.length > 0) this.lecturers_list = [...this.lecturers_list, ...items];
        this.$nuxt.$loading.finish();
      } catch (error) {
        this.$nuxt.$loading.fail();
        throw error;
      } finally {
        this.loading_more = false;
      }
    },
    getFilteredQueryString() {
      const {keyword, filter, status, prodi, faculty} = this;

      let params = {};
      if (keyword.trim()) {
        params['by'] = filter ? filter : 'name';
        params['value'] = keyword.trim();
      }
      if (status) params['jenis'] = status;
      if (prodi) params['prodi'] = prodi;

      if (faculty && !prodi) {
        alert('Please select '+ this.body.label_section.prodi);
        return;
      }

      return Object.keys(params).length > 0 ? params : null;
    },
    doFilter(clear = false) {
      const {query, path} = this.$route;
      let thePath = '';
      let shouldRefresh = false;

      if (clear) {
        thePath = path;
        shouldRefresh = true;
      } else {
        const filteredQuery = this.getFilteredQueryString();
        let params = {...query, ...(filteredQuery ?? {})};
        const whiteList = ['by','value','jenis','prodi'];

        Object.keys(params || {}).map((key) => {
          if (whiteList.includes(key)) {
            if (filteredQuery) {
              if (key === 'by' || key === 'value') {
                if (!filteredQuery?.value) {
                  delete params['value'];
                  delete params['by'];
                }
              } else if (!filteredQuery[key]) {
                delete params[key];
              }
            } else {
              delete params[key];
            }
          }
        });
        
        if (filteredQuery) shouldRefresh = true;
        const queryString = this.$helpers.convertQueryString(params);
        thePath = path + (queryString ? '?'+queryString : '');
      }

      if (shouldRefresh) window.location = window.location.origin + thePath;
    },
  }
}
</script>
