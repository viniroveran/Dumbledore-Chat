import prismaClient from "./prisma";

export async function getMessagesWithOffset(offset: number, limit: number) {
  const messages = await prismaClient.message.findMany({
    skip: offset,
    take: limit,
    orderBy: {
      createdAt: 'asc',
    },
    include: {
      User: true,
    },
  })

  return messages ? messages : false;
}

export async function createMessage(id: string, text: string, user_id: number) {
  const message = await prismaClient.message.create({
    data: {
      id: id,
      text: text,
      userId: user_id
    },
  });

  return message ? message : false;
}
