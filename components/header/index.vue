<template>
  <fragment>
    <div class="fe-wrapper text-white d-flex justify-content-between py-3 bg-primary">
      <no-ssr>
        <div class="d-inline-flex">
          <a
          :class="`language-nav ${$i18n.locale == 'id' ? 'active' : ''} mr-1 d-flex`"
          v-if="(languageOptions && languageOptions.id)"
          :href="languageOptions.id">
            <img
            draggable="false"
            class="cursor-pointer w-100"
            alt="flag indonesia"
            src="~/assets/images/flag-id.svg"/>
          </a>
          <a
          :class="`language-nav ${$i18n.locale == 'en' ? 'active' : ''} mr-1 d-flex`"
          v-if="(languageOptions && languageOptions.en)"
          :href="languageOptions.en">
            <img
            draggable="false"
            class="cursor-pointer w-100"
            alt="flag great britain"
            src="~/assets/images/flag-gb.svg"/>
          </a>
          <a
          :class="`language-nav ${$i18n.locale == 'ar' ? 'active' : ''} mr-1 d-flex`"
          v-if="(languageOptions && languageOptions.ar)"
          :href="languageOptions.ar">
            <img
            draggable="false"
            class="cursor-pointer w-100"
            alt="flag saudi arabia"
            src="~/assets/images/flag-sa.svg"/>
          </a>
        </div>
      </no-ssr>
      <div
      v-if="(shortcut && (shortcut.items && shortcut.items.length > 0))"
      class="d-inline-flex justify-content-end align-items-center">
        <a
        v-for="(row, index) in (shortcut.items || [])"
        :key="index"
        :href="row.link"
        target="_blank"
        rel="noopener noreferrer"
        :class="`shortcut-items text-white`">
          <i :class="`mdi ${row.icon} fs-11`"/>
          <span class="ml-1 fs-12">{{ row.label }}</span>
        </a>
      </div>
    </div>
    <header :class="`fe-ums-header ${isScrolled ? 'border-0' : ''} ${(isScrolled && !$helpers.isMobile()) ? 'fe-ums-header-compressed' : ''} ${toggleSearchbox ? 'toggle-searchbox' : ''} position-sticky top-0 w-100`">
      <div
      v-click-outside="onSearchboxOutsideClick"
      class="bg-primary fe-ums-header-wrapper fe-ums-header-border-bottom border-secondary row mx-0 fe-wrapper no-wrapper-non-desktop">
        <div :class="`col ${(toggleSearchbox && isScrolled) ? 'col-auto' : 'col-4 col-sm-3'} ${($helpers.isMobile() && toggleSearchbox) ? 'd-none' : ''} px-0 position-relative`">
          <div :class="`bg-primary p-2 ${!isScrolled && 'position-absolute'} fe-ums-header-logo`">
            <a :href="logo_link">
              <img
              class="d-none d-md-block"
              draggable="false"
              alt="ums logo"
              v-if="logo"
              :src="isScrolled ? logo['desktop-fixed'] : logo.desktop"/>
              <img
              class="d-block d-md-none"
              draggable="false"
              alt="ums logo"
              v-if="logo"
              :src="logo.mobile"/>
            </a>
          </div>
        </div>
        <div :class="`col ${(toggleSearchbox && isScrolled || $helpers.isMobile()) ? '' : 'col-6 col-sm-9'} pl-0 pl-xl-3 pr-0 d-flex fe-nav justify-content-end ${isScrolled ? 'justify-content-xl-end' : 'justify-content-xl-end'} align-items-stretch`">
          <nav :class="`fe-ums-menu position-relative d-none d-xl-inline-flex flex-wrap align-items-stretch`">
            <ul>
              <li
              class="fe-ums-menu-item"
              v-for="(menu, index) in topMenus"
              :key="index">
                <a
                :href="menu.link"
                :target="menu.open_new_tab ? '_blank' : '_self'"
                rel="noopener noreferrer"
                class="font-weight-semi-bold">
                  {{ menu.name }}
                </a>
                <ul class="fe-ums-submenu">
                  <li
                  class="fe-ums-submenu-item"
                  v-for="(sub_menu, index) in menu.items"
                  :key="index">
                    <a
                    :href="sub_menu.link"
                    :target="sub_menu.open_new_tab ? '_blank' : '_self'"
                    rel="noopener noreferrer"
                    class="fs-12">
                      {{ sub_menu.name }}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
          <div class="fe-searchbox">
            <div class="fe-searchbox-prefix">
              <span :class="`mdi mdi-magnify fs-7`"/>
            </div>
            <div class="fe-searchbox-input">
              <input
              @keyup.enter="onSearch"
              v-model="searchKey"
              ref="searchbox"
              type="text"
              :placeholder="widget.search && widget.search.placeholder || 'Search...'"
              class="w-100 form-control"/>
            </div>
            <div
            v-if="!searching"
            @click="onSearch"
            class="fe-searchbox-suffix cursor-pointer">
              <Button
              class="fs-subtitle-2 fw-600"
              :title="widget.search && widget.search.button || 'Search'"
              type="primary"/>
            </div>
          </div>
          <div
          @click="onToggleSearchbox"
          class="fe-searchbox-toggle">
            <span v-if="searching" class="fe-loading m-0"/>
            <span v-else :class="`mdi mdi-${toggleSearchbox ? 'close' : 'magnify'} fs-7`"/>
          </div>
          <div class="fe-more-item">
            <div class="fe-more-item-icon">
              <span class="mdi mdi-apps fs-7 text-white"/>
            </div>
            <div class="fe-more-item-dropdown">
              <div
              v-if="(widget && widget.informations && (widget.informations.items && widget.informations.items.length > 0))"
              class="row mx-0 mb-2">
                <template v-for="(row, index) in (widget.informations.items || [])">
                  <div
                  :key="index"
                  class="col col-6 d-flex px-1">
                    <a
                    :href="row.link"
                    class="cursor-pointer bg-primary p-2 rounded d-inline-flex w-100 align-items-center">
                      <div>
                        <div 
                        style="width: 42px; height: 42px;"
                        class="rounded-circle bg-secondary d-flex">
                          <span :class="`mdi ${row.icon} rounded-circle text-white fs-10 m-auto`"/>
                        </div>
                      </div>
                      <div class="text-white font-weight-bold text-uppercase ml-2">
                        {{ row.label }}
                      </div>
                    </a>
                  </div>
                </template>
              </div>
              <ul class="w-100 mt-3 fe-more-item-menu">
                <li
                v-for="(menu, index) in rightMenus"
                :key="index">
                  <div class="text-uppercase menu-title row mx-0">
                    <a
                    :href="menu.link"
                    :target="menu.open_new_tab ? '_blank' : '_self'"
                    rel="noopener noreferrer"
                    class="col col-10 text-primary p-0">
                      {{ menu.name }}
                    </a>
                    <div
                    class="col col-2 text-primary text-right p-0"
                    @click="handleShowSubMenu">
                      <span class="mdi mdi-chevron-right uncollapsed-icon fs-11"/>
                      <span class="mdi mdi-chevron-down collapsed-icon fs-11"/>
                    </div>
                  </div>
                  <div
                  class="sub-menu mt-1"
                  v-if="(menu.items && menu.items.length > 0)">
                    <a
                    class="px-2 py-1 fe-hoverable fw-600 text-primary text-uppercase sub-menu-item d-block w-100 fs-11"
                    v-for="(sub_menu, index) in menu.items"
                    :key="index"
                    :href="sub_menu.link"
                    :target="sub_menu.open_new_tab ? '_blank' : '_self'"
                    rel="noopener noreferrer">
                      {{ sub_menu.name }}
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  </fragment>
</template>
<script>
import {Fragment} from 'vue-fragment';
import {debounce} from "lodash";

