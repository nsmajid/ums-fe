<template>
  <section
  :id="data.slug_id"
  class="w-100 fe-section fe-wrapper my-2">
    <template v-for="(row, index) in (body.labels || [])">
      <Accordion
      :key="index"
      :defaultCollapsed="false"
      :title="row.name">
        <table class="w-100 fe-table-striped">
          <thead>
            <tr class="fs-subtitle-2 fw-600 font-weight-bold">
              <th width="30%">{{ body.column_title1 }}</th>
              <th width="50%">{{ body.column_title2 }}</th>
              <th width="20%">{{ body.column_title3 }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
            class="fs-content-1 fw-500"
            v-for="(label, i) in (row.label_items || [])"
            :key="i">
              <td>{{ label.column1 }}</td>
              <td>
                <a
                class="text-underlined text-black"
                :href="label.url">
                  {{ label.column2 }}
                </a>
              </td>
              <td>{{ label.column3 }}</td>
            </tr>
          </tbody>
        </table>
      </Accordion>
    </template>
  </section>
</template>
<script>
export default {
  name: 'SectionCollapsible',
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  computed: {
    body() {
      return this.data.body;
    }
  }
}
</script>