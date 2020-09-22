<template>
  <div class="timeline">
    <h1>Timeline</h1>
    <p>
      新規投稿
      <span class="small" v-bind:class="{error: hasError}">[{{text.length}}/140]</span>
    </p>
    <div class="wrapper">
      <textarea v-model="text"></textarea>
      <button @click="submit" :disabled="hasError">Submit</button>
    </div>
    <div v-if="isReady">
      <ul>
        <li v-for="tweet in tweets" v-bind:key="tweet.id">
          <p>{{tweet.message}}</p>
          <span class="small">[{{tweet.date | dateFilter}}]</span>
        </li>
      </ul>
      <span v-if="tweets.length == 0">no message found!</span>
    </div>
    <div v-else>loading...</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

interface Tweet {
  id: number;
  message: string;
  date: string;
}

export default Vue.extend({
  name: "Timeline",
  filters: {
    dateFilter(date: string) {
      return new Date(date).toLocaleString();
    }
  },
  data() {
    return {
      text: "",
      tweets: [] as Array<Tweet>,
      isReady: false
    };
  },
  computed: {
    hasError(): boolean {
      return this.text.length == 0 || this.text.length > 140;
    }
  },
  methods: {
    async submit() {
      if (this.hasError) return;
      const res = await fetch("http://localhost:3000/api/tweets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: this.text })
      });
      const tweet = (await res.json()) as Tweet;
      this.tweets.unshift(tweet);
      this.text = "";
    }
  },
  async mounted() {
    // メッセージの読み込み処理
    const res = await fetch("http://localhost:3000/api/tweets");
    this.tweets = await res.json();
    this.isReady = true;
  }
});
</script>

<style scoped>
ul {
  width: 100%;
  padding: 0;
}
li {
  list-style-type: none;
  padding: 0.5em;
  margin: 5px 0;
  background-color: #fff;
  box-shadow: 0px 5px 10px rgba(44, 62, 80, 0.25);
  border-radius: 5px;
}
p {
  margin: 0;
}
.small {
  font-size: 0.8em;
}
.wrapper {
  display: flex;
  box-shadow: 0px 5px 10px rgba(44, 62, 80, 0.25);
  border-radius: 5px;
}
textarea {
  width: 100%;
  border: solid 1px rgba(44, 62, 80, 0.25);
  border-right: 0;
  border-radius: 5px 0 0 5px;
  outline: none;
  resize: none;
  padding: 0.5em;
}
button {
  flex-shrink: 1;
  border-radius: 0 5px 5px 0;
  background-color: #2c3e50;
  color: #ffffff;
  font-weight: bold;
  border: none;
  outline: none;
  padding: 0.5em;
}
button:disabled {
  background-color: rgba(44, 62, 80, 0.25);
}
.error {
  color: #f84718;
}
</style>