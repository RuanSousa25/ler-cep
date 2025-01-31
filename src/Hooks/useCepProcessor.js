import { useState } from "react";
import { read, utils } from "xlsx";

export function useCepProcessor() {
  const [isProcessorLoading, setIsProcessorLoading] = useState(false);

  async function parseExcelFile(file) {
    setIsProcessorLoading(true);

    try {
      const data = await file.arrayBuffer();
      const workbook = read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = utils.sheet_to_json(sheet);
      const formatedSheet = jsonData.map((range) => {
        return {
          cep_inicial: Number(range.cep_inicial.replace(/\D/g, "")),
          cep_final: Number(range.cep_final.replace(/\D/g, "")),
          ...range,
        };
      });
      console.log(formatedSheet);
      return formatedSheet;
    } catch (error) {
      console.log("Não foi possível enviar a planilha", error);
      setIsProcessorLoading(false);
    } finally {
      setIsProcessorLoading(false);
    }
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
    console.log(hierarchyArray);
    return hierarchyArray;
  }

  return {
    isProcessorLoading,
    parseExcelFile,
    createHierarchyModel,
  };
}
