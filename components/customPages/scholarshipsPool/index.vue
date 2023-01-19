<template>
  <section
  :id="data.slug_id"
  class="my-5 fe-wrapper fe-section">
    <div class="row mx-0">
      <div class="col col-12 px-0">
        <div class="d-flex mb-3 fe-shadow">
          <input
          type="text"
          v-model="keyword"
          :placeholder="body.filter_labels.search"
          class="bg-white py-2 px-3 border-light-gray w-100 fs-subtitle-2 fw-600"/>
          <Button
          @click.native="doFilter()"
          type="secondary"
          class="rounded-0 fs-subtitle-2 px-4"
          iconCls="mdi-magnify"/>
        </div>
      </div>
      <div v-if="(filters && filters.length > 0)" class="col col-12 px-0">
        <div class="card mb-4 fe-shadow border-0">
          <div class="card-body">
            <div class="row mx-0 align-items-center">
              <div class="col col-10 px-0">
                <div class="fs-subtitle-1 fw-600 mb-2">
                  {{ body.filter_labels.title }}
                </div>
                <div class="fe-separator"/>
              </div>
              <div @click="show_filters = !show_filters" class="col col-2 px-0 text-right">
                <span :class="`mdi mdi-chevron-${show_filters ? 'up' : 'down'} fs-7 fw-600 d-block d-md-none`"/>
              </div>
            </div>
            <div :class="`mt-3 ${show_filters ? 'd-block' : 'd-none d-md-block'}`">
              <div class="row mx-0">
                <template v-for="(row, index) in filters">
                  <div
                  :key="index"
                  v-if="(row.items && row.items.length > 0)"
                  class="col col-6 col-md-3 px-0 pb-4">
                    <div class="fs-content-1 fw-600">{{ row.title }}</div>
                    <div class="w-100 mt-2">
                      <template v-for="(filter, i) in row.items">
                        <b-form-checkbox
                        :key="i"
                        v-model="filter.checked">
                          <span class="fs-content-2 fw-400">{{ filter.name }}</span>
                        </b-form-checkbox>
                      </template>
                    </div>
                  </div>
                </template>
              </div>
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
          </div>
        </div>
      </div>
      <div
      v-if="(scholarships_list && scholarships_list.length > 0)"
      class="col col-12 px-0">
        <template v-for="(row, index) in (scholarships_list || [])">
          <SectionsSectionScolarshipsItem
          :key="index"
          :data="row"
          :labels="body.item_labels"/>
        </template>
        <div class="d-flex">
          <div v-if="loading_more" class="fe-loading mx-auto"/>
          <Button
          @click.native="fetchMoreScholarships"
          v-if="has_more_scholarships && !loading_more"
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
  name: 'ScholarshipsPool',
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      keyword: '',
      scholarships_list: [],
      loading_more: false,
      has_more_scholarships: false,
      more_scholarships_api: '',
      filters: [],
      show_filters: false
    }
  },
  created() {
    const {items, pagination, filtered} = this.body;
    this.scholarships_list = items || [];
    this.has_more_scholarships = pagination?.has_more_pages || false;
    this.more_scholarships_api = pagination?.next_page_url || '';
    if (filtered.search) this.keyword = filtered.search;
    this.constructFilters();
  },
  computed: {
    body() {
      return this.data.body;
    },
  },
  methods: {
    async fetchMoreScholarships() {
      if (!this.has_more_scholarships) return;
      try {
        this.$nuxt.$loading.start();
        this.loading_more = true;
        const {data} = await this.$axios.get(this.more_scholarships_api);
        const {items, pagination} = data ?? {};
        this.more_scholarships_api = pagination?.next_page_url ?? this.more_scholarships_api;
        this.has_more_scholarships = pagination?.has_more_pages ?? false;
        if (items && items.length > 0) this.scholarships_list = [...this.scholarships_list, ...items];
        this.$nuxt.$loading.finish();
      } catch (error) {
        this.$nuxt.$loading.fail();
        throw error;
      } finally {
        this.loading_more = false;
      }
    },
    constructFilters() {
      const {filter_value, filter_labels, filtered} = this.body;
      this.filters = Object.keys(filter_value ?? {}).map((key) => {
        return {
          key: key,
          title: filter_labels[key],
          items: (filter_value[key] || []).map((row) => {
            const value = row.id ? row.id : row.name;
            return {
              ...row,
              value: value,
              checked: (filtered[key] ?? []).includes(value.toString()) 
            };
          })
        };
      });
    },
    getFilteredQueryString() {
      const keyword = this.keyword;
      const filters = this.filters;

      let params = {};
      if (keyword.trim()) params['search'] = keyword.trim();
      (filters || []).map((row) => {
        const {items, key} = row;
        const checked_items = (items || []).reduce((arr, {checked, value}) => {
          if (checked) arr.push(value);
          return arr;
        }, []);
        if (checked_items && checked_items.length > 0) params[key] = checked_items.join(',');
      });

      return params;
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
  }
}
</script>
