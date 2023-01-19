<template>
  <section
  :id="data.slug_id"
  class="w-100 fe-section fe-wrapper my-2">
    <div class="d-flex mb-2">
      <input
      type="text"
      v-model="searchText"
      class="bg-white py-2 px-3 border-1 w-100 fs-subtitle-2 fw-600"/>
      <Button
      type="secondary"
      class="rounded-0 px-4"
      iconCls="mdi-magnify"/>
    </div>
    <div
    v-if="searching"
    class="d-flex">
      <div class="fe-loading mx-auto"/>
    </div>
    <template
    v-else
    v-for="(row, index) in (payload.labels || [])">
      <Accordion
      :key="index"
      :defaultCollapsed="row.auto_expand ? true : false"
      :title="row.name">
        <table class="w-100 fe-table-striped">
          <thead>
            <tr class="fs-subtitle-2 fw-600 font-weight-bold">
              <th width="30%">{{ payload.column_title.column1 }}</th>
              <th width="60%">{{ payload.column_title.column2 }}</th>
              <th width="10%" class="text-center">{{ payload.column_title.column3 }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
            class="fs-content-1 fw-500 fe-hoverable"
            v-for="(label, i) in (row.label_items || [])"
            :key="i">
              <td class="p-0">
                <a class="d-flex py-3 px-4 text-black text-underlined" :href="label.button_url">
                  {{ label.column1 }}
                </a>
              </td>
              <td class="p-0">
                <a class="d-flex py-3 px-4 text-black text-underlined" :href="label.button_url">
                  {{ label.column2 }}
                </a>
              </td>
              <td class="p-0">
                <a class="d-flex py-3 px-4 justify-content-center text-black" :href="label.button_url">
                  {{ label.column3 }}
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </Accordion>
    </template>
  </section>
</template>
<script>
import {debounce, cloneDeep} from "lodash";
export default {
  name: 'SectionCollapsibleFilterable',
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data(){
    return {
      searching: false,
      searchText: '',
      payload: []
    }
  },
  watch: {
    searchText: debounce(function() {
      this.searching = true;
      this.getSuggestions();
    }, 300)
  },
  created() {
    this.payload = this.body;
  },
  computed: {
    body() {
      return this.data.body;
    }
  },
  methods: {
    getSuggestions: debounce(function() {
      const searchText = (this.searchText || '').toLowerCase();
      if (searchText) {
        let newPayload = {...this.payload};
        const computedBody = cloneDeep(this.body);
        newPayload['labels'] = (computedBody?.labels || []).filter((label) => {
          let matchedLabelItems = (label?.label_items || []).filter((item) => {
            const code = (item.column1 || '').toLowerCase();
            const mataKuliah = (item.column2 || '').toLowerCase();
            return code.includes(searchText) || mataKuliah.includes(searchText)
          });
          let hasMatch = (matchedLabelItems && matchedLabelItems.length > 0)
          label['label_items'] = matchedLabelItems
          label['auto_expand'] = hasMatch;
          return hasMatch;
        });
        this.payload = newPayload;
      } else {
        this.payload = this.body;
      }
      this.searching = false;
    }, 400)
  }
}
</script>