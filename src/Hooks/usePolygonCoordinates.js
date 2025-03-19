import { useState } from "react";
import { useCepProcessor } from "./useCepProcessor";
import RBush from "rbush";
import { polygon } from "@turf/helpers";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { point } from "@turf/helpers";
export function usePolygonCoordinates(data) {
  const [isLoading, setIsLoading] = useState(false);
  const {} = useCepProcessor;

  function getBoundingBox(vertices) {
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;

    for (let [x, y] of vertices) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }

    return { minX, maxX, minY, maxY };
  }

  function buildRTree(coordinatesSheet) {
    if (coordinatesSheet == null) return;

    const tree = new RBush();
    const items = coordinatesSheet.reduce(
      (ac, { longitude, latitude, cep }) => {
        if (!isNaN(latitude) && !isNaN(longitude)) {
          ac.push({
            minX: longitude,
            minY: latitude,
            maxX: longitude,
            maxY: latitude,
            cep,
          });
        }
        return ac;
      },
      []
    );
    tree.load(items);
    return tree;
  }

  async function findRegionDataInPolygon(vertexArr, tree) {
    //const tree = buildRTree(data);
    const bbox = getBoundingBox(vertexArr);
    const candidates = tree.search(bbox);
    const poly = polygon([vertexArr]);
    let result = candidates
      .filter(({ minX, minY }) =>
        booleanPointInPolygon(point([minX, minY]), poly)
      )
      .map(({ cep }) => cep);
    return result;
  }

  return {
    findRegionDataInPolygon,
    buildRTree,
  };
}
