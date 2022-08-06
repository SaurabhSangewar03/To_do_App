import React, { useEffect, useState } from 'react'
import './style.css';

const getLocalData = () => {
  const lists = localStorage.getItem("mytodoapp");

  if(lists) {
    return JSON.parse(lists);
  }
  else {
    return [];
  }
}

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  const addItems = () => {
    if(!inputData){
      alert("Please Fill Input Field😊");
    }
    else if(inputData && toggleButton) {
      setItems(
        items.map((currElem) => {
          if(currElem.id === isEditItem) {
            return {...currElem, name: inputData};
          }
          return currElem;
        })
      );

    setInputData("");
    setIsEditItem(null);
    setToggleButton(false)
    }
    else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      }
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  }

  // delete a perticular todo task.
  const deleteItem = (id) => {
    const updatedItems = items.filter((currElem) => {
      return currElem.id !== id
    });
    setItems(updatedItems);
  }

  const editItem = (id) => {
    const editingItem = items.find((currElem) => {
      return currElem.id === id;
    });
    setInputData(editingItem.name);
    setIsEditItem(id);
    setToggleButton(true)
  }

  // remove all to do list
  const removeAll = () => {
    setItems([]);
  }

  // adding local storage
  useEffect(() => {
    localStorage.setItem("mytodoapp", JSON.stringify(items));
  }, [items])

  return (
    <>
      <div className='main-div'>
        <div className='child-div'>
          <figure>
            <img src="./images/icons8-todo-list-53.png" alt="todologo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className='addItems'>
          <input
              type="text"
              placeholder="✍ Add Item Here Please !"
              className="form-control"
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />
            {
              toggleButton ? (<i className="fa-solid fa-pen-to-square add-btn" onClick={addItems}></i>) : (<i className="fa fa-solid fa-plus" onClick={addItems}></i>)
            }
            
          </div>

          <div className='showItems'>
            {items.map((currElem) => {
              return (
              <div className='eachItem' key={currElem.id}>
                <h3>{currElem.name}</h3>
                <div className='todo-btn'>
                  <i className="fa-solid fa-pen-to-square add-btn" onClick={() => editItem(currElem.id)}></i>
                  <i className="fa-solid fa-trash add-btn" onClick={() => deleteItem(currElem.id)}></i>
                </div>
              </div>
              );
              
            })}
            
          </div>

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
              >
              <span> CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todo