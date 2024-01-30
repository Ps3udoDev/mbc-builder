'use client'

import React, { useState } from 'react'
import DesignerSidebar from './DesignerSidebar'
import { DragEndEvent, useDndMonitor, useDraggable, useDroppable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'
import { ElementsType, MbcElementInstance, MbcElements } from './MbcElements'
import { idGenerator } from '@/lib/idGenerator'
import useDesigner from './hooks/useDesigner'
import BusinessModelCanvas from './BusinessModelCanvas'
import { Button } from './ui/button'
import { BiSolidTrash } from 'react-icons/bi'

export default function Designer() {
  const { elements, addElement, selectedElement, setSelectedElement, removeElement } = useDesigner();
  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: {
      isDesignerDropArea: true
    }
  })

  /*  useDndMonitor({
     onDragEnd: (e: DragEndEvent) => {
       const { active, over } = e
 
       if (!active || !over) return
 
       const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement
 
       if (isDesignerBtnElement) {
         const type = active.data?.current?.type
         const newElement = MbcElements[type as ElementsType].construct(
           idGenerator()
         )
 
         addElement(elements.length, newElement)
         console.log('this is the elements', elements)
       }
       console.log('Drag end', e)
     }
   }) */

  return (
    <div className='flex w-full h-full'>
      <div className='p-4 w-full'>
        <div
          /* ref={droppable.setNodeRef} */
          className='bg-[var(--background-designer)]  h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto'
        >
          {/* {!droppable.isOver && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
              MBC
            </p>
          )}
          {
            droppable.isOver && (
              <div className='p-4 w-full'>
                <div className="h-[120px] rounded-md bg-primary/20"></div>
              </div>
            )
          }
          {
            elements.length > 0 && (
              <div className="flex flex-col text-background w-full gap-2 p-4">
                {
                  elements.map(element => (
                    <DesignerElementWrapper key={element.id} element={element} />
                  ))
                }
              </div>
            )
          } */}
          <BusinessModelCanvas />
        </div>
      </div>
      <DesignerSidebar />
    </div>
  )
}

export function DesignerElementWrapper({ element }: { element: MbcElementInstance }) {
  const { removeElement } = useDesigner()
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false)

  const topHalf = useDroppable({
    id: element.id + '-top',
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true
    }
  })
  const bottonHalf = useDroppable({
    id: element.id + '-botton',
    data: {
      type: element.type,
      elementId: element.id,
      isBottonHalfDesignerElement: true
    }
  })

  const draggable = useDraggable({
    id: element.id + '_drag_handler',
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true
    }
  })

  if (draggable.isDragging) return null;

  const DesignerElement = MbcElements[element.type].designerComponent
  return (
    <div
      ref={draggable.setNodeRef}
      /* {...draggable.listeners}
      {...draggable.attributes} */
      className='relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset'
      onMouseEnter={() => {
        setMouseIsOver(true)
      }}
      onMouseLeave={() => {
        setMouseIsOver(false)
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className='absolute w-full h-1/2 rounded-t-md'
      />
      <div
        ref={bottonHalf.setNodeRef}
        className='absolute w-full bottom-0 h-1/2 rounded-b-md'
      />
      {
        mouseIsOver && (
          <>
            <div className='absolute right-0 h-full'>
              <Button
                className='flex justify-center h-full border rounded-md rounded-l-none bg-red-400'
                variant={'outline'}
                onClick={(e) => {
                  e.stopPropagation()
                  console.log(element)
                  removeElement(element.id)
                }}
              >
                <BiSolidTrash className='h-6 w-6' />
              </Button>
            </div>
            {/* <div className='absolute top-1/2 left-1/2 translate-x-1/2 -translate-y-1/2 animate-pulse'>
              <p className='text-muted-foreground text-sm'>Click for properties or drag to move</p>
            </div> */}
          </>
        )
      }
      {
        topHalf.isOver && <div className='absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none' />
      }
      <div
        className={cn("flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
          mouseIsOver && 'opacity-30'
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
      {
        bottonHalf.isOver && (
          <div className='absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none' />
        )
      }
    </div>
  )
}
