import { useState } from "react";

export function useCoordinatesProcessor(coordinatesSheet) {
  const [loadingCoordinatesProcessor, setLoadingCoordinatesProcessor] =
    useState(false);

  return {
    loadingCoordinatesProcessor,
  };
}
