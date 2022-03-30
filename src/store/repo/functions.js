
export const orderFiles = (files) => {
    const folders = []
    let counter = 1
    // create folders from file path
    files.forEach((file) => {
        const filefolders = file.path.split('/').slice(0,-1)
        if (filefolders.length !== 0) {
            filefolders.forEach((filefolder, index) => {
                const folderName = filefolders.slice(0, index + 1).join('/')
                if (
                    folders.indexOf(folders.find(f => f.path === folderName)) === -1
                    &&
                    folderName !== ''
                ){
                    folders.push({
                        id: counter,
                        name: folderName.split('/').slice(-1).join(),
                        path: folderName
                    })
                    counter++
                }
            })
        }
    })
    // relate folders to their parents
    folders.forEach(folder => {
        const parentFolders = folder.path.split('/').slice(0,-1).join('/')
        const f = folders.find(f => f.path === parentFolders)
        folder.parent = f ? f.id: 0
    })
    // find and assign file folders
    files.forEach(file => {
        const folderName = file.path.split('/').slice(0,-1).join('/')
        const folder = folders.find(f => f.path === folderName)
        file.folderId = folder ? folder.id: 0
        file.name = file.path.split('/').slice(-1).join()
    })
    // find folders order

    // find file order
    let orderCounter = 1
    console.log(files)

    files.forEach(file => {
        if(file.prev_file_id !== "0") {
            const prev = files.find(f => f.id === file.prev_file_id)
            if (prev) {
                file.order_num = orderCounter++
            }
        }
    })
    return {
        files,
        folders
    }
}

export const uuidv4 =  () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
