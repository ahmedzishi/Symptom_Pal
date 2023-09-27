<script>
/* eslint-disable */
    </script>
<template>
  <div class="symptomPalRobot">
<div id="wrapper">
  <div class="viewport">
    <div class="cube" id="robot">
           
   
      <div class="side" style="background:#ffffff">
        <div>  <i class="large material-icons" style="margin: auto;
    margin-top: 50px;">local_hospital</i></div>
      </div>
      <div class="side" style="background:#26a69a">
        <div>  <i class="large material-icons" style="margin: auto;
    margin-top: 50px;color:#fff;">local_hospital</i></div>
      </div>
      <div class="side" style="background:#354043">
        <div>  <i class="large material-icons" style="margin: auto;
    margin-top: 50px;color:#fff">local_hospital</i></div>
      </div>
         <div class="side" style="overflow:visible;background:#26a69a">
        <div> 
              <div style="margin-top:8em;transform: rotate(180deg);">
                        <div class="glasses">
    <div class="g-top "></div>
    <div class="g-left glass">
                                
                        <div class="eye">
                            <div class="eyeball"></div>
                        </div>
                            
                            
                            </div>
    <div class="g-right glass">
                            
                                
                        <div class="eye">
                            <div class="eyeball"></div>
                        </div>
                            
                            </div>
</div>
                      </div>
                        <p>&nbsp;</p>
                        <div class="mouth"></div>
                        <div class="bow-tie"></div>
               
        
        </div>
      </div>
      <div class="side" style="background:#354043">
        <div>  <i class="large material-icons" style="margin: auto;
    margin-top: 50px;color:#fff;">local_hospital</i></div>
      </div>
      <div class="side" style="background:#fff">
        <div>  <i class="large material-icons" style="margin: auto;
    margin-top: 50px;">local_hospital</i></div>
      </div>
    </div>
    	
  </div>
</div>
 </div>
