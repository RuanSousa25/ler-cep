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
    console.log(inputedCepArray);
    setIsLoading(true);
    let regionData = [];
    let neighbours = [];
    let uf = [];
    let cities = [];
    inputedCepArray.forEach((range) => {
      let dataArray = [...data];

      for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i].cepinicial >= range.cepinicial) {
          dataArray = dataArray.slice(i);
          break;
        }
      }

      for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i].cepfinal >= range.cepfinal) {
          dataArray = dataArray.slice(0, i + 1);
          break;
        }
      }
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
