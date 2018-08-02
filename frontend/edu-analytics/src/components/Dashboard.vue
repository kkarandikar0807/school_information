
<template>
   <div id="main">
      <navbar></navbar>
      <notifications group="dashboard" />
      <div class="container">
         <div class="row gutters">
            <div class="col">
               <select v-model="selectedSchool">
                  <option v-for="school in allSchools" v-bind:value="school.id">{{school.schoolName}}</option>
               </select>
               <button class="btn btn-primary" @click="getSchoolInformation(); getRaceAndEthnicity(); getPublicIncome();  getPrivateIncome();getProgrampercentage();"> Get all data </button>
               <button class="btn btn-primary" @click="createPDF()"> Save PDF </button>
               <button class="btn btn-primary" @click="saveGeneratedData()"> Save Generated Data </button>
               <button class="btn btn-primary" v-print>Print the entire page</button>
               <!-- <vue-autosuggest style="z-index:1; position:absolute; width: 90%"
                  :suggestions="filteredOptions"
                  @focus="focusMe"
                  @click="clickHandler"
                  :on-selected="onSelected"
                  :render-suggestion="renderSuggestion"
                  :get-suggestion-value="getSuggestionValue"
                  :input-props="{id:'autosuggest__input', onInputChange: this.onInputChange, placeholder:'Select a School'}"/> -->
            </div>
         </div>
         <div class="row gutters">
            <div class="col-md-12">
               <div class="card"  v-if="schoolInfoDataLoaded">
                  <div class="card-header">
                     <b>SCHOOL INFORMATION</b>
                  </div>
                  <div class="card-body">
                     <ul class="list-group list-group-flush">
                        <li class="list-group-item"><b>School Name: - </b>{{schoolInformation.schoolName|| 'Info not available'}}</li>
                        <li class="list-group-item"><b>School Alias: - </b>{{schoolInformation.schoolAlias|| 'Info not available' }} </li>
                        <li class="list-group-item"><b>School Website: - </b>{{schoolInformation.website || 'Info not available'}}</li>
                        <li class="list-group-item"><b>School City: - </b>{{schoolInformation.city|| 'Info not available'}}</li>
                        <li class="list-group-item"><b>School State: - </b>{{schoolInformation.state|| 'Info not available'}}</li>
                        <li class="list-group-item"><b>School Zip Code: - </b>{{schoolInformation.zipCode|| 'Info not available'}}</li>
                        <li class="list-group-item"><b>School Size: - </b>{{schoolInformation.size|| 'Info not available'}}</li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
         <div class="row gutters">
            <div class="col-md-12">
               <div class="card" v-if="programPercentageDataLoaded">
                  <div class="card-header"> <b>PROGRAM PERCENTAGE</b> </div>
                  <div class="card-body">
                     <program-percentages-chart ref="programpercentage" :chart-data="programPercentageValues" :chart-labels="programPercentageKeys"></program-percentages-chart>
                  </div>
               </div>
            </div>
         </div>
         <div class="row gutters">
            <div class="col-md-12">
               <div class="card"  v-if="raceAndEthnicityDataLoaded">
                  <div class="card-header"> <b>RACE AND ETHNICITY</b> </div>
                  <div class="card-body">
                     <race-eth ref="raceandethnicity" :chart-data="raceAndEthnicityValues" :chart-labels="raceAndEthnicityKeys"></race-eth>
                  </div>
               </div>
            </div>
         </div>
         <div class="row gutters">
            <div class="col-md-12">
               <div class="card"  v-if="publicIncomeDataLoaded">
                  <div class="card-header"><b>NET PRICE BY PUBLIC INCOME LEVEL</b></div>
                  <div class="card-body">
                     <public-income-chart ref="publicincome" :chart-data="publicIncomeValues" :chart-labels="publicIncomeKeys"></public-income-chart>
                  </div>
               </div>
            </div>
         </div>
         <div class="row gutters">
            <div class="col-md-12">
               <div class="card"  v-if="privateIncomeDataLoaded">
                  <div class="card-header"><b>NET PRICE BY PRIVATE INCOME LEVEL</b></div>
                  <div class="card-body">
                     <private-income-chart ref="privateincome" :chart-data="privateIncomeValues" :chart-labels="privateIncomeKeys"></private-income-chart>
                  </div>
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
import { RaceAndEthnicity } from "../models/race-and-ethnicity.js";
import { PublicIncomeLevel } from "../models/public-income-level.js";
import { PrivateIncomeLevel } from '../models/private-income-level.js'; 
import PublicIncomeChart from "./PublicIncomeChart.vue";
import PrivateIncomeChart from './PrivateIncomeChart.vue'
import ProgramPercentagesChart from "./ProgramPercentagesChart.vue";
import RaceAndEthnicityChart from './RaceAndEthnicityChart.vue';
import Vue from "vue";
import VueCharts from "vue-chartjs";
import { setTimeout } from "timers";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Print from 'vue-print-nb'
import save from 'save-file';
import JsonExcel from 'vue-json-excel'
import Notifications from 'vue-notification'
import  * as URLConstants from '../constants/url-constants.js'

