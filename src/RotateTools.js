/**
 * Created : vincent
 * Date : 18/01/2018  2:37 PM
 * Email : wangxiao@wafersystems.com
 */
export const MORE_BUTTON_LEFT = 160

export const MORE_BUTTON_TOP = 10

export const POP_HALF_WIDTH = 225

//每一个button对应的角度;
export const AVD = 360 / 8

//每一个button对应的弧度;
export const AHD = AVD * Math.PI / 180

export const mouseCoords = (ev) => {
  if (ev.pageX || ev.pageY) {
    return {x: ev.pageX, y: ev.pageY}
  }
  if (ev.clientX || ev.clientY) {
    return {
      x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
      y: ev.clientY + document.body.scrollTop - document.body.clientTop
    }
  }
  if (ev.touches[0].pageX || ev.touches[0].pageY) {
    return {
      x: ev.touches[0].pageX,
      y: ev.touches[0].pageY
    }
  }
}

export const calculatePosition = (index, radius, dotLeft, dotTop, buttonSize, ahd) => {
  let left = Math.sin((ahd * (8 - index + 3))) * radius + dotLeft - buttonSize
  let top = Math.cos((ahd * (8 - index + 3))) * radius + dotTop - buttonSize
  if (left - MORE_BUTTON_LEFT < 1 && left - MORE_BUTTON_LEFT > 0) {
    left = MORE_BUTTON_LEFT
  }
  if (top - MORE_BUTTON_TOP < 1 && top - MORE_BUTTON_TOP > 0) {
    top = MORE_BUTTON_TOP
  }
  return {
    left: left,
    top: top
  }
}

export const isMobile = () => {
  return /Mobile/i.test(window.navigator.userAgent)
}

const css = (t, s) => {
  s = document.createElement('style');
  s.innerText = t;
  document.body.appendChild(s);
}

export const changeButtonBackgroundColor = (color) => {
  css(`.hi-icon-effect-2 .hi-icon:after {
  top: -2px;
  left: -2px;
  padding: 2px;
  z-index: -1;
  background: ${color};
  -webkit-transition: -webkit-transform 0.2s, opacity 0.2s;
  -moz-transition: -moz-transform 0.2s, opacity 0.2s;
  transition: transform 0.2s, opacity 0.2s;
  }
  `)
  css(`.hi-icon-effect-2 .hi-icon-child:after {
  top: -2px;
  left: -2px;
  padding: 2px;
  z-index: -1;
  background: ${color};
  -webkit-transition: -webkit-transform 0.2s, opacity 0.2s;
  -moz-transition: -moz-transform 0.2s, opacity 0.2s;
  transition: transform 0.2s, opacity 0.2s;
  }
  `)
}

export const changeButtonFontSize = (size) => {
  css(`.hi-icon:before {
  speak: none;
  font-size: ${size};
  line-height: 90px;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  display: block;
  -webkit-font-smoothing: antialiased;
}
  `)
}

