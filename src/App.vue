<template>
  <div id="app"  style="text-align:center">
  <nav class="z-depth-0" role="navigation" style="background-color:transparent">
    <div class="nav-wrapper container"><a @click="homePage" id="logo-container" style="font-size:2em;font-weight:400;color:#212121;cursor:pointer" class="brand-logo center"><img class="responsive-img" src="../src/assets/LogoAllpng.png" style="width:300px;height:auto;margin-top:.5em" /></a>
      <ul id="nav-mobile" class="sidenav teal lighten-2">
           <li style="color:#212121;font-size: 24px;font-weight:400"><img class="responsive-img" src="../src/assets/Logopng.png" style="width:100px;height:auto;margin-top:1em" /></li>
            <li><a @click="homePage" style="color:#fff;font-size:1.5em;font-weight:400">Home</a></li>
        <li><a @click="aboutPage" href="#" style="color:#fff;font-size:1.5em;font-weight:400">About</a></li>
      </ul>
      <a href="#" data-target="nav-mobile" class="sidenav-trigger show-on-large" style="color:#212121"><i class="material-icons">menu</i></a>
    </div>
  </nav>
  <div class="container" style="margin-top:1em;">
    <div class="section">
    <router-view />
    </div>
    <br><br>
  </div>
  </div>
</template>
<script>
import M from 'materialize-css'
import router from '../src/router'
export default {
  name: 'App',
  mounted () {
    M.AutoInit()
  },
  methods: {
    homePage () {
      let isRoot = location.pathname === '/'
      if (isRoot === true) {
        window.location.reload()
      } else {
        router.push({ path: '/' }).catch((err) => {
          console.debug(err)
        })
      }
    },
    aboutPage () {
      router.push({ path: '/about' }).catch((err) => {
        console.debug(err)
      })
    }
  }
}
</script>
<style>
#app {
font-weight:400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #212121;
  margin-top: 0px;
}
html{background:#e3e3e3}
.btn, .btn-large, .btn-small, .btn-flat,.card,select, .badge{ border-radius: 2px!important;}
.container {
    padding: 1em;
}
html {
  overflow-y: scroll;
    overflow-x:hidden;
}
</style>
