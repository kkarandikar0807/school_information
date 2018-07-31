
<template>
    <div>
        
        <!-- <div class="container-fluid">
      <div class="row">
        <nav class="col-md-1 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <ul class="nav flex-column">
              <li class="nav-item">
                <a class="nav-link active" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  Dashboard <span class="sr-only">(current)</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-11 px-4"><div class="chartjs-size-monitor" style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;"><div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div></div>
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">School Information Dashboard</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
              <div class="btn-group mr-2">
                <button class="btn btn-sm btn-outline-secondary">Save as PDF</button>
                <button class="btn btn-sm btn-outline-secondary">Print</button>
              </div>
            </div>
          </div>
               <div class="row">
              <div class="col-md" >
                  <vue-autosuggest style="z-index:1; position:absolute; width: 90%"
            :suggestions="filteredOptions"
            @focus="focusMe"
            @click="clickHandler"
            :on-selected="onSelected"
            :render-suggestion="renderSuggestion"
            :get-suggestion-value="getSuggestionValue"
            :input-props="{id:'autosuggest__input', onInputChange: this.onInputChange, placeholder:'Select a School'}"/>
            </div>  
          </div>
        </main>
      </div>
    </div> -->
    <div class="container">
    <div class="row">
        <div class="col">
            <vue-autosuggest style="z-index:1; position:absolute; width: 90%"
            :suggestions="filteredOptions"
            @focus="focusMe"
            @click="clickHandler"
            :on-selected="onSelected"
            :render-suggestion="renderSuggestion"
            :get-suggestion-value="getSuggestionValue"
            :input-props="{id:'autosuggest__input', onInputChange: this.onInputChange, placeholder:'Select a School'}"/>
        </div>
    </div>
    
   <div class="row">
       <div class="col-md-6">
           <public-income-chart ref="publicincome" :chart-data="publicIncomeValues" :chart-labels="publicIncomeKeys" v-if="publicIncomeDataLoaded"></public-income-chart>
       </div>
       <div class="col-md-6">
           <program-percentages-chart ref="programpercentage" :chart-data="programPercentageValues" :chart-labels="programPercentageKeys" v-if="programPercentageDataLoaded"></program-percentages-chart>
       </div>
   </div>    
   <div class="row">
       <div class="col-md-6">
           <race-eth ref="raceandethnicity" :chart-data="raceAndEthnicityValues" :chart-labels="raceAndEthnicityKeys" v-if="raceAndEthnicityDataLoaded"></race-eth>
       </div>
       <div class="col-md-6">
           <div class="card"  v-if="schoolInfoDataLoaded">
  <div class="card-header">
    School Information
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">School Name: - {{schoolInformation.schoolName|| 'Info not available'}}</li>
    <li class="list-group-item">School Alias: - {{schoolInformation.schoolAlias|| 'Info not available' }} </li>
    <li class="list-group-item">School Website: - {{schoolInformation.website || 'Info not available'}}</li>
    <li class="list-group-item">School City: - {{schoolInformation.city|| 'Info not available'}}</li>
    <li class="list-group-item">School State: - {{schoolInformation.state|| 'Info not available'}}</li>
    <li class="list-group-item">School Zip Code: - {{schoolInformation.zipCode|| 'Info not available'}}</li>
    <li class="list-group-item">School Size: - {{schoolInformation.size|| 'Info not available'}}</li>
  </ul>
</div>
       </div>
   </div>    
   </div>     
    </div>
</template>
<script>

