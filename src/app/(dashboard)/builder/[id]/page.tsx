import { GetMbcById } from '@/actions/form';
import MbcBuilder from '@/components/MbcBuilder';
import React from 'react'

export default async function BuilderPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const mbc = await GetMbcById(Number(id));
  if (!mbc) {
    throw new Error("mbc not found");
  }
  return <MbcBuilder mbc={mbc} />;
}
