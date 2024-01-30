import React, { ReactNode, useState } from 'react'
import { useDroppable, useDndMonitor, DragEndEvent, useDraggable } from '@dnd-kit/core';
import { MbcElements, ElementsType, MbcElementInstance } from './MbcElements';
import { idGenerator } from '@/lib/idGenerator';
import useDesigner from './hooks/useDesigner';
import { Button } from './ui/button';
import { BiSolidTrash } from 'react-icons/bi';
import { cn } from '@/lib/utils';
import { DesignerElementWrapper } from './Designer';

export default function CanvasSection({ title, typeSection, sectionElements, setSectionElements, className }: {
  title: string;
  typeSection: string; // O el tipo específico que debería tener
  sectionElements: MbcElementInstance[]; // O el tipo específico que debería tener
  setSectionElements: React.Dispatch<React.SetStateAction<MbcElementInstance[]>>; // O el tipo específico que debería tener
  className?: string;
}) {
  const { elements, addElement } = useDesigner()

  const droppable = useDroppable({
    id: `droppable-${title.toLowerCase().replace(/\s+/g, '-')}`,
    data: {
      isDesignerDropArea: true
    }
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
  
      if (over && over.id === `droppable-${title.toLowerCase().replace(/\s+/g, '-')}`) {
        const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
  
        if (isDesignerBtnElement) {
          const type = active.data?.current?.type as ElementsType;
          const newElement = MbcElements[type].construct(idGenerator(typeSection)) as MbcElementInstance;
          setSectionElements([...sectionElements, newElement]);
          addElement(elements.length, newElement);
  
          console.log('this is the elementes in canvas section', elements);
        }
      }
    },
  });


  return (
    <div
      ref={droppable.setNodeRef}
      className={`p-4 rounded-md bg-gray-700 ${className}  h-full rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto ${droppable.isOver ? 'ring-2 ring-primary' : ''}`}
    >
      <p className="text-white text-center mb-2 font-bold">{title}</p>
      {
        droppable.isOver && sectionElements.length === 0  && (
          <div className='p-4 w-full'>
            <div className="h-[60px] rounded-md bg-primary/20"></div>
          </div>
        )
      }
      {
        sectionElements.length > 0 && (
          <div className="flex flex-col text-background w-full gap-2 p-4">
            {
              sectionElements.map(element => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))
            }
          </div>
        )
      }

    </div>
  );
}

