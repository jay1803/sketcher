
/**
 * 
 * @param {Layer} layer 
 */
export function getRect(layer, position) {
    switch (position) {
        case 'x':
            return layer.rect().origin.x;
        case 'y':
            return layer.rect().origin.y;
        case 'w':
            return layer.rect().size.width;
        case 'h':
            return layer.rect().size.height;
        default:
            return layer.rect().origin.x;
    }
    return {'x': layer.frame.x, 'y': layer.frame.y, 'w': layer.frame.width, 'h': layer.frame.height};
}

/**
 * 
 * @param {MSLayer} layer 
 * @param {Number} edge 
 */
export function resizing(layer, edge) {
    layer.hasFixedEdges = 0;
    layer.setFixed_forEdge(true, edge);
}

/**
 * 
 * @param {MSLayer} layer 
 */
export function selectLayer(layer) {
    layer.select_byExpandingSelection(true, true);
}

export function unselectLayer(layer) {
    layer.select_byExpandingSelection(false, false);
}

/**
 * 
 * @param {MSLayer} layer 
 * @param {string} type enum ['text', 'group', 'shape']
 */
export function selectLayerByType(layer, type) {
    switch (type) {
        case 'group':
            if (layer instanceof MSLayerGroup) {
                selectLayer(layer);
            }
            break;
        case 'text':
            if (layer instanceof MSTextLayer) {
                selectLayer(layer);
            }
            break;
        case 'shape':
            if (layer instanceof MSRectangleShape) {
                selectLayer(layer);
            }
            break;
        default:
            break;
    }
}


/**
 * 
 *
 * @export 获取所有的非文件夹图层， 也就是文本和图形。
 * @param {Object} layerGroup
 * @param {String} type         layer type, could be [text, shape, both], both meaning text and shape 
 */
export function getLayersByType(layerGroup, type) {
    var layerList = [];
    var layers = layerGroup.layers();

    switch (type) {
        case 'text':
            layers.forEach(layer => {
                if (layer instanceof MSTextLayer) {
                    layerList.push(layer);
                } else if (layer.containsMultipleLayers()) {
                    layerList = layerList.concat(getLayersByType(layer, 'text'));
                }
            });
            return layerList;
        case 'shape':
            layers.forEach(layer => {
                if (layer instanceof MSShapeGroup) {
                    layerList.push(layer);
                } else if (layer.containsMultipleLayers()) {
                    layerList = layerList.concat(getLayersByType(layer, 'shape'));
                }
            });
            return layerList;
        case 'both':
            layers.forEach(layer => {
                if (layer instanceof MSShapeGroup || layer instanceof MSTextLayer) {
                    layerList.push(layer);
                } else if (layer.containsMultipleLayers()) {
                    layerList = layerList.concat(getLayersByType(layer, 'both'));
                }
            });
            return layerList;
        default:
            break;
    }
}