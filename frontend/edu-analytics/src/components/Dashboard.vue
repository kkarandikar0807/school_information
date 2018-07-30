
<template>
    <div>
        <navbar></navbar>
        <select v-model="selectedSchool">
            <option value="" disabled> Select an Option </option>
            <option v-for="school in allSchools" v-bind:value="school.id">{{school.schoolName}}</option>
        </select>
        <button class="btn btn-primary" @click="getSchoolInformation(); getRaceAndEthnicity(); getPublicIncome(); getProgrampercentage();"> Get all data </button>

        <div>
            <p>
                <label for="">School Name</label>
                <span v-if="schoolInformation !== null">{{schoolInformation.schoolName}}</span>
            </p>
            
        </div>
    </div>
</template>
<script>
import Navbar from './Navbar.vue'
import { School } from '../models/school.js';
import { SchoolInformation } from '../models/school-information.js';
import { ProgramPercentage } from '../models/program-percentage.js';
import { RaceAndEthnicity } from '../models/race-and-ethnicity';
import { PublicIncomeLevel } from '../models/public-income-level';
export default {
  components: {
    navbar: Navbar
  },
  data: function() {
      return {
          allSchools: [],
          selectedSchool: null,
          schoolInformation: null,
          programPercentage: null,
          publicIncome: null,
          raceAndEthnicity: null

      }
  },
  beforeMount() {
          this.$http.get('http://localhost:4000/schools').then(response => {
              return response.json()
              }).then(data => {
                  for (let i =0; i< data.length; i++) {
                      this.allSchools.push(new School(data[i].schoolName, data[i].id));
                  }
              });
      },
  methods: {
      getSchoolInformation() {
         
          this.$http.get('http://localhost:4000/schoolinformation', {params: {schoolId: this.selectedSchool}
              
          }).then(response => {
              return response.json()
          }).then(data => {
              this.schoolInformation = new SchoolInformation(data._schoolName, data._schoolAlias, data._website, data._city, data._state, data._zipCode);
              
          })
      },

      getProgrampercentage() {
          this.$http.get('http://localhost:4000/programpercentage', {params: {schoolId: this.selectedSchool}
          }).then(response => {
              return response.json()
          }).then(data => {
            
              this.programPercentage = new ProgramPercentage(data._education, data._mathematics, data._business_Marketing,
                                                             data._communications_Technology, data._language, data._visual_Performing, data._engineering_Technology, 
                                                             data._parks_Recreation_Fitness, data._agriculture, data._security_Law_Enforcement, data._computer, 
                                                             data._precision_Production, data._humanities, data._library, data._psychology, data._social_Science, 
                                                             data._legal, data._english, data._construction, data._military, data._communication, data._public_Administration_Social_Service, 
                                                             data._architecture, data._ethnic_Cultural_Gender, data._resources, data._health, data._engineering, data._history, 
                                                             data._theology_Religious_Vocation, data._transportation, data._physical_Science, data._science_Technology, data._biological, 
                                                             data._family_Consumer_Science, data._philosophy_Religious, data._personal_Culinary);
            
          })
          
      },

      getPublicIncome() {
          this.$http.get('http://localhost:4000/publicincome', {params: {schoolId: this.selectedSchool}
          }).then(response => {
              return response.json()
          }).then(data => {
              this.publicIncome = new PublicIncomeLevel(data._zeroTo48000, data._thirtyThousandAndOneTo75000, data._thirtyThousandAndOneTo48000,
                                                        data._seventyFiveThousandPlus, data._zeroTo30000, data._seventyFiveThousandAndOneTo110000, data._fortyEightThousandAndOneTo75000,
                                                        data._hundredAndTenThousandAndOnePlus);
              
          })

      },

      getRaceAndEthnicity() {
          this.$http.get('http://localhost:4000/raceandethnicity', {params: {schoolId: this.selectedSchool}
          }).then(response => {
              return response.json()
          }).then(data => {
    
              this.raceAndEthnicity = new RaceAndEthnicity(
                  data._nhpi, data._non_Resident_Alien, data._black_2000, data._aian_2000, data._hispanic_Prior_2009, data._black, 
                  data._asian, data._api_2000, data._hispanic_2000, data._unknown_2000, data._unknown, data._white_Non_Hispanic, data._black_Non_Hispanic, 
                  data._asian_Pacific_Islander, data._white, data._two_Or_More, data._hispanic, data._aian, data._aian_Prior_2009);
          })

      }
  }
}
</script>
<style scoped>
</style>