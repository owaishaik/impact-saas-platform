import db from "../models/index.js";

const { Startup, Project, ImpactResult } = db;

// Get all startups with their total impact
export const getStartupImpacts = async () => {
  const startups = await Startup.findAll({
    include: {
      model: Project,
      include: {
        model: ImpactResult,
      },
    },
  });

  const result = startups.map((startup) => {
    let totalImpact = 0;

    startup.Projects.forEach((project) => {
      if (project.ImpactResult) {
        totalImpact += project.ImpactResult.ghgAvoided;
      }
    });

    return {
      startupId: startup.id,
      startupName: startup.name,
      totalImpact,
    };
  });

  return result;
};

// Get overall aggregated impact
export const getTotalImpact = async () => {
  const impacts = await ImpactResult.findAll();

  const total = impacts.reduce(
    (sum, item) => sum + item.ghgAvoided,
    0
  );

  return total;
};