'use server'

import { currentUser } from "@clerk/nextjs"
import prisma from '@/lib/prisma'
import { mbcSchema, mbcSchemaType } from "@/schemas/mbc"

class UserNotFoudErr extends Error { }

export async function GetMbcStats() {
  const user = await currentUser()

  if (!user) {
    throw new UserNotFoudErr()
  }

  const stats = await prisma.modelBussines.aggregate({
    where: {
      userId: user.id
    },
    _sum: {
      visits: true,
      submissions: true
    }
  })

  const visits = stats._sum.visits || 0
  const submissions = stats._sum.submissions || 0

  let submissionRate = 0

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100
  }

  const bounceRate = 100 - submissionRate

  return {
    visits,
    submissions,
    submissionRate,
    bounceRate
  }
}

export async function CreateMbc(data: mbcSchemaType) {
  const validation = mbcSchema.safeParse(data)

  if (!validation.success) {
    throw new Error('mbc not valid')
  }

  const user = await currentUser()

  if (!user) {
    throw new UserNotFoudErr()
  }

  const { name, description } = data

  const mbc = await prisma.modelBussines.create({
    data: {
      userId: user.id,
      name,
      description
    }
  })

  if (!mbc) {
    throw new Error('something went wrong')
  }

  return mbc.id
}

export async function GetMbcs() {
  const user = await currentUser()

  if (!user) {
    throw new UserNotFoudErr()
  }

  return await prisma.modelBussines.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function GetMbcById(id: number) {
  const user = await currentUser()

  if (!user) {
    throw new UserNotFoudErr()
  }

  return await prisma.modelBussines.findUnique({
    where: {
      userId: user.id,
      id
    },
  })
}

export async function UpdateMbcContent(id: number, jsonContent: string){
  const user = await currentUser()

  if (!user) {
    throw new UserNotFoudErr()
  }

  return await prisma.modelBussines.update({
    where: {
      userId: user.id,
      id
    },
    data:{
      content: jsonContent
    }
  })
}

export async function PublishMbc(id: number) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoudErr();
  }

  return await prisma.modelBussines.update({
    data: {
      published: true,
    },
    where: {
      userId: user.id,
      id,
    },
  });
}

export async function GetFormContentByUrl(formUrl: string) {
  return await prisma.modelBussines.update({
    select: {
      content: true,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
    where: {
      shareURL: formUrl,
    },
  });
}

export async function SubmitForm(formUrl: string, content: string) {
  return await prisma.modelBussines.update({
    data: {
      submissions: {
        increment: 1,
      },
      FormSubmissions: {
        create: {
          content,
        },
      },
    },
    where: {
      shareURL: formUrl,
      published: true,
    },
  });
}

export async function GetFormWithSubmissions(id: number) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
    include: {
      FormSubmissions: true,
    },
  });
}