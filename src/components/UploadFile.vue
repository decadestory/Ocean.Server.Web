<template>
    <form class="upload">
        <div form-line>
            <label>文件分类</label>
            <input type="text" v-model="cate" placeholder="eg:身份证照片">
        </div>
        <div form-line>
            <label>文件版本</label>
            <input type="text" v-model="version" placeholder="eg:1.5.2">
        </div>
        <div form-line>
            <label>选择文件(多选)</label>
            <input type="file" multiple @change="changed($event)">
        </div>
        <div form-line="submit">
            <div button @click="submit($event)">{{showBtnTxt}}</div>
        </div>
    </form>
</template>

<script>
import axios from 'axios'

export default {
    name: 'uploadFile',

    data() {
        return {
            cate: '',
            version: '',
            formData: new FormData(),
            files: [],
            showBtnTxt: '确认上传'
        }
    },
    methods: {
        changed(event) {
            this.files = event.target.files;
            if (!event.target.files) return;
            for (var i in event.target.files) this.formData.append('files' + i, event.target.files[i]);
        },
        submit(event) {
            if (this.files.length === 0) return alert('请选择文件');

            var cat = this.cate ? '?cate=' + this.cate : '';
            var ver = this.version ? this.version.replace(/\./g, "_") : '';

            this.showBtnTxt = '正在上传...';
            axios({
                url: '/upload/' + ver + cat,
                method: 'post',
                data: this.formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then((res) => {
                this.showBtnTxt = '确认上传';
                if (res.data.Code !== 200) {
                    alert('上传失败：' + res.data.Message);
                }
                else {
                    alert('上传成功');
                }

            })
        }
    },
}
</script>

<style scoped>
.upload {
    min-width: 768px;
    max-width: 1200px;
    margin: 0px auto;
    text-align: left;
    margin-top: 20px;
}

[form-line] {
    border: 1px solid #ecf0f1;
    margin-top: -1px;
    padding: 20px;
    line-height: 30px;
}

[form-line~=submit] {
    text-align: center;
}

input {
    width: 250px;
    padding: 10px;
}

input[type="text"] {
    border: 1px solid #ccc;
}

label {
    width: 150px;
    font-size: 16px;
    display: block;
}

[button] {
    padding: 5px;
    width: 100px;
    background-color: #27AE60;
    border: 1px solid #27AE60;
    color: #fff;
    cursor: pointer;
}
</style>
