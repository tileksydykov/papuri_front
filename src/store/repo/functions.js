export const orderFiles = files => {
    const folders = [{
        name: "root",
        id: 0,
        path: "",
    }]
    let counter = 1
    // create folders from file path
    files.forEach((file) => {
        if (!file.editing) file.path = file.path.split('/').filter(n => n).join('/')
        const filefolders = file.path.split('/').slice(0,-1)
        if (filefolders.length !== 0) {
            filefolders.forEach((filefolder, index) => {
                const folderName = filefolders.slice(0, index + 1).join('/')
                if (
                    folders.indexOf(folders.find(f => f.path === folderName)) === -1
                    &&
                    folderName !== ''
                ) {
                    let name = folderName.split('/').slice(-1).join()
                    let editing = name === '.'
                    if (editing) name = ''
                    folders.push({
                        id: counter,
                        editing,
                        name,
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

    // find file order
    folders.forEach(folder => {
        let file = folder.files.filter(f => f.name !== '.folder').find(f => f.prev_file_id === '0')
        for (let i = 0; i < folder.files.length; i++) {
            if(file) {
                file.order_num = i+1;
                file = files.filter(f => f.name !== '.folder').find(f => f.prev_file_id === file.id)
            }
        }
        folder.files.sort((a,b) => a.order_num - b.order_num)
    })

    return folders
}

export const saveContent = (root, file) => {
    if (root){
        if (root.files && root.id === file.folderId){
            root.files.forEach(f => f.id === file.id ? f.content = file.content : null)
            return true
        }
        for (let i = 0; i < root.folders; i++) {
            if (saveContent(root.folders[i], file)) {
                return true
            }
        }
    }
    return false
}

export const insertFileToFolder = (root, file) => {
    if (root.id === file.folderId){
        root.files.push(file)
        return true
    }
    for (let i = 0; i < root.folders.length; i++) {
        if (insertFileToFolder(root.folders[i], file)) {
            return true
        }
    }
    return false
}

export const saveFile = (root, file) => {
    if (root.id === file.folderId && root.files) {
        root.files.map(f => f.id === file.id ? file: f)
        return true
    }
    if(root.folders){
        for (let i = 0; i < root.folders.length; i++) {
            if (saveFile(root.folders[i], file)) {
                return true
            }
        }
    }
    return false
}

export const setFolderEditing = (root, folder) => {
    if(root){
        if (root.id === folder.id && root.folders) {
            root.folders.map(f => f.id === folder.id ? folder: f)
            return true
        }
        if(root.folders){
            for (let i = 0; i < root.folders.length; i++) {
                if (saveFile(root.folders[i], folder)) {
                    return true
                }
            }
        }
    }
    return false
}

export const findFile = (root, fileId) => {
    if(root && fileId){
        const file = root.files.find(f => f.id === fileId)
        if (file){
            return file
        }
        for (let i = 0; i < root.folders.length; i++) {
            const file = findFile(root.folders[i], fileId)
            if (file) {
                return file
            }
        }
    }
    return false
}

export const uuidv4 =  () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
