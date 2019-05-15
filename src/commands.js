import {
	disableOverwrite,
	enableOverwrite
} from './symbol';
import {
	reorder,
	rename,
	reorderHorizon,
	renameByIndex,
	resizeShape,
	reorderVertical
} from './functions';
import {
	resizing,
	selectLayer,
	unselectLayer,
	selectLayerByType,
	getRect,
	getLayersByType
} from './layer';

import './layermovement'
import { moveToFront, moveToBack } from './layermovement';

const sketch = require('sketch/dom');
const async = require('sketch/async');
const DataSupplier = require('sketch/data-supplier');
const UI = require('sketch/ui');
const Settings = require('sketch/settings');
const Document = require('sketch/dom').Document;
const selectedDocument = require('sketch/dom').getSelectedDocument();

export function disableAllOverwriteOfSelectedSymbol() {
	let selectedLayer = selectedDocument.selectedLayers;
	selectedLayer.forEach(layer => disableOverwrite(layer));
}

export function reorderLayerVertical(context) {
	const selection = context.selection;
	reorderVertical(selection);
}

export function reorderLayerHorizon(context) {
	const selection = context.selection;
	reorderHorizon(selection);
}

export function renameLayerByIndex(context) {
	const selection = context.selection;
	renameByIndex(selection);
}

export function resizeBackground(context) {
	const selection = context.selection;
	resizeShape(selection);
}

export function reorderTaskFlowFolder(context) {
	const document = context.document;
	let selection = context.selection;
	if (selection.length < 1) {
		document.showMessage("Select something!")
	}
	let MSGroup = selection[0];
	unselectLayer(MSGroup);
	let textLayer = 0;
	let shapeLayer = 0;
	MSGroup.layers().forEach(layer => {
		if (layer instanceof MSRectangleShape) {
			shapeLayer = layer;
		}
		selectLayerByType(layer, 'group');
	});
	selection = document.selectedLayers().layers();
	reorderHorizon(selection);
	selection.forEach(layer => unselectLayer(layer));
	MSGroup.layers().forEach(layer => selectLayerByType(layer, 'group'));
	selection = document.selectedLayers().layers();
	renameByIndex(selection);
	selection.forEach(layer => unselectLayer(layer));
	MSGroup.layers().forEach(layer => selectLayerByType(layer, 'shape'));
	selection = document.selectedLayers().layers();
	moveToBack(shapeLayer);
	resizeShape(selection);
	selection.forEach(layer => unselectLayer(layer));
}

export function duplicateTaskFlow(context) {
	const selection = context.selection;
	let originLayer = selection[0];
	let newPosition = getRect(originLayer, 'x') + getRect(originLayer, 'w') + 320
	let newLayer = originLayer.duplicate();
	newLayer.frame().setX(newPosition);
}

export function fixedResize(context) {
	const selection = context.selection;
	let MSLayer = selection[0];
	resizing(MSLayer, 54);
}

export function reorderPage(context) {
	const document = context.document;
	const currentPage = document.currentPage();
	reorderVertical(currentPage.layers());
	renameByIndex(currentPage.layers());
}

export function checkSpacing(context) {
	const document = context.document;
	const currentPage = document.currentPage();
	let textLayers = getLayersByType(currentPage, 'text');
	let spacingCount = 0;
	textLayers.forEach(layer => {
		let text = layer.stringValue();
		console.log(text);
		if (text.search('  ') >= 0) {
			layer.setStringValue(text.replace('  ', '😶😐😯😲😵🥴🤢🤮🤕'));
			document.showMessage(text + ' has 2 spacings.');
			spacingCount++;
		}
	});
	if (spacingCount == 0) {
		document.showMessage("👌GREAT. NO MULTIPLE SPACINGS.");
	}
}