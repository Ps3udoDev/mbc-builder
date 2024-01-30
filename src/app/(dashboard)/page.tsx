import React, { ReactNode, Suspense } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { GetMbcStats, GetMbcs } from '@/actions/form'
import { LuView } from 'react-icons/lu'
import { FaEdit, FaWpforms } from 'react-icons/fa'
import { HiCursorClick } from 'react-icons/hi'
import { BiRightArrowAlt } from 'react-icons/bi'
import { TbArrowBounce } from 'react-icons/tb'
import { Separator } from '@/components/ui/separator'
import CreateFormBtn from '@/components/CreateFormBtn'
import { ModelBussines } from '@prisma/client'
import { Badge } from '@/components/ui/badge'
import { formatDistance } from "date-fns";
import Link from 'next/link'
import { Button } from '@/components/ui/button'


export default function Home() {
  return (
    <div
      className='container pt-4'
    >
      <Suspense
        fallback={<StatsCards loading={true} />}
      >
        <CardStatsWrapper />
      </Suspense>
      <Separator className='my-6' />
      <h2 className='text-3xl font-bold col-span-2'>
        Your MBCs
      </h2>
      <Separator className='my-6' />
      <div className='grid gric-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <CreateFormBtn />
        <Suspense fallback={[1, 2, 3, 4].map(e => <MbcCardSkeleton key={e} />)}>
          <MbcCards />
        </Suspense>
      </div>
    </div>
  )
}

async function CardStatsWrapper() {
  const stats = await GetMbcStats()
  return <StatsCards loading={false} data={stats} />
}

interface StatsCardsProps {
  data?: Awaited<ReturnType<typeof GetMbcStats>>
  loading: boolean
}

function StatsCards(props: StatsCardsProps) {
  const { data, loading } = props

  return (
    <div
      className='w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    >
      <StatsCard
        title='Total Visits'
        icon={<LuView className='text-blue-600' />}
        helperText='All time form visits'
        value={data?.visits.toLocaleString() || ""}
        loading={loading}
        className='shadow-md shadow-blue-600'
      />
      <StatsCard
        title='Total Submissions'
        icon={<FaWpforms className='text-yellow-600' />}
        helperText='All time form submissions'
        value={data?.submissions.toLocaleString() || ""}
        loading={loading}
        className='shadow-md shadow-yellow-600'
      />

      <StatsCard
        title='Submissions Rate'
        icon={<HiCursorClick className='text-green-600' />}
        helperText='Visits that result in form submission'
        value={data?.submissionRate.toLocaleString() + '%' || ""}
        loading={loading}
        className='shadow-md shadow-green-600'
      />
      <StatsCard
        title='Bounce rate'
        icon={<TbArrowBounce className='text-red-600' />}
        helperText='Visits that leaves without interactive'
        value={data?.submissions.toLocaleString() + '%' || ""}
        loading={loading}
        className='shadow-md shadow-red-600'
      />
    </div>
  )
}

function StatsCard(
  {
    title,
    value,
    icon,
    helperText,
    loading,
    className
  }: {
    title: string
    value: string
    helperText: string
    className: string
    loading: boolean
    icon: ReactNode
  }
) {
  return (
    <Card className={className}>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-sm font-medium text-muted-foreground'>
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>
          {
            !loading &&
            <Skeleton>
              <span className='opacity-0'>
                0
              </span>
            </Skeleton>
          }
        </div>
        <p
          className='text-xs text-muted-foreground pt-1'
        >
          {helperText}
        </p>
      </CardContent>
    </Card>
  )
}

function MbcCardSkeleton() {
  return (
    <Skeleton className='border-2 border-primary-/20 h-[190px] w-full' />
  )
}

async function MbcCards() {
  const mbcs = await GetMbcs()
  return <>
    {
      mbcs.map(mbc => (
        <MbcCard key={mbc.id} mbc={mbc} />
      ))
    }
  </>
}

function MbcCard({ mbc }: { mbc: ModelBussines }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className='truncate font-bold'>
            {mbc.name}
          </span>
          {mbc.published && <Badge>Published</Badge>}
          {!mbc.published && <Badge variant={'destructive'}>Draft</Badge>}
        </CardTitle>
        <CardDescription>
          {formatDistance(mbc.createdAt, new Date(), {
            addSuffix: true,
          })}
          {mbc.published && (
            <span className="flex items-center gap-2">
              <LuView className="text-muted-foreground" />
              <span>{mbc.visits.toLocaleString()}</span>
              <FaWpforms className="text-muted-foreground" />
              <span>{mbc.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {mbc.description || "No description"}
      </CardContent>
      <CardFooter>
        {mbc.published && (
          <Button asChild className="w-full mt-2 text-md gap-4">
            <Link href={`/forms/${mbc.id}`}>
              View submissions <BiRightArrowAlt />
            </Link>
          </Button>
        )}
        {!mbc.published && (
          <Button asChild variant={"secondary"} className="w-full mt-2 text-md gap-4">
            <Link href={`/builder/${mbc.id}`}>
              Edit form <FaEdit />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}