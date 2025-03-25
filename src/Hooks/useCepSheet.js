import { useState } from "react";

export const useCepSheet = (data, hierarchyData = null) => {
  const [isLoading, setIsLoading] = useState(false);

  function findCepRange(cepArray) {
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
    setIsLoading(false);
    console.log(ranges);
    return {
      neighbors: [...new Set(neighbors)],
      uf: [...new Set(uf)],
      cities: [...new Set(cities)],
      lastingCeps,
      ranges,
    };
  }

  function compareCepBand(inputedCepArray, analyzeCorrespondence) {
    let inicio = new Date().getTime();
    setIsLoading(true);
    let regionData = [];
    let neighbors = new Set();
    let states = new Set();
    let cities = new Set();
    let uncoveredRanges = [];
    let controller = new Set();
    let bands = [];

    let mergedRanges = MergeArray(inputedCepArray);

    mergedRanges.forEach((range) => {
      let dataArray = [...data];
      let endIndex = binarySearchEnd(dataArray, range.cep_final);

      if (endIndex === -1) {
        endIndex = dataArray.length - 1;
      } else if (dataArray[endIndex].cep_inicial > range.cep_final) {
        uncoveredRanges.push(range);
        return;
      }

      dataArray = dataArray.slice(0, endIndex + 1);

      let startIndex = binarySearchStart(dataArray, range.cep_inicial);

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
      regionData.push(...dataArray);
    });

    console.log(regionData);
    let ranges = [...new Set(regionData)];
    regionData.forEach((range) => {
      let { uf, cidade, bairro } = range;
      if (cidade === "Catuana") console.log(range);
      if (analyzeCorrespondence) {
        hierarchyData[uf][cidade][bairro].forEach((band) => {
          if (!controller.has(band.cep_inicial)) {
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
    console.log(
      `Tempo de execução (${inputedCepArray.length} faixas): ` +
        (new Date().getTime() - inicio) / 1000
    );
    console.log(bands);
    console.log(ranges);
    return {
      neighbors: [...new Set(neighbors)],
      uf: [...new Set(states)],
      cities: [...new Set(cities)],
      ranges: analyzeCorrespondence ? bands : ranges,
      uncoveredRanges,
    };
  }

  function MergeArray(array) {
    let mergedResult = [];
    array
      .sort((a, b) => a.cep_inicial - b.cep_inicial)
      .forEach((r) => {
        if (
          mergedResult.length > 0 &&
          mergedResult[mergedResult.length - 1].cep_final + 1 >= r.cep_inicial
        ) {
          mergedResult[mergedResult.length - 1].cep_final = Math.max(
            mergedResult[mergedResult.length - 1].cep_final,
            r.cep_final
          );
        } else {
          mergedResult.push({ ...r });
        }
      });
    return mergedResult;
  }

  function binarySearchStart(array, target) {
    let start = 0;
    let end = array.length - 1;
    let result = end;

    while (start <= end) {
      let mid = Math.floor((start + end) / 2);
      if (array[mid].cep_inicial >= target) {
        result = mid;
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }

    return result;
  }

  function binarySearchEnd(array, target) {
    let start = 0;
    let end = array.length - 1;
    let result = end;

    while (start <= end) {
      let mid = Math.floor((start + end) / 2);
      if (array[mid].cep_final > target) {
        end = mid - 1;
      } else {
        result = mid;
        start = mid + 1;
      }
    }
    return result;
  }
  return {
    isLoading,
    findCepRange,
    compareCepBand,
  };
};
