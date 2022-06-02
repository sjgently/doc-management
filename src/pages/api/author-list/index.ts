import type { NextApiRequest, NextApiResponse } from 'next'
import type { Author } from '@prisma/client'

import prisma from '@/libs/prisma'
import { AllowedMethod, handleException } from '@/utils/api-helper'

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  let result: Author[] | undefined

  switch (req.method) {
    case AllowedMethod.Get:
      result = await prisma.author.findMany()
      return res.json(result)
    case AllowedMethod.Post:
      break
    default:
      handleException(req, res)
      break
  }
}

export default handle
