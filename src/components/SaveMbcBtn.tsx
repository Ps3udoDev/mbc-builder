import React, { useTransition } from 'react'
import { Button } from './ui/button'
import { HiSaveAs } from 'react-icons/hi'
import useDesigner from './hooks/useDesigner'
import { UpdateMbcContent } from '@/actions/form'
import { toast } from './ui/use-toast'
import { FaSpinner } from 'react-icons/fa'

export default function SaveMbcBtn({id}: {id: number}) {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();


  const updateContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements)
      await UpdateMbcContent(id, jsonElements)
      toast({
        title: 'success',
        description: 'Your form has been saved'
      })
    } catch (error) {
      toast({
        title: 'error',
        description: 'Something went wrong',
        variant: 'destructive'
      })
    }
  }
  return (
    <Button
      variant={"outline"}
      className="gap-2"
      disabled={loading}
      onClick={() => {
        startTransition(updateContent);
      }}
    >
      <HiSaveAs className="h-4 w-4" />
      Save
      {loading && <FaSpinner className="animate-spin" />}
    </Button>
  );
}
