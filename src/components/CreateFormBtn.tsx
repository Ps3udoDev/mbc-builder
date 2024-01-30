'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'
import { BsFileEarmarkPlus } from 'react-icons/bs'
import { ImSpinner2 } from 'react-icons/im'
import { Button } from './ui/button'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { toast } from './ui/use-toast'
import { mbcSchema, mbcSchemaType } from '@/schemas/mbc'
import { CreateMbc } from '@/actions/form'


export default function CreateFormBtn() {
  const mbc = useForm<mbcSchemaType>({
    resolver: zodResolver(mbcSchema)
  })

  async function onSubmit(values: mbcSchemaType) {
    try {
      const mbcId = await CreateMbc(values)
      toast({
        title: 'Success',
        description: 'MBC created succesfully'
      })
      console.log(mbcId)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Somethin went wrong, please try again later',
        variant: 'destructive'
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4"
        >
          <BsFileEarmarkPlus className='h-8 w-8 text-muted-foreground group-hover:text-primary' />
          <p className='font-bold text-xl text-muted-foreground group-hover:text-primary'>Create new mbc</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create mbc
          </DialogTitle>
          <DialogDescription>
            Create a new mbc
          </DialogDescription>
        </DialogHeader>
        <Form {...mbc}>
          <form onSubmit={mbc.handleSubmit(onSubmit)} className='space-y-2'>
            <FormField
              control={mbc.control}
              name='name'
              render={({ field }) => <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>}
            />
            <FormField
              control={mbc.control}
              name='description'
              render={({ field }) => <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea rows={5} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            disabled={mbc.formState.isSubmitting}
            className='w-full mt-4'
            onClick={mbc.handleSubmit(onSubmit)}
          >
            {
              !mbc.formState.isSubmitting && <span>Save</span>
            }
            {
              mbc.formState.isSubmitting && (<ImSpinner2 className='animate-spin' />)
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
