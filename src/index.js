import React from 'react';
import ReactDOM from 'react-dom';
import App from './RotateMenu.jsx';
import './index.css'
import registerServiceWorker from './registerServiceWorker';

let data = []
for (let i = 0; i < 12; i++) {
  data.push({
    text: `楼层${i}`,
    title: `F${i}`
  })
}

ReactDOM.render(<div className="App" style={{'padding': '50px', 'margin': '50px'}}>
  <header className="App-header">
    <h1 className="App-title">Welcome to React</h1>
  </header>
  <p className="App-intro">
    To get started, edit <code>src/App.js</code> and save to reload.
  </p>
  <div style={{'padding': '50px', 'margin': '50px'}}>
    <div style={{'padding': '50px', 'margin': '50px'}}>
      <App dataSource={data} onClick={(e, d) => console.log(d)}/>
    </div>
  </div>
</div>, document.getElementById('root'));

registerServiceWorker();
