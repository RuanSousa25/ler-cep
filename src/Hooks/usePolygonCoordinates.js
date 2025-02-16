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
    console.log("carregando tree");

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
    console.log("tree carregada");
    return tree;
  }

  async function findRegionDataInPolygon(vertexArr, tree) {
    //const tree = buildRTree(data);
    const bbox = getBoundingBox(vertexArr);
    console.log(tree);
    const candidates = tree.search(bbox);
    console.log(candidates);
    const poly = polygon([vertexArr]);
    let result = candidates
      .filter(({ minX, minY }) =>
        booleanPointInPolygon(point([minX, minY]), poly)
      )
      .map(({ cep }) => cep);
    console.log(result);
    return result;
    // let regionData = [];

    // data.forEach((range) => {
    //   let px = range.longitude,
    //     py = range.latitude;
    //   if (px < minX || px > maxX || py < minY || py > maxY) return;
    //   let inside = false;

    //   for (let i = 0; i < vertexArr.length - 1; i++) {
    //     let [x1, y1] = vertexArr[i];
    //     let [x2, y2] = vertexArr[i + 1];

    //     if (
    //       y1 > py !== y2 > py &&
    //       px < ((x2 - x1) * (py - y1)) / (y2 - y1) + x1
    //     ) {
    //       inside = !inside;
    //     }
    //   }

    //   if (inside) {
    //     regionData.push(range.cep);
    //   }
    // });

    //return regionData;
  }

  return {
    findRegionDataInPolygon,
    buildRTree,
  };
}
