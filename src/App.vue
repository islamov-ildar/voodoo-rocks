<template>
  <div class="input-wrapper">
    <div class="p-inputgroup flex-1">
    <span class="p-inputgroup-addon">
        <i class="pi pi-search"></i>
    </span>
      <InputText placeholder="Enter Author name" v-model="searchValue" @input="runSearch" />
    </div>
  </div>
  <div class="card-container">
    <Card v-for="(onePost, idx) in allPosts" :key="idx" class="post-card">
      <template #title> <p class="capitalize">{{ onePost.title }} </p></template>
      <template #content>
        <p class="capitalize">
          {{ onePost.body}}
        </p>
        <p class="user-name">
          <strong>{{ onePost.userName}}</strong>
        </p>
      </template>
    </Card>
  </div>

</template>

<script>
import {ref} from "vue";
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
export default {
  name: 'App',
  components: {Card, InputText},

   setup() {
    const searchValue = ref('');
    const allPosts = ref();
    const allUsers = ref();

    const matchingPostAndUsers = () => {
      allPosts.value.map(onePost => {
        const currentPostUser = allUsers.value.filter(oneUser => oneUser.id === onePost.userId);
        onePost.userName = currentPostUser[0].name;

        return onePost;
      })

    }
    const getAllUsers = async() =>{
      const result = await fetch('https://jsonplaceholder.typicode.com/users')
      allUsers.value = await result.json()

      matchingPostAndUsers();
    }
    const getAllPosts = async() =>{
      const result = await fetch('https://jsonplaceholder.typicode.com/posts')
      allPosts.value = await result.json()

      await getAllUsers();
    }

    getAllPosts();

     const runSearch = () => {
       const cardUserNames = document.querySelectorAll('.user-name');
       setTimeout(() => {
         for (let i = 0; i < cardUserNames.length; i++) {
           if (!cardUserNames[i].textContent.toLowerCase()
               .includes(searchValue.value.toLowerCase())) {
             cardUserNames[i].closest(".post-card").classList.add('is-hidden');
           } else {
             cardUserNames[i].closest(".post-card").classList.remove('is-hidden')
           }
         }
       }, 300);
     };

    return {
      allPosts,
      searchValue,
      runSearch,
    }
   }
}
</script>

<style>
body {
  background-color: #4682B4;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.post-card {
  max-width: 300px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.capitalize:first-letter {
  text-transform: capitalize;
}
.input-wrapper {
  max-width: 60%;
  margin: 0 auto 40px auto;
}
.is-hidden {
  display: none;
}
</style>
