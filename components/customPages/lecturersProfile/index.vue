<template>
  <section
  :id="data.slug_id"
  class="fe-section">
    <img
    alt=""
    draggable="false"
    :src="assetUrl + profile.banner"
    class="w-100 banner-image fe-fit-cover lecturer-background"
    style="min-height: 16vh;">
    <div class="w-100 fe-wrapper">
      <div class="w-100 mb-5 lecturer-content position-relative">
        <div class="d-lg-flex px-1 px-md-3 py-4 fe-shadow rounded bg-light-gray z-index-1 content-container">
          <div class="border-separator px-md-3 px-4">
            <div class="d-flex">
              <img
              draggable="false"
              class="avatar mx-auto"
              :alt="profile.name"
              :src="profile.profile_image.includes('http') ? profile.profile_image : 'data:image/*;base64,' + profile.profile_image"/>
            </div>
            <div class="my-2 w-100 text-center" v-if="profile.nama_bergelar">
              {{ profile.nama_bergelar }}
            </div>
          </div>
          <div class="w-100 pl-4 pl-md-3 pt-3 pt-lg-0">
            <div class="fs-subtitle-2 fs-md-title-2 fw-700 mb-2">{{ profile.name }}</div>
            <div class="row mx-0 h-75">
              <div class="col col-12align-self-start">
                <ul style="padding-inline-start: 10px;">
                  <li
                  v-for="(row, index) in (profile.jabatan_organisasi || [])"
                  :key="index">
                    {{ row.nama }}&nbsp;{{row.unit}}
                  </li>
                </ul>
              </div>
              <div class="col col-12 align-self-end">
                <div class="w-100 text-right fs-content-1 fw-600">
                  <span>{{ profile.email }}</span>
                  <span class="mdi mdi-email-outline ml-2"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-100 d-inline-flex flex-wrap justify-content-center fe-shadow py-2 bg-light-gray rounded">
          <div
          v-for="(row, index) in (nav || [])"
          :key="index"
          class="px-3 py-2 fs-subtitle-2 fw-700">
            <span class="cursor-pointer" @click="scrollTo('timeline_' + row.value)">{{row.name}}</span>
          </div>
        </div>
      </div>
      <div
      v-if="description"
      class="fs-content-1 fw-400 mb-4 text-justify">
        {{ description }}
      </div>
      <div
      v-if="(research_experience && research_experience.value)"
      class="w-100 mb-4">
        <div class="fs-title-2 font-title-2 fw-700 mb-2">{{ research_experience.label }}</div>
        <div class="fs-content-1 fw-400 text-justify">
          {{ research_experience.value }}
        </div>
      </div>
      <div
      v-if="(teaching_experience && teaching_experience.value)"
      class="w-100 mb-4">
        <div class="fs-title-2 font-title-2 fw-700 mb-2">{{ teaching_experience.label }}</div>
        <div class="fs-content-1 fw-400 text-justify">
          {{ teaching_experience.value }}
        </div>
      </div>
      <div
      v-if="(administrative_experience && administrative_experience.value)"
      class="w-100 mb-4">
        <div class="fs-title-2 font-title-2 fw-700 mb-2">{{ administrative_experience.label }}</div>
        <div class="fs-content-1 fw-400 text-justify">
          {{ administrative_experience.value }}
        </div>
      </div>
      <div
      v-if="(collaboration && collaboration.value)"
      class="w-100 mb-4">
        <div class="fs-title-2 font-title-2 fw-700 mb-2">{{ collaboration.label }}</div>
        <div class="fs-content-1 fw-400 text-justify">
          {{ collaboration.value }}
        </div>
      </div>

      <!-- TIMELINE -->
      <div class="my-5">

        <!-- QUALIFICATION -->
        <div
        id="timeline_qualification"
        v-if="qualification"
        class="w-100">
          <div class="w-100 pl-5">
            <div class="fs-title-2 font-title fw-700 pt-2 pb-4 border-bottom w-100 mb-4">
              {{ qualification.label }}
            </div>
          </div>
          <ul class="fe-timeline">
            <li class="fe-timeline-item">
              <div class="fe-timeline-marker-icon">
                <span :class="`mdi ${getTimelineIcon('qualification')} text-white fs-title-1`"/>
              </div>
              <div class="fe-timeline-content fe-timeline-content-title"/>
            </li>
            <li
            v-for="(value, index) in (qualification.value || [])"
            :key="index"
            class="fe-timeline-item">
              <div class="fe-timeline-marker"/>
              <div class="fe-timeline-content">
                <div class="p-4">
                  <div class="fs-subtitle-2 fw-700">
                    {{ value }}
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- END OF QUALIFICATION -->

        <!-- PUBLICATION -->
        <div
        v-if="publication"
        id="timeline_publication"
        class="w-100">
          <div class="w-100 mb-4 pl-5">
            <div class="border-bottom w-100">
              <div class="fs-title-2 font-title fw-700 pt-2 pb-4 w-100">
                {{ publication.label }}
              </div>
              <template v-for="(row, index) in (publication.research_profile || [])">
                <div
                v-if="row.url"
                :key="index"
                class="fs-content-1 fw-500 mb-2 text-uppercase-first-letter">
                  {{ row.name }} : <a :href="row.url" target="_blank" class="text-info">{{ row.url }}</a>
                </div>
              </template>
            </div>
          </div>
          <ul class="fe-timeline">
            <template v-for="(key, index) in Object.keys(publication.items)">
              <fragment
              v-if="(publication.items[key].value || []).length > 0"
              :key="index">
                <li class="fe-timeline-item">
                  <div class="fe-timeline-marker-icon">
                    <span :class="`mdi ${getTimelineIcon(key)} text-white fs-title-1`"/>
                  </div>
                  <div class="fe-timeline-content fe-timeline-content-title pt-3">
                    <div class="fs-subtitle-2 fw-700">{{ publication.items[key].label }}</div>
                  </div>
                </li>
                <li
                v-for="(row, i) in (publication.items[key].value || [])"
                :key="i"
                class="fe-timeline-item">
                  <div class="fe-timeline-marker"/>
                  <div class="fe-timeline-content">
                    <div class="p-4">
                      <div class="mb-3 fs-subtitle-2 fw-700">
                        {{ row.title }}
                        <template v-if="row.judul_buku"> In <i>{{ row.judul_buku }}</i></template>
                      </div>
                      <div class="fs-content-2 fw-500 text-gray">
                        <CustomPagesLecturersProfileAbstractItem
                        v-if="row.abstrak"
                        class="mb-3"
                        :content="row.abstrak"/>
                        <div class="w-100 mb-2" v-if="row.doi">
                          DOI : <a class="text-info cursor-pointer" :href="row.artefak" target="_blank">{{ row.doi }}</a>
                        </div>
                        <div class="w-100 mb-2" v-if="row.artefak">
                          URL : <a class="text-info cursor-pointer" :href="row.artefak" target="_blank">{{ row.artefak }}</a>
                        </div>
                        <div class="w-100 mb-2" v-if="row.isbn">
                          ISBN : {{ row.isbn }}
                        </div>
                        <div class="w-100 mb-2" v-if="row.editor">
                          Editor : {{ row.editor }}
                        </div>
                        <div class="w-100 mb-2" v-if="row.volume">
                          Volume : {{ row.volume }}
                        </div>
                        <div class="w-100 mb-2" v-if="row.halaman">
                          Halaman : {{ row.halaman }}
                        </div>
                        <div class="w-100 mb-2" v-if="row.penerbit">
                          Penerbit : {{ row.penerbit }}
                        </div>
                        <div class="w-100 mb-2" v-if="row.tahun">
                          Tahun : {{ row.tahun }}
                        </div>
                        <div class="w-100" v-if="(row.co_authors || []).length > 0">
                          Co-Authors : <span>{{ row.co_authors.join(', ') }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </fragment>
            </template>
          </ul>
        </div>
        <!-- END OF PUBLICATION -->

        <!-- LITABMAS -->
        <div
        v-if="litabmas"
        id="timeline_litabmas"
        class="w-100">
          <div class="w-100 pl-5">
            <div class="fs-title-2 font-title fw-700 pt-2 pb-4 border-bottom w-100 mb-4">
              {{ litabmas.label }}
            </div>
          </div>
          <ul class="fe-timeline">
            <template v-for="(key, index) in Object.keys(litabmas.items)">
              <fragment
              v-if="(litabmas.items[key].value || []).length > 0"
              :key="index">
                <li class="fe-timeline-item">
                  <div class="fe-timeline-marker-icon">
                    <span :class="`mdi ${getTimelineIcon(key)} text-white fs-title-1`"/>
                  </div>
                  <div class="fe-timeline-content fe-timeline-content-title pt-3">
                    <div class="fs-subtitle-2 fw-700">{{ litabmas.items[key].label }}</div>
                  </div>
                </li>
                <li
                v-for="(row, i) in (litabmas.items[key].value || [])"
                :key="i"
                class="fe-timeline-item">
                  <div class="fe-timeline-marker"/>
                  <div class="fe-timeline-content">
                    <div class="p-4">
                      <div class="mb-3 fs-subtitle-2 fw-700">
                        {{ row.title }}
                      </div>
                      <div class="fs-content-2 fw-500 text-gray">
                        <div class="w-100 mb-2">
                          <span v-if="row.skim">{{ row.skim }}</span>
                          <span v-if="(row.skim && row.tahun)">,&nbsp;</span>
                          <b v-if="row.tahun" class="text-black">{{ row.tahun }}</b>
                        </div>
                        <div class="w-100" v-if="(row.co_authors || []).length > 0">
                          <span class="text-info">{{ row.co_authors.join('; ') }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </fragment>
            </template>
          </ul>
        </div>
        <!-- END OF LITABMAS -->

        <!-- TRAINING -->
        <div
        v-if="training"
        class="w-100">
          <div class="w-100 pl-5">
            <div class="fs-title-2 font-title fw-700 pt-2 pb-4 border-bottom w-100 mb-4">
              {{ training.label }}
            </div>
          </div>
          <ul class="fe-timeline">
            <li class="fe-timeline-item">
              <div class="fe-timeline-marker-icon">
                <span :class="`mdi ${getTimelineIcon('training')} text-white fs-title-1`"/>
              </div>
              <div class="fe-timeline-content fe-timeline-content-title"/>
            </li>
            <li
            v-for="(row, index) in (training.value || [])"
            :key="index"
            class="fe-timeline-item">
              <div class="fe-timeline-marker"/>
              <div class="fe-timeline-content">
                <div class="p-4">
                  <div class="mb-3 fs-subtitle-2 fw-700">
                    {{ row.nama_pelatihan }}
                  </div>
                  <div class="fs-content-2 fw-500 text-gray">
                    <div class="w-100 mb-2" v-if="row.penyelenggara">
                      Penyelenggara : {{ row.penyelenggara }}
                    </div>
                    <div class="w-100 mb-2" v-if="row.tahun_pelatihan">
                      Tahun : {{ row.tahun_pelatihan }}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- END OF TRAINING -->

        <!-- CERTIFICATION -->
        <div
        v-if="certification"
        class="w-100">
          <div class="w-100 pl-5">
            <div class="fs-title-2 font-title fw-700 pt-2 pb-4 border-bottom w-100 mb-4">
              {{ certification.label }}
            </div>
          </div>
          <ul class="fe-timeline">
            <li class="fe-timeline-item">
              <div class="fe-timeline-marker-icon">
                <span :class="`mdi ${getTimelineIcon('certification')} text-white fs-title-1`"/>
              </div>
              <div class="fe-timeline-content fe-timeline-content-title"/>
            </li>
            <li
            v-for="(row, index) in (certification.value || [])"
            :key="index"
            class="fe-timeline-item">
              <div class="fe-timeline-marker"/>
              <div class="fe-timeline-content">
                <div class="p-4">
                  <div class="mb-3 fs-subtitle-2 fw-700">
                    {{ row.nama_sertifikasi }}
                  </div>
                  <div class="fs-content-2 fw-500 text-gray">
                    <div class="w-100 mb-2" v-if="row.penyelenggara">
                      Penyelenggara : {{ row.penyelenggara }}
                    </div>
                    <div class="w-100 mb-2" v-if="row.tahun_valid">
                      Valid : {{ row.tahun_valid }}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- END OF CERTIFICATION -->

        <!-- AWARD -->
        <div
        id="timeline_award"
        v-if="award"
        class="w-100">
          <div class="w-100 pl-5">
            <div class="fs-title-2 font-title fw-700 pt-2 pb-4 border-bottom w-100 mb-4">
              {{ award.label }}
            </div>
          </div>
          <ul class="fe-timeline">
            <template v-for="(key, index) in Object.keys(award.items)">
              <fragment
              v-if="(award.items[key].value || []).length > 0"
              :key="index">
                <li class="fe-timeline-item">
                  <div class="fe-timeline-marker-icon">
                    <span :class="`mdi ${getTimelineIcon('award')} text-white fs-title-1`"/>
                  </div>
                  <div class="fe-timeline-content fe-timeline-content-title pt-3">
                    <div class="fs-subtitle-2 fw-700">{{ award.items[key].label }}</div>
                  </div>
                </li>
                <li
                v-for="(row, i) in (award.items[key].value || [])"
                :key="i"
                class="fe-timeline-item">
                  <div class="fe-timeline-marker"/>
                  <div class="fe-timeline-content">
                    <div class="p-4" v-if="key == 'external'">
                      <div class="mb-3 fs-subtitle-2 fw-700">
                        {{ row.nama_penghargaan }}
                      </div>
                      <div class="fs-content-2 fw-500 text-gray">
                        <div class="w-100 mb-2" v-if="row.tahun">
                          {{ row.tahun }}
                        </div>
                        <div class="w-100 mb-2">
                          {{ row.tingkat }}
                        </div>
                      </div>
                    </div>
                    <div class="p-4" v-if="key == 'internal'">
                      <div class="mb-3 fs-subtitle-2 fw-700">
                        {{ row.Nama }}
                      </div>
                      <div class="fs-content-2 fw-500 text-gray">
                        <div class="w-100 mb-2" v-if="row.Tahun">
                          {{ row.Tahun }}
                        </div>
                        <div class="w-100 mb-2">
                          {{ row.Lembaga }} ({{ row.Tingkat }})
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                
              </fragment>
            </template>
          </ul>
        </div>
        <!-- END OF AWARD -->

        <!-- ORGANIZATION -->
        <div
        v-if="organization"
        class="w-100">
          <div class="w-100 pl-5">
            <div class="fs-title-2 font-title fw-700 pt-2 pb-4 border-bottom w-100 mb-4">
              {{ organization.label }}
            </div>
          </div>
          <ul class="fe-timeline">
            <li class="fe-timeline-item">
              <div class="fe-timeline-marker-icon">
                <span :class="`mdi ${getTimelineIcon('organization')} text-white fs-title-1`"/>
              </div>
              <div class="fe-timeline-content fe-timeline-content-title pt-3"/>
            </li>
            <li
            v-for="(row, index) in organization.value"
            :key="index"
            class="fe-timeline-item">
              <div class="fe-timeline-marker"/>
              <div class="fe-timeline-content">
                <div class="p-4">
                  <div class="mb-3 fs-subtitle-2 fw-700">
                    {{ row.nama_organisasi }}
                  </div>
                  <div class="fs-content-2 fw-500 text-gray">
                    <div class="w-100 mb-2" v-if="row.periode">
                      Periode : {{ row.periode }}
                    </div>
                    <div class="w-100 mb-2" v-if="row.jabatan">
                      Jabatan : {{ row.jabatan }}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- END OF ORGANIZATION -->

      </div>
      <!-- END OF TIMELINE -->

    </div>
  </section>
</template>
<script>
import {Fragment} from 'vue-fragment';

export default {
  name: 'LecturersProfile',
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  components: {
    Fragment
  },
  computed: {
    assetUrl() {
      return this.$store.getters['page/getAssetUrl'];
    },
    body() {
      return this.data.body;
    },
    profile() {
      return this.body.profile;
    },
    description() {
      const {description} = this.body;
      return (description && description.value) ? description.value : null;
    },
    nav() {
      let me = this;
      const {nav} = this.body;
      return (nav && nav.length > 0) ? nav.filter((row) => {
        if (row.value === 'qualification') return !!me.qualification;
        if (row.value === 'publication') return !!me.publication;
        if (row.value === 'litabmas') return !!me.litabmas;
        if (row.value === 'award') return !!me.award;
        return true;
      }) : [];
    },
    research_experience() {
      return this.body.research_experience;
    },
    teaching_experience() {
      return this.body.teaching_experience;
    },
    administrative_experience() {
      return this.body.administrative_experience;
    },
    collaboration() {
      return this.body.collaboration;
    },
    qualification() {
      const {qualification} = this.body;
      return (qualification && (qualification.value || []).length > 0) ? qualification : null;
    },
    certification() {
      const {certification} = this.body;
      return (certification && (certification.value || []).length > 0) ? certification : null;
    },
    training() {
      const {training} = this.body;
      return (training && (training.value || []).length > 0) ? training : null;
    },
    publication() {
      const {publication} = this.body;
      if (publication) {
        const itemKeys = Object.keys(publication?.items || {});
        return (itemKeys.length > 0 && itemKeys.some((key) => (publication.items[key]?.value || []).length > 0)) ? publication : null;
      }
      return null;
    },
    litabmas() {
      const {litabmas} = this.body;
      if (litabmas) {
        const itemKeys = Object.keys(litabmas?.items || {});
        return (itemKeys.length > 0 && itemKeys.some((key) => (litabmas.items[key]?.value || []).length > 0)) ? litabmas : null;
      }
      return null;
    },
    award() {
      const {award} = this.body;
      if (award) {
        const itemKeys = Object.keys(award?.items || {});
        return (itemKeys.length > 0 && itemKeys.some((key) => (award.items[key]?.value || []).length > 0)) ? award : null;
      }
      return null;
    },
    organization() {
      const {organization} = this.body;
      return (organization && (organization.value || []).length > 0) ? organization : null;
    },
  },
  methods: {
    getTimelineIcon(key) {
      const collections = {
        qualification: 'mdi-school-outline',
        article: 'mdi-book-open-variant',
        book: 'mdi-book-open-variant',
        book_chapter: 'mdi-book-open-variant',
        proceedings: 'mdi-book-open-variant',
        research: 'mdi-test-tube',
        dedication: 'mdi-account-multiple',
        award: 'mdi-seal',
        organization: 'mdi-account-group',
        certification: 'mdi-certificate',
        training: 'mdi-monitor-account',
      };

      return collections[key] ?? 'mdi-information';
    },
    scrollTo(elementId) {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView();
        setTimeout(function(){
          let scrolledY = window.scrollY;
          if (scrolledY) window.scroll(0, scrolledY - document.querySelector("header.fe-ums-header").offsetHeight);
        }, 700);
      }
    }
  }
}
</script>
