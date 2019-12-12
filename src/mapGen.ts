import * as generateMap from "procedural-map";

const resourceTypes = ["earth", "rock", "iron", "silicon", "gold"];

const mapConfig = {
    maxWidth: 50,
    maxHeight: 50,
    numberOfPaths: 40,
    minPathLength: 5,
    maxPathLength: 115,
}


const createMaps = (baseSeed: string) => {
    let resourceMaps = {};
    resourceTypes.map((resource) => {
        resourceMaps[resource] = generateMap(baseSeed + resource, mapConfig);
    })
    return resourceMaps;
}

export const compileMap = (baseSeed: string) => {
    const resourceMaps = createMaps(baseSeed);
    let resourceMap = [];
    // start with all earth
    for(var i = 0; i < mapConfig.maxWidth; i++) {
        if(resourceMap[i] === undefined) {
            resourceMap[i] = [];
        }
        for(var j = 0; j < mapConfig.maxHeight; j++) {
            resourceMap[i][j] = resourceTypes[0];
        }
    }

    // add other resources
    for(const resource of resourceTypes) {
        const rmap = resourceMaps[resource];
        rmap.forEach((row, rowIndex) => {
            if(!Array.isArray(resourceMap[rowIndex])) {
                resourceMap[rowIndex] = [];
            }
            row.forEach((cell, columnIndex) => {
                if(cell === 1) {
                    resourceMap[rowIndex][columnIndex] = resource;
                }
            })
        })

    }
    debugger;
    return resourceMap;
}