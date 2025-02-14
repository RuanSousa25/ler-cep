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

  function buildRTree(data) {
    const tree = new RBush();
    const items = data.map(({ longitude, latitude, cep }) => ({
      minX: longitude,
      minY: latitude,
      maxX: longitude,
      maxY: latitude,
      cep,
    }));

    tree.load(items);
    return tree;
  }

  async function findRegionDataInPolygon(vertexArr) {
    const tree = buildRTree(data);
    const bbox = getBoundingBox(vertexArr);
    const candidates = tree.search(bbox);
    const poly = polygon([vertexArr]);
    return candidates
      .filter(({ minX, minY }) =>
        booleanPointInPolygon(point([minX, minY]), poly)
      )
      .map(({ cep }) => cep);
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
  };
}
