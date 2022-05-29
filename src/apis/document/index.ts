import type { CreatedDocument } from '@prisma/client'

import { httpPostClient, isAxiosError } from '@/utils/http-client'

type SaveDocumentParams = {
  name: CreatedDocument['filename']
  title?: CreatedDocument['title']
  content?: CreatedDocument['content']
  directoryId: CreatedDocument['directoryId']
  authorId: CreatedDocument['authorId']
}

export const saveDocument = async (params: SaveDocumentParams) => {
  const res = await httpPostClient<
    CreatedDocument,
    Omit<SaveDocumentParams, 'name'> & { filename: CreatedDocument['filename'] }
  >({
    url: 'document',
    params: {
      filename: params.name,
      title: params.title ?? '',
      content: params.content ?? '',
      directoryId: params.directoryId,
      authorId: params.authorId,
    },
  })

  if (isAxiosError(res)) {
    console.error(res)
    return res
  }

  return res
}