</template>
<script>
export default {
  name: 'Robot',
  data () {
    return {
    }
  },
  mounted () {
    let events = new Events()
    events.add = function (obj) {
      obj.events = { }
    }
    events.implement = function (fn) {
      fn.prototype = Object.create(Events.prototype)
    }
    function Events () {
      this.events = { }
    }
    Events.prototype.on = function (name, fn) {
      let events = this.events[name]
      if (events == undefined) {
        this.events[name] = [ fn ]
        this.emit('event:on', fn)
      } else {
        if (events.indexOf(fn) == -1) {
          events.push(fn)
          this.emit('event:on', fn)
        }
      }
      return this
    }
    Events.prototype.once = function (name, fn) {
      let events = this.events[name]
      fn.once = true
      if (!events) {
        this.events[name] = [ fn ]
        this.emit('event:once', fn)
      } else {
        if (events.indexOf(fn) == -1) {
          events.push(fn)
          this.emit('event:once', fn)
        }
      }
      return this
    }
    Events.prototype.emit = function (name, args) {
      let events = this.events[name]
      if (events) {
        let i = events.length
        while (i--) {
          if (events[i]) {
            events[i].call(this, args)
            if (events[i].once) {
              delete events[i]
            }
          }
        }
      }
      return this
    }
    Events.prototype.unbind = function (name, fn) {
      if (name) {
        let events = this.events[name]
        if (events) {
          if (fn) {
            let i = events.indexOf(fn)
            if (i != -1) {
              delete events[i]
            }
          } else {
            delete this.events[name]
          }
        }
      } else {
        delete this.events
        this.events = { }
      }
      return this
    }
    let userPrefix
    let prefix = (function () {
      let styles = window.getComputedStyle(document.documentElement, ''),
        pre = (Array.prototype.slice
          .call(styles)
          .join('')
          .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
        )[1],
        dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1]
      userPrefix = {
        dom: dom,
        lowercase: pre,
        css: '-' + pre + '-',
        js: pre[0].toUpperCase() + pre.substr(1)
      }
    })()
    function bindEvent (element, type, handler) {
      if (element.addEventListener) {
        element.addEventListener(type, handler, false)
      } else {
        element.attachEvent('on' + type, handler)
      }
    }
    function Viewport (data) {
      events.add(this)
      let self = this
      this.element = data.element
      this.fps = data.fps
      this.sensivity = data.sensivity
      this.sensivityFade = data.sensivityFade
      this.touchSensivity = data.touchSensivity
      this.speed = data.speed
      this.lastX = 0
      this.lastY = 0
      this.mouseX = 0
      this.mouseY = 0
      this.distanceX = 0
      this.distanceY = 0
      this.positionX = 1122
      this.positionY = 136
      this.torqueX = 0
      this.torqueY = 0
      this.down = false
      this.upsideDown = false
      this.previousPositionX = 0
      this.previousPositionY = 0
      this.currentSide = 0
      this.calculatedSide = 0
      bindEvent(document, 'mousedown', function () {
        self.down = true
      })
      bindEvent(document, 'mouseup', function () {
        self.down = false
      })
      bindEvent(document, 'keyup', function () {
        self.down = false
      })
      bindEvent(document, 'mousemove', function (e) {
        self.mouseX = e.pageX
        self.mouseY = e.pageY
      })
      bindEvent(document, 'touchstart', function (e) {
        self.down = true
        e.touches ? e = e.touches[0] : null
        self.mouseX = e.pageX / self.touchSensivity
        self.mouseY = e.pageY / self.touchSensivity
        self.lastX = self.mouseX
        self.lastY = self.mouseY
      })
      bindEvent(document, 'touchmove', function (e) {
       /*  if (e.preventDefault) {
          e.preventDefault()
        } */
        if (e.touches.length == 1) {
          e.touches ? e = e.touches[0] : null
          self.mouseX = e.pageX / self.touchSensivity
          self.mouseY = e.pageY / self.touchSensivity
        }
      })
      bindEvent(document, 'touchend', function (e) {
        self.down = false
      })
      setInterval(this.animate.bind(this), this.fps)
    }
    events.implement(Viewport)
    Viewport.prototype.animate = function () {
      this.distanceX = (this.mouseX - this.lastX)
      this.distanceY = (this.mouseY - this.lastY)
      this.lastX = this.mouseX
      this.lastY = this.mouseY
      if (this.down) {
        this.torqueX = this.torqueX * this.sensivityFade + (this.distanceX * this.speed - this.torqueX) * this.sensivity
        this.torqueY = this.torqueY * this.sensivityFade + (this.distanceY * this.speed - this.torqueY) * this.sensivity
      }
      if (Math.abs(this.torqueX) > 1.0 || Math.abs(this.torqueY) > 1.0) {
        if (!this.down) {
          this.torqueX *= this.sensivityFade
          this.torqueY *= this.sensivityFade
        }
        this.positionY -= this.torqueY
        if (this.positionY > 360) {
          this.positionY -= 360
        } else if (this.positionY < 0) {
          this.positionY += 360
        }
        if (this.positionY > 90 && this.positionY < 270) {
          this.positionX -= this.torqueX
          if (!this.upsideDown) {
            this.upsideDown = true
            this.emit('upsideDown', { upsideDown: this.upsideDown })
          }
        } else {
          this.positionX += this.torqueX
          if (this.upsideDown) {
            this.upsideDown = false
            this.emit('upsideDown', { upsideDown: this.upsideDown })
          }
        }
        if (this.positionX > 360) {
          this.positionX -= 360
        } else if (this.positionX < 0) {
          this.positionX += 360
        }
        if (!(this.positionY >= 46 && this.positionY <= 130) && !(this.positionY >= 220 && this.positionY <= 308)) {
          if (this.upsideDown) {
            if (this.positionX >= 42 && this.positionX <= 130) {
              this.calculatedSide = 3
            } else if (this.positionX >= 131 && this.positionX <= 223) {
              this.calculatedSide = 2
            } else if (this.positionX >= 224 && this.positionX <= 314) {
              this.calculatedSide = 5
            } else {
              this.calculatedSide = 4
            }
          } else {
            if (this.positionX >= 42 && this.positionX <= 130) {
              this.calculatedSide = 5
            } else if (this.positionX >= 131 && this.positionX <= 223) {
              this.calculatedSide = 4
            } else if (this.positionX >= 224 && this.positionX <= 314) {
              this.calculatedSide = 3
            } else {
              this.calculatedSide = 2
            }
          }
        } else {
          if (this.positionY >= 46 && this.positionY <= 130) {
            this.calculatedSide = 6
          }
          if (this.positionY >= 220 && this.positionY <= 308) {
            this.calculatedSide = 1
          }
        }
        if (this.calculatedSide !== this.currentSide) {
          this.currentSide = this.calculatedSide
          this.emit('sideChange')
        }
      }
      this.element.style[userPrefix.js + 'Transform'] = 'rotateX(' + this.positionY + 'deg) rotateY(' + this.positionX + 'deg)'
      if (this.positionY != this.previousPositionY || this.positionX != this.previousPositionX) {
        this.previousPositionY = this.positionY
        this.previousPositionX = this.positionX
        this.emit('rotate')
      }
    }
    let viewport = new Viewport({
      element: document.getElementsByClassName('cube')[0],
      fps: 20,
      sensivity: 0.1,
      sensivityFade: 0.93,
      speed: 2,
      touchSensivity: 1.5
    })
    function Cube (data) {
      let self = this
      this.element = data.element
      this.sides = this.element.getElementsByClassName('side')
      this.viewport = data.viewport
      this.viewport.on('rotate', function () {
        self.rotateSides()
      })
      this.viewport.on('upsideDown', function (obj) {
        self.upsideDown(obj)
      })
      this.viewport.on('sideChange', function () {
        self.sideChange()
      })
    }
    Cube.prototype.rotateSides = function () {
      let viewport = this.viewport
      if (viewport.positionY > 90 && viewport.positionY < 270) {
      //  this.sides[0].getElementsByClassName('cube-image')[0].style[userPrefix.js + 'Transform'] = 'rotate(' + (viewport.positionX + viewport.torqueX) + 'deg)'
      //  this.sides[5].getElementsByClassName('cube-image')[0].style[userPrefix.js + 'Transform'] = 'rotate(' + -(viewport.positionX + 180 + viewport.torqueX) + 'deg)'
      } else {
      //  this.sides[0].getElementsByClassName('cube-image')[0].style[userPrefix.js + 'Transform'] = 'rotate(' + (viewport.positionX - viewport.torqueX) + 'deg)'
      //  this.sides[5].getElementsByClassName('cube-image')[0].style[userPrefix.js + 'Transform'] = 'rotate(' + -(viewport.positionX + 180 - viewport.torqueX) + 'deg)'
      }
    }
    Cube.prototype.upsideDown = function (obj) {
      let deg = (obj.upsideDown == true) ? '180deg' : '0deg'
      let i = 5
      while (i > 0 && --i) {
      //  this.sides[i].getElementsByClassName('cube-image')[0].style[userPrefix.js + 'Transform'] = 'rotate(' + deg + ')'
      }
    }
    Cube.prototype.sideChange = function () {
      for (let i = 0; i < this.sides.length; ++i) {
      //  this.sides[i].getElementsByClassName('cube-image')[0].className = 'cube-image'
      }
   //   this.sides[this.viewport.currentSide - 1].getElementsByClassName('cube-image')[0].className = 'cube-image active'
    }
    new Cube({
      viewport: viewport,
      element: document.getElementsByClassName('cube')[0]
    })
  }
}
</script>
<style scoped>
#wrapper {
  padding-top: 10%; }
