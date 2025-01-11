import { useState } from "react";

export const useCep = (data) => {
  const [cep, setCep] = useState("");
  const [result, setResult] = useState(null);

  function findCepRange(cepArray) {
    let neighbours = [];
    let uf = [];
    let cities = [];
    console.log(data);
    data.map((range) => {
      for (let i = 0; i < cepArray.length; i++) {
        if (cepArray[i] >= range.cepinicial && cepArray[i] <= range.cepfinal) {
          neighbours.push(range.bairro);
          uf.push(range.UF);
          cities.push(range.cidade);
          cepArray.splice(i, 1);
        }
      }
    });
    return {
      neighbours: [...new Set(neighbours)],
      uf: [...new Set(uf)],
      cities: [...new Set(cities)],
      lastingCeps: cepArray,
    };
  }

  function searchCep() {}

  return { cep, setCep, result, setResult, findCepRange, searchCep };
};
