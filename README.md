# react-rotate-menu
React Rotate Menu

[![npm](https://img.shields.io/npm/v/react-rotate-menu.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/react-rotate-menu)
[![NPM downloads](http://img.shields.io/npm/dm/react-rotate-menu.svg?style=flat-plastic)](https://npmjs.org/package/react-rotate-menu)

## Example

![Example](https://github.com/vkingw/react-rotate-menu/blob/master/example.gif)

## How to use

### install

`npm install react-rotate-menu --save`

### React 

```js
import RotateMenu from 'react-rotate-menu'

<RotateMenu dataSource={data}/>

```

Properties  | Description | Type | Default Values
------------- | ------------- | --------------| ------------- 
dataSource  | Need to display the data（[Data](###Data)） | array | []
radius  | The radius of the circle（Had better be in between 150 and 200） | number | 150
titleFontColor | title font color | string | #fff
titleFontSize | title font size | string | 16px
buttonFontColor | button font color | string | #fff
buttonFontSize | title font seze | string | 28px
buttonBackground | button background color | string | #fff
className | The custom style | sring |
onClick | on click CallBack,e is event,data is button data | function(e,data){}|
moreText  | more button text | string | More
centerButtonClassName | center button class name,when set this prop default value will cover. | String |
ringButtonClassName |ring button class name,when set this prop default value will cover. | String |
showRingButtonTitle |show ring button title. | bool | true



### Data

````
let data = []
for (let i = 0; i < 12; i++) {
  data.push({
    text: `Floor${i}`,
    title: `F${i}`,
    ...(add you need)
  })
}
````

### Development

````
$ git clone https://github.com/wafersystems/react-rotate-menu.git
$ npm i
$ npm run-script start

````
