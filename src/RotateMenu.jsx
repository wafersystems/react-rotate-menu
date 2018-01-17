import React from 'react';
import PropTypes from 'prop-types'
import './index.css'
import Button from './Button'
import ChildPop from './ChildPop'
import RenderInBody from './RenderInBody'

class RotateMenu extends React.PureComponent {

  _dot

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
      childPopLeft: e.target.getBoundingClientRect().left,
      childPopTop: e.target.getBoundingClientRect().top,
      showChildPop: true
    })
  }

  hideChildPop() {
    this.setState({
      showChildPop: false
    })
  }

  setCenter(index) {
    let newDataSource = new Array()
    newDataSource.push(this.state.originalDataSource[index])
    newDataSource = newDataSource.concat(this.state.originalDataSource.slice(0, index))
    newDataSource = newDataSource.concat(this.state.originalDataSource.slice(index + 1, this.state.originalDataSource.length))
    this.setState({dataSource: newDataSource})
  }

  render() {
    return (
      <div>
        <Button title={this.state.dataSource[0].title} text={this.state.dataSource[0].text} onClick={this.showChildPop}
                ref={a => this._dot = a}/>
        {this.state.dataSource.length > 1 && this.state.showChildPop && <RenderInBody>
          <ChildPop left={this.state.childPopLeft} top={this.state.childPopTop} hideChildPop={this.hideChildPop}
                    setCenter={this.setCenter}
                    data={this.state.dataSource.slice(1, this.state.dataSource.length)}></ChildPop>
        </RenderInBody>}
      </div>
    );
  }
}

RotateMenu.propTypes = {
  dataSource: PropTypes.array.isRequired,
}

export default RotateMenu;
