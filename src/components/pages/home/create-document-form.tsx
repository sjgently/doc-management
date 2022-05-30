import { useAtom } from 'jotai'

import { saveDocumentDirectory } from '@/apis/document/directory'
import { saveDocument } from '@/apis/document'
import {
  selectedAuthorIdAtom,
  directoryAtom,
  filenameAtom,
  isAuthorIdSelectedAtom,
  isDirectoryValidAtom,
  isFilenameValidAtom,
} from '@/store/pages/home'

import { useInitializeDocumentList } from './hooks'

export const CreateDocumentForm = () => {
  const [directory, setDirectory] = useAtom(directoryAtom)
  const [filename, setFilename] = useAtom(filenameAtom)
  const [selectedAuthorId] = useAtom(selectedAuthorIdAtom)
  const [isAuthorIdSelected] = useAtom(isAuthorIdSelectedAtom)
  const [isDirectoryValid] = useAtom(isDirectoryValidAtom)
  const [isFilenameValid] = useAtom(isFilenameValidAtom)

  const initializeDocumentList = useInitializeDocumentList()

  const onClickButton = async () => {
    const docDirRes = await saveDocumentDirectory({
      name: directory,
      authorId: selectedAuthorId,
    })
    const { authorId, id: directoryId } = docDirRes.data

    await saveDocument({
      name: filename,
      directoryId,
      authorId,
    })
    initializeDocumentList()
  }

  return (
    <div className="form-control grid gap-4 grid-rows-2 grid-cols-4 w-full max-w-2xl mt-8">
      <label className="label col-start-1 col-end-5 row-start-1 row-end-2">
        <span className="label-text">
          Create document (author needs to be selected)
        </span>
      </label>
      <input
        type="text"
        value={directory}
        onChange={(ev) => setDirectory(ev.target.value)}
        placeholder="Type directory path (slash-delemeted text, no trailing slash)"
        className="input input-bordered col-start-1 col-end-5 w-full"
      />
      <input
        type="text"
        value={filename}
        onChange={(ev) => setFilename(ev.target.value)}
        placeholder="Type document filename"
        className="input input-bordered col-start-1 col-end-4 w-full"
      />
      <button
        type="button"
        disabled={!isAuthorIdSelected || !isDirectoryValid || !isFilenameValid}
        onClick={onClickButton}
        className="btn btn-primary"
      >
        Create
      </button>
    </div>
  )
}
