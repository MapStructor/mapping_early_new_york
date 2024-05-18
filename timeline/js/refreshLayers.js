function refreshLayers() {
    layers.forEach(layer => {
        const id = layer.id;
        const checkbox = document.getElementById(layer.toggleElement);
        
        afterMap.setLayoutProperty(
            id,
            "visibility",
            checkbox.checked ? "visible" : "none"
          );
        
    })

    beforeLayers.forEach(layer => {
        const id = layer.id;
        const checkbox = document.getElementById(layer.toggleElement);
        beforeMap.setLayoutProperty(
            id,
            "visibility",
            checkbox.checked ? "visible" : "none"
          );
    })
}
