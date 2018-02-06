import React from 'react';
import ReactDOM from 'react-dom';
import App from './RotateMenu.jsx';
import './index.css'
import registerServiceWorker from './registerServiceWorker';

let data = []
for (let i = 0; i < 12; i++) {
  data.push({
    text: `楼层${i}`,
    title: `F${i}`,
    onClick: (e) => {
      console.log("click")
    }
  })
}

ReactDOM.render(<App dataSource={data}/>, document.getElementById('root'));
registerServiceWorker();
