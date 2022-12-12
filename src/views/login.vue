<template>
  <el-button type="primary" @click="handleReq">请求</el-button>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  methods: {
    async handleReq() {
      // const data = await axios.post('http://localhost:3000/template/html2pdf')
      const data = await axios.get('http://localhost:3000/')

      console.log('----->', data)
    }
  }
}
</script>
