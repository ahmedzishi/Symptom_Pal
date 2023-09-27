<template>
  <div id="home" style="margin-top:1em">
    <modal
      :clickToClose="true"
      name="one"
      :maxHeight="300"
      style="color:#212121;"
    >
      <Terms />
      <p>&nbsp;</p>
      <button @click="hideOne" class="waves-effect waves-light btn-large">
        <i class="material-icons right">close</i>Close
      </button>
      <p>&nbsp;</p>
    </modal>
    <modal
      :clickToClose="true"
      :maxHeight="300"
      name="two"
      style="color:#212121;"
    >
      <Privacy />
      <p>&nbsp;</p>
      <button @click="hideTwo" class="waves-effect waves-light btn-large">
        <i class="material-icons right">close</i>Close
      </button>
      <p>&nbsp;</p>
    </modal>
    <div class="row" v-if="begin == false" style="margin-bottom:0px">
      <p style="font-size:1.4em">
        <b>Welcome to Symptom Pal.</b> Symptom Pal is a free, easy to use tool
        that helps people check their symptoms. If you're not feeling well,
        Symptom Pal may be able to help determine possible conditions!
        <br /><br />
        <button class="waves-effect waves-light btn-large" @click="beginNow()">
          <i class="material-icons right">send</i>Begin
        </button>
        <img
          src="../assets/aboutImage.png"
          style="display:block;margin:auto;margin-top:1.5em"
          class="responsive-img"
        />
      </p>

      <p style="font-size:1.4em">
        <i
          style="    font-size: 0.6em;
    display: block;
    max-width: 400px;
    margin: auto;display:none"
          >*Symptom Pal DOES NOT PROVIDE MEDICAL ADVICE and therefore allows no
          diagnosis and is to be USED FOR EDUCATIONAL PURPOSES ONLY. Any
          reliance you place on such information is therefore strictly at your
          own risk.</i
        >
      </p>
    </div>
    <div class="row rowStyle" v-if="begin == true">
      <div class="col colStyle">
        <div class="speechStyle">
          <div v-if="begin == true && processStarted == false">
            <p style="font-size:1em">
              Before we begin, you must first read and accept our
              <a @click="showOne" style="font-weight:400;cursor:pointer"
                >Terms of use</a
              >
              and
              <a @click="showTwo" style="font-weight:400;cursor:pointer"
                >Privacy Policy</a
              >:
            </p>
            <p
              style="padding: 1em;
    background: #ffffff;
    border-radius: 5px;"
              class="z-depth-1"
            >
              <label>
                <input type="checkbox" id="checkbox" v-model="accepted" />
                <span style="color:#212121;font-size:1.1em"
                  >I understand that Symptom Pal DOES NOT PROVIDE MEDICAL ADVICE
                  and therefore allows no diagnosis and is to be USED FOR
                  EDUCATIONAL PURPOSES ONLY. Any reliance you place on such
                  information is therefore strictly at your own risk. I hereby
                  agree with the Terms of use and the Privacy Policy of this
                  website.</span
                >
              </label>
            </p>
            <button
              v-if="accepted == false"
              class="waves-effect waves-light btn-large disabled"
            >
              <i class="material-icons right">send</i>Continue
            </button>
            <button
              v-if="accepted == true"
              class="waves-effect waves-light btn-large"
              @click="beginProcess"
            >
              <i class="material-icons right">send</i>Continue
            </button>
          </div>
          <div
            v-if="begin == true && processStarted == true && page === 0"
            class="row"
          >
            <div
              class="row datePicker displayContent"
              v-if="dateSubmitted == false"
            >
              <p><b>What year were you born?</b></p>
              <select
                id="dob"
                class="input-field selectBox z-depth-1"
                v-model="yearDate"
                @change="getAge(yearDate)"
                style="width:70%;margin:auto"
              >
                <option
                  v-for="(year, index) in years"
                  :value="year"
                  :key="index"
                  >{{ year }}</option
                >
              </select>
              <p>&nbsp;</p>
              <span
                v-if="userAge !== null"
                style="font-size:1.2em;font-weight:500;"
                >{{ userAge }} years old</span
              >
              <p>&nbsp;</p>
              <button
                v-if="yearDate == null"
                class="waves-effect waves-light btn-large disabled"
              >
                <i class="material-icons right">send</i>Continue
              </button>
              <button
                v-if="yearDate !== null"
                class="waves-effect waves-light btn-large"
                @click="dateSubmit()"
              >
                <i class="material-icons right">send</i>Continue
              </button>
            </div>
            <div class="row displayContent" v-if="dateSubmitted == true">
              <p><b>Are you male or female?</b></p>
              <div class="col genderMobile">
                <div
                  @click="describeSubmission('male')"
                  class="card waves-effect waves-teal person"
                  style="padding: 1em;border:solid 0px #d5d5d5;min-height:125px;min-width:125px;max-width:125px;max-height:125px"
                >
                  <img
                    src="../assets/man.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                  />
                  <figcaption>Male</figcaption>
                </div>
              </div>
              <div class="col">
                <div
                  @click="describeSubmission('female')"
                  class="card waves-effect waves-teal person"
                  style="padding: 1em;border:solid 0px #d5d5d5;min-height:125px;min-width:125px;max-width:125px;max-height:125px"
                >
                  <img
                    src="../assets/woman.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                  />
                  <figcaption>Female</figcaption>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="begin == true && processStarted == true && page === 1"
            class="row"
          >
            <div class="row displayContent" v-if="bodyLocations.length > 0">
              <p><b>Which area are you experiencing difficulty?</b></p>
              <div
                class="col mobileUpdate"
                v-for="(item, index) in bodyLocations"
                :key="'one' + index"
              >
                <div>
                  <div
                    @click="chooseLocation(item.ID)"
                    class="card waves-effect waves-teal person"
                    style="padding: 1em;border:solid 0px #d5d5d5;min-height:125px;min-width:125px;max-width:125px;max-height:125px"
                  >
                    <img
                      src="../assets/6.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 6"
                    />
                    <img
                      src="../assets/7.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 7"
                    />
                    <img
                      src="../assets/10.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 10"
                    />
                    <img
                      src="../assets/15.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 15"
                    />
                    <img
                      src="../assets/16.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 16"
                    />
                    <img
                      src="../assets/17.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 17"
                    />
                    <img
                      src="../assets/21.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 21"
                    />
                    <img
                      src="../assets/22.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 22"
                    />
                    <img
                      src="../assets/23.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 23"
                    />
                    <img
                      src="../assets/24.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 24"
                    />
                    <img
                      src="../assets/25.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 25"
                    />
                    <img
                      src="../assets/26.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 26"
                    />
                    <img
                      src="../assets/28.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 28"
                    />
                    <img
                      src="../assets/29.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 29"
                    />
                    <img
                      src="../assets/30.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 30"
                    />
                    <img
                      src="../assets/31.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 31"
                    />
                    <img
                      src="../assets/32.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 32"
                    />
                    <img
                      src="../assets/33.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 33"
                    />
                    <img
                      src="../assets/34.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 34"
                    />
                    <img
                      src="../assets/35.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 35"
                    />
                    <img
                      src="../assets/36.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 36"
                    />
                    <img
                      src="../assets/37.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 37"
                    />
                    <img
                      src="../assets/38.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 38"
                    />
                    <img
                      src="../assets/39.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 39"
                    />
                    <img
                      src="../assets/40.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 40"
                    />
                    <img
                      src="../assets/41.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 41"
                    />
                    <img
                      src="../assets/43.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 43"
                    />
                    <img
                      src="../assets/44.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 44"
                    />
                    <img
                      src="../assets/45.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 45"
                    />
                    <img
                      src="../assets/46.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 46"
                    />
                    <img
                      src="../assets/47.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 47"
                    />
                    <img
                      src="../assets/48.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 48"
                    />
                    <img
                      src="../assets/49.png"
                      class="responsive-img"
                      style="max-width:60px;height:auto"
                      v-if="item.ID == 49"
                    />
                    <figcaption
                      v-if="item.ID == 16"
                      style="min-width: 150px;margin-left: -2em;"
                    >
                      {{ item.Name }}
                    </figcaption>
                    <figcaption v-else>{{ item.Name }}</figcaption>
                  </div>
                </div>
              </div>
            </div>
            <grid-loader
              :loading="bodyLocations.length == 0"
              :color="'#26a69a'"
              :size="'80px'"
            ></grid-loader>
          </div>
          <div
            v-if="begin == true && processStarted == true && page === 2"
            class="row"
          >
            <div
              class="row displayContent"
              v-if="specificBodyLocations.length > 0"
            >
              <p><b>Where exactly?</b></p>
              <div
                class="col mobileUpdate"
                v-for="(item, index) in specificBodyLocations"
                :key="'two' + index"
              >
                <div
                  @click="chooseExactLocation(item.ID)"
                  class="card waves-effect waves-teal person"
                  style="padding: 1em;border:solid 0px #d5d5d5;min-height:125px;min-width:125px;max-width:125px;max-height:125px"
                >
                  <img
                    src="../assets/6.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 6"
                  />
                  <img
                    src="../assets/7.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 7"
                  />
                  <img
                    src="../assets/10.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 10"
                  />
                  <img
                    src="../assets/15.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 15"
                  />
                  <img
                    src="../assets/16.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 16"
                  />
                  <img
                    src="../assets/17.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 17"
                  />
                  <img
                    src="../assets/21.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 21"
                  />
                  <img
                    src="../assets/22.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 22"
                  />
                  <img
                    src="../assets/23.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 23"
                  />
                  <img
                    src="../assets/24.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 24"
                  />
                  <img
                    src="../assets/25.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 25"
                  />
                  <img
                    src="../assets/26.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 26"
                  />
                  <img
                    src="../assets/28.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 28"
                  />
                  <img
                    src="../assets/29.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 29"
                  />
                  <img
                    src="../assets/30.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 30"
                  />
                  <img
                    src="../assets/31.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 31"
                  />
                  <img
                    src="../assets/32.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 32"
                  />
                  <img
                    src="../assets/33.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 33"
                  />
                  <img
                    src="../assets/34.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 34"
                  />
                  <img
                    src="../assets/35.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 35"
                  />
                  <img
                    src="../assets/36.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 36"
                  />
                  <img
                    src="../assets/37.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 37"
                  />
                  <img
                    src="../assets/38.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 38"
                  />
                  <img
                    src="../assets/39.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 39"
                  />
                  <img
                    src="../assets/40.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 40"
                  />
                  <img
                    src="../assets/41.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 41"
                  />
                  <img
                    src="../assets/43.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 43"
                  />
                  <img
                    src="../assets/44.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 44"
                  />
                  <img
                    src="../assets/45.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 45"
                  />
                  <img
                    src="../assets/46.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 46"
                  />
                  <img
                    src="../assets/47.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 47"
                  />
                  <img
                    src="../assets/48.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 48"
                  />
                  <img
                    src="../assets/49.png"
                    class="responsive-img"
                    style="max-width:60px;height:auto"
                    v-if="item.ID == 49"
                  />
                  <figcaption
                    v-if="item.ID == 16"
                    style="min-width: 150px;margin-left: -2em;"
                  >
                    {{ item.Name }}
                  </figcaption>
                  <figcaption v-else>{{ item.Name }}</figcaption>
                </div>
              </div>
            </div>
            <grid-loader
              :loading="specificBodyLocations.length == 0"
              :color="'#26a69a'"
              :size="'80px'"
            ></grid-loader>
          </div>
          <div
            v-if="begin == true && processStarted == true && page === 3"
            class="row"
          >
            <p v-if="symptomFilter == 0"><b>Select your main symptom:</b></p>
            <p v-if="symptomFilter > 0"><b>Add an additional symptom:</b></p>
            <div class="row displayContent">
              <div
                class="col"
                style="    margin: auto;
    width: 100%;"
              >
                <div
                  style="border:solid 1px #fff;background:#fff;padding:1em;border-radius:2px;max-width: 400px;
    margin: auto;"
                  v-if="symptoms.length > 0"
                >
                  <div v-if="symptomFilter == 0">
                    <div
                      v-for="(item, index) in symptoms"
                      :key="'three' + index"
                    >
                      <p>
                        <label :for="'radio' + item.ID" style="text-align:left">
                          <input
                            type="radio"
                            :id="'radio' + item.ID"
                            v-model="singleSymptom"
                            :value="item"
                          />
                          <span
                            style="color:#212121; min-width: 229px;
    max-width: 229px;"
                            >{{ item.Name }}</span
                          >
                        </label>
                        <span
                          v-if="item.Synonyms.length > 0"
                          class="new badge"
                          data-badge-caption="info"
                          @click="showSynonyms(item.Synonyms)"
                          style="cursor:pointer"
                        ></span>
                        <span
                          v-else
                          class="new badge"
                          data-badge-caption="info"
                          style="cursor:pointer;visibility:hidden"
                        ></span>
                      </p>
                      <!-- <p v-if="item.HasRedFlag == true">
      <label :for="'radio' + item.ID" style="text-align:left">
        <input type="radio" :id="'radio' + item.ID" v-model="singleSymptom" :value="item"/>
        <span style="color:red; min-width: 229px;
    max-width: 229px;">{{item.Name}}</span>
      </label>
      <span v-if="item.Synonyms.length > 0"  class="new badge"  data-badge-caption="info" @click="showSynonyms(item.Synonyms)" style="cursor:pointer"></span>
      <span v-else class="new badge" data-badge-caption="info" style="cursor:pointer;visibility:hidden"></span>
    </p> -->
                    </div>
                  </div>
                  <div v-if="symptomFilter > 0">
                    <p><b>Selected Symptoms:</b></p>
                    <div
                      v-for="(item, index) in storedSymptoms"
                      :key="index"
                      style="margin: 2em;"
                    >
                      <span
                        class="truncate"
                        style="padding:.5em;border:solid 1px #d5d5d5;border-radius:5px;font-weight:bold;background:#f8f8f8"
                        >{{ item.Name }}</span
                      >
                    </div>
                    <div
                      v-for="(item, index) in proposedSymptoms"
                      :key="'four' + index"
                    >
                      <p>
                        <span
                          v-if="
                            symptoms.filter(function(s) {
                              return s.ID == item.ID;
                            }).length > 0
                          "
                        >
                          <label
                            :for="'radio' + item.ID"
                            style="text-align:left"
                          >
                            <input
                              type="radio"
                              :id="'radio' + item.ID"
                              v-model="singleSymptom"
                              :value="item"
                            />
                            <span
                              style="color:#212121; min-width: 229px;
    max-width: 229px;"
                              >{{ item.Name }}</span
                            >
                          </label>
                          <span
                            v-if="
                              symptoms.filter(function(s) {
                                return s.ID == item.ID;
                              })[0].Synonyms.length > 0
                            "
                            class="new badge"
                            data-badge-caption="info"
                            @click="
                              showSynonyms(
                                symptoms.filter(function(s) {
                                  return s.ID == item.ID;
                                })[0].Synonyms
                              )
                            "
                            style="cursor:pointer"
                          ></span>
                          <span
                            v-else
                            class="new badge"
                            data-badge-caption="info"
                            style="cursor:pointer;visibility:hidden"
                          ></span>
                        </span>
                        <span v-else>
                          <label
                            :for="'radio' + item.ID"
                            style="text-align:left"
                          >
                            <input
                              type="radio"
                              :id="'radio' + item.ID"
                              v-model="singleSymptom"
                              :value="item"
                            />
                            <span
                              style="color:#212121; min-width: 229px;
    max-width: 229px;"
                              >{{ item.Name }}</span
                            >
                          </label>
                          <span
                            class="new badge"
                            data-badge-caption="info"
                            style="cursor:pointer;visibility:hidden"
                          ></span>
                        </span>
                      </p>
                    </div>
                  </div>
                  <p>&nbsp;</p>
                  <p v-if="completedSymptoms == true">
                    <b
                      >Click the "Get Results" button below to view your
                      results!</b
                    >
                  </p>
                  <button
                    v-if="completedSymptoms == false"
                    style="background:#7485c2;"
                    class="waves-effect waves-light btn-large"
                    @click="nextSymptoms(singleSymptom)"
                  >
                    <i class="material-icons right">add</i>Add More</button
                  ><br /><br />
                  <button
                    class="waves-effect waves-light btn-large"
                    @click="submitSymptoms(storedSymptoms, singleSymptom)"
                  >
                    <i class="material-icons right">send</i>Get Results</button
                  ><br /><br />
                </div>
                <grid-loader
                  :loading="symptoms.length == 0"
                  :color="'#26a69a'"
                  :size="'80px'"
                ></grid-loader>
              </div>
            </div>
          </div>
          <div
            v-if="begin == true && processStarted == true && page === 4"
            class="row"
          >
            <div v-if="diagnosis.length > 0 && showError == false">
              <p><b>User:</b></p>
              <div class="card">
                <div class="card-content">
                  <p>{{ userAge }} year old {{ mainDescription.gender }}</p>
                </div>
              </div>
              <p><b>Listed Symptoms:</b></p>
              <div class="card">
                <div class="card-content">
                  <p
                    v-for="(item, index) in storedSymptoms"
                    :key="index"
                    style="margin: 0em;"
                  >
                    <span>{{ item.Name }}</span>
                  </p>
                </div>
              </div>
              <p><b>Possible Conditions:</b></p>
              <p></p>
              <div class="row displayContent">
                <div
                  class="col"
                  v-for="(item, index) in diagnosis"
                  :key="'five' + index"
                >
                  <div
                    class="card person showingResults"
                    style="padding: 1em;border:solid 0px #d5d5d5; text-align: left;height: auto;
    min-height: 150px;font-size: 1em;"
                  >
                    <div class="card-content">
                      <p style="margin-bottom:1em">
                        <b>Name:</b> {{ item.Issue.Name }}
                      </p>
                      <p style="margin-bottom:1em">
                        <b>Medical Term:</b> {{ item.Issue.ProfName }}
                      </p>
                      <p><b>Accuracy:</b></p>
                      <div v-if="item.Issue.Accuracy >= 50">
                        <vue-easy-pie-chart
                          :percent="Math.trunc(item.Issue.Accuracy)"
                          :bar-color="'#26a69a'"
                          :line-width="4"
                        >
                        </vue-easy-pie-chart>
                      </div>
                      <div v-if="item.Issue.Accuracy < 50">
                        <vue-easy-pie-chart
                          :percent="Math.trunc(item.Issue.Accuracy)"
                          :line-width="4"
                        >
                        </vue-easy-pie-chart>
                      </div>
                      <div
                        v-for="(i, ind) in diagnosisDetails"
                        :key="'seven' + ind"
                      >
                        <div v-if="item.Issue.Name == i.Name">
                          <p style="margin-bottom:1em">
                            <b>Summary:</b> {{ i.DescriptionShort }}
                          </p>
                          <p style="margin-bottom:1em">
                            <b>Description:</b> {{ i.Description }}
                          </p>
                          <p style="margin-bottom:1em">
                            <b>Medical Condition:</b> {{ i.MedicalCondition }}
                          </p>
                          <p style="margin-bottom:1em">
                            <b>Treatment:</b> {{ i.TreatmentDescription }}
                          </p>
                        </div>
                      </div>
                      <div v-if="item.Specialisation">
                        <p><b>Specializations:</b></p>
                        <p v-for="spec in item.Specialisation" :key="spec.ID">
                          {{ spec.Name }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="diagnosis.length == 0 && showError == true"
              style="margin:auto 0"
            >
              <p>&nbsp;</p>
              <p>&nbsp;</p>
              <p>
                <b>{{ errorMessage }}</b>
              </p>
              <p>&nbsp;</p>
              <button
                class="waves-effect waves-light btn-large"
                @click="retry()"
              >
                <i class="material-icons right">refresh</i>Retry
              </button>
            </div>
            <grid-loader
              :loading="diagnosis.length == 0 && showError == false"
              :color="'#26a69a'"
              :size="'80px'"
            ></grid-loader>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="robot">
          <Robot />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Terms from "../components/Terms";
import Privacy from "../components/Privacy";
import Robot from "../components/Robot";
import M from "materialize-css";
import GridLoader from "vue-spinner/src/GridLoader.vue";
import VueEasyPieChart from "vue-easy-pie-chart";
import "vue-easy-pie-chart/dist/vue-easy-pie-chart.css";
import moment from "moment";
// import TouchSimulate from 'touch-simulate'
export default {
  name: "home",
  data: () => ({
    accepted: false,
    privacyPolicy: false,
    termsOfUse: false,
    begin: false,
    processStarted: false,
    submissionReady: false,
    description: null,
    mainDescription: {},
    mainLocation: null,
    location: null,
    geolocation: [],
    singleSymptom: null,
    storedSymptoms: [],
    showError: false,
    errorMessage: null,
    page: 0,
    userAge: null,
    symptomFilter: 0,
    touch: null,
    yearDate: null,
    dateSubmitted: false
  }),
  components: {
    GridLoader,
    VueEasyPieChart,
    Privacy,
    Terms,
    Robot
  },
  methods: {
    beginNow() {
      let th = this;
      setTimeout(function() {
        th.begin = true;
      }, 500);
    },
    retry() {
      window.location.reload();
    },
    getAge(year) {
      let today = new Date();
      let currentYear = today.getFullYear();
      let a = moment([currentYear]);
      let b = moment([year]);
      this.userAge = a.diff(b, "years");
      this.$store.commit("setAge", this.userAge);
    },
    dateSubmit() {
      this.dateSubmitted = true;
      this.$store.commit("setDob", this.yearDate);
    },
    submitSymptoms(savedSymptoms, singleSymptom) {
      let th = this;
      if (singleSymptom !== null) {
        th.storedSymptoms.push(singleSymptom);
        let arrayOne = [];
        for (let x = 0; x < th.storedSymptoms.length; x++) {
          let eachSymptom = th.storedSymptoms[x];
          arrayOne.push(eachSymptom.ID);
        }
        th.$store.commit("setSymptomIds", arrayOne);
      }
      if (savedSymptoms.length < 1) {
        let msg = "You must choose a symptom!";
        M.toast({ html: msg });
      } else {
        let array = [];
        for (let x = 0; x < savedSymptoms.length; x++) {
          let eachSymptom = savedSymptoms[x];
          array.push(eachSymptom.ID);
        }
        this.$store.commit("setSymptomIds", array);
        th.$store.commit("setSelectedSymptoms", savedSymptoms);
        th.$store.dispatch("getDiagnosis");
        /*   let mq = window.matchMedia('(max-width: 800px)')
        if (mq.matches) {
          this.touch.start()
            .moveRight(250, true)
        } else {
          this.touch.start()
            .moveRight(50, true)
        } */
        setTimeout(() => {
          th.page = 4;
          setTimeout(function() {
            if (th.diagnosis.length === 0) {
              th.errorMessage =
                "Our apologies, there seemed to have been an error. Please try again.";
              th.showError = true;
            }
          }, 20000);
        }, 1000);
      }
    },
    showSynonyms(synonyms) {
      let mySynonyms = synonyms.join(", ");
      M.toast({ html: mySynonyms });
    },
    beginProcess() {
      /* let el = document.getElementById('robot')
      this.touch = new TouchSimulate(el, {
        point: false,
        speed: 60
      }) */
      let th = this;
      this.$store.dispatch("loadToken");
      this.processStarted = true;
      /*   let mq = window.matchMedia('(max-width: 800px)')
      if (mq.matches) {
        this.touch.start()
          .moveRight(250, true)
      } else {
        this.touch.start()
          .moveRight(50, true)
      } */
      function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          console.debug("Geolocation is not supported by this browser.");
        }
      }
      function showPosition(position) {
        th.geolocation.push({ latitude: position.coords.latitude });
        th.geolocation.push({ longitude: position.coords.longitude });
        th.$store.commit("setGeoLocation", th.geolocation);
      }
      getLocation();
    },
    showOne() {
      this.$modal.show("one");
    },
    hideOne() {
      this.$modal.hide("one");
    },
    showTwo() {
      this.$modal.show("two");
    },
    hideTwo() {
      this.$modal.hide("two");
    },
    describeSubmission(description) {
      if (description === "male" && this.userAge > 13) {
        this.mainDescription = {
          gender: "male",
          dob: this.yearDate,
          age: this.userAge,
          location: this.geolocation
        };
        this.$store.commit("setYearOfBirth", this.yearDate);
        this.$store.commit("setGender", "male");
        this.$store.commit("setFullDescription", this.mainDescription);
        this.$store.commit("setDescription", 0);
      }
      if (description === "female" && this.userAge > 13) {
        this.mainDescription = {
          gender: "female",
          dob: this.yearDate,
          age: this.userAge,
          location: this.geolocation
        };
        this.$store.commit("setYearOfBirth", this.yearDate);
        this.$store.commit("setGender", "female");
        this.$store.commit("setFullDescription", this.mainDescription);
        this.$store.commit("setDescription", 1);
      }
      if (description === "male" && this.userAge < 13) {
        this.mainDescription = {
          gender: "male",
          dob: this.yearDate,
          age: this.userAge,
          location: this.geolocation
        };
        this.$store.commit("setYearOfBirth", this.yearDate);
        this.$store.commit("setGender", "male");
        this.$store.commit("setFullDescription", this.mainDescription);
        this.$store.commit("setDescription", 2);
      }
      if (description === "female" && this.userAge < 13) {
        this.mainDescription = {
          gender: "female",
          dob: this.yearDate,
          age: this.userAge,
          location: this.geolocation
        };
        this.$store.commit("setYearOfBirth", this.yearDate);
        this.$store.commit("setGender", "female");
        this.$store.commit("setFullDescription", this.mainDescription);
        this.$store.commit("setDescription", 3);
      }
      this.$store.dispatch("loadBodyLocations");
      setTimeout(() => {
        this.page = 1;
      }, 1000);
    },
    chooseLocation(loc) {
      this.$store.commit("setSpecificLocation", loc);
      setTimeout(() => {
        this.$store.dispatch("loadSpecificBodyLocations");
        this.page = 2;
      }, 1000);
    },
    chooseExactLocation(mainLocation) {
      this.$store.commit("setExactLocation", mainLocation);
      setTimeout(() => {
        this.$store.dispatch("loadSymptoms");
        this.page = 3;
      }, 1000);
    },
    nextSymptoms(val) {
      if (val == null) {
        let msg = "You must choose a symptom!";
        M.toast({ html: msg });
      } else {
        this.storedSymptoms.push(val);
        let array = [];
        for (let x = 0; x < this.storedSymptoms.length; x++) {
          let eachSymptom = this.storedSymptoms[x];
          array.push(eachSymptom.ID);
        }
        this.$store.commit("setSymptomIds", array);
        this.$store.dispatch("loadProposedSymptoms");
        this.singleSymptom = null;
        this.symptomFilter++;
      }
    }
  },
  created() {
    this.$store.commit("resetState");
  },
  computed: {
    ...mapState([
      "token",
      "descriprtion",
      "bodyLocations",
      "specificLocation",
      "specificBodyLocations",
      "symptoms",
      "symptomIds",
      "diagnosis",
      "proposedSymptoms",
      "completedSymptoms",
      "age",
      "exactLocation",
      "diagnosisDetails"
    ]),
    years() {
      const year = new Date().getFullYear();
      return Array.from(
        { length: year - 1900 },
        (value, index) => 1901 + index
      );
    }
  },
  watch: {
    diagnosis: function(val) {
      if (val.length > 0) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }
};
</script>
<style>
/*  @media only screen and (-webkit-device-pixel-ratio: 2.0){
.robot {
    margin-left: 12%!important;
}
} */
@media (min-width: 1600px) {
  .robot {
    margin-left: 60% !important;
    margin-top: 2em !important;
  }
  .v-spinner {
    margin: auto auto !important;
    margin-top: 25% !important;
  }
  .showingResults {
    min-width: 372.5px;
    max-width: 100%;
  }
  .genderMobile {
    margin-left: 15% !important;
  }
  .mobileUpdate {
    margin-left: 33px !important;
  }
  .vdpComponent {
    position: relative;
    display: block;
    font-size: 10px;
    color: #303030;
    margin-left: 12%;
    margin-right: auto;
  }
  .rowStyle {
    margin-left: 240px !important;
    margin-top: 3em !important;
  }
  .colStyle {
    width: 50% !important;
  }
  .person {
    zoom: 1;
  }
  .sPal {
    margin-top: 2em !important;
    max-width: 400px !important;
    margin-left: 0em !important;
  }
  .homeImg {
    max-width: 500px;
    width: 100%;
    margin-top: -6em;
  }
  .speechStyle {
    max-width: 350px;
    width: 350px;
  }
  .speech-bubble {
    background: transparent;
    position: relative;
    text-align: center;
    padding-left: 1em;
    padding-right: 1em;
    padding-top: 1em;
    padding-bottom: 1em;
    margin: 20px 30px;
    width: 100%;
    border-radius: 30px;
    color: #212121;
  }
  .speech-bubble:after {
    content: "";
    position: absolute;
    display: none;
    top: 50%;
    left: 100%;
    margin-top: -10px;
    width: 0;
    height: 0;
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 20px solid #fff;
  }
}
@media (max-width: 1400px) {
  .robot {
    margin-left: 60% !important;
    margin-top: 2em !important;
  }
  .v-spinner {
    margin: auto auto !important;
    margin-top: 25% !important;
  }
  .showingResults {
    min-width: 372.5px;
    max-width: 100%;
  }
  .genderMobile {
    margin-left: 15% !important;
  }
  .mobileUpdate {
    margin-left: 33px !important;
  }
  .vdpComponent {
    position: relative;
    display: block;
    font-size: 10px;
    color: #303030;
    margin-left: 12%;
    margin-right: auto;
  }
  .rowStyle {
    margin-left: 240px !important;
    margin-top: 2em !important;
  }
  .colStyle {
    width: 50% !important;
  }
  .person {
    zoom: 1;
  }
  .sPal {
    margin-top: -2em !important;
    max-width: 400px !important;
    margin-left: 0em !important;
  }
  .homeImg {
    max-width: 500px;
    width: 100%;
    margin-top: -6em;
  }
  .speechStyle {
    max-width: 350px;
    width: 350px;
  }
  .speech-bubble {
    background: transparent;
    position: relative;
    text-align: center;
    padding-left: 1em;
    padding-right: 1em;
    padding-top: 1em;
    padding-bottom: 1em;
    margin: 20px 30px;
    width: 100%;
    border-radius: 30px;
    color: #212121;
  }
  .speech-bubble:after {
    content: "";
    position: absolute;
    display: none;
    top: 50%;
    left: 100%;
    margin-top: -10px;
    width: 0;
    height: 0;
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 20px solid #fff;
  }
}
@media (max-width: 1200px) {
  .robot {
    margin-left: 60% !important;
    margin-top: 2em !important;
  }
  .v-spinner {
    margin: auto auto !important;
    margin-top: 25% !important;
  }
  .showingResults {
    min-width: 372.5px;
    max-width: 100%;
  }
  .genderMobile {
    margin-left: 15% !important;
  }
  .mobileUpdate {
    margin-left: 33px !important;
  }
  .vdpComponent {
    position: relative;
    display: block;
    font-size: 10px;
    color: #303030;
    margin-left: 12%;
    margin-right: auto;
  }
  .rowStyle {
    margin-left: 150px !important;
    margin-top: 2em !important;
  }
  .colStyle {
    width: 50% !important;
  }
  .person {
    zoom: 1;
  }
  .sPal {
    margin-top: -2em !important;
    max-width: 400px !important;
    margin-left: 0em !important;
  }
  .homeImg {
    max-width: 500px;
    width: 100%;
    margin-top: -6em;
  }
  .speechStyle {
    max-width: 350px;
    width: 350px;
  }
  .speech-bubble {
    background: transparent;
    position: relative;
    text-align: center;
    padding-left: 1em;
    padding-right: 1em;
    padding-top: 1em;
    padding-bottom: 1em;
    margin: 20px 30px;
    width: 100%;
    border-radius: 30px;
    color: #212121;
  }
  .speech-bubble:after {
    content: "";
    position: absolute;
    display: none;
    top: 50%;
    left: 100%;
    margin-top: -10px;
    width: 0;
    height: 0;
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 20px solid #fff;
  }
}
@media (max-width: 1000px) {
  .robot {
    margin-left: 60% !important;
    margin-top: 2em !important;
  }
  .v-spinner {
    margin: auto auto !important;
    margin-top: 25% !important;
  }
  .sPal {
    margin-top: -2em !important;
    max-width: 350px !important;
    margin-left: -2em !important;
  }
  .vdpComponent {
    position: relative;
    display: block;
    font-size: 10px;
    color: #303030;
    margin-left: auto;
    margin-right: auto;
  }
  .person {
    zoom: 1;
  }
  .speech-bubble:after {
    content: "";
    position: absolute;
    display: none;
    top: 99%;
    left: 50%;
    margin-top: -10px;
    width: 0;
    height: 0;
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 20px solid #fff;
    transform: rotate(90deg);
  }
  .rowStyle {
    margin: auto !important;
    margin-top: 2em !important;
    margin-left: 0px !important;
  }
  .colStyle {
    width: 50% !important;
    margin: auto !important;
  }
  .speechStyle {
    max-width: 100%;
    width: auto;
  }
  .homeImg {
    max-width: 400px;
    width: 100%;
    margin-top: -4em;
  }
  .genderMobile {
    margin-left: 0% !important;
  }
  .mobileUpdate {
    margin-left: 0% !important;
  }
  .showingResults {
    min-width: 300px;
    max-width: 100%;
  }
}
@media (max-width: 800px) {
  .robot {
    margin-left: 30% !important;
    margin-top: 2em !important;
  }
  .v-spinner {
    margin: auto auto !important;
    margin-top: 0% !important;
  }
  .sPal {
    margin-top: -2em !important;
    max-width: 300px !important;
    margin-left: 0em !important;
  }
  .showingResults {
    min-width: 640px !important;
    max-width: 100% !important;
  }
  .colStyle {
    width: 100% !important;
  }
  .genderMobile {
    margin-left: 30% !important;
  }
  .mobileUpdate {
    margin-left: 5% !important;
  }
  .rowStyle {
    margin: auto !important;
    margin-top: 0em !important;
    margin-left: 0px !important;
  }
}
@media (max-width: 750px) {
  .robot {
    margin-left: 30% !important;
    margin-top: 2em !important;
  }
  .v-spinner {
    margin: auto auto !important;
    margin-top: 0% !important;
  }
  .sPal {
    margin-top: -2em !important;
    max-width: 300px !important;
    margin-left: 0em !important;
  }
  .showingResults {
    min-width: 600px !important;
    max-width: 100% !important;
  }
  .colStyle {
    width: 100% !important;
  }
  .genderMobile {
    margin-left: 23% !important;
  }
  .mobileUpdate {
    margin-left: 5% !important;
  }
  .rowStyle {
    margin: auto !important;
    margin-top: 0em !important;
    margin-left: 0px !important;
  }
}
@media (max-width: 700px) {
  .robot {
    margin-left: 30% !important;
    margin-top: 2em !important;
  }
  .v-spinner {
    margin: auto auto !important;
    margin-top: 0% !important;
  }
  .sPal {
    margin-top: -2em !important;
    max-width: 300px !important;
    margin-left: 0em !important;
  }
  .showingResults {
    min-width: 512px !important;
    max-width: 100% !important;
  }
  .colStyle {
    width: 100% !important;
  }
  .genderMobile {
    margin-left: 23% !important;
  }
  .mobileUpdate {
    margin-left: 5% !important;
  }
  .rowStyle {
    margin: auto !important;
    margin-top: 0em !important;
    margin-left: 0px !important;
  }
}
@media (max-width: 600px) {
  .robot {
    margin-left: 30% !important;
    margin-top: 2em !important;
  }
  .v-spinner {
    margin: auto auto !important;
    margin-top: 0% !important;
  }
  .sPal {
    margin-top: -2em !important;
    max-width: 300px !important;
    margin-left: 0em !important;
  }
  .showingResults {
    min-width: 512px !important;
    max-width: 100% !important;
  }
  .genderMobile {
    margin-left: 0% !important;
  }
  .mobileUpdate {
    margin-left: 0% !important;
  }
  .rowStyle {
    margin: auto !important;
    margin-top: 0em !important;
    margin-left: 0px !important;
  }
}
@media (max-width: 550px) {
  .robot {
    margin-left: 30% !important;
    margin-top: 2em !important;
  }
  .v-spinner {
    margin: auto auto !important;
    margin-top: 0% !important;
  }
  .sPal {
    margin-top: -2em !important;
    max-width: 300px !important;
    margin-left: 0em !important;
  }
  .showingResults {
    min-width: 458px !important;
    max-width: 100% !important;
  }
  .genderMobile {
    margin-left: 15% !important;
  }
  .mobileUpdate {
    margin-left: 0% !important;
  }
  .rowStyle {
    margin: auto !important;
    margin-top: 0em !important;
    margin-left: 0px !important;
  }
}
@media (max-width: 500px) {
  .robot {
    margin-left: 30% !important;
    margin-top: 2em !important;
  }
  .v-spinner {
    margin: auto auto !important;
    margin-top: 0% !important;
  }
  .sPal {
    margin-top: -2em !important;
    max-width: 300px !important;
    margin-left: 0em !important;
  }
  .showingResults {
    min-width: 400px !important;
    max-width: 100% !important;
  }
  .genderMobile {
    margin-left: 5% !important;
  }
  .mobileUpdate {
    margin-left: 0% !important;
  }
  .rowStyle {
    margin: auto !important;
    margin-top: 0em !important;
    margin-left: 0px !important;
  }
}
@media (max-width: 450px) {
  .robot {
    margin-left: 30% !important;
    margin-top: 2em !important;
  }
  .v-spinner {
    margin: auto auto !important;
    margin-top: 0% !important;
  }
  .sPal {
    margin-top: -2em !important;
    max-width: 300px !important;
    margin-left: 0em !important;
  }
  .showingResults {
    min-width: 340px !important;
    max-width: 100% !important;
  }
  .genderMobile {
    margin-left: 10% !important;
  }
  .mobileUpdate {
    margin-left: 5% !important;
  }
  .rowStyle {
    margin: auto !important;
    margin-top: 0em !important;
    margin-left: 0px !important;
  }
}
@media (max-width: 400px) {
  .robot {
    margin-left: 30% !important;
    margin-top: 2em !important;
  }
  .v-spinner {
    margin: auto auto !important;
    margin-top: 0% !important;
  }
  .sPal {
    margin-top: -2em !important;
    max-width: 300px !important;
    margin-left: 0em !important;
  }
  .showingResults {
    min-width: 320px !important;
    max-width: 100% !important;
  }
  .genderMobile {
    margin-left: 5% !important;
  }
  .mobileUpdate {
    margin-left: 5% !important;
  }
  .rowStyle {
    margin: auto !important;
    margin-top: 0em !important;
    margin-left: 0px !important;
  }
}
@media (max-width: 360px) {
  .robot {
    margin-left: 30% !important;
    margin-top: 2em !important;
  }
  .v-spinner {
    margin: auto auto !important;
    margin-top: 0% !important;
  }
  .sPal {
    margin-top: -2em !important;
    max-width: 300px !important;
    margin-left: -1em !important;
  }
  .showingResults {
    min-width: 300px !important;
    max-width: 100% !important;
  }
  .genderMobile {
    margin-left: 5% !important;
  }
  .mobileUpdate {
    margin-left: 2% !important;
  }
  .rowStyle {
    margin: auto !important;
    margin-top: 0em !important;
    margin-left: 0px !important;
  }
}
@media (max-width: 300px) {
  .robot {
    margin-left: 30% !important;
    margin-top: 2em !important;
  }
  .v-spinner {
    margin: auto auto !important;
    margin-top: 0% !important;
  }
  .sPal {
    margin-top: -2em !important;
    max-width: 300px !important;
    margin-left: -1em !important;
  }
  .showingResults {
    min-width: 280px !important;
    max-width: 100% !important;
  }
  .genderMobile {
    margin-left: 5% !important;
  }
  .mobileUpdate {
    margin-left: 2% !important;
  }
  .rowStyle {
    margin: auto !important;
    margin-top: 0em !important;
    margin-left: 0px !important;
  }
}
.vm--modal {
  position: relative;
  overflow: auto !important;
  box-sizing: border-box;
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 20px 60px -2px rgba(27, 33, 58, 0.4);
  text-align: left;
  padding: 2em;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
figcaption {
  font-size: 0.9em;
}
tr {
  border-bottom: 0px solid rgba(0, 0, 0, 0.12) !important;
}
.vdpHeader {
  background: #fff !important;
}
figcaption {
  font-weight: 500;
}
select {
  display: block !important;
}
.selectBox {
  border: 1px solid #fff;
  font-size: 18px;
  color: #212121;
  background-color: #fff;
  border-radius: 5px;
}
</style>
