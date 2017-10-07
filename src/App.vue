<template>
  <div id="app">
    <section header>
      <div header-logo-line>
        <img src="./assets/server.png" alt="">
        <span logo-txt>Ocean Server</span>
        <div header-list>
          <a href="#">API</a>
          <a href="#">
            <router-link to="uploadFile" replace>Upload Files</router-link>
          </a>
          <a href="#">About</a>
        </div>
      </div>
      <div big-title>Ocean Server</div>
      <div mid-desc>A file Server with a cdn service for static files. </div>
      <div main-search>
        <input v-model="searchKey" @keyup.13="search" sarch-input placeholder="search files and static resources" />
      </div>
      <div mid-sta>All Files:{{allCnt}} | All Static Files:{{staticCnt}} </div>
    </section>

    <section body>
      <router-view :searchKey="searchKey" ref="list"></router-view>
    </section>

    <section footer></section>
  </div>
</template>

<script>
import { getSatastic } from './api/api'

export default {
  name: 'app',
  data() {
    return {
      searchKey: "",
      allCnt:0,
      staticCnt:0
    }
  },
  methods: {
    search() {
      var isSpage = location.href.indexOf('uploadFile') >= 0;
      if (isSpage) return this.$router.push('/')

      var key = this.searchKey;
      this.$refs.list.getFileList(key);
    }
  },
  mounted() {
     getSatastic().then((res) => {
        if (res.data.Code !== 200) return alert(res.data.Message)
        this.allCnt = res.data.Data.AllCnt;
        this.staticCnt = res.data.Data.StaticCnt;
      });
  }
}

</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

[header] {
  height: 450px;
  background-color: #27ae60;
  color: #fff;
}

[header-logo-line] {
  min-width: 768px;
  max-width: 1200px;
  margin: 0px auto;
  height: 70px;
  padding: 30px 0;
}

[header-logo-line] img {
  float: left;
  width: 42px;
}

[header-logo-line] [logo-txt] {
  float: left;
  font-size: 36px;
  margin-left: 10px;
}

[header-list] {
  float: right;
  width: 300px;
  margin-top: 18px;
}

[header-list] a {
  color: #eee;
  text-decoration: none;
  margin-left: 20px;
}

[header-list] a:hover {
  color: #fff;
}

[big-title] {
  text-shadow: -5px 5px 0 rgba(0, 0, 0, .1);
  font-size: 56px;
}

[mid-desc] {
  font-size: 24px;
  margin-top: 6px;
  font-weight: 200;
  color: #eee;
  margin-bottom: 10px;
}

[sarch-input] {
  -webkit-box-shadow: none;
  box-shadow: none;
  font-size: 16px;
  padding: 13px 30px;
  border-radius: 0;
  height: auto;
  text-align: center;
  border-color: transparent;
  width: 680px;
}

[mid-sta] {
  margin-top: 10px;
}
</style>
