<template>
  <div class="w-100">
    <div class="bg-primary fe-footer position-relative">
      <div class="d-flex justify-content-end position-absolute position-lg-relative top-0 right-0 left-0">
        <img
        alt=""
        draggable="false"
        class="fe-responsive-square"
        :src="require('~/assets/images/squares-right.svg')"/>
      </div>
      <div class="fe-wrapper text-white pt-3 pt-lg-0 mb-0">
        <div class="d-none d-sm-block">
          <div class="row mx-0">
            <div class="col col-12 col-sm-2">
              <img
              v-if="widget"
              draggable="false"
              class="w-100"
              alt="ums logo"
              :src="widget.image"/>
            </div>
            <div
            v-if="contactInfo"
            class="col col-12 col-sm-7 font-weight-bold pt-2">
              <span>{{ contactInfo.address }}</span>
              <div class="d-inline-flex align-items-center flex-wrap">
                <div class="mr-4">Email : {{ contactInfo.email }}</div>
                <div class="mr-4">Phone : {{ contactInfo.phone }}</div>
                <div>Fax : {{ contactInfo.fax }}</div>
              </div>
            </div>
            <div
            v-if="(widget && widget.shortcut && (widget.shortcut.items && widget.shortcut.items.length > 0))"
            class="col col-12 col-sm-3 font-weight-bold d-inline-flex justify-content-end align-items-top">
              <a
              v-for="(row, index) in (widget.shortcut.items || [])"
              :key="index"
              :href="row.link"
              target="_blank"
              rel="noopener noreferrer"
              :class="`shortcut-items text-center text-white`">
                <span class="d-block mb-3">{{ row.label }}</span>
                <i :class="`mdi ${row.icon} fs-7`"/>
              </a>
            </div>
          </div>
        </div>
        <div class="row mx-0 text-white mt-5">
          <div
          class="col col-6 col-sm-6 col-md-3 mb-5"
          v-for="(row, index) in bottomMenus"
          :key="index">
            <div class="font-weight-bold h5">
              <i :class="'fs-8 mdi ' + row.icon"/>
              <a
              :href="row.link"
              :target="row.open_new_tab ? '_blank' : '_self'"
              class="d-block mt-2 text-uppercase text-white">
                {{ row.name }}
              </a>
            </div>
            <div
            class="mt-3"
            v-if="(row.items && row.items.length > 0)">
              <a
              v-for="(item, i) in row.items"
              :key="i"
              :href="item.link"
              :target="item.open_new_tab ? '_blank' : '_self'"
              class="mb-2 cursor-pointer fs-11 text-white d-block">
                {{ item.name }}
              </a>
            </div>
          </div>
          <div
          v-if="(widget && widget.informations)"
          class="col col-6 col-sm-6 col-md-3 mb-5">
            <div class="font-weight-bold h5">
              <i :class="'fs-8 mdi ' + widget.informations.icon"/>
              <span class="d-block mt-2 text-uppercase">
                {{ widget.informations.label }}
              </span>
            </div>
            <div
            v-if="(widget.informations.items && widget.informations.items.length > 0)"
            class="mt-3">
              <a
              v-for="(row, i) in (widget.informations.items || [])"
              :key="i"
              :href="row.link"
              :target="row.open_new_tab ? '_blank' : '_self'"
              class="mb-2 cursor-pointer fs-11 text-white d-block">
                {{ row.label }}
              </a>
            </div>
          </div>
          <div
          v-if="(widget && widget.maps)"
          class="col col-12 col-sm-12 col-md-3 mb-5">
            <div class="position-relative">
              <div class="d-inline-flex justifiy-content-start position-absolute bottom-0 rotate-90 text-uppercase h4 pl-4 font-weight-bolder">
                {{ widget.maps.label }}
              </div>
              <div>
                <iframe
                class="w-100 h-100 rounded"
                :src="widget.maps.iframe_src"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"/>
              </div>
            </div>
          </div>
          <div
          v-if="(widget && widget.social_medias && (widget.social_medias.items && widget.social_medias.items.length > 0))"
          class="col col-12 col-sm-12 col-md-2 mb-5">
            <div class="text-white">
              <div class="h5 font-weight-bold mb-3 text-uppercase d-flex justify-content-center d-md-block">
                {{ widget.social_medias.label }}
              </div>
              <div class="d-flex d-md-inline-flex justify-content-center flex-wrap">
                <a
                v-for="(row, index) in (widget.social_medias.items || [])"
                :key="index"
                :href="row.link"
                target="_blank"
                rel="noopener noreferrer">
                  <i :class="`mdi ${row.icon} fs-9 mr-2 text-white`"/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="position-absolute position-lg-relative bottom-0 left-0 right-0">
        <img
        alt=""
        draggable="false"
        class="fe-responsive-square bottom"
        :src="require('~/assets/images/square-footer-left.svg')"/>
      </div>
    </div>
    <div class="bg-secondary w-100 text-center py-2 text-primary px-2">
      <span class="font-weight-bold fs-12">
        &copy; Copyright {{ (new Date).getFullYear() }} - Universitas Muhammadiyah Surakarta
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Footer',
  computed: {
    bottomMenus() {
      const {menus} = this.$store.getters['mainLayout/getMainLayoutData'] ?? {};
      return menus?.bottom ?? [];
    },
    contactInfo() {
      const {widget} = this.$store.getters['mainLayout/getMainLayoutData'] ?? {};
      return widget?.contact;
    },
    widget() {
      const {widget} = this.$store.getters['mainLayout/getMainLayoutData'] ?? {};
      return widget;
    }
  }
}
</script>