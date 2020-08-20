<template>
  <div class="SessionCreate container-fluid">
    <div class="row chocolate min-height2 align-items-center justify-content-center">
      <div class>
        <div class="justify-content-center mt-2">
          <h1 class="font-fancy">Song Sundae</h1>
        </div>
        <div class="justify-content-center mt-4 mx-5">
          <p>You don't need to steal your friend's phone to put on decent music.</p>
        </div>
      </div>
    </div>

    <div class="row vanilla min-height align-items-center">
      <div class="col-12">
        <div class="form-group">
          <div class="row px-5 py-3">
            <input
              v-model="newSessionName"
              type="text"
              placeholder="Please Enter a Session Name"
              class="form-control text-center rounded-pill"
            />
          </div>
          <div class="row px-5 py-3">
            <button
              @click="createSession"
              class="btn btn-block btn-outline-danger p-3 rounded-pill"
            >
              <h2>Create Session</h2>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row min-height2 strawberry"></div>
  </div>
</template>


<script>
import utils from "../../utils.js";
import { onAuth } from "@bcwdev/auth0-vue";
export default {
  name: "SessionCreate",
  data() {
    return {
      newSessionName: "",
    };
  },
  async beforeMount() {
    // await this.auth();
  },
  computed: {},
  methods: {
    // async auth() {
    //   await this.$auth.loginWithPopup();
    //   // await onAuth();
    //   this.$store.dispatch("setBearer", this.$auth.bearer);
    //   this.$store.dispatch("getProfile", this.$auth.user);
    // },
    createSession() {
      this.$store.dispatch("createSession", {
        sessionName: this.newSessionName,
        sessionCode: utils.randomCode(),
        userEmail: this.$store.state.user.email,
      });
      this.newSessionName = "";
    },
  },
  components: {},
};
</script>


<style scoped>
body {
  background-color: #fff8ed;
  color: var(--black);
}
.font-fancy {
  font-family: "Norican", cursive;
}

.min-height {
  min-height: 36vh;
}
.min-height2 {
  min-height: 32vh;
}

.strawberry {
  background-color: #ffd9d1;
}
.chocolate {
  background-color: #74462c;
}
.vanilla {
  background-color: #fff8ed;
}
.strawberry-accent {
  color: white;
  background-color: #e64772;
}
.bright-accent {
  color: white;
  background-color: #0fb2b5;
}
</style>