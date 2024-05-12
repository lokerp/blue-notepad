export default class File {
    readonly path: string;
    readonly name: string;
    readonly isFavorite: boolean;

    constructor(path: string, isFavorite: boolean) {
        const splittedPath = path.split(/\\|\//);
        
        this.path = path;
        this.name = splittedPath[splittedPath.length - 1];
        this.isFavorite = isFavorite;
    }

    public deepCopy(path?: string, isFavorite?: boolean) {
        return new File(path === undefined ? this.path.slice() : path, 
                        isFavorite === undefined ? this.isFavorite : isFavorite)
    }
}