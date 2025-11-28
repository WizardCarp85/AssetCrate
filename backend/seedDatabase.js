const mongoose = require('mongoose');
require('dotenv').config();

const Asset = require('./assets/Asset');
const User = require('./user/User');

// Sample seed data for assets
const seedAssets = [
  {
    title: "Cyberpunk City Pack",
    description: "Complete cyberpunk city environment with neon lights, futuristic buildings, and detailed props. Perfect for sci-fi games.",
    category: "3D Models",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800",
    fileUrl: "https://example.com/assets/cyberpunk-city.zip",
    fileSize: 256000000,
    tags: ["cyberpunk", "city", "environment", "sci-fi", "neon"],
    author: "admin",
    downloads: 1234,
    views: 5678,
    favorites: 234,
    approvalStatus: "approved",
    price: 0
  },
  {
    title: "Fantasy Forest Assets",
    description: "Beautiful fantasy forest pack with trees, rocks, plants, and magical elements. Optimized for performance.",
    category: "3D Models",
    imageUrl: "https://images.unsplash.com/photo-1511497584788-876760111969?w=800",
    fileUrl: "https://example.com/assets/fantasy-forest.zip",
    fileSize: 180000000,
    tags: ["fantasy", "forest", "nature", "trees", "magic"],
    author: "admin",
    downloads: 987,
    views: 3456,
    favorites: 156,
    approvalStatus: "approved",
    price: 0
  },
  {
    title: "Sci-Fi Weapon Pack",
    description: "Collection of 20 high-quality sci-fi weapons with PBR textures. Includes rifles, pistols, and energy weapons.",
    category: "3D Models",
    imageUrl: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800",
    fileUrl: "https://example.com/assets/scifi-weapons.zip",
    fileSize: 95000000,
    tags: ["weapons", "sci-fi", "guns", "futuristic", "pbr"],
    author: "admin",
    downloads: 2341,
    views: 8901,
    favorites: 445,
    approvalStatus: "approved",
    price: 0
  },
  {
    title: "Medieval Castle Kit",
    description: "Modular medieval castle building kit with walls, towers, gates, and interior pieces. Easy to customize.",
    category: "3D Models",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
    fileUrl: "https://example.com/assets/medieval-castle.zip",
    fileSize: 320000000,
    tags: ["medieval", "castle", "modular", "architecture", "stone"],
    author: "admin",
    downloads: 1567,
    views: 6234,
    favorites: 289,
    approvalStatus: "approved",
    price: 0
  },
  {
    title: "Space Skybox Collection",
    description: "10 stunning space skyboxes in 4K resolution. Includes nebulas, star fields, and planetary backgrounds.",
    category: "Textures",
    imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800",
    fileUrl: "https://example.com/assets/space-skyboxes.zip",
    fileSize: 145000000,
    tags: ["skybox", "space", "4k", "nebula", "stars"],
    author: "admin",
    downloads: 3456,
    views: 12345,
    favorites: 678,
    approvalStatus: "approved",
    price: 0
  },
  {
    title: "PBR Material Library",
    description: "200+ PBR materials including metal, wood, stone, fabric, and more. 4K textures with all maps.",
    category: "Textures",
    imageUrl: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800",
    fileUrl: "https://example.com/assets/pbr-materials.zip",
    fileSize: 890000000,
    tags: ["pbr", "materials", "textures", "4k", "seamless"],
    author: "admin",
    downloads: 5678,
    views: 23456,
    favorites: 1234,
    approvalStatus: "approved",
    price: 0
  },
  {
    title: "Epic Battle SFX Pack",
    description: "500+ high-quality battle sound effects. Includes swords, explosions, magic spells, and ambient sounds.",
    category: "Sounds",
    imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800",
    fileUrl: "https://example.com/assets/battle-sfx.zip",
    fileSize: 234000000,
    tags: ["sfx", "battle", "combat", "explosions", "magic"],
    author: "admin",
    downloads: 2890,
    views: 9876,
    favorites: 456,
    approvalStatus: "approved",
    price: 0
  },
  {
    title: "UI Sound Effects",
    description: "Clean and modern UI sound effects for menus, buttons, notifications, and transitions.",
    category: "Sounds",
    imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800",
    fileUrl: "https://example.com/assets/ui-sounds.zip",
    fileSize: 45000000,
    tags: ["ui", "sfx", "menu", "buttons", "interface"],
    author: "admin",
    downloads: 4321,
    views: 15678,
    favorites: 789,
    approvalStatus: "approved",
    price: 0
  },
  {
    title: "Inventory System Script",
    description: "Complete inventory system with drag-and-drop, stacking, and equipment slots. Unity C# script.",
    category: "Scripts",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    fileUrl: "https://example.com/assets/inventory-system.zip",
    fileSize: 2500000,
    tags: ["inventory", "unity", "c#", "ui", "system"],
    author: "admin",
    downloads: 6789,
    views: 28901,
    favorites: 1456,
    approvalStatus: "approved",
    price: 0
  },
  {
    title: "AI Pathfinding System",
    description: "Advanced AI pathfinding with A* algorithm, dynamic obstacles, and navmesh support.",
    category: "Scripts",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800",
    fileUrl: "https://example.com/assets/ai-pathfinding.zip",
    fileSize: 3200000,
    tags: ["ai", "pathfinding", "astar", "navigation", "unity"],
    author: "admin",
    downloads: 3456,
    views: 14567,
    favorites: 678,
    approvalStatus: "approved",
    price: 0
  },
  {
    title: "Particle Effects VFX",
    description: "100+ particle effects including fire, smoke, magic, explosions, and environmental effects.",
    category: "VFX",
    imageUrl: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800",
    fileUrl: "https://example.com/assets/particle-vfx.zip",
    fileSize: 178000000,
    tags: ["vfx", "particles", "effects", "fire", "magic"],
    author: "admin",
    downloads: 4567,
    views: 19876,
    favorites: 890,
    approvalStatus: "approved",
    price: 0
  },
  {
    title: "Modern Game UI Kit",
    description: "Complete UI kit with buttons, panels, icons, and HUD elements. Includes PSD source files.",
    category: "UI",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
    fileUrl: "https://example.com/assets/game-ui-kit.zip",
    fileSize: 125000000,
    tags: ["ui", "interface", "hud", "buttons", "modern"],
    author: "admin",
    downloads: 7890,
    views: 34567,
    favorites: 1678,
    approvalStatus: "approved",
    price: 0
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');

    // Clear existing assets (optional - comment out if you want to keep existing data)
    // await Asset.deleteMany({});
    // console.log('🗑️  Cleared existing assets');

    // Check if assets already exist
    const existingCount = await Asset.countDocuments();
    if (existingCount > 0) {
      console.log(`ℹ️  Database already has ${existingCount} assets. Skipping seed.`);
      console.log('   Delete assets manually or uncomment deleteMany() to reseed.');
      process.exit(0);
    }

    // Insert seed data
    const result = await Asset.insertMany(seedAssets);
    console.log(`✅ Successfully seeded ${result.length} assets`);

    // Show summary
    const approved = await Asset.countDocuments({ approvalStatus: 'approved' });
    const pending = await Asset.countDocuments({ approvalStatus: 'pending' });
    
    console.log(`\n📊 Asset Status Summary:`);
    console.log(`   Approved: ${approved}`);
    console.log(`   Pending: ${pending}`);
    console.log(`   Total: ${approved + pending}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
