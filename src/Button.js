/**
 * Created : vincent
 * Date : 12/01/2018  6:40 PM
 * Email : wangxiao@wafersystems.com
 */
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {changeButtonBackgroundColor, changeButtonFontSize} from './RotateTools'

class Button extends React.PureComponent {

  constructor(props) {
    super(props)
    this.setPosition = this.setPosition.bind(this)
    this.getPosition = this.getPosition.bind(this)
    this.getSize = this.getSize.bind(this)
    this.getDivStyle = this.getDivStyle.bind(this)
    this.onClick = this.onClick.bind(this)
    this.displayTitle = this.displayTitle.bind(this)
  }

  _a

  _div

  _title

  _index = 0

  componentDidMount() {
    changeButtonBackgroundColor(this.props.buttonBackground)
    changeButtonFontSize(this.props.buttonFontSize)
    this._a.style.color = this.props.buttonFontColor
    if (!this.props.buttonClassName) {
      this._a.style['box-shadow'] = `0 0 0 3px ${this.props.buttonBackground}`
    }
    this._title.style.color = this.props.titleFontColor
    this._title.style['font-size'] = this.props.titleFontSize
  }

  getSize() {
    return {
      width: this._div.offsetWidth,
      height: this._div.offsetHeight,
      index: this._index
    }
  }

  setPosition(left, top, index) {
    this._div.style.left = left + "px"
    this._div.style.top = top + "px"
    this._index = index
  }

  getPosition() {
    return {
      left: this._div.offsetLeft,
      top: this._div.offsetTop
    }
  }

  getDivStyle() {
    const {size, className} = this.props
    let divStyle = classNames({
      'hi-icon-wrap': size === 'normal',
      'hi-icon-child-wrap': size === 'small',
      'hi-icon-effect-2': true,
      'hi-icon-effect-2a': true,
    })
    if (className) {
      divStyle += ' ' + className
    }
    return divStyle
  }

  onClick(e) {
    const {onClick, hideChildPop, setCenter, index, data, showChildPop, showChildPopStatus} = this.props
    if (showChildPop) {
      if (!showChildPopStatus) {
        showChildPop(e)
      } else {
        if (hideChildPop) {
          hideChildPop()
        }
        if (onClick) {
          onClick(e, data)
        }
      }
    } else {
      if (onClick) {
        onClick(e, data)
      }
      if (setCenter) {
        setCenter(index)
      }
      if (hideChildPop) {
        hideChildPop()
      }
    }
  }

  displayTitle(status) {
    this._title.style.display = status
  }

  render() {
    const {title, text, size, className, buttonClassName} = this.props
    let divStyle = classNames({
      'hi-icon-wrap': size === 'normal',
      'hi-icon-child-wrap': size === 'small',
      'hi-icon-effect-2': true && !buttonClassName,
      'hi-icon-effect-2a': true && !buttonClassName
    })
    if (className) {
      divStyle += ' ' + className
    }
    let textStyle = classNames({
      'hi-icon': size === 'normal' && !buttonClassName,
      'hi-icon-child': size === 'small' && !buttonClassName,
      'hi-icon-text': true && !buttonClassName
    })
    if (buttonClassName) {
      textStyle += ' ' + buttonClassName
    }
    const titleStyle = classNames({
      'hi-icon-child-title': size === 'small',
      'hi-icon-title': size === 'normal'
    })
    return (
      <div className={divStyle} ref={div => this._div = div}>
        <a className={textStyle} data-attr={text} ref={a => this._a = a}
           onClick={this.onClick}>{text}</a>
        <span className={titleStyle} ref={a => this._title = a}>{title}</span>
      </div>
    )
  }
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(['normal', 'small']),
  titleFontColor: PropTypes.string.isRequired,
  titleFontSize: PropTypes.string.isRequired,
  buttonFontColor: PropTypes.string.isRequired,
  buttonFontSize: PropTypes.string.isRequired,
  buttonBackground: PropTypes.string.isRequired,
  data: PropTypes.object,
  showChildPopStatus: PropTypes.bool,
  showChildPop: PropTypes.func,
  buttonClassName: PropTypes.string
}

Button.defaultProps = {
  size: 'normal'
}

export default Button
