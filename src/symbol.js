/**
 * 
 * @param {Ojbect} symbol must be a symbol master
 */
 export function disableOverwrite(symbol) {
    let overrides = symbol.overrides;
    overrides.forEach(override => override.editable = 0);
  }
  
  
  /**
   * 
   * @param {Ojbect} symbol must be a symbol master
   */
   export function enableOverwrite(symbol) {
    let overrides = symbol.overrides;
    overrides.forEach(override => override.editable = 1);
  }
  