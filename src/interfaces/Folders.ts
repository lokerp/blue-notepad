import File from '../classes/File'
import FileFolder from '../classes/FileFolder'

export default interface Folders {
    currentFolder: FileFolder,
    favoritesFolder: FileFolder,
    recentFolder: FileFolder,
    customFolders: Array<FileFolder>
}

export function foldersDeepCopy(folders : Folders) {
    return {
        currentFolder: folders.currentFolder.deepCopy(),
        favoritesFolder: folders.favoritesFolder.deepCopy(),
        recentFolder: folders.recentFolder.deepCopy(),
        customFolders: folders.customFolders.map((folder) => folder.deepCopy())
    }
}