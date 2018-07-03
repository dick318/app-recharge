<template>
       <div class="main" >
            <h3 class="title" >{{title}}
            </h3>
            <div class="info">{{info}}
            </div>
            <img class="img" v-bind:src="img" />
            <div class="body" v-html='body'>
            </div>

        </div>
</template>
<style scoped>
.main {
  width: 100%;
}
.title {
  text-align: center;
}
img {
  margin: 0.2rem;
  box-sizing: border-box;
  max-width: calc(100% - 0.4rem);
}
.body {
  padding: 0 2%;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
</style>

<script>
import c from "../index";
export default {
  data() {
    return {
      title: "",
      info: "",
      img: "",
      body: ""
    };
  },
  beforeCreate: function() {
    const _this = this;
    c.$post(
      "/?r=home/view/index",
      {
        id: this.$route.query.id
      },
      function(data) {
        _this.title = data.data.title;
        _this.info = data.data.info;
        _this.img = data.data.img;
        _this.body = data.data.content;
      }
    );
  }
};
</script>