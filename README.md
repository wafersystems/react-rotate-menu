# react-rotate-menu
React Rotate Menu

[![npm](https://img.shields.io/npm/v/react-rotate-menu.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/react-rotate-menu)
[![NPM downloads](http://img.shields.io/npm/dm/react-rotate-menu.svg?style=flat-plastic)](https://npmjs.org/package/react-rotate-menu)

## How to use

### Data

````
let data = []
for (let i = 0; i < 12; i++) {
  data.push({
    text: `Floor${i}`,
    title: `F${i}`,
    onClick: (e) => {
      console.log("click")
    }
  })
}
````

### React 

````
import RotateMenu from 'RotateMenu'


<RotateMenu dataSource={data}/>

````