/**
 * Created : vincent
 * Date : 12/01/2018  6:40 PM
 * Email : wangxiao@wafersystems.com
 */
import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames'

class Button extends React.PureComponent {

  constructor(props) {
    super(props)
    this.setPosition = this.setPosition.bind(this)
    this.getPosition = this.getPosition.bind(this)
    this.getSize = this.getSize.bind(this)
    this.getDivStyle = this.getDivStyle.bind(this)
    this.hide = this.hide.bind(this)
    this.show = this.show.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  _a

  _div

  _ahd = 0

  componentDidMount() {
  }

  getSize() {
    return {
      width: this._div.offsetWidth,
      height: this._div.offsetHeight,
      ahd: this._ahd
    }
  }

  setPosition(left, top, ahd) {
    this._div.style.left = left + "px"
    this._div.style.top = top + "px"
    this._ahd = ahd
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

  hide() {
    this._div.setAttribute('class', this.getDivStyle() + ' ' + 'child-pop-button-hide')
  }

  show() {
    this._div.setAttribute('class', this.getDivStyle())
  }

  onClick(e) {
    const {onClick, hideChildPop, setCenter, index} = this.props
    if (onClick) {
      onClick(e)
    }
    if (setCenter) {
      setCenter(index)
    }
    if (hideChildPop) {
      hideChildPop()
    }
  }

  render() {
    const {title, text, size, className} = this.props
    let divStyle = classNames({
      'hi-icon-wrap': size === 'normal',
      'hi-icon-child-wrap': size === 'small',
      'hi-icon-effect-2': true,
      'hi-icon-effect-2a': true,
    })
    if (className) {
      divStyle += ' ' + className
    }
    const textStyle = classNames({
      'hi-icon': size === 'normal',
      'hi-icon-child': size === 'small',
      'hi-icon-text': true
    })
    const titleStyle = classNames({
      'hi-icon-child-title': size === 'small',
      'hi-icon-title': size === 'normal'
    })
    return (
      <div className={divStyle} ref={div => this._div = div}>
        <a href="javascript:void(0);" className={textStyle} data-attr={text} ref={a => this._a = a}
           onClick={this.onClick}></a>
        <span className={titleStyle}>{title}</span>
      </div>
    )
  }
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(['normal', 'small'])
}

Button.defaultProps = {
  size: 'normal'
}

export default Button
