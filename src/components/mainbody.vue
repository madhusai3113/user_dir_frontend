
<template>
  <div>
<headerfile></headerfile>
    

<table>
<h2>dsasds</h2>
 <tr v-for="item in User">
            <td>{{ item.name}}</td>
            <td>{{ item.phones[0].aadhar}}</td>
    </tr>
  
</table>
    

  </div>
</template>

<script>
import axios from "axios";
import headerfile from "./headerfile"
export default {
  name: "mainbody",
  components:{
      headerfile
  },
  data() {
    return {
      User: {}
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/")
      .then(response => {
        console.log(response.data);
        this.User = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
