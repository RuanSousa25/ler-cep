import { useState } from "react";
import { read, utils } from "xlsx";

export function useCepProcessor() {
  const [isProcessorLoading, setIsProcessorLoading] = useState(false);

  async function parseExcelFile(file) {
    setIsProcessorLoading(true);
    try {
      const data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(new Uint8Array(e.target.result));
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsArrayBuffer(file);
      });

      const workbook = read(data, { type: "array" });
      let allData = [];
      workbook.SheetNames.forEach((SheetName) => {
        const sheet = workbook.Sheets[SheetName];
        const jsonData = utils.sheet_to_json(sheet, { raw: false, defval: "" });
        allData = allData.concat(jsonData);
      });
      console.log(allData);
      return allData;
    } catch (error) {
      console.log("Não foi possível enviar a planilha", error);
      setIsProcessorLoading(false);
      return [];
    } finally {
      setIsProcessorLoading(false);
    }
  }

  async function formatSheet(file) {
    let jsonData = await parseExcelFile(file);

    const formatedSheet = jsonData.map((range) => {
      return {
        cep_inicial: Number(range.cep_inicial.replace(/\D/g, "")),
        cep_final: Number(range.cep_final.replace(/\D/g, "")),
        ...range,
      };
    });
    return formatedSheet;
  }

  async function createHierarchyModel(sheetArray) {
    setIsProcessorLoading(true);
    let hierarchyArray = {};
    sheetArray.forEach(({ cep_inicial, cep_final, bairro, cidade, uf }) => {
      if (!hierarchyArray[uf]) {
        hierarchyArray[uf] = {};
      }
      if (!hierarchyArray[uf][cidade]) {
        hierarchyArray[uf][cidade] = {};
      }
      if (!hierarchyArray[uf][cidade][bairro]) {
        hierarchyArray[uf][cidade][bairro] = [];
      }

      hierarchyArray[uf][cidade][bairro].push({ cep_inicial, cep_final });
    });
    setIsProcessorLoading(false);
    return hierarchyArray;
  }

  return {
    isProcessorLoading,
    parseExcelFile,
    createHierarchyModel,
    formatSheet,
  };
}
