import React from 'react';
import PropTypes from 'prop-types'
import './RotateMenu.css'
import Button from './Button'
import ChildPop from './ChildPop'
import RenderInBody from './RenderInBody'

class RotateMenu extends React.PureComponent {

  constructor(props) {
    super(props)
    this.showChildPop = this.showChildPop.bind(this)
    this.hideChildPop = this.hideChildPop.bind(this)
    this.setCenter = this.setCenter.bind(this)
    this.state = {
      childPopLeft: 0,
      childPopTop: 0,
      showChildPop: false,
      dataSource: this.processingData(this.props.dataSource),
      originalDataSource: this.processingData(this.props.dataSource)
    }
  }

  processingData(dataSource) {
    return dataSource.map((v, i) => {
      v.index = i
      return v
    })
  }

  showChildPop(e) {
    this.setState({
      childPopLeft: e.target.getBoundingClientRect().left + 45,
      childPopTop: e.target.getBoundingClientRect().top + 60,
      showChildPop: true
    })
  }

  hideChildPop() {
    this.setState({
      showChildPop: false
    })
  }

  setCenter(index) {
    let newDataSource = []
    newDataSource.push(this.state.originalDataSource[index])
    newDataSource = newDataSource.concat(this.state.originalDataSource.slice(0, index))
    newDataSource = newDataSource.concat(this.state.originalDataSource.slice(index + 1, this.state.originalDataSource.length))
    this.setState({dataSource: newDataSource})
  }

  render() {
    const {className} = this.props
    return (
      <div className={className}>
        <Button title={this.state.dataSource[0].title} text={this.state.dataSource[0].text}
                onClick={this.showChildPop} titleFontColor={this.props.titleFontColor}
                buttonFontColor={this.props.buttonFontColor} buttonBackground={this.props.buttonBackground}
                titleFontSize={this.props.titleFontSize} buttonFontSize={this.props.buttonFontSize}/>
        {this.state.dataSource.length > 1 && this.state.showChildPop && <RenderInBody>
          <ChildPop left={this.state.childPopLeft} top={this.state.childPopTop} hideChildPop={this.hideChildPop}
                    setCenter={this.setCenter} radius={this.props.radius} buttonSize={this.props.buttonSize}
                    data={this.state.dataSource.slice(1, this.state.dataSource.length)}
                    titleFontColor={this.props.titleFontColor}
                    buttonFontColor={this.props.buttonFontColor} buttonBackground={this.props.buttonBackground}
                    titleFontSize={this.props.titleFontSize} buttonFontSize={this.props.buttonFontSize}
                    onClick={this.props.onClick}></ChildPop>
        </RenderInBody>}
      </div>
    );
  }
}

RotateMenu.propTypes = {
  dataSource: PropTypes.array.isRequired,
  radius: PropTypes.number,
  buttonSize: PropTypes.number,
  titleFontColor: PropTypes.string,
  titleFontSize: PropTypes.string,
  buttonFontColor: PropTypes.string,
  buttonFontSize: PropTypes.string,
  buttonBackground: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
}

RotateMenu.defaultProps = {
  radius: 150,
  buttonSize: 65,
  titleFontColor: '#fff',
  titleFontSize: '16px',
  buttonFontColor: '#0e83cd',
  buttonFontSize: '28px',
  buttonBackground: '#fff',
}

export default RotateMenu;
