<template>
  <div>
    <headerfile></headerfile>
    <br />
    <br />
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group id="input-group-1" label=" aadhar:" label-for="input-1">
        <b-form-input id="input-1" v-model="form.aadhar" type="text" required placeholder="enter aadhar"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input id="input-2" v-model="form.name" required placeholder="Enter name"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Your mobile" label-for="input-3">
        <b-form-input id="input-3" v-model="form.phoneNum" required placeholder="Enter mobile"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Your address" label-for="input-4">
        <b-form-input id="input-4" v-model="form.address" required placeholder="Enter address"></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import headerfile from "./headerfile";
export default {
  components: {
    headerfile
  },
  data() {
    return {
      form: {
        email: "",
        name: "",
        
      },
      show:true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    }
  }
};
</script>
<style scoped>

#addButton{
display: none
}
</style>
