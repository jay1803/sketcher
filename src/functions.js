import {disableOverwrite, enableOverwrite} from './symbol'

var sketch = require('sketch/dom')
var async = require('sketch/async')
var DataSupplier = require('sketch/data-supplier')
var UI = require('sketch/ui')
var Settings = require('sketch/settings')
var Document = require('sketch/dom').Document
var document = require('sketch/dom').getSelectedDocument()

export function disableAllOverwriteOfSelectedSymbol() {
  let selectedLayer = document.selectedLayers
  selectedLayer.forEach(layer => {
    disableOverwrite(layer)
  });
}
