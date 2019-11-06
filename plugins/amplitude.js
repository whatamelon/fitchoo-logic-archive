import Vue from "vue";
import VueAmplitude from "vue-amplitude";

Vue.use(VueAmplitude, {
  apiKey: "87d1f63b69740fff1e06f0f4487db359",
  config: {
    includeUtm: true,
    includeReferrer: true
  }
});
