/**
 * Created : vincent
 * Date : 15/01/2018  5:34 PM
 * Email : wangxiao@wafersystems.com
 */
import React from 'react'
import Button from './Button'
import {
  mouseCoords,
  calculatePosition,
  POP_HALF_WIDTH,
  MORE_BUTTON_TOP,
  MORE_BUTTON_LEFT,
  AHD, isMobile
} from './RotateTools'

class ChildPop extends React.PureComponent {

  _buttons = []

  _button_more

  _pop

  _move = false

  _old_angle = 0

  _events = []

  _hideData

  constructor(props) {
    super(props)
    this.addListen = this.addListen.bind(this)
    this.removeListen = this.removeListen.bind(this)
    this.mouseUpHandle = this.mouseUpHandle.bind(this)
    this.mouseDownHandle = this.mouseDownHandle.bind(this)
    this.touchStartHandle = this.touchStartHandle.bind(this)
    this.touchEndHandle = this.touchEndHandle.bind(this)
    this.rotatingEventHandle = this.rotatingEventHandle.bind(this)
    this.timerOverEventHandle = this.timerOverEventHandle.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.timerRotating = this.timerRotating.bind(this)
    this.rotating = this.rotating.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.initRing = this.initRing.bind(this)
    this.getCentralPoint = this.getCentralPoint.bind(this)
    const {data} = this.props
    this.state = {
      data: data.length < 9 ? data : data.slice(0, 8),
    }
    this._hideData = data.length < 9 ? [] : data.slice(8, data.length)
  }

  componentWillUnmount() {
    this.removeListen()
  }

  componentDidMount() {
    this.initRing()
    const {data} = this.props
    if (data.length > 8) {
      this.addListen()
    }
  }

  addListen() {
    if (isMobile()) {
      window.addEventListener('touchstart', this.touchStartHandle)
      window.addEventListener('touchend', this.touchEndHandle)
      window.addEventListener('touchmove', this.onTouchMove)
    } else {
      window.addEventListener('mouseup', this.mouseUpHandle)
      window.addEventListener('mousedown', this.mouseDownHandle)
      window.addEventListener('mousemove', this.onMouseMove)
    }
    window.addEventListener('rotating', this.rotatingEventHandle);
    window.addEventListener('timerOver', this.timerOverEventHandle);
  }

  removeListen() {
    if (isMobile()) {
      window.removeEventListener('touchstart', this.touchStartHandle)
      window.removeEventListener('touchend', this.touchEndHandle)
      window.removeEventListener('touchmove', this.onTouchMove)
    } else {
      window.removeEventListener('mousedown', this.mouseDownHandle)
      window.removeEventListener('mouseup', this.mouseUpHandle)
      window.removeEventListener('mousemove', this.onMouseMove)
    }
    window.removeEventListener('rotating', this.rotatingEventHandle);
    window.removeEventListener('timerOver', this.timerOverEventHandle);
  }

  mouseUpHandle() {
    this._move = false
    this._old_angle = 0
  }

  mouseDownHandle() {
    this._move = true
  }

  touchStartHandle(e) {
    if (e.target.nodeName !== 'A') {
      e.preventDefault();
    }
  }

  touchEndHandle() {
  }

  rotatingEventHandle(e) {
    if (this._events.length === 0) {
      this.timerRotating(e.detail, 11)
    } else {
      this._events.push(e.detail)
    }
  }

  timerOverEventHandle() {
    if (this._events.length > 0) {
      this.timerRotating(this._events.shift(), 11)
    }
  }

  onTouchMove(e) {
    const {left, top} = this.props
    try {
      let mousePos = mouseCoords(e)
      const angle = Math.atan2(mousePos.y - top, mousePos.x - left) * 180 / Math.PI
      if (this._old_angle === 0) {
        this._old_angle = angle
        return
      }
      const angleDifference = angle - this._old_angle
      let event
      if (angleDifference > 15) {
        event = new CustomEvent('rotating', {'detail': true})
        this._old_angle = angle
        window.dispatchEvent(event)
      } else if (angleDifference < -15) {
        event = new CustomEvent('rotating', {'detail': false})
        this._old_angle = angle
        window.dispatchEvent(event)
      }
    } catch (e) {
      console.warn(e)
    }
  }

  timerRotating(direction, times) {
    setTimeout(() => {
      if (times >= 0) {
        try {
          this.rotating(direction, times === 11)
        } catch (e) {
          console.warn(e)
        }
        times -= 1
        this.timerRotating(direction, times)
      } else {
        var event = new Event('timerOver');
        window.dispatchEvent(event)
      }
    }, 40)
  }