Vue.use(Notifications);
Vue.use(Print);

Vue.use(VueCharts);
export default {
  extends: VueCharts.Doughnut,
  components: {
    navbar: Navbar,
    vueAutosuggest: VueAutosuggest,
    publicIncomeChart: PublicIncomeChart,
    privateIncomeChart: PrivateIncomeChart,
    programPercentagesChart: ProgramPercentagesChart,
    raceEth: RaceAndEthnicityChart,
    downloadExcel: JsonExcel
  },
  data: function() {
    return {
      allSchools: [],
      selectedSchool: null,
      schoolInformation: null,
      programPercentage: null,
      publicIncome: null,
      raceAndEthnicity: null,
      privateIncome: null,
      filteredOptions: [],
      publicIncomeKeys: [],
      publicIncomeValues: [],
      privateIncomeKeys: [],
      privateIncomeValues: [],
      programPercentageKeys: [],
      programPercentageValues: [],
      raceAndEthnicityKeys: [],
      raceAndEthnicityValues: [],
      publicIncomeDataLoaded: false,
      privateIncomeDataLoaded: false,
      programPercentageDataLoaded: false,
      raceAndEthnicityDataLoaded: false,
      schoolInfoDataLoaded: false,
      selected: ""
    };
  },

  beforeMount() {
    this.$http
      .get(`${URLConstants.SERVER_URL}/schools`)
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
     notification(group, title, type, text) {
        this.$notify({
        group: group,
        title: title,
        type: type,
        text: text
        }); 
    },
      saveGeneratedData() {
        let saveData = {
            programPercentage: this.programPercentage,
            raceAndEthnicity: this.raceAndEthnicity,
            schoolInformation: this.schoolInformation,
            publicIncome: this.publicIncome
        }
        save(JSON.stringify(saveData), 'analytics.txt', (error, data) => {
        })
      },
      createPDF () {
          let pdfName = 'Analytics';
          html2canvas(document.body).then(canvas => {
               var imgData = canvas.toDataURL("image/png");
                  var imgWidth = 210; 
          var pageHeight = 295;  
          var imgHeight = canvas.height * imgWidth / canvas.width;
          var heightLeft = imgHeight;

          var doc = new jsPDF('p', 'mm');
          var position = 0;

          doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;

          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }
          doc.save('Analytics' + '.pdf');
          })
      },
    getSchoolInformation() {
      if (this.selectedSchool == null) {
        this.notification('dashboard', 'ERROR MESSAGE', 'error', 'Please select a school')
        return false;
      }
        this.schoolInfoDataLoaded = false;
      this.$http
        .get(`${URLConstants.SERVER_URL}/schoolinformation`, {
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
      if (this.selectedSchool == null) {
        return false;
      }
        this.programPercentageValues = [];
         this.programPercentageDataLoaded = false;
      this.$http
        .get(`${URLConstants.SERVER_URL}/programpercentage`, {
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
      if (this.selectedSchool == null) {
        return false;
      }
      this.publicIncomeValues = [];
      this.publicIncomeDataLoaded = false;
      this.$http
        .get(`${URLConstants.SERVER_URL}/publicincome`, {
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

    getPrivateIncome() {
      if (this.selectedSchool == null) {
        return false;
      }
      this.privateIncomeValues = [];
      this.privateIncomeDataLoaded = false;
      this.$http
        .get(`${URLConstants.SERVER_URL}/privateincome`, {
          params: { schoolId: this.selectedSchool }
        })
        .then(response => {
            
          return response.json();
        })
        .then(data => {
              console.log(data);
          this.privateIncome = new PrivateIncomeLevel(
            data._zeroTo48000,
            data._thirtyThousandAndOneTo75000,
            data._thirtyThousandAndOneTo48000,
            data._seventyFiveThousandPlus,
            data._zeroTo30000,
            data._seventyFiveThousandAndOneTo110000,
            data._fortyEightThousandAndOneTo75000,
            data._hundredAndTenThousandAndOnePlus
          );
          console.log(this.privateIncome);
          for (let key in this.privateIncome) {
            this.privateIncomeValues.push(this.privateIncome[key]);
          }
          this.privateIncomeKeys = Object.keys(this.privateIncome);
          this.updatePrivateIncomeData(this.privateIncomeValues);
          this.privateIncomeDataLoaded = true;
        });
    },
    updatePrivateIncomeData(newData) {
      this.privateIncomeValues = newData;
      setTimeout(() => {
        this.$refs.privateincome.updatePrivateIncomeData();
      });
    },

    getRaceAndEthnicity() {
      if (this.selectedSchool == null) {
        return false;
      }
        this.raceAndEthnicityValues = [];
      this.raceAndEthnicityDataLoaded = false;
      this.$http
        .get(`${URLConstants.SERVER_URL}/raceandethnicity`, {
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
    }
  }
};


</script>
<style scoped>
.gutters {
  margin-top: 100px;
  margin-bottom: 100px;
}

.card {
    /* Add shadows to create the "card" effect */
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    top: -3px;
    transform: scale(1.05);
    transition: 0.3s;
}

.card:not(:hover) {
  top: 3px;
  transition: 0.3s
}

</style>