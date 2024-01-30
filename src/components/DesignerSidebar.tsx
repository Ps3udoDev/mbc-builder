import React from 'react'
import { MbcElements } from './MbcElements'
import SidebarBtnElement from './SidebarBtnElement'

export default function DesignerSidebar() {
  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
      <SidebarBtnElement mbcElement={MbcElements.TextField} />
    </aside>
  )
}
