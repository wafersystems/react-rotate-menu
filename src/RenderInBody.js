/**
 * Created : vincent
 * Date : 15/01/2018  6:33 PM
 * Email : wangxiao@wafersystems.com
 */
import {Component} from 'react';
import ReactDom from 'react-dom';

export default class RenderInBody extends Component {
  constructor(p) {
    super();
    this.getChildRef = this.getChildRef.bind(this)
  }

  _refs = {}

  componentDidMount() {//新建一个div标签并塞进body
    this.popup = document.createElement("div");
    document.body.appendChild(this.popup);
    this._renderLayer();
  }

  componentDidUpdate() {
    this._renderLayer();
  }

  componentWillUnmount() {//在组件卸载的时候，保证弹层也被卸载掉
    ReactDom.unmountComponentAtNode(this.popup);
    document.body.removeChild(this.popup);
  }

  _renderLayer() {//将弹层渲染到body下的div标签
    this._refs[this.props.children.props.refName] = this.props.children
    ReactDom.render(this.props.children, this.popup);
  }

  getChildRef(name) {
    return this._refs[name]
  }

  render() {
    return null;
  }
}
