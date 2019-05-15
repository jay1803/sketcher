export function moveToBack(layer) {
    MSLayerMovement.moveToBack([layer]);
}

export function moveToFront(layer) {
    MSLayerMovement.moveToFront([layer]);
}

export function moveBackward(layer) {
    MSLayerMovement.moveBackward([layer]);
}

export function moveToTopOfHierarchy(layer) {
    if (MSLayerMovement.canMoveLayerToTopOfHierarchy(layer)) {
        MSLayerMovement.moveToTopOfHierarchy([layer]);
    }
}

export function moveUpHierarchy(layer) {
    if (MSLayerMovement.canMoveLayerUpHierarchy([layer])) {
        MSLayerMovement.moveUpHierarchy([layer]);
    }
}

export function moveForward(layer) {
    MSLayerMovement.moveForward([layer]);
}