.viewport {
  -webkit-perspective: 800px;
  -moz-perspective: 800px;
  -ms-perspective: 800px;
  -o-perspective: 800px;
  perspective: 800px;
  -webkit-perspective-origin: 50% 200px;
  -moz-perspective-origin: 50% 200px;
  -ms-perspective-origin: 50% 200px;
  -o-perspective-origin: 50% 200px;
  perspective-origin: 50% 200px;
  -webkit-transform: scale(0.8, 0.8);
  -moz-transform: scale(0.8, 0.8);
  -ms-transform: scale(0.8, 0.8);
  -o-transform: scale(0.8, 0.8);
  transform: scale(0.8, 0.8);
 }
.cube {
  position: relative;
  margin: 0 auto;
  height: 200px;
  width: 200px;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  -o-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transform: rotateX(136deg) rotateY(1122deg);
  -moz-transform: rotateX(136deg) rotateY(1122deg);
  -ms-transform: rotateX(136deg) rotateY(1122deg);
  -o-transform: rotateX(136deg) rotateY(1122deg);
  transform: rotateX(136deg) rotateY(1122deg); }
.cube > div {
  overflow: hidden;
  position: absolute;
  height: 200px;
  width: 200px;
  border:solid 1px #212121;
  background:#fff;
  -webkit-touch-callout: none;
  -moz-touch-callout: none;
  -ms-touch-callout: none;
  -o-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none; }
