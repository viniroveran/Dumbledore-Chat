import prismaClient from "./prisma";

export async function getMessagesWithOffset(offset: number, limit: number) {
  const messages = await prismaClient.message.findMany({
    skip: offset,
    take: limit,
    orderBy: {
      createdAt: 'asc',
    },
  })

  return messages ? messages : false;
}
