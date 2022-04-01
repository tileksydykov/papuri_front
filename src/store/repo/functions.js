
export const orderFiles = files => {
    const folders = [{
        name: "root",
        id: 0,
        path: "/",
    }]
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
                ) {
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
    // find and assign file folders
    files.forEach(file => {
        const folderName = file.path.split('/').slice(0,-1).join('/')
        const folder = folders.find(f => f.path === folderName)
        file.folderId = folder ? folder.id: 0
        file.name = file.path.split('/').slice(-1).join()
    })
    // find file order
    let orderCounter = 1
    let file = files.find(f => f.prev_file_id === '0')

    while (file) {
        file.order_num = orderCounter++
        files = files.map(f => f.id === file.id ? file : f)
        file = files.find(f => f.prev_file_id === file.id)
    }
    files.sort((a,b) => a.order_num - b.order_num)
    // relate folders to their parents
    folders.forEach(folder => {
        if(folder.id !== 0){
            const parentFolders = folder.path.split('/').slice(0,-1).join('/')
            const f = folders.find(f => f.path === parentFolders)
            folder.parent = f ? f.id: 0
        }
        folder.files = files.filter(f => folder.id === f.folderId)
    })
    folders.forEach(folder => {
        folder.folders = folders.filter(f => folder.id === f.parent)
    })

    return folders
}

export const uuidv4 =  () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
