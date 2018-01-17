/**
 * Created : vincent
 * Date : 15/01/2018  5:34 PM
 * Email : wangxiao@wafersystems.com
 */
import React from 'react'
import Button from './Button'

class ChildPop extends React.PureComponent {

  _buttons = []

  _button_more

  _pop

  _dotLeft

  _dotTop

  _lastMousePos = {
    x: 0,
    y: 0
  }

  constructor(props) {
    super(props)
    this.initRing = this.initRing.bind(this)
    this.setPosition = this.setPosition.bind(this)
    this.addListen = this.addListen.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.mouseCoords = this.mouseCoords.bind(this)
    this.rotating = this.rotating.bind(this)
    this.calculatePosition = this.calculatePosition.bind(this)
    const {data} = this.props
    this.state = {
      data: data.length < 9 ? data : data.slice(0, 8)
    }
  }

  componentDidMount() {
    this.initRing()
    const {data} = this.props
    if (data.length > 8) {
      this.addListen()
      document.getElementsByTagName('body')[0].addEventListener('touchstart', function (e) {
        e.preventDefault();
      }, false)
    }
  }

  addListen() {
    window.addEventListener('mousedown', e => {
      this._move = true
    })
    window.addEventListener('mouseup', e => {
      this._move = false
    })
    window.addEventListener('mousemove', this.onMouseMove)
    window.addEventListener('touchmove', this.onTouchMove)
  }

  onTouchMove(e) {
    try {
      let mousePos = this.mouseCoords(e)
      mousePos.x = mousePos.x - this._dotLeft
      mousePos.y = this._dotTop - mousePos.y
      let quadrant = 1
      if (mousePos.x < 0 && mousePos.y > 0) {
        quadrant = 2
      } else if (mousePos.x < 0 && mousePos.y < 0) {
        quadrant = 3
      } else if (mousePos.x > 0 && mousePos.y < 0) {
        quadrant = 4
      }
      const distanceY = mousePos.y - this._lastMousePos.y
      const distanceX = mousePos.x - this._lastMousePos.x
      let yChange = false
      let xChange = false
      if (distanceY > 5 || distanceY < -5) {
        yChange = true
      }
      if (distanceX > 5 || distanceX < -5) {
        xChange = true
      }
      switch (quadrant) {
        case 1:
          if (yChange) {
            this.rotating(mousePos.y > this._lastMousePos.y)
          } else if (xChange) {
            this.rotating(mousePos.x < this._lastMousePos.x)
          }
          break
        case 2:
          if (yChange) {
            this.rotating(mousePos.y < this._lastMousePos.y)
          } else if (xChange) {
            this.rotating(mousePos.x < this._lastMousePos.x)
          }
          break
        case 3:
          if (yChange) {
            this.rotating(mousePos.y < this._lastMousePos.y)
          } else if (xChange) {
            this.rotating(mousePos.x > this._lastMousePos.x)
          }
          break
        case 4:
          if (yChange) {
            this.rotating(mousePos.y > this._lastMousePos.y)
          } else if (xChange) {
            this.rotating(mousePos.x > this._lastMousePos.x)
          }
          break
        default:
          this.rotating(true)
      }
      if (yChange) {
        this._lastMousePos = mousePos
      }
    } catch (e) {

    }
  }

  /**
   *
   * @param direction true is clockwise, false is counterclockwise
   */
  rotating(direction) {
    //中心点横坐标
    const dotLeft = this._pop.offsetWidth / 2;
    //中心点纵坐标
    const dotTop = this._pop.offsetHeight / 2;
    //半径
    const radius = 150;
    //每一个BOX对应的角度;
    const avd = 360 / 8;
    //每一个BOX对应的弧度;
    const ahd = avd * Math.PI / 180;
    const buttonSize = 65
    const step = ahd / 24
    this._buttons.forEach((button, i) => {
      const oldAHD = button.getSize().ahd
      const newAHD = !direction ? oldAHD + step : oldAHD - step
      const position = this.calculatePosition(newAHD, radius, dotLeft, dotTop, buttonSize, ahd)
      const differenceLeft = position.left - 160
      const differenceTop = 12 - position.top
      if (differenceLeft > -10 && differenceLeft < 10 && differenceTop > 0) {
        console.log(i + "====" + position)
      }
      button.setPosition(position.left, position.top, newAHD)
    })
  }

  onMouseMove(e) {
    if (this._move) {
      this.onTouchMove(e)
    }
  }

  setPosition(left, top) {
    this._pop.style.left = left + "px"
    this._pop.style.top = top + "px"
  }

  calculatePosition(module, radius, dotLeft, dotTop, buttonSize, ahd) {
    return {
      left: Math.sin((ahd * (8 - module + 3))) * radius + dotLeft - buttonSize,
      top: Math.cos((ahd * (8 - module + 3))) * radius + dotTop - buttonSize
    }
  }

  initRing() {
    //中心点横坐标
    const dotLeft = this._pop.offsetWidth / 2;
    //中心点纵坐标
    const dotTop = this._pop.offsetHeight / 2;

    this._dotLeft = dotLeft
    this._dotTop = dotTop
    //半径
    const radius = 150;
    //每一个BOX对应的角度;
    const avd = 360 / 8;
    //每一个BOX对应的弧度;
    const ahd = avd * Math.PI / 180;
    const buttonSize = 65
    this._buttons.forEach((button, i) => {
      const module = i % 9
      const position = this.calculatePosition(module, radius, dotLeft, dotTop, buttonSize, ahd)
      button.setPosition(position.left, position.top, module)
    })
    if (this._button_more) {
      this._button_more.setPosition(160, 10)
    }
  }

  mouseCoords(ev) {
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

  render() {
    const {left, top, data, hideChildPop, setCenter} = this.props
    return (
      <div className="child-pop-div" ref={a => this._pop = a}
           style={{'left': left - 225 + 45, 'top': top - 225 + 60}}>
        {this.state.data && this.state.data.map((v, i) => <Button key={i} title={v.title} text={v.text} size={'small'}
                                                                  onClick={v.onClick} hideChildPop={hideChildPop}
                                                                  setCenter={setCenter} index={v.index}
                                                                  ref={a => this._buttons[i] = a}/>)}
        {data.length > 8 &&
        <Button title={''} text={'More'} size={'small'} ref={a => this._button_more = a} className="more-button"/>}
      </div>
    )
  }
}

export default ChildPop
