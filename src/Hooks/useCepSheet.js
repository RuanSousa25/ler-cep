import { useState } from "react";

export const useCepSheet = (data) => {
  const [isLoading, setIsLoading] = useState(false);

  function findCepRange(cepArray) {
    let count = 0;
    setIsLoading(true);
    let neighbors = [];
    let uf = [];
    let cities = [];
    let ranges = [];
    let lastingCeps = [];
    cepArray.forEach((cep) => {
      let found = false;
      cep = cep.replace(/\D/g, "");
      let inicio = 0,
        fim = data.length - 1;
      let meio;

      while (inicio <= fim) {
        meio = Math.floor((inicio + fim) / 2);
        if (data[meio].cep_inicial <= cep && data[meio].cep_final >= cep) {
          if (data[meio].cidade !== "Fortaleza") {
            count++;
          }
          found = true;
          neighbors.push(data[meio].bairro);
          uf.push(data[meio].uf);
          cities.push(data[meio].cidade);
          ranges.push(data[meio]);
          break;
        } else if (cep > data[meio].cep_inicial) {
          inicio = meio + 1;
        } else if (cep < data[meio].cep_inicial) {
          fim = meio - 1;
        }
        if (!found) {
          lastingCeps.push(cep);
        }
      }
    });
    console.log(count);
    setIsLoading(false);
    return {
      neighbors: [...new Set(neighbors)],
      uf: [...new Set(uf)],
      cities: [...new Set(cities)],
      lastingCeps,
      ranges,
    };
  }

  function compareCepBand(inputedCepArray) {
    setIsLoading(true);
    let regionData = [];
    let neighbors = [];
    let uf = [];
    let cities = [];
    let uncoveredRanges = [];
    inputedCepArray.forEach((range) => {
      let dataArray = [...data];

      //Encontra o index máximo que a faixa alcança
      let endIndex = dataArray.findIndex(
        (item) => item.cep_final >= range.cep_final
      );

      if (dataArray[endIndex].cep_inicial > range.cep_final) {
        endIndex--;
      }
      //Se ultrapassar todos as faixas, define como a última faixa cadastrada
      if (endIndex === -1) {
        endIndex = dataArray.length - 1;
      }

      //corta tudo após o final
      dataArray = dataArray.slice(0, endIndex + 1);

      //Encontra o index mínimo que a faixa alcança
      let startIndex = dataArray.findIndex(
        (item) => item.cep_inicial >= range.cep_inicial
      );

      //Se ultrapassar todos os iniciais, checa se está no último intervalo
      if (
        startIndex === -1 &&
        range.cep_inicial > dataArray[endIndex].cep_final
      ) {
        uncoveredRanges.push(range);
        return;
      } else if (startIndex === -1) {
        startIndex = dataArray.length - 1;
      }

      if (
        startIndex !== 0 &&
        dataArray[startIndex - 1].cep_final >= range.cep_inicial
      ) {
        startIndex--;
      }

      //recorta todos os elementos anteriores ao index inicial
      dataArray = dataArray.slice(startIndex);
      //adiciona o resto ao resultado
      regionData.push(...dataArray);
    });

    let ranges = [...new Set(regionData)];
    regionData.forEach((range) => {
      neighbors.push(`${range.bairro} (${range.cidade} - ${range.uf})`);
      cities.push(range.cidade);
      uf.push(range.uf);
    });

    console.log(neighbors);
    setIsLoading(false);

    return {
      neighbors: [...new Set(neighbors)],
      uf: [...new Set(uf)],
      cities: [...new Set(cities)],
      ranges,
      uncoveredRanges,
    };
  }

  return {
    isLoading,
    findCepRange,
    compareCepBand,
  };
};
