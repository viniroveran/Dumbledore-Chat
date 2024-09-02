import prismaClient from ".//prisma";
import {redisCache} from "./redis";

export const user_name_key = (id: number) => {
  return `user_name_${id}`
};
export const user_email_key = (id: number) => {
  return `user_email_${id}`
};
export const user_avatar_key = (id: number) => {
  return `user_avatar_${id}`
};

function createUserCache(id: number, name: string, email: string, avatar: string) {
  try {
    redisCache.set(user_name_key(id), name);
    redisCache.set(user_email_key(id), email);
    redisCache.set(user_avatar_key(id), avatar);
  } catch (err) {
    console.log("Error fetching redis keys");
  }
}

async function getUserCache(id: number) {
  if (await redisCache.exists(user_name_key(id)) &&
    await redisCache.exists(user_email_key(id)) &&
    await redisCache.exists(user_avatar_key(id))
  )
    return ({
      name: redisCache.get(user_name_key(id)),
      email: redisCache.get(user_email_key(id)),
      avatar: redisCache.get(user_avatar_key(id))
    })
  else
    return false
}

export async function createUser(name: string, email: string, avatar: string) {
  try {
    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        avatar: avatar
      },
    });
    if (user.id && user.name && user.email && user.avatar)
      createUserCache(user.id, user.name, user.email, user.avatar)
  } catch (err) {
    console.log("Error creating user");
  }
}

export async function getUserById(id: number) {
  const userCache = await getUserCache(id);
  if (userCache)
    return userCache
  else {
    const user = await prismaClient.user.findUnique({
      where: {
        id: id
      },
      select: {
        name: true,
        email: true,
        avatar: true
      }
    })
    return user
  }
}
