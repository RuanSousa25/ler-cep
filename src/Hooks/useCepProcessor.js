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
      console.log("planilha carregada", formatedSheet);
      return formatedSheet;
    } catch (error) {
      console.log("Não foi possível enviar a planilha", error);
      setIsProcessorLoading(false);
    } finally {
      setIsProcessorLoading(false);
    }
  }
  return {
    isProcessorLoading,
    parseExcelFile,
  };
}
