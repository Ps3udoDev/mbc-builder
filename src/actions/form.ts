'use server'

import { currentUser } from "@clerk/nextjs"
import prisma from '@/lib/prisma'
import { mbcSchema, mbcSchemaType } from "@/schemas/mbc"
import { v4 as uuidv4 } from 'uuid';

class UserNotFoudErr extends Error { }

export async function GetMbcStats() {
  const generatedUserId = uuidv4();

  const stats = await prisma.modelBussines.aggregate({
    where: {
      userId: generatedUserId
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
  const userId = 'anonymous'
  if (!validation.success) {
    throw new Error('mbc not valid')
  }

  const generatedUserId = uuidv4();

  const { name, description } = data

  const mbc = await prisma.modelBussines.create({
    data: {
      userId,
      name,
      description,
    }
  })

  if (!mbc) {
    throw new Error('something went wrong')
  }

  return mbc.id
}

export async function GetMbcs() {
  const generatedUserId = uuidv4();
  const userIdToExclude = 'anonymous';


  return await prisma.modelBussines.findMany({
    where: {
      NOT: {
        userId: userIdToExclude,
      },
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function GetMbcById(id: number) {
  const generatedUserId = uuidv4();
  const userIdToExclude = 'anonymous';


  return await prisma.modelBussines.findUnique({
    where: {
      NOT: {
        userId: userIdToExclude,
      },
      id
    },
  })
}

export async function UpdateMbcContent(id: number, jsonContent: string) {
  const generatedUserId = uuidv4();
  const userIdToExclude = 'anonymous';
  return await prisma.modelBussines.update({
    where: {
      NOT: {
        userId: userIdToExclude,
      },
      id
    },
    data: {
      content: jsonContent
    }
  })
}

export async function PublishMbc(id: number) {
  const generatedUserId = uuidv4();
  const userIdToExclude = 'anonymous';
  return await prisma.modelBussines.update({
    data: {
      published: true,
    },
    where: {
      NOT: {
        userId: userIdToExclude,
      },
      id,
    },
  });
}

/* export async function GetFormContentByUrl(mbcUrl: string) {
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
      shareURL: mbcUrl,
    },
  });
}

export async function SubmitForm(mbcUrl: string, content: string) {
  return await prisma.modelBussines.update({
    data: {
      submissions: {
        increment: 1,
      },
      ModelBussinesSubissions: {
        create: {
          content,
        },
      },
    },
    where: {
      shareURL: mbcUrl,
      published: true,
    },
  });
} */

export async function GetFormWithSubmissions(id: number) {
  const generatedUserId = uuidv4();
  const userIdToExclude = 'anonymous';
  return await prisma.modelBussines.findUnique({
    where: {
      NOT: {
        userId: userIdToExclude,
      },
      id,
    },
    include: {
      ModelBussinesSubissions: true,
    },
  });
}