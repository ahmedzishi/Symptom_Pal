import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import createPersistedState from 'vuex-persistedstate'
import HmacMD5 from 'crypto-js/hmac-md5'
import Base64 from 'crypto-js/enc-base64'
import {DB} from '../firebase/db'
Vue.use(Vuex)
Vue.use(VueAxios, axios)
export default new Vuex.Store({
  state: {
    token: null,
    description: null,
    specificLocation: null,
    exactLocation: null,
    bodyLocations: [],
    specificBodyLocations: [],
    geoLocation: [],
    symptomIds: [],
    symptoms: [],
    selectedSymptoms: [],
    proposedSymptoms: [],
    diagnosis: [],
    diagnosisDetails: [],
    dob: null,
    yearOfBirth: null,
    age: null,
    gender: null,
    fullDescription: [],
    completedSymptoms: false
  },
  actions: {
    loadToken ({ commit }) {
      const computedHash = HmacMD5(process.env.FO0O95QM0SQXMNLJT8AN + '/login', process.env.LC0GECFKFAEHYQNL7T6W)
      const computedHashString = computedHash.toString(Base64)
      axios
        .post(process.env.FO0O95QM0SQXMNLJT8AN + '/login', {}, { headers: {Authorization: 'Bearer ' + process.env.RQ6X5RYQTTG0HMPS8ITV + ':' + computedHashString, Accept: 'application/json, text/plain, */*'} })
        .then(r => r.data.Token)
        .then(token => {
          commit('setToken', token)
        })
    },
    loadBodyLocations ({ commit }) {
      axios.get(process.env.Q19U2PMYREXKIM8ZB2H7 + '/body/locations?token=' + this.state.token + '&format=json&language=en-gb')
        .then(r => r.data)
        .then(bodyLocations => {
          commit('setBodyLocations', bodyLocations)
        })
    },
    loadSpecificBodyLocations ({ commit }) {
      axios.get(process.env.Q19U2PMYREXKIM8ZB2H7 + '/body/locations/' + this.state.specificLocation + '?token=' + this.state.token + '&format=json&language=en-gb')
        .then(r => r.data)
        .then(specificBodyLocations => {
          commit('setSpecificBodyLocations', specificBodyLocations)
        })
    },
    loadSymptoms ({ commit }) {
      axios.get(process.env.Q19U2PMYREXKIM8ZB2H7 + '/symptoms/' + this.state.exactLocation + '/' + this.state.description + '?token=' + this.state.token + '&format=json&language=en-gb')
        .then(r => r.data)
        .then(symptoms => {
          commit('setSymptoms', symptoms)
        })
    },
    loadProposedSymptoms ({ commit }) {
      axios.get(process.env.Q19U2PMYREXKIM8ZB2H7 + '/symptoms/proposed?symptoms=[' + this.state.symptomIds + ']&gender=' + this.state.gender + '&year_of_birth=' + this.state.yearOfBirth + '&token=' + this.state.token + '&format=json&language=en-gb')
        .then(r => r.data)
        .then(proposedSymptoms => {
          commit('setProposedSymptoms', proposedSymptoms)
        })
    },
    getDiagnosis ({ commit }) {
      axios.get(process.env.Q19U2PMYREXKIM8ZB2H7 + '/diagnosis?symptoms=[' + this.state.symptomIds + ']&gender=' + this.state.gender + '&year_of_birth=' + this.state.yearOfBirth + '&token=' + this.state.token + '&format=json&language=en-gb')
        .then(r => r.data)
        .then(diagnosis => {
          commit('setDiagnosis', diagnosis)
        })
    },
    setDiagnosisDetails ({ commit }) {
      for (let x = 0; x < this.state.diagnosis.length; x++) {
        let eachDiagnosis = this.state.diagnosis[x]
        axios.get(process.env.Q19U2PMYREXKIM8ZB2H7 + '/issues/' + eachDiagnosis.Issue.ID + '/info?token=' + this.state.token + '&format=json&language=en-gb')
          .then(r => r.data)
          .then(diagnosisDetails => {
            commit('setDiagnosisDetails', diagnosisDetails)
          })
      }
    }
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setDescription (state, description) {
      state.description = description
    },
    setDob (state, dob) {
      state.dob = dob
    },
    setGender (state, gender) {
      state.gender = gender
    },
    setYearOfBirth (state, yearOfBirth) {
      state.yearOfBirth = yearOfBirth
    },
    setFullDescription (state, fullDescription) {
      state.fullDescription = fullDescription
    },
    setBodyLocations (state, bodyLocations) {
      state.bodyLocations = bodyLocations
    },
    setSpecificBodyLocations (state, specificBodyLocations) {
      state.specificBodyLocations = specificBodyLocations
    },
    setSpecificLocation (state, specificLocation) {
      state.specificLocation = specificLocation
    },
    setExactLocation (state, exactLocation) {
      state.exactLocation = exactLocation
    },
    setSymptomIds (state, symptomIds) {
      state.symptomIds = symptomIds
    },
    setSymptoms (state, symptoms) {
      state.symptoms = symptoms
    },
    setProposedSymptoms (state, proposedSymptoms) {
      state.proposedSymptoms = proposedSymptoms
      if (proposedSymptoms.length === 0) {
        state.completedSymptoms = true
      }
    },
    setSelectedSymptoms (state, selectedSymptoms) {
      state.selectedSymptoms = selectedSymptoms
    },
    setDiagnosis (state, diagnosis) {
      state.diagnosis = diagnosis
      this.dispatch('setDiagnosisDetails')
      DB.ref('users/').push({
        symptoms: this.state.selectedSymptoms,
        results: this.state.diagnosis,
        userDetails: this.state.fullDescription
      })
    },
    setDiagnosisDetails (state, diagnosisDetails) {
      state.diagnosisDetails.push(diagnosisDetails)
    },
    setSymptomLoading (state, geoLocation) {
      state.geoLocation = geoLocation
    },
    setAge (state, age) {
      state.age = age
    },
    setGeoLocation (state, geoLocation) {
      state.geoLocation = geoLocation
    },
    resetState (state) {
      state.description = null
      state.specificLocation = null
      state.exactLocation = null
      state.bodyLocations = []
      state.specificBodyLocations = []
      state.geoLocation = []
      state.symptomIds = []
      state.symptoms = []
      state.selectedSymptoms = []
      state.diagnosis = []
      state.diagnosisDetails = []
      state.dob = null
      state.yearOfBirth = null
      state.age = null
      state.gender = null
      state.proposedSymptoms = []
      state.fullDescription = []
      state.completedSymptoms = false
    }
  },
  modules: {},
  plugins: [createPersistedState()]
})
