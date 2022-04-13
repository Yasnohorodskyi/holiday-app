<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <h1 class="main-header">Choose Country and year</h1>

    <div class="container">
      <CustomSelect :options="countries" @input="selectedCountry" />
      <CustomSelect :options="years" @input="selectedYear" />
    </div>
    <button @click="showHoliday(chosedYear, countriesMap[chosedCountry])">
      Submit
    </button>
    <div class="container-holiday">
      <ul class="holiday-card" v-for="(holiday, idx) in holidays" :key="idx">
        <li>
          <span>Date of holiday:</span><br />
          {{ holiday.date }}
        </li>
        <li>
          <span>Local name:</span><br />
          {{ holiday.localName }}
        </li>
        <li>
          <span>International name:</span><br />
          {{ holiday.name }}
        </li>
        <li>
          <span>types:</span><br />
          {{ holiday.types[0] }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CustomSelect from "@/components/CustomSelect.vue";
import HolidayApi from "@/services/HolidayApi.js";

export default {
  name: "HomeView",
  components: {
    CustomSelect,
  },
  data() {
    return {
      countriesMap: {
        Ukraine: "UA",
        UK: "GB",
        Ireland: "IE",
        Portugal: "PT",
        France: "FR",
      },
      years: ["2017", "2018", "2019", "2020", "2022"],
      chosedCountry: "",
      chosedYear: null,
      holidays: null,
    };
  },
  computed: {
    countries() {
      return Object.keys(this.countriesMap);
    },
  },
  methods: {
    selectedCountry(data) {
      this.chosedCountry = data;
    },
    selectedYear(data) {
      this.chosedYear = data;
    },
    showHoliday(chosedYear, chosedCountry) {
      HolidayApi.getHolidays(chosedYear, chosedCountry)
        .then((response) => {
          this.holidays = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: row;
  width: 800px;
  margin: 0 auto;
  justify-content: space-between;
  column-gap: 50px;
  margin-bottom: 50px;
}
button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 50px;
  font-size: 17px;
  margin: 0 auto 50px auto;
  background-color: #42b983;
  border: 2px solid #42b983;
  border-radius: 5px;
}

button:hover {
  background-color: #fff;
  color: #42b983;
}
li {
  list-style-type: none;
  text-align: left;
  padding-bottom: 10px;
}
span {
  font-weight: 700;
}
.container-holiday {
  display: flex;
  flex-direction: row;
  width: 800px;
  margin: 0 auto;
  column-gap: 25px;
  flex-wrap: wrap;
}
.holiday-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 250px;
  background-color: #f0f0f0;
  border-radius: 5px;
  justify-content: flex-start;
  align-items: stretch;
  padding: 20px;
}
</style>
