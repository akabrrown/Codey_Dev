import { db, services } from "./client";

async function main() {
  console.log("Seeding distinct services for Production and Student projects...");

  const newServices = [
    {
      name: "Website Development (Production)",
      slug: "website-production",
      description: "Live business or corporate website for commercial use.",
      basePriceMin: "2000.00",
      basePriceMax: "10000.00",
      sortOrder: 10,
    },
    {
      name: "Website Development (Student Project)",
      slug: "website-student",
      description: "Academic or student project website, generally hosted on free-tier platforms.",
      basePriceMin: "500.00",
      basePriceMax: "2000.00",
      sortOrder: 20,
    },
    {
      name: "Mobile App Development (Production)",
      slug: "mobile-production",
      description: "Production-ready mobile application for App Store / Play Store.",
      basePriceMin: "4000.00",
      basePriceMax: "20000.00",
      sortOrder: 30,
    },
    {
      name: "Mobile App Development (Student Project)",
      slug: "mobile-student",
      description: "Mobile application for academic defense, usually demoed on an emulator or direct install.",
      basePriceMin: "1000.00",
      basePriceMax: "3000.00",
      sortOrder: 40,
    },
  ];

  for (const svc of newServices) {
    try {
      await db.insert(services).values(svc).onConflictDoNothing({ target: services.slug });
      console.log(`Ensured service exists: ${svc.name}`);
    } catch (err) {
      console.error(`Failed to insert ${svc.name}:`, err);
    }
  }

  console.log("Seeding complete. Exiting...");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
