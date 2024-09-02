'use server'

import {ISocketReceivedMessage} from '@lib/definitions'

export const getMessages = async (offset: number, limit: number) => {
  try {
    const url = `${process.env.BACKEND_URL}/api/messages/${offset}/${limit}`
    const response = await fetch(url)
    const data = await response.json()

    return data.messages
  } catch (error: unknown) {
    console.log(error)
    throw new Error(`An error happened: ${error}`)
  }
}