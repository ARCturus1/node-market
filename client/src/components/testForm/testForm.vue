/* eslint-disable */
<template>
<div>
    <div v-if="!form.formSubmited">
        <label for="email">Email</label>
        <input id="email" type="text" v-model="form.email">
        <hr>
        <label for="firstName">First Name</label>
        <input id="firstName" type="text" v-model="form.firstName">
        <hr>
        <label for="lastName">Last Name</label>
        <input id="lastName" type="text" v-model="form.lastName">
        <hr>
        <label for="phone">Phone</label>
        <input id="phone" type="text" v-model="form.phone">
        <hr>
        <button @click="addGuest($event)">Add Guest</button>
        <hr>
        <div v-for="(guest, index) in form.guests" :key="index">
            <label @dblclick="deleteGuest($event, guest)" for="">Guest {{index}}</label>
            <input type="text" v-model="guest.email">
        </div>
        <button @click="sendData">Send Form</button>
    </div>
    <div v-else>
        <table>
            <tr>
                <td>Email</td>
                <td>{{form.email}}</td>
            </tr>
            <tr>
                <td>First Name</td>
                <td>{{form.firstName}}</td>
            </tr>
            <tr>
                <td>Last Name</td>
                <td>{{form.lastName}}</td>
            </tr>
            <tr>
                <td>Phone</td>
                <td>{{form.phone}}</td>
            </tr>
            <tr v-for="(guest, index) in form.guests" :key="index">
                <td>Geust {{index}}</td>
                <td>{{guest.email}}</td>
            </tr>
        </table>
    </div>
</div>
</template>
<script>
export default {
  name: "testForms",
  data() {
    return {
      form: {
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        guests: [],
        formSubmited: false
      }
    };
  },
  methods: {
    sendData() {
      this.form.formSubmited = true;
    },
    addGuest(event) {
      this.form.guests.push({ email: "" });
    },
    deleteGuest(event, item) {
      this.form.guests.pop(item);
    }
  }
};
</script>
