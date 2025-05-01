// react plugin for creating vector maps
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";

// Define the component props
interface CountryMapProps {
  mapColor?: string;
}

const CountryMap: React.FC<CountryMapProps> = ({ mapColor }) => {
  return (
    <VectorMap
      map={worldMill}
      backgroundColor="transparent"
      markerStyle={{
        initial: {
          fill: "#12baab",
          r: 4, // Custom radius for markers
        } as any, // Type assertion to bypass strict CSS property checks
      }}
      markersSelectable={true}
      markers={[
          {
              latLng: [37.0902, -95.7129],
              name: "USA",
              style: {
                  fill: "#12baab",
                  borderWidth: 1,
                  borderColor: "white",
              },
          },
          {
              latLng: [46.6034, 1.8883],
              name: "France",
              style: {
                  fill: "#12baab",
                  borderWidth: 1,
                  borderColor: "white",
              },
          },
          {
              latLng: [55.3781, -3.4360],
              name: "UK",
              style: {
                  fill: "#12baab",
                  borderWidth: 1,
                  borderColor: "white",
              },
          },
          {
              latLng: [61.9241, 25.7482],
              name: "Finland",
              style: {
                  fill: "#12baab",
                  borderWidth: 1,
                  borderColor: "white",
              },
          },
          {
              latLng: [50.5039, 4.4699],
              name: "Belgium",
              style: {
                  fill: "#12baab",
                  borderWidth: 1,
                  borderColor: "white",
              },
          },
      ]}
      zoomOnScroll={false}
      zoomMax={12}
      zoomMin={1}
      zoomAnimate={true}
      zoomStep={1.5}
      regionStyle={{
        initial: {
          fill: mapColor || "#D0D5DD",
          fillOpacity: 1,
          fontFamily: "Outfit",
          stroke: "none",
          strokeWidth: 0,
          strokeOpacity: 0,
        },
        hover: {
          fillOpacity: 0.7,
          cursor: "pointer",
          fill: "#12baab",
          stroke: "none",
        },
        selected: {
          fill: "#12baab",
        },
        selectedHover: {},
      }}
      regionLabelStyle={{
        initial: {
          fill: "#35373e",
          fontWeight: 500,
          fontSize: "13px",
          stroke: "none",
        },
        hover: {},
        selected: {},
        selectedHover: {},
      }}
    />
  );
};

export default CountryMap;
