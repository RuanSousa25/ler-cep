import { useState } from "react";

export const useCepSheet = (data) => {
  const [cep, setCep] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function findCepRange(cepArray) {
    setIsLoading(true);
    let neighbours = [];
    let uf = [];
    let cities = [];
    let ranges = [];

    data.map((range) => {
      for (let i = 0; i < cepArray.length; i++) {
        let cepInputed = Number(cepArray[i]);
        let cepInicial = range.cepinicial;
        let cepFinal = range.cepfinal;
        if (cepInputed >= cepInicial && cepInputed <= cepFinal) {
          neighbours.push(range.bairro);
          uf.push(range.UF);
          cities.push(range.cidade);
          ranges.push(range);
          cepArray.splice(i, 1);
          return;
        }
      }
    });
    setIsLoading(false);
    return {
      neighbours: [...new Set(neighbours)],
      uf: [...new Set(uf)],
      cities: [...new Set(cities)],
      lastingCeps: cepArray,
      ranges,
    };
  }

  function searchCep(neighbours) {}

  function compareCepBand(inputedCepArray) {
    setIsLoading(true);
    let regionData = [];
    let neighbours = [];
    let uf = [];
    let cities = [];
    let uncoveredRanges = [];
    inputedCepArray.forEach((range) => {
      let dataArray = [...data];

      let endIndex = dataArray.findIndex(
        (item) => item.cepfinal >= range.cepfinal
      );

      if (endIndex === -1) {
        endIndex = dataArray.length - 1;
      }

      dataArray = dataArray.slice(0, endIndex + 1);

      let startIndex = dataArray.findIndex(
        (item) => item.cepinicial >= range.cepinicial
      );

      if (
        startIndex === -1 &&
        range.cepInicial > dataArray[endIndex].cepfinal
      ) {
        uncoveredRanges.push(range);
        return;
      } else if (startIndex === -1) {
        startIndex = dataArray.length - 1;
      }
      if (dataArray[startIndex - 1].cepfinal >= range.cepinicial) {
        startIndex--;
      }

      dataArray = dataArray.slice(startIndex);

      regionData.push(...dataArray);
    });
    let ranges = [...new Set(regionData)];
    regionData.forEach((range) => {
      neighbours.push(range.bairro);
      cities.push(range.cidade);
      uf.push(range.UF);
    });
    setIsLoading(false);
    return {
      neighbours: [...new Set(neighbours)],
      uf: [...new Set(uf)],
      cities: [...new Set(cities)],
      ranges,
      uncoveredRanges,
    };
  }

  return {
    cep,
    setCep,
    result,
    setResult,
    findCepRange,
    searchCep,
    compareCepBand,
  };
};
