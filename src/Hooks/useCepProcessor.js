import { useState } from "react";
import { read, utils } from "xlsx";

export function useCepProcessor() {
  const [isProcessorLoading, setIsProcessorLoading] = useState(false);

  async function parseExcelFile(file) {
    try {
      setIsProcessorLoading(true);
      const data = await file.arrayBuffer();
      const workbook = read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = utils.sheet_to_json(sheet);
      const formatedSheet = jsonData.map((range) => {
        return {
          cepinicial: Number(range.cepinicial),
          cepfinal: Number(range.cepfinal),
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
    sheetArray.forEach(({ cepinicial, cepfinal, bairro, cidade, UF }) => {
      if (!hierarchyArray[UF]) {
        hierarchyArray[UF] = {};
      }
      if (!hierarchyArray[UF][cidade]) {
        hierarchyArray[UF][cidade] = {};
      }
      if (!hierarchyArray[UF][cidade][bairro]) {
        hierarchyArray[UF][cidade][bairro] = [];
      }

      hierarchyArray[UF][cidade][bairro].push({ cepinicial, cepfinal });
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