  /**
   *
   * @param direction true is clockwise, false is counterclockwise
   */
  rotating(direction) {
    const {dotLeft, dotTop} = this.getCentralPoint()
    const {radius, buttonSize} = this.props
    const step = 1 / 12
    this._buttons.forEach((button, i) => {
      const oldIndex = button.getSize().index
      const newIndex = direction ? oldIndex + step : oldIndex - step
      const position = calculatePosition(newIndex, radius, dotLeft, dotTop, buttonSize, AHD)
      const differenceLeft = position.left.toFixed(2) - 160
      const differenceTop = position.top.toFixed(2) - 12
      if (differenceLeft > -10 && differenceLeft < 0 && differenceTop < 2 && !direction) {
        let v = this._hideData[0]
        const newData = this.state.data.slice()
        if (v.index === 1 || (i === 0 && (v.index - newData[newData.length - 1].index) === 1) || (i !== 0 && (v.index - newData[i - 1].index) === 1)) {
          v = this._hideData.shift()
          let arr = []
          arr.push(newData[i])
          this._hideData = this._hideData.concat(arr)
          newData[i] = v
          this.setState({data: newData})
        }
        button.displayTitle('block')
      }
      if (differenceLeft > 0 && differenceLeft < 10 && differenceTop < 2 && direction) {
        let v = this._hideData[this._hideData.length - 1]
        const newData = this.state.data.slice()
        const {data} = this.props
        if (v.index === data.length || (i === (newData.length - 1) && (newData[0].index) - v.index === 1) || (i !== (newData.length - 1) && (newData[i + 1].index - v.index) === 1)) {
          v = this._hideData.pop()
          let arr = []
          arr.push(newData[i])
          this._hideData = arr.concat(this._hideData)
          newData[i] = v
          this.setState({data: newData})
        }
        button.displayTitle('block')
      }
      if (differenceLeft < 1 && differenceLeft > -1 && differenceTop < 1) {
        button.displayTitle('none')
      }
      button.setPosition(position.left.toFixed(1), position.top.toFixed(1), newIndex)
    })
  }

  onMouseMove(e) {
    if (this._move) {
      this.onTouchMove(e)
    }
  }

  getCentralPoint() {
    return {
      //中心点横坐标
      dotLeft: this._pop.offsetWidth / 2,
      //中心点纵坐标
      dotTop: this._pop.offsetHeight / 2
    }
  }

  initRing() {
    const {radius, buttonSize} = this.props
    const {dotLeft, dotTop} = this.getCentralPoint()
    this._buttons.forEach((button, i) => {
      const position = calculatePosition(i, radius, dotLeft, dotTop, buttonSize, AHD)
      button.setPosition(position.left, position.top, i)
      if (i === this.state.data.length - 1) {
        button.displayTitle('none')
      }
    })
    if (this._button_more) {
      this._button_more.setPosition(MORE_BUTTON_LEFT, MORE_BUTTON_TOP)
    }
  }

  render() {
    const {left, top, data, hideChildPop, setCenter, onClick} = this.props
    return (
      <div className="child-pop-div" ref={a => this._pop = a}
           style={{'left': left - POP_HALF_WIDTH, 'top': top - POP_HALF_WIDTH}}>
        {this.state.data && this.state.data.map((v, i) => <Button key={i} title={v.title} text={v.text} size={'small'}
                                                                  onClick={onClick} hideChildPop={hideChildPop}
                                                                  data={v}
                                                                  setCenter={setCenter} index={v.index}
                                                                  ref={a => this._buttons[i] = a}
                                                                  titleFontColor={this.props.titleFontColor}
                                                                  buttonFontColor={this.props.buttonFontColor}
                                                                  buttonBackground={this.props.buttonBackground}
                                                                  titleFontSize={this.props.titleFontSize}
                                                                  buttonFontSize={this.props.buttonFontSize}/>)}
        {data.length > 8 &&
        <Button title={''} text={'More'} size={'small'} ref={a => this._button_more = a} className="more-button"
                titleFontColor={this.props.titleFontColor}
                buttonFontColor={this.props.buttonFontColor} buttonBackground={this.props.buttonBackground}
                titleFontSize={this.props.titleFontSize} buttonFontSize={this.props.buttonFontSize}/>}
      </div>
    )
  }
}

export default ChildPop
