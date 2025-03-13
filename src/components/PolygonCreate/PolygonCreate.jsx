import { useState } from "react";
import "./PolygonCreate.css";

export default function PolygonCreate() {
  const [coords, setCoords] = useState([0, 0]);
  const [radius, setRadius] = useState(0);

  const [resultArray, setResultArray] = useState([]);

  function generatePolygon() {
    const numPoints = 64;
    const lat = Number(coords[0]);
    const lng = Number(coords[1]);
    const earthRadius = 6371000;
    const coordsArray = [];

    for (let i = 0; i <= numPoints; i++) {
      const angle = (i / numPoints) * (2 * Math.PI);

      const dx = radius * Math.cos(angle);
      const dy = radius * Math.sin(angle);

      const newLat = lat + (dy / earthRadius) * (180 / Math.PI);
      const newLng =
        lng +
        (dx / (earthRadius * Math.cos((lat * Math.PI) / 180))) *
          (180 / Math.PI);

      coordsArray.push([newLng, newLat]);
    }
    setResultArray(coordsArray);
  }

  return (
    <div className="polygon-create">
      <div className="tab-header">
        <span className="title-span">
          <h2>Criar Polígono</h2>
        </span>
        <div className="polygon-form">
          <span className="input-row">
            <span>
              <label> Latitude:</label>{" "}
              <input
                type="text"
                value={coords[0]}
                onChange={(e) => {
                  setCoords([e.target.value, coords[1]]);
                }}
              />
            </span>
            <span>
              <label> Longitude:</label>{" "}
              <input
                type="text"
                value={coords[1]}
                onChange={(e) => {
                  setCoords([coords[0], e.target.value]);
                }}
              />
            </span>
          </span>
          <span className="input-row">
            <span>
              <label> Raio:</label>
              <input
                type="text"
                value={radius}
                onChange={(e) => {
                  setRadius(e.target.value);
                }}
              />
            </span>
            <span>
              <button className="button" onClick={generatePolygon}>
                Gerar
              </button>
            </span>
          </span>
        </div>
      </div>
      <div className="polygon-result">
        {resultArray.length !== 0 && JSON.stringify(resultArray)}
      </div>
    </div>
  );
}