.cube > div > div.cube-image {
  width: 200px;
  height: 200px;
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  transform: rotate(180deg);
  line-height: 200px;
  font-size: 80px;
  text-align: center;
  color: #1b9bd8;
  -webkit-transition: color 600ms;
  -moz-transition: color 600ms;
  -ms-transition: color 600ms;
  -o-transition: color 600ms;
  transition: color 600ms; }
  .cube > div > div.cube-image.active {
    color: red; }
.cube > div:hover {
  cursor: pointer; }
.cube > div:active {
  cursor: pointer; }
.cube > div:first-child {
  -webkit-transform: rotateX(90deg) translateZ(100px);
  -moz-transform: rotateX(90deg) translateZ(100px);
  -ms-transform: rotateX(90deg) translateZ(100px);
  -o-transform: rotateX(90deg) translateZ(100px);
  transform: rotateX(90deg) translateZ(100px);
  outline: 1px solid transparent; }
.cube > div:nth-child(2) {
  -webkit-transform: translateZ(100px);
  -moz-transform: translateZ(100px);
  -ms-transform: translateZ(100px);
  -o-transform: translateZ(100px);
  transform: translateZ(100px);
  outline: 1px solid transparent; }
.cube > div:nth-child(3) {
  -webkit-transform: rotateY(90deg) translateZ(100px);
  -moz-transform: rotateY(90deg) translateZ(100px);
  -ms-transform: rotateY(90deg) translateZ(100px);
  -o-transform: rotateY(90deg) translateZ(100px);
  transform: rotateY(90deg) translateZ(100px);
  outline: 1px solid transparent; }
.cube > div:nth-child(4) {
  -webkit-transform: rotateY(180deg) translateZ(100px);
  -moz-transform: rotateY(180deg) translateZ(100px);
  -ms-transform: rotateY(180deg) translateZ(100px);
  -o-transform: rotateY(180deg) translateZ(100px);
  transform: rotateY(180deg) translateZ(100px);
  outline: 1px solid transparent; }
.cube > div:nth-child(5) {
  -webkit-transform: rotateY(-90deg) translateZ(100px);
  -moz-transform: rotateY(-90deg) translateZ(100px);
  -ms-transform: rotateY(-90deg) translateZ(100px);
  -o-transform: rotateY(-90deg) translateZ(100px);
  transform: rotateY(-90deg) translateZ(100px);
  outline: 1px solid transparent; }
.cube > div:nth-child(6) {
  -webkit-transform: rotateX(-90deg) rotate(180deg) translateZ(100px);
  -moz-transform: rotateX(-90deg) rotate(180deg) translateZ(100px);
  -ms-transform: rotateX(-90deg) rotate(180deg) translateZ(100px);
  -o-transform: rotateX(-90deg) rotate(180deg) translateZ(100px);
  transform: rotateX(-90deg) rotate(180deg) translateZ(100px);
  outline: 1px solid transparent; }
