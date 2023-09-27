<template>
  <div id="about" style="text-align:left">
    <p><b>About Symptom Pal</b></p>
    <p>Symptom Pal is a free, easy to use tool that helps people check their symptoms. Based on the entered symptoms it tells the user what possible diseases they have. It returns solid results with a few entries, while other tools require many more entries.</p>
<p>Please review Symptom Pal's <a @click="showOne" style="font-weight:400;cursor:pointer">Terms of use</a> and <a @click="showTwo" style="font-weight:400;cursor:pointer">Privacy Policy</a> before use.</p>
<p><i  style="font-size:1em;display:block">*Symptom Pal DOES NOT PROVIDE MEDICAL ADVICE and therefore allows no diagnosis and is to be USED FOR EDUCATIONAL PURPOSES ONLY. Any reliance you place on such information is therefore strictly at your own risk.</i></p>
<p style="font-size: .97em;"><b>Image Credits:</b>
<br/>
<a href="https://www.shutterstock.com/image-vector/part-body-set-icons-cartoon-style-492405520" target="_blank">Image</a> / <a href="https://www.shutterstock.com/g/PandaVector" target="_blank">Panda Vector</a> / <a href="https://www.shutterstock.com/" target="_blank">Shutterstock.com</a><br/>
<a href="https://www.shutterstock.com/image-vector/stock-vector-illustration-cartoon-avatars-people-237746194" target="_blank">Image</a> / <a href="https://www.shutterstock.com/g/urchenkojulia" target="_blank">Yurchenko Yulia</a> / <a href="https://www.shutterstock.com/" target="_blank">Shutterstock.com</a><br/>
<a href="https://www.shutterstock.com/image-vector/body-parts-2-319187732" target="_blank">Image</a> / <a href="https://www.shutterstock.com/g/Spreadthesign" target="_blank">Spreadthesign</a> / <a href="https://www.shutterstock.com/" target="_blank">Shutterstock.com</a><br/>
</p>
   <div class="row" style="width:100%;text-align:center">   <img src="../assets/mainImage.png" class="responsive-img" style="display:block;margin:auto;margin-top:1em"/></div>
  <modal :clickToClose="true" name="one" :maxHeight="300" style="color:#212121;">
<Terms />  <p>&nbsp;</p>
<button @click="hideOne" class="waves-effect waves-light btn-large flat  z-depth-0"><i class="material-icons right">close</i>Close</button>
  <p>&nbsp;</p>
</modal>
<modal :clickToClose="true" :maxHeight="300" name="two" style="color:#212121;">
<Privacy />  <p>&nbsp;</p>
  <button @click="hideTwo" class="waves-effect waves-light btn-large flat  z-depth-0"><i class="material-icons right">close</i>Close</button>
  <p>&nbsp;</p>
</modal>
  </div>
</template>
<script>
import Terms from '../components/Terms'
import Privacy from '../components/Privacy'
export default {
  name: 'About',
  data () {
    return {
    }
  },
  components: {
    Privacy,
    Terms
  },
  methods: {
    showOne () {
      this.$modal.show('one')
    },
    hideOne () {
      this.$modal.hide('one')
    },
    showTwo () {
      this.$modal.show('two')
    },
    hideTwo () {
      this.$modal.hide('two')
    }
  }
}
</script>
<style>
.aboutImg {max-width:600px!important;margin-top:-3em!important}
@media only screen and (max-width: 1200px) {.aboutImg {max-width:300px!important;margin-top:0em!important}}
</style>
