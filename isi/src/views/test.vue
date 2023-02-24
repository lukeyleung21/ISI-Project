<template>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="pageMax"
        :total-visible="7"
      ></v-pagination>
      <p v-for="display in display[page - 1]">{{ display }}</p>
    </div>
    

</template>
    
<script>
export default {
    data () {
      return {
        page: 1,
        pageMax: 0,
        data: [{'v': '1'}, {'v':'2'}, {'v':'3'}, {'v':'4'}, {'v':'5'}, {'v':'6'}, {'v':'7'}, {'v':'8'}, {'v':'9'}],
        display: []
      }
    },
    mounted:function(){
      this.pageMax = Math.ceil(this.data.length / 2)
      for (let i = 0; i < this.pageMax; i++) {
          this.display.push([this.data[i * 2], this.data[i * 2 + 1]])
      }
  },
}
    
</script>