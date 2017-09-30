<template>
  <div class="home">
    <section content-list>
      <div list-item v-for="item in list">
        <div list-item-title>
          {{item.OriginName}}
        </div>
        <div list-item-desc>
          fileType:{{item.FileType}} | fileSize:{{item.FileSize}} | content-Type:{{item.ContentType}} | version:{{item.Version}} |
          <a list-copy v-clipboard:copy="getCopyLink(item.Id)">copy link</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getFiles } from '../api/api'

export default {
  name: 'home',
  // props: [
  //   'searchKey',
  // ],
  data() {
    return {
      list: {}
    }
  },
  methods: {
    getFileList(param) {
      getFiles(param).then((res) => {
        if (res.data.Code !== 200) return alert(res.data.Message)
        this.list = res.data.Data
      });
    },
    getCopyLink(linkId) {
      return window.location.origin + "/show/" + linkId;
    },
    onCopy: function(e) {
      alert('You just copied: ' + e.text)
    }
  },
  mounted() {
    this.getFileList("");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
[content-list] {
  min-width: 768px;
  max-width: 1200px;
  margin: 0px auto;
  height: 70px;
  padding: 30px 0;
  text-align: left;
}

[list-item] {
  border: 1px solid #ecf0f1;
  padding: 20px;
  margin-top: -1px;
}

[list-item-title] {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

[list-item-desc] {
  color: rgb(119, 119, 119);
}

[list-copy] {
  color: blue;
  cursor: pointer;
}
</style>
