const listToTree = (list, { idCol, parentCol }) => {
    if (idCol === null) { idCol = 'id' }
    if (parentCol === null) { parentCol = 'parent' }
    var map = {}, node, roots = [], i;

    for (i = 0; i < list.length; i += 1) {
        map[list[i][idCol]] = i; // initialize the map
        list[i].children = []; // initialize the children
        if (parentCol === null) { list[i][parentCol] = null }
    }

    for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node[parentCol] !== null && node[parentCol] !== undefined) {
            // if you have dangling branches check that map[node.parentId] exists
            list[map[node[parentCol]]].children.push(node);
        } else {
            roots.push(node);
        }
    }
    return roots;
};

export default listToTree;