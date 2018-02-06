# react-rotate-menu
React Rotate Menu

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
onClick | on click CallBack,e is event,data is button data | function(e,data){}|


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

$ git clone https://github.com/wafersystems/react-rotate-menu.git
$ npm i
$ npm run-script start