export default {
  name: 'Header',
  components: {
    Fragment
  },
  data() {
    return {
      navigationElement: null,
      isScrolled: false,
      searching: false,
      searchKey: ''
    }
  },
  computed: {
    toggleSearchbox: {
      get() {
        return this.$store.getters['common/getToggleSearchbox'];
      },
      set(value) {
        this.$store.dispatch('common/TOGGLE_SEACRHBOX', value);
      }
    },
    languageOptions() {
      const {language} = this.$store.getters['page/getPageData'] ?? {};
      const {options} = language ?? {};
      return options ?? undefined;
    },
    topMenus() {
      const {menus} = this.$store.getters['mainLayout/getMainLayoutData'] ?? {};
      return menus?.top ?? [];
    },
    rightMenus() {
      const {menus} = this.$store.getters['mainLayout/getMainLayoutData'] ?? {};
      return menus?.right ?? [];
    },
    shortcut() {
      const {widget} = this.$store.getters['mainLayout/getMainLayoutData'] ?? {};
      return widget?.shortcut;
    },
    logo() {
      const {logo} = this.$store.getters['mainLayout/getMainLayoutData'] ?? {};
      return logo ?? {};
    },
    logo_link() {
      const {logo_link} = this.$store.getters['mainLayout/getMainLayoutData'] ?? {};
      return logo_link;
    },
    widget() {
      const {widget} = this.$store.getters['mainLayout/getMainLayoutData'] ?? {};
      return widget ?? {};
    }
  },
  mounted(){
    let me = this;
    this.navigationElement = document.getElementById('navigation-dropdown');
    document.addEventListener('scroll', function(){
      let doc = document.documentElement;
      let scrollTop = window.pageYOffset || doc.scrollTop;
      
      if (scrollTop > 60) {
        me.isScrolled = true;
      } else {
        me.isScrolled = false;
      }
    });
  },
  watch: {
    toggleSearchbox: debounce(function(){
      if (this.toggleSearchbox) this.$refs.searchbox.focus();
    }, 300)
  },
  methods: {
    handleShowSubMenu (e) {
      const parent = e.target.closest('li');
      if (parent) {
        if (parent.classList.contains('show-submenu')) {
          parent.classList.remove('show-submenu');
        } else {
          parent.classList.add('show-submenu');
        }
      }
    },
    onToggleSearchbox() {
      if (!this.searching) this.toggleSearchbox = !this.toggleSearchbox;
    },
    onSearchboxOutsideClick() {
      if (this.toggleSearchbox && !this.searching) this.toggleSearchbox = false;
    },
    getSearchUrl(queryString) {
      const {action_path} = this.widget.search;
      return `${window.location.origin}/${action_path}${(queryString ? '?'+queryString : '')}`;
    },
    onSearch() {
      const {searching, searchKey, $route} = this;
      const whiteListQuery = ['key','debug'];
      const {query} = $route;
      if ((searchKey || '').trim())
      {
        if (!searching)
        {
          this.searching = true;
          let params = {
            ...query,
            key: searchKey.trim()
          };

          // remove params by white list
          Object.keys(params).map(key => {
            if (!whiteListQuery.includes(key)) delete params[key]
          });

          if (params.hasOwnProperty('segment')) delete params['segment'];
          const queryString = this.$helpers.convertQueryString(params);
          window.location = this.getSearchUrl(queryString);
        }
      } else {
        window.location = this.getSearchUrl();
      }
    }
  }
}
</script>