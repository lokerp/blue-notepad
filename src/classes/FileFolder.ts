import File from "./File";

export default class FileFolder {
    readonly name: string;
    readonly files: Map<string, File>;

    constructor(name: string, files: Array<File>) {
        this.name = name;
        this.files = new Map<string, File>(files.map((file) => [file.path, file]))
    }

    

    deepCopy(name?: string, files?: Map<string, File>): FileFolder {
        return new FileFolder(name === undefined ? this.name.slice() : name,
                              files === undefined ? Array.from(this.files.values()).map((file) => file.deepCopy()) 
                                                  : Array.from(files.values()).map((file) => file.deepCopy()))
    }
}