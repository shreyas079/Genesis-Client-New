import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Item from "./Item";

const TestLanguages = () => {
  /* 
    React state hooks. Very important. 
  
    https://www.w3schools.com/react/react_usestate.asp
  */
  const [categories, setCategories] = useState([
    { id: 1, name: "Catergory 1" },
    { id: 2, name: "Category 2" },
  ]);
  const [items, setItems] = useState([
    { id: 1, name: "item1", category: 1 },
    { id: 2, name: "item2", category: 1 },
    { id: 3, name: "item3", category: 1 },
    { id: 4, name: "item4", category: 2 },
    { id: 5, name: "item5", category: 2 },
    { id: 6, name: "item6", category: 2 },
  ]);

  const rearangeArr = (arr, sourceIndex, destIndex) => {
    const arrCopy = [...arr];
    const [removed] = arrCopy.splice(sourceIndex, 1);
    arrCopy.splice(destIndex, 0, removed);

    return arrCopy;
  };

  const onDragEnd = (result) => {
    console.log(result);
    // object destructuring - https://www.w3schools.com/react/react_es6_destructuring.asp
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === "Categories") {
      // a category was moved
      setCategories(rearangeArr(categories, source.index, destination.index));
    } else if (destination.droppableId !== source.droppableId) {
      // find the source in items array and change with destination droppable id
      setItems((items) =>
        items.map((item) =>
          item.id === parseInt(result.draggableId)
            ? {
                ...item,
                category: parseInt(result.destination.droppableId),
              }
            : item
        )
      );
    } else {
      // rearange the array if it is in the same category

      setItems(rearangeArr(items, source.index, destination.index));
    }
  };

  return (
    <div className="container py-5">
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          {/* type="droppable" is very important here. Look at the docs. */}
          <Droppable droppableId="Categories" type="droppableItem">
            {(provided) => (
              <div ref={provided.innerRef}>
                {categories.map((category, index) => (
                  <Draggable
                    draggableId={`category-${category.id}`}
                    key={`category-${category.id}`}
                    index={index}
                  >
                    {(parentProvider) => (
                      <div
                        ref={parentProvider.innerRef}
                        {...parentProvider.draggableProps}
                      >
                        <Droppable droppableId={category.id.toString()}>
                          {(provided) => (
                            <div ref={provided.innerRef}>
                              <ul className="list-unstyled border p-3 mb-3">
                                {/* Category title is the drag handle for a category */}
                                <h6
                                  className="h6 mb-3"
                                  {...parentProvider.dragHandleProps}
                                >
                                  {category.name}
                                </h6>
                                {items
                                  .filter(
                                    (item) => item.category === category.id
                                  )
                                  .map((item, index) => (
                                    <Draggable
                                      draggableId={item.id.toString()}
                                      key={item.id}
                                      index={index}
                                    >
                                      {(provided) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                          <li className="mb-3 d-flex align-items-center justify-content-between border p-3">
                                            <Item item={item} />
                                            <button className="btn btn-dark">
                                              ...
                                            </button>
                                          </li>
                                        </div>
                                      )}
                                    </Draggable>
                                  ))}
                                {provided.placeholder}
                              </ul>
                            </div>
                          )}
                        </Droppable>
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default TestLanguages;
