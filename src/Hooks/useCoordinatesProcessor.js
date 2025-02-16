import { useState } from "react";

export function useCoordinatesProcessor(coordinatesSheet) {
  const [loadingCoordinatesProcessor, setLoadingCoordinatesProcessor] =
    useState(false);

  function buildRTree(coordinatesSheet) {
    setLoadingCoordinatesProcessor(true);
    if (coordinatesSheet == null) return;
    console.log("carregando tree");
    const tree = new RBush();
    const items = coordinatesSheet.map(({ longitude, latitude, cep }) => ({
      minX: longitude,
      minY: latitude,
      maxX: longitude,
      maxY: latitude,
      cep,
    }));

    tree.load(items);
    setLoadingCoordinatesProcessor(false);
    console.log("tree carregada");
    return tree;
  }

  return {
    loadingCoordinatesProcessor,
    buildRTree,
  };
}
