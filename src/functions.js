import { unselectLayer } from "./layer";
import {moveToFront} from "./layermovement";

export function reorder(list) {
    function sortNumber(a,b) {
        return a - b;
    }
    return list.sort(sortNumber);
}

export function rename(index) {
    if (index < 10) {
        return '0' + String(index);
    } else {
        return String(index);
    }
}

export function reorderVertical(selection) {
	let layersPosition = [];
	selection.forEach(layer => {
		let position = layer.frame().y();
		layersPosition.push(position);
	})
	let sortedLayersPosition = layersPosition.slice();
	sortedLayersPosition = reorder(sortedLayersPosition).reverse();
	sortedLayersPosition.forEach(layer => {
		let layerIndex = layersPosition.indexOf(layer);
		moveToFront(selection[layerIndex]);
	})
}

/**
 * 
 * @param {array} selection array of layers.
 */
export function reorderHorizon(selection) {
	let layersPosition = []
	selection.forEach(layer => {
		let position = layer.frame().x();
		layersPosition.push(position);
	})
	let sortedLayersPosition = layersPosition.slice();
	sortedLayersPosition = reorder(sortedLayersPosition).reverse();
	sortedLayersPosition.forEach(position => {
		let layerIndex = layersPosition.indexOf(position);
		moveToFront(selection[layerIndex]);
	})
}

export function renameByIndex(selection) {
	if (selection.length < 1) {
		document.showMessage("至少选一个图层");
		return false;
	}
	selection.forEach(layer => {
		let layerIndex = selection.length - selection.indexOf(layer);
		layer.setName(rename(layerIndex));
	});
}

export function resizeShape(selection) {
	let MSLayer = selection[0];
	let parent = MSLayer.parentForInsertingLayers();
	let lastLayer = parent.layers()[parent.layers().indexOf(MSLayer) + 2];
	let lastLayerX = lastLayer.rect().origin.x;
	let lastLayerW = lastLayer.rect().size.width;
	let newWidth = lastLayerX + lastLayerW + 160;
	MSLayer.frame().setWidth(newWidth);
}