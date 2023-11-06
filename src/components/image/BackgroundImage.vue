<template>
  <picture class="background-picture">
    <source
      media="(min-width: 1248px)"
      :srcset="baseURL + type + '/lg/' + id + '.jpg'"
    />
    <source
      media="(min-width: 960px)"
      :srcset="baseURL + type + '/md/' + id + '.jpg'"
    />
    <source
      media="(min-width: 600px)"
      :srcset="baseURL + type + '/sm/' + id + '.jpg'"
    />
    <img
      class="background-img"
      :src="baseURL + type + '/xs/' + id + '.jpg'"
      :alt="alt"
    />
  </picture>
</template>

<script>
export default {
  name: "BackgroundPicture",
  data: () => ({
    baseURL: process.env.VUE_APP_IMAGE_BASE_URL
  }),
  props: {
    type: String,
    id: Number,
    alt: String
  }
};
</script>

<style lang="scss" scoped>
$background-picture-height: 390px;
$background-picture-height-xs: 285px;

.background-picture {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;

  .background-img {
    object-fit: cover;
    object-position: 50% 30%;
    width: 100%;
    height: $background-picture-height; // Without this the image covers the whole height.
  }
}

.background-picture:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: $background-picture-height;
  background: linear-gradient(
    rgba(0, 0, 0, 0.3) 60%,
    rgba(0, 0, 0, 0.6) 80%,
    rgba(0, 0, 0, 0.8) 90%,
    #000000 98%
  );
}

.v-application-xs {
  .background-picture {
    .background-img {
      height: $background-picture-height-xs; // Image size 440x300 should work fine.
    }
  }

  .background-picture:after {
    height: $background-picture-height-xs;
  }
}

.v-application-md,
.v-application-sm {
  .background-picture {
    .background-img {
      object-position: 50% 0%;
    }
  }
}
</style>