object {
  opacity: 0.5; }
object:hover {
  opacity: 1; }
 
.bow-tie {
-webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    width: 0;
    border: 120px solid #212121;
    border-top: 70px dotted rgba(0,0,0,0);
    border-bottom: 90px dotted rgba(0,0,0,0);
    -webkit-border-radius: 63px;
    border-radius: 63px;
    font: normal 100%/normal Arial, Helvetica, sans-serif;
    color: rgba(0,0,0,1);
    -o-text-overflow: clip;
    text-overflow: clip;
    position: absolute;
     top: -5em;
    left: -20px;
}
.bow-tie:after {
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    width: 50px;
    height: 50px;
    position: absolute;
    content: "";
    bottom: -25px;
    right: auto;
    left: -20px;
    border: none;
    -webkit-border-radius: 16px;
    border-radius: 16px;
    font: normal 16px/normal Arial, Helvetica, sans-serif;
    color: rgba(0,0,0);
    -o-text-overflow: clip;
    text-overflow: clip;
    background: #212121;
    text-shadow: none;
}
.glasses {
    position: relative;
    margin-top:13em;
 }
    
    
    .g-top {
    position: absolute;
    height: 10px;
    width: 10px;
    background-color: #212121;
    top: 50px;
    left: 95px;
    }
    
    .glass {
        position: absolute;
        height: 100px;
        width: 100px;
 
        border: 10px solid #212121;
        top: 0;        
    }
    
    .g-right {
    position: absolute;
    height: 100px;
    width: 100px;
    /* background-color: #212121; */
    top: 5px;
    right: -5px;
    border-radius: 5px;
    }
    .g-left {
    position: absolute;
    height: 100px;
    width: 100px;
    /* background-color: #212121; */
    top: 5px;
    left: -5px;
    border-radius: 5px;
    }
    
    
    .eye {
   overflow: hidden;
    position: relative;
    width: 40px;
    height: 40px;
    margin-top: 20%;
    background-color: white;
    border-radius: 100%;
    -webkit-animation: eye 2s infinite alternate;
    animation: eye 2s infinite alternate;
    margin-left: 1em;
}
.eye:after {
    content: "";
    position: absolute;
    top: 60px;
    left: 35%;
    background: rgba(255,255,255,0.7);
    width: 10px;
    height: 20px;
    margin: 0px auto 0px;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    -webkit-box-shadow: 0px 0px 13px white;
    -moz-box-shadow: 0px 0px 13px white;
    box-shadow: 0px 0px 13px white;
}
.eyeball {overflow: hidden;
    position: relative;
    width: 25px;
    height: 25px;
    background-color: black;
    margin: 5px auto;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    -webkit-animation: eye 3s infinite alternate, move 7s infinite alternate, scale 10s cubic-bezier(1, 0, 0, 1) infinite alternate;
    -moz-animation: eye 3s infinite alternate, move 7s infinite alternate, scale 10s cubic-bezier(1, 0, 0, 1) infinite alternate;
    -ms-animation: eye 3s infinite alternate, move 7s infinite alternate, scale 10s cubic-bezier(1, 0, 0, 1) infinite alternate;
    -o-animation: eye 3s infinite alternate, move 7s infinite alternate, scale 10s cubic-bezier(1, 0, 0, 1) infinite alternate;
    animation: eye 3s infinite alternate, move 7s infinite alternate, infinite alternate;
}
.mouth {
display: block!important;
    border-radius: 10% 10% 0% 0%;
    -webkit-animation: mouth 7s infinite;
    -moz-animation:  mouth 7s infinite;
    -ms-animation:  mouth 7s infinite;
    -o-animation:  mouth 7s infinite;
    animation: mouth 7s infinite;
    padding: 30px;
    bottom: 38%;
    margin-left: 35%;
    position: absolute;
    width: 55px;
    height: 55px;
}
@-webkit-keyframes move {
    25% {
        left: 20px;
    }
    72% {
        margin-top: 15px;
    }
    16% {
        margin-top: -15px;
    }
    50%,
    70% {
        left: -15px;
    }
    0%,
    80%,
    100% {
        left: 0px;
        margin-top: 0px;
    }
}
@-webkit-keyframes mouth {
    0%, 20%, 76% {
        border-top: 10px solid black;
        width: 20px;
        height: 80px #212121 solid
    }
    10%,
    50%,
    100% {
        border-top: 2px solid black;
        width: 50px;
        height: 10px #212121 solid
    }
}
@-moz-keyframes move {
    25% {
        left: 15px;
    }
    72% {
        margin-top: 15px;
    }
    16% {
        margin-top: -15px;
    }
    50%,
    70% {
        left: -15px;
    }
    0%,
    80%,
    100% {
        left: 0px;
        margin-top: 0px;
    }
}
@-moz-keyframes mouth {
    0%, 20%, 76% {
        border-top: 10px solid black;
        width: 15px;
        height: 70px #212121 solid
    }
    10%,
    50%,
    100% {
        border-top: 2px solid black;
        width: 30px;
        height: 10px #212121 solid
    }
}
@-ms-keyframes move {
    25% {
        left: 15px;
    }
    72% {
        margin-top: 15px;
    }
    16% {
        margin-top: -15px;
    }
    50%,
    70% {
        left: -15px;
    }
    0%,
    80%,
    100% {
        left: 0px;
        margin-top: 0px;
    }
}
@-ms-keyframes mouth {
    0%, 20%, 76% {
        border-top: 10px solid black;
        width: 15px;
        height: 70px #212121 solid
    }
    10%,
    50%,
    100% {
        border-top: 2px solid black;
        width: 30px;
        height: 10px #212121 solid
    }
}
@-o-keyframes move {
    25% {
        left: 15px;
    }
    72% {
        margin-top: 15px;
    }
    16% {
        margin-top: -15px;
    }
    50%,
    70% {
        left: -15px;
    }
    0%,
    80%,
    100% {
        left: 0px;
        margin-top: 0px;
    }
}
@-o-keyframes mouth {
    0%, 20%, 76% {
        border-top: 10px solid black;
        width: 15px;
        height: 70px #212121 solid
    }
    10%,
    50%,
    100% {
        border-top: 2px solid black;
        width: 30px;
        height: 10px #212121 solid
    }
}
@keyframes move {
    25% {
        left: 15px;
    }
    72% {
        margin-top: 15px;
    }
    16% {
        margin-top: -15px;
    }
    50%,
    70% {
        left: -15px;
    }
    0%,
    80%,
    100% {
        left: 0px;
        margin-top: 0px;
    }
}
@keyframes mouth {
    0%, 20%, 76% {
        border-top: 10px solid black;
        width: 15px;
        height: 70px #212121 solid
    }
    10%,
    50%,
    100% {
        border-top: 2px solid black;
        width: 30px;
        height: 10px #212121 solid
    }
}
@-webkit-keyframes anim_wifeo
{
  0%{-webkit-transform:rotate(0deg);} 
  50%{-webkit-transform:rotate(360deg);} 
  100%{-webkit-transform:rotate(720deg);}
}
@-moz-keyframes anim_wifeo
{
  0%{-moz-transform:rotate(0deg);} 
  50%{-moz-transform:rotate(360deg);} 
  100%{-moz-transform:rotate(720deg);}
}
@-ms-keyframes anim_wifeo
{
  0%{-ms-transform:rotate(0deg);} 
  50%{-ms-transform:rotate(360deg);} 
  100%{-ms-transform:rotate(720deg);}
}
@keyframes anim_wifeo
{
  0%{transform:rotate(0deg);} 
  50%{transform:rotate(360deg);} 
  100%{transform:rotate(720deg);}
}
</style>