import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';

import {Droppable} from './components/Droppable';
import {Draggable} from './components/Draggable';

export default function App() {
  const tools = [
    { id: 'candidate-name', content: 'Candidate Name' },
    { id: 'candidate-photo', content: 'Candidate Photo'},
    { id: 'votegrity-logo', content: 'Votegrity Logo'},
    { id: 'candidate-body', content: 'Candidate Body'},
  ]
  const [canvasItems, setCanvasItems] = useState([]);

  const draggableMarkup = (
    <Draggable id="draggable">Drag me</Draggable>
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
    <div className="flex">
      <div className="h-screen w-2/5 border-black border-2 p-4">
        <select className="mx-auto h-min border-black border-2 w-full h-[2rem]" id="Templates" title="Templates">
          <option selected disabled hidden>Templates</option>
          <option value="Ballot Template">Ballot Template</option>
          <option value="Notice Template">Notice Template</option>
          <option value="Candidate Statement Template">Candidate Statement Template</option>
        </select>
        <div className="flex flex-wrap">
        {tools.map((tool) => (
          <div className="w-1/2">
            <Draggable key={tool.id} id={tool.id}>
              <div className="p-1 border-black border-2 h-[4rem] flex items-center justify-center">
                {tool.content}
              </div>
            </Draggable>
          </div>
        ))}
        </div>
      </div>
      <div className="h-screen w-3/5 border-black border-2">
          
      </div>
    </div>
    </DndContext>
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    //if dropped onto canvas
    if (over && over.id === 'canvas') {
      const draggedToolId = active.id;

      //find the tool that was dragged
      const draggedTool = tools.find(tool => tool.id === draggedToolId);

      if (draggedTool) {
        //add new item to canvas
        const newItem = {
          id: `${draggedTool.id}-${Date.now()}`,
          content: draggedTool.content,
        };
        setCanvasItems((items) => [...items, newItem]);
      }
    }
  }
};