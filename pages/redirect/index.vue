<script>
import { mapGetters, mapActions } from "vuex";

export default {

  created() {
          this.$router.push('/home');
  },
    
  beforeRouteLeave(to, from, next) {
    next();
  }
  };
</script>