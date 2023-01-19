<template>
  <no-ssr>
    <div class="w-100">
      <template v-for="(section) in sections">
        <LazySectionsSectionBanner
          :key="section.random_key"
          v-if="section.code == 1"
          :data="section"/>
        <LazySectionsSectionImages
          :key="section.random_key"
          v-if="section.code == 2"
          :data="section"/>
        <LazySectionsSectionBannerFooterWithActions
          :key="section.random_key"
          v-if="section.code == 3"
          :data="section"/>
        <LazySectionsSectionImageWithSearchbox
          :key="section.random_key"
          v-if="section.code == 4"
          :data="section"/>
        <LazySectionsSectionProfileRight
          :key="section.random_key"
          v-if="section.code == 5"
          :data="section"/>
        <LazySectionsSectionBannerWithActions
          :key="section.random_key"
          v-if="section.code == 6"
          :data="section"/>
        <LazySectionsSectionFreeText
          :key="section.random_key"
          v-if="section.code == 7"
          :data="section"/>
        <LazySectionsSectionButtons
          :key="section.random_key"
          v-if="section.code == 8"
          :data="section"/>
        <LazySectionsSectionImage
          :key="section.random_key"
          v-if="section.code == 9"
          :data="section"/>
        <LazySectionsSectionProfileWithActions
          :key="section.random_key"
          v-if="section.code == 10"
          :data="section"/>
        <LazySectionsSectionThreeCards
          :key="section.random_key"
          v-if="section.code == 11"
          :data="section"/>
        <LazySectionsSectionInlineImageIcon
          :key="section.random_key"
          v-if="section.code == 12"
          :data="section"/>
        <LazySectionsSectionGridCenterImage
          :key="section.random_key"
          v-if="section.code == 13"
          :data="section"/>
        <LazySectionsSectionSocials
          :key="section.random_key"
          v-if="section.code == 14"
          :data="section"/>
        <LazySectionsSectionSideImage
          :key="section.random_key"
          v-if="section.code == 15"
          :data="section"/>
        <LazySectionsSectionFaculties
          :key="section.random_key"
          v-if="section.code == 16"
          :data="section"/>
        <LazySectionsSectionSideImageMeta
          :key="section.random_key"
          v-if="section.code == 17"
          :data="section"/>
        <LazySectionsSectionCollapsibleFilterable
          :key="section.random_key"
          v-if="section.code == 18"
          :data="section"/>
        <LazySectionsSectionCollapsible
          :key="section.random_key"
          v-if="section.code == 19"
          :data="section"/>
        <LazySectionsSectionButtonAndText
          :key="section.random_key"
          v-if="section.code == 20"
          :data="section"/>
        <LazySectionsSectionSpace
          :key="section.random_key"
          v-if="section.code == 21"
          :data="section"/>
        <LazySectionsSectionYoutubeEmbed
          :key="section.random_key"
          v-if="section.code == 22"
          :data="section"/>
        <LazySectionsSectionStatsNumber
          :key="section.random_key"
          v-if="section.code == 23"
          :data="section"/>
        <LazySectionsSectionStatsCard
          :key="section.random_key"
          v-if="section.code == 24"
          :data="section"/>
        <LazySectionsSectionStatsCardImage
          :key="section.random_key"
          v-if="section.code == 25"
          :data="section"/>
        <LazySectionsSectionProfileMiniThumb
          :key="section.random_key"
          v-if="section.code == 26"
          :data="section"/>
        <LazySectionsSectionItemsPopover
          :key="section.random_key"
          v-if="section.code == 27"
          :data="section"/>
        <LazySectionsSectionContentNavigated
          :key="section.random_key"
          v-if="section.code == 28"
          :data="section"/>
        <LazySectionsSectionNewsCard
          :key="section.random_key"
          v-if="(section.code == 29 || section.code == 30)"
          :data="section"/>
        <LazySectionsSectionScolarshipsCards
          :key="section.random_key"
          v-if="section.code == 31"
          :data="section"/>
        <LazySectionsSectionNewsCardFull
          :key="section.random_key"
          v-if="(section.code == 32 || section.code == 33)"
          :data="section"/>
        <LazySectionsSectionScolarships
          :key="section.random_key"
          v-if="section.code == 34"
          :data="section"/>
        <LazySectionsSectionLecturers
          :key="section.random_key"
          v-if="section.code == 35"
          :data="section"/>
        <LazySectionsSectionWaterfallGallery
          :key="section.random_key"
          v-if="section.code == 36"
          :data="section"/>
        <LazySectionsSectionSideYoutubeEmbed
          :key="section.random_key"
          v-if="section.code == 37"
          :data="section"/>
        <LazySectionsSectionTitle
          :key="section.random_key"
          v-if="section.code == 38"
          :data="section"/>
        <LazySectionsSectionYoutubeCards
          :key="section.random_key"
          v-if="section.code == 39"
          :data="section"/>
        <LazySectionsSectionBannerYoutube
          :key="section.random_key"
          v-if="section.code == 40"
          :data="section"/>
        <LazySectionsSectionShare
          :key="section.random_key"
          v-if="section.code == 200"
          :data="section"/>
        <LazyCustomPagesNewsPool
          :key="section.random_key"
          v-if="section.code == 201"
          :data="section"/>
        <LazyCustomPagesEventsPool
          :key="section.random_key"
          v-if="section.code == 202"
          :data="section"/>
        <LazyCustomPagesScholarshipsPool
          :key="section.random_key"
          v-if="section.code == 203"
          :data="section"/>
        <LazySectionsSectionStudyProfile
          :key="section.random_key"
          v-if="section.code == 204"
          :data="section"/>
        <LazyCustomPagesLecturersPool
          :key="section.random_key"
          v-if="section.code == 205"
          :data="section"/>
        <LazyCustomPagesLecturersProfile
          :key="section.random_key"
          v-if="section.code == 206"
          :data="section"/>
        <LazyCustomPagesSearch
          :key="section.random_key"
          v-if="section.code == 207"
          :data="section"/>
      </template>
    </div>
  </no-ssr>
</template>
<script>
export default {
  name: 'Sections',
  computed: {
    sections() {
      let me = this;
      const sections = this.$store.getters['page/getPageSections'] || [];
      const tempSlugs = [];
      return sections.map((row) => {
        const nameToSlug = me.$helpers.strToSlug(row.name);
        // quadratic loop :( there's no other way
        const slugs = tempSlugs.filter(({slug}) => slug === nameToSlug) || [];

        const slugData = {
          slug: nameToSlug,
          slug_num: (slugs.length > 0) ? (slugs[slugs.length - 1].slug_num + 1) : 1
        };

        tempSlugs.push(slugData);

        row['random_key'] = Math.random().toString(36).substring(3, 9);
        row = {...row, slug_id: slugData.slug + '-' + slugData.slug_num};

        return row;
      });
    }
  }
}
</script>