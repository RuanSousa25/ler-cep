import { useState } from "react";

export const useCepSheet = (data, hierarchyData = null) => {
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

  function compareCepBand(inputedCepArray, analyzeCorrespondence) {
    if (analyzeCorrespondence && hierarchyData === null) return;
    setIsLoading(true);
    let regionData = new Set();
    let neighbors = new Set();
    let states = new Set();
    let cities = new Set();
    let uncoveredRanges = [];

    let controller = new Set();
    let bands = [];

    inputedCepArray.forEach((range) => {
      let dataArray = [...data];
      let endIndex = dataArray.findIndex(
        (item) => item.cep_final >= range.cep_final
      );

      if (dataArray[endIndex].cep_inicial > range.cep_final) {
        endIndex--;
      }
      if (endIndex === -1) {
        endIndex = dataArray.length - 1;
      }
      dataArray = dataArray.slice(0, endIndex + 1);

      let startIndex = dataArray.findIndex(
        (item) => item.cep_inicial >= range.cep_inicial
      );

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
      dataArray = dataArray.slice(startIndex);

      if (analyzeCorrespondence) {
        let coverageMap = new Map();
        dataArray.forEach((band) => {
          coverageMap.set(band.cep_inicial, band.cep_final);
        });

        let mergedRanges = [];
        inputedCepArray
          .sort((a, b) => a.cep_inicial - b.cep_inicial)
          .forEach((r) => {
            if (
              mergedRanges.length > 0 &&
              mergedRanges[mergedRanges.length - 1].cep_final + 1 >=
                r.cep_inicial
            ) {
              mergedRanges[mergedRanges.length - 1].cep_final = Math.max(
                mergedRanges[mergedRanges.length - 1].cep_final,
                r.cep_final
              );
            } else {
              mergedRanges.push({ ...r });
            }
          });

        dataArray.forEach((band) => {
          if (controller.has(band.cep_inicial)) return;
          controller.add(band.cep_inicial);

          let isFullyCovered = mergedRanges.some(
            (r) =>
              r.cep_inicial <= band.cep_inicial && r.cep_final >= band.cep_final
          );

          bands.push({
            cep_inicial: band.cep_inicial,
            cep_final: band.cep_final,
            bairro: band.bairro,
            cidade: band.cidade,
            uf: band.uf,
            correspondencia: isFullyCovered ? "total" : "parcial",
          });
        });
      }
      regionData.add(...dataArray);
    });

    let ranges = [...new Set(regionData)];
    regionData.forEach((range) => {
      let { uf, cidade, bairro } = range;

      if (analyzeCorrespondence) {
        hierarchyData[uf][cidade][bairro].forEach((band) => {
          if (!controller.has(band.cep_inicial)) {
            console.log(band);
            bands.push({
              cep_inicial: band.cep_inicial,
              cep_final: band.cep_final,
              bairro: bairro,
              cidade: cidade,
              uf: uf,
              correspondencia: "nenhuma",
            });
          }
        });
      }

      neighbors.add(`${bairro} (${cidade} - ${uf})`);
      cities.add(cidade);
      states.add(uf);
    });

    setIsLoading(false);

    return {
      neighbors: [...new Set(neighbors)],
      uf: [...new Set(states)],
      cities: [...new Set(cities)],
      ranges: analyzeCorrespondence ? bands : ranges,
      uncoveredRanges,
    };
  }

  return {
    isLoading,
    findCepRange,
    compareCepBand,
  };
};
