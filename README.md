# react-rotate-menu
React Rotate Menu

[![npm](https://img.shields.io/npm/v/react-rotate-menu.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/react-rotate-menu)
[![NPM downloads](http://img.shields.io/npm/dm/react-rotate-menu.svg?style=flat-plastic)](https://npmjs.org/package/react-rotate-menu)

## Example

![Example](https://static.oschina.net/uploads/img/201801/17161344_zLxB.gif)

## How to use

### React 

````
import RotateMenu from 'RotateMenu'


<RotateMenu dataSource={data}/>

````

Properties  | Description | Type | Default Values
------------- | ------------- | --------------| ------------- 
dataSource  | Need to display the data（[Data](###Data)） | array | []
radius  | The radius of the circle（Had better be in between 150 and 200） | number | 150
titleFontColor | title font color | string | #fff
titleFontSize | title font size | string | 16px
titleFontColor | title font color | string | #fff
buttonFontColor | button font color | string | #fff
buttonFontSize | title font seze | string | 28px
buttonBackground | button background color | string | #fff
className | The custom style | sring |


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

