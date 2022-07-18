import { Fragment, useState } from "react";
import './App.css';

const App = () => {
  const Item = ({ data, click }) => {
    const [isClicked, setIsClicked] = useState(false)

    return (
      <li key={data.name} className={`List__item List__item--${data.color} ${isClicked ? "active" : ""}`} 
        onClick={() => { 
          setIsClicked(!isClicked);
          click(data.name, isClicked);
        }}
      >
        {data.name}
      </li>
    )
  }

  const List = ({ items }) => {
    const [selectedContents, setSelectedContents] = useState([])

    const clickHandler = (name, flag) => {
      let tmp = [ ...selectedContents]

      if(!flag) {
        tmp.push(name)
      } else {
        tmp = tmp.filter((item) => {
          return item !== name
        })
      }

      setSelectedContents(tmp)
    }

    return (
      <Fragment>
        <div className="selected-content">
          { selectedContents.map((item) => {
            return (
              <span> { item }, </span>
            )
          })}
        </div>
        <ul className="List">
          {items.map((item, idx) => (
            <Item data={item} key={idx} click={(name, flag) => clickHandler(name, flag)}/>
          ))}
        </ul>
      </Fragment>
    )
  }

  const sizes = ['tiny', 'small', 'medium', 'large', 'huge'];
  const colors = ['navy', 'blue', 'aqua', 'teal', 'olive', 'green', 'lime', 'yellow', 'orange', 'red', 'maroon', 'fuchsia', 'purple', 'silver', 'gray', 'black'];
  const fruits = ['apple', 'banana', 'watermelon', 'orange', 'peach', 'tangerine', 'pear', 'kiwi', 'mango', 'pineapple'];

  const items = sizes.reduce(
    (items, size) => [
      ...items,
      ...fruits.reduce(
        (acc, fruit) => [
          ...acc,
          ...colors.reduce(
            (acc, color) => [
              ...acc,
              {
                name: `${size} ${color} ${fruit}`,
                color,
              },
            ],
            [],
          ),
        ],
        [],
      ),
    ],
    [],
  );

  return (
    <List items={items} />
  );
}

export default App;
