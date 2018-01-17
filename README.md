# react-rotate-menu
React Rotate Menu

## How to use

### Data
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

### React 
import RotateMenu from 'RotateMenu'

<RotateMenu dataSource={data}/>
