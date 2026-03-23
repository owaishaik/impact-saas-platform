const emissionFactors = {
  "2W": {
    petrolEF: 0.003, // 3 kg → 0.003 tCO2/km
    electricityEF: 0.01,
    energyPerKm: 0.04, // assumed kWh/km
  },
  "4W": {
    petrolEF: 0.003,
    electricityEF: 0.01,
    energyPerKm: 0.15,
  },
};

export const calculateGHG = ({ vehicleType, vehiclesSold, distance }) => {
  const factors = emissionFactors[vehicleType];

  if (!factors) {
    throw new Error("Invalid vehicle type");
  }

  // Baseline (petrol)
  const baseline =
    vehiclesSold * distance * factors.petrolEF;

  // EV energy consumption
  const energyUsed =
    vehiclesSold * distance * factors.energyPerKm;

  // Project emissions
  const projectEmission =
    energyUsed * factors.electricityEF;

  // Final impact
  const ghgAvoided = baseline - projectEmission;

  return {
    baseline,
    projectEmission,
    ghgAvoided,
  };
};