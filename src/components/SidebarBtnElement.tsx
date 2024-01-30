import React from 'react'
import { MbcElement } from './MbcElements'
import { Button } from './ui/button'
import { useDraggable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'

export default function SidebarBtnElement({
  mbcElement
}: {
  mbcElement: MbcElement
}) {
  const { icon: Icon, label } = mbcElement.designerBtnElement
  const draggable = useDraggable({
    id: `dessigner-btn-${mbcElement.type}`,
    data: {
      type: mbcElement.type,
      isDesignerBtnElement: true
    }
  })

  return (
    <Button
      ref={draggable.setNodeRef}
      variant={'outline'}
      className={
        cn(
          'flex flex-col gap-2 h-[120px] w=[120px] cursor-grab',
          draggable.isDragging && 'ring-2 ring-primary'
        )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className='h-8 w-8 text-primary cursor-grab' />
      <p className="text-xs">{label}</p>
    </Button>
  )
}
export function SidebarBtnElementDragOverlay({
  mbcElement
}: {
  mbcElement: MbcElement
}) {
  const { icon: Icon, label } = mbcElement.designerBtnElement
  const draggable = useDraggable({
    id: `dessigner-btn-${mbcElement.type}`,
    data: {
      type: mbcElement.type,
      isDesignerBtnElement: true
    }
  })

  return (
    <Button
      ref={draggable.setNodeRef}
      variant={'outline'}
      className='flex flex-col gap-2 h-[120px] w=[120px] cursor-grab'
    >
      <Icon className='h-8 w-8 text-primary cursor-grab' />
      <p className="text-xs">{label}</p>
    </Button>
  )
}

