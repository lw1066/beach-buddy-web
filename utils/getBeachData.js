import axios from "axios";
import { Platform } from "react-native";

const getBeachData = async () => {
  try {
    const baseUrl = Platform.OS === "web"
      ? "/ea/beaches"
      : "https://environment.data.gov.uk/doc/bathing-water.json";
    const response = await axios.get(
      `${baseUrl}?_view=basic&_properties=latestProfile,samplingPoint.lat,samplingPoint.long,latestComplianceAssessment.complianceClassification.name,type,${Platform.OS === "web" ? "latestRiskPrediction.expiresAt,latestRiskPrediction.prfOriginType," : ""}latestRiskPrediction.predictedOn,latestRiskPrediction.riskLevel.label&_pageSize=1000`
    );
    const beaches = response.data.result.items.reduce((acc, item) => {
      const beachName = item.label[0]._value;
      const rating =
        item.latestComplianceAssessment?.complianceClassification?.name
          ?._value || "No rating available";
      const isCoastal = item.type.some(
        (type) =>
          type ===
          "http://environment.data.gov.uk/def/bathing-water/CoastalBathingWater"
      );
      acc[beachName] = {
        details: item._about,
        latestProfile: item.latestProfile || "No description available",
        lat: item.samplingPoint.lat,
        long: item.samplingPoint.long,
        ...(Platform.OS === "web" ? {
          forecastOrigin: typeof item?.latestRiskPrediction?.prfOriginType === "string"
            ? item.latestRiskPrediction.prfOriginType
            : item?.latestRiskPrediction?.prfOriginType?._value || null,
          riskExpiresAt: item?.latestRiskPrediction?.expiresAt?._value || null,
        } : {}),
        riskDate:
          item?.latestRiskPrediction?.predictedOn?._value ||
          "No data available",
        riskLevel:
          item?.latestRiskPrediction?.riskLevel?.label[0]?._value ||
          "No data available",
        rating: rating,
        isCoastal: isCoastal,
      };
      return acc;
    }, {});

    return beaches;
  } catch (error) {
    console.error("Error fetching bathing water data:", error);
    console.log(error);
    throw error;
  }
};

export default getBeachData;

