import * as investorService from "../services/investor.service.js";

export const getDashboard = async (req, res) => {
  try {
    const startupImpacts =
      await investorService.getStartupImpacts();

    const totalImpact =
      await investorService.getTotalImpact();

    res.json({
      totalImpact,
      startups: startupImpacts,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};