import Navbar from "./Navbar.vue";
import { VueAutosuggest } from "vue-autosuggest";
import { School } from "../models/school.js";
import { SchoolInformation } from "../models/school-information.js";
import { ProgramPercentage } from "../models/program-percentage.js";
import { RaceAndEthnicity } from "../models/race-and-ethnicity";
import { PublicIncomeLevel } from "../models/public-income-level";
import PublicIncomeChart from "./PublicIncomeChart.vue";
import ProgramPercentagesChart from "./ProgramPercentagesChart.vue";
import RaceAndEthnicityChart from './RaceAndEthnicityChart.vue';
import Vue from "vue";
import VueCharts from "vue-chartjs";
import { setTimeout } from "timers";
Vue.use(VueCharts);
export default {
  extends: VueCharts.Doughnut,
  components: {
    navbar: Navbar,
    vueAutosuggest: VueAutosuggest,
    publicIncomeChart: PublicIncomeChart,
    programPercentagesChart: ProgramPercentagesChart,
    raceEth: RaceAndEthnicityChart
  },
  data: function() {
    return {
      allSchools: [],
      selectedSchool: null,
      schoolInformation: null,
      programPercentage: null,
      publicIncome: null,
      raceAndEthnicity: null,
      filteredOptions: [],
      publicIncomeKeys: [],
      publicIncomeValues: [],
      programPercentageKeys: [],
      programPercentageValues: [],
      raceAndEthnicityKeys: [],
      raceAndEthnicityValues: [],
      publicIncomeDataLoaded: false,
      programPercentageDataLoaded: false,
      raceAndEthnicityDataLoaded: false,
      schoolInfoDataLoaded: false,
      selected: ""
    };
  },

  beforeMount() {
    this.$http
      .get("http://localhost:4000/schools")
      .then(response => {
        return response.json();
      })
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          this.allSchools.push(new School(data[i].schoolName, data[i].id));
        }
      });
  },
  methods: {
    getSchoolInformation() {
        this.schoolInfoDataLoaded = false;
      this.$http
        .get("http://localhost:4000/schoolinformation", {
          params: { schoolId: this.selectedSchool }
        })
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.schoolInformation = new SchoolInformation(
            data._schoolName,
            data._schoolAlias,
            data._website,
            data._city,
            data._state,
            data._zipCode,
            data._size
          );
          this.schoolInfoDataLoaded = true;
        });
    },

    getProgrampercentage() {
        this.programPercentageValues = [];
         this.programPercentageDataLoaded = false;
      this.$http
        .get("http://localhost:4000/programpercentage", {
          params: { schoolId: this.selectedSchool }
        })
        .then(response => {
           
          return response.json();
        })
        .then(data => {
          this.programPercentage = new ProgramPercentage(
            data._education,
            data._mathematics,
            data._business_Marketing,
            data._communications_Technology,
            data._language,
            data._visual_Performing,
            data._engineering_Technology,
            data._parks_Recreation_Fitness,
            data._agriculture,
            data._security_Law_Enforcement,
            data._computer,
            data._precision_Production,
            data._humanities,
            data._library,
            data._psychology,
            data._social_Science,
            data._legal,
            data._english,
            data._construction,
            data._military,
            data._communication,
            data._public_Administration_Social_Service,
            data._architecture,
            data._ethnic_Cultural_Gender,
            data._resources,
            data._health,
            data._engineering,
            data._history,
            data._theology_Religious_Vocation,
            data._transportation,
            data._physical_Science,
            data._science_Technology,
            data._biological,
            data._family_Consumer_Science,
            data._philosophy_Religious,
            data._personal_Culinary
          );
          for (let key in this.programPercentage) {
            this.programPercentageValues.push(this.programPercentage[key]*100);
          }
          this.programPercentageKeys = Object.keys(this.programPercentage);
          this.updateProgramPercentageData(this.programPercentage);
          this.programPercentageDataLoaded = true;
          
        });
    },

    updateProgramPercentageData(newData) {
        this.programPercentage = newData;
        setTimeout(() => {
            this.$refs.programpercentage.updateProgramPercentageData();
        });
    },

    getPublicIncome() {
      this.publicIncomeValues = [];
      this.publicIncomeDataLoaded = false;
      this.$http
        .get("http://localhost:4000/publicincome", {
          params: { schoolId: this.selectedSchool }
        })
        .then(response => {
            
          return response.json();
        })
        .then(data => {
              
          this.publicIncome = new PublicIncomeLevel(
            data._zeroTo48000,
            data._thirtyThousandAndOneTo75000,
            data._thirtyThousandAndOneTo48000,
            data._seventyFiveThousandPlus,
            data._zeroTo30000,
            data._seventyFiveThousandAndOneTo110000,
            data._fortyEightThousandAndOneTo75000,
            data._hundredAndTenThousandAndOnePlus
          );
          for (let key in this.publicIncome) {
            this.publicIncomeValues.push(this.publicIncome[key]);
          }
          this.publicIncomeKeys = Object.keys(this.publicIncome);
          this.updatePublicIncomeData(this.publicIncomeValues);
          this.publicIncomeDataLoaded = true;
        });
    },
    updatePublicIncomeData(newData) {
      this.publicIncomeValues = newData;
      setTimeout(() => {
        this.$refs.publicincome.updatePublicIncomeData();
      });
    },

    getRaceAndEthnicity() {
        this.raceAndEthnicityValues = [];
      this.raceAndEthnicityDataLoaded = false;
      this.$http
        .get("http://localhost:4000/raceandethnicity", {
          params: { schoolId: this.selectedSchool }
        })
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.raceAndEthnicity = new RaceAndEthnicity(
            data._nhpi,
            data._non_Resident_Alien,
            data._black_2000,
            data._aian_2000,
            data._hispanic_Prior_2009,
            data._black,
            data._asian,
            data._api_2000,
            data._hispanic_2000,
            data._unknown_2000,
            data._unknown,
            data._white_Non_Hispanic,
            data._black_Non_Hispanic,
            data._asian_Pacific_Islander,
            data._white,
            data._two_Or_More,
            data._hispanic,
            data._aian,
            data._aian_Prior_2009
          );
           for (let key in this.raceAndEthnicity) {
            this.raceAndEthnicityValues.push(this.raceAndEthnicity[key]*100);
          }
          this.raceAndEthnicityKeys = Object.keys(this.raceAndEthnicity);
          this.updateRaceAndEthnicityData(this.raceAndEthnicityValues);
          this.raceAndEthnicityDataLoaded = true;
        });
    },
     updateRaceAndEthnicityData(newData) {
      this.raceAndEthnicityValues = newData;
      setTimeout(() => {
        this.$refs.raceandethnicity.updateRaceAndEthnicityData();
      });
    },
    clickHandler(value) {},
    onInputChange(text, oldText) {
      //   Full customizability over filtering
      const filteredData = this.allSchools.filter(option => {
        return option.schoolName.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });

      // Store data in one property, and filtered in another
      this.filteredOptions = [{ data: filteredData }];
    },
    onSelected(value) {
      this.selectedSchool = value.item.id;
      this.getSchoolInformation();
      this.getRaceAndEthnicity();
      this.getPublicIncome();
      this.getProgrampercentage();
    },
    renderSuggestion(suggestion) {
      /* You will need babel-plugin-transform-vue-jsx for this kind of full customizable
       * rendering. If you don't use babel or the jsx transform, then you can use this
       * function to just `return suggestion['propertyName'];`
       */
      const character = suggestion.item;

      return (
        <div
          style={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <span style={{ color: "navyblue" }}>{character.schoolName}</span>
        </div>
      );
    },
    /**
     * This is what the <input/> value is set to when you are selecting a suggestion.
     */
    getSuggestionValue(suggestion) {
      return suggestion.item.schoolName;
    },
    focusMe(e) {}
  }
};


</script>
<style scoped>
</style>