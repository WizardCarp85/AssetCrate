const Asset = require('./Asset');

// @desc    Get all assets with filtering, sorting, and pagination
// @route   GET /api/assets
// @access  Public
exports.getAssets = async (req, res) => {
  try {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit', 'search'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resource
    let mongoQuery = JSON.parse(queryStr);

    // Search functionality
    if (req.query.search) {
      mongoQuery.title = { $regex: req.query.search, $options: 'i' };
    }

    query = Asset.find(mongoQuery);

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Asset.countDocuments(mongoQuery);

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const assets = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: assets.length,
      total,
      pagination,
      data: assets
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get single asset
// @route   GET /api/assets/:id
// @access  Public
exports.getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({ success: false, message: 'Asset not found' });
    }

    res.status(200).json({
      success: true,
      data: asset
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Seed assets
// @route   POST /api/assets/seed
// @access  Public (for dev)
exports.seedAssets = async (req, res) => {
  try {
    await Asset.deleteMany();

    const dummyAssets = [
      {
        title: "Sci-Fi Weapon Pack",
        description: "A collection of 10 high-quality sci-fi weapons including rifles, pistols, and energy blasters. PBR textures included.",
        category: "3D Models",
        price: 0,
        rating: 4.8,
        downloads: 1250,
        imageUrl: "https://images.unsplash.com/photo-1612287230217-969b698c8d13?auto=format&fit=crop&q=80&w=800",
        fileUrl: "https://drive.google.com/drive/u/0/my-drive",
        tags: ["scifi", "weapon", "gun", "3d"]
      },
      {
        title: "Low Poly Nature Kit",
        description: "Everything you need to create beautiful low poly environments. Trees, rocks, grass, and terrain assets.",
        category: "3D Models",
        price: 0,
        rating: 4.5,
        downloads: 3400,
        imageUrl: "https://images.unsplash.com/photo-1448375240586-dfd8f3793371?auto=format&fit=crop&q=80&w=800",
        fileUrl: "https://drive.google.com/drive/u/0/my-drive",
        tags: ["nature", "lowpoly", "environment"]
      },
      {
        title: "Cyberpunk City Textures",
        description: "Seamless 4K textures for cyberpunk and sci-fi environments. Neon signs, concrete, metal, and more.",
        category: "Textures",
        price: 0,
        rating: 4.9,
        downloads: 890,
        imageUrl: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=800",
        fileUrl: "https://drive.google.com/drive/u/0/my-drive",
        tags: ["cyberpunk", "texture", "city"]
      },
      {
        title: "RPG Fantasy UI Kit",
        description: "Complete UI kit for RPG games. Buttons, panels, icons, and HUD elements in a fantasy style.",
        category: "UI",
        price: 0,
        rating: 4.7,
        downloads: 2100,
        imageUrl: "https://images.unsplash.com/photo-1614726365723-49cfae927832?auto=format&fit=crop&q=80&w=800",
        fileUrl: "https://drive.google.com/drive/u/0/my-drive",
        tags: ["ui", "rpg", "fantasy", "interface"]
      },
      {
        title: "8-Bit Retro Sound Effects",
        description: "Over 200 retro sound effects for platformers and arcade games. Jumps, coins, explosions, and powerups.",
        category: "Sounds",
        price: 0,
        rating: 4.6,
        downloads: 5600,
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
        fileUrl: "https://drive.google.com/drive/u/0/my-drive",
        tags: ["sound", "sfx", "retro", "8bit"]
      },
      {
        title: "Ultimate FPS Controller",
        description: "Production-ready First Person Controller script with movement, jumping, crouching, and sliding.",
        category: "Scripts",
        price: 0,
        rating: 4.9,
        downloads: 1500,
        imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
        fileUrl: "https://drive.google.com/drive/u/0/my-drive",
        tags: ["script", "fps", "controller", "code"]
      },
      {
        title: "Magic Spells VFX",
        description: "Stunning particle effects for magic spells. Fireballs, ice shards, healing auras, and lightning strikes.",
        category: "VFX",
        price: 0,
        rating: 4.8,
        downloads: 980,
        imageUrl: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?auto=format&fit=crop&q=80&w=800",
        fileUrl: "https://drive.google.com/drive/u/0/my-drive",
        tags: ["vfx", "magic", "particles"]
      },
      {
        title: "Dungeon Ambient Music",
        description: "Dark and atmospheric background music tracks for dungeon crawlers and horror games.",
        category: "Sounds",
        price: 0,
        rating: 4.4,
        downloads: 1200,
        imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80&w=800",
        fileUrl: "https://drive.google.com/drive/u/0/my-drive",
        tags: ["music", "ambient", "dungeon"]
      },
      {
        title: "Modern Apartment Interior",
        description: "Realistic 3D models of modern furniture and interior decor. Perfect for architectural visualization.",
        category: "3D Models",
        price: 0,
        rating: 4.7,
        downloads: 850,
        imageUrl: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=800",
        fileUrl: "https://drive.google.com/drive/u/0/my-drive",
        tags: ["interior", "furniture", "modern"]
      },
      {
        title: "Realistic Water Shader",
        description: "High-performance water shader with reflection, refraction, and wave simulation.",
        category: "VFX",
        price: 0,
        rating: 4.9,
        downloads: 2300,
        imageUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&q=80&w=800",
        fileUrl: "https://drive.google.com/drive/u/0/my-drive",
        tags: ["shader", "water", "vfx"]
      },
      {
        title: "Space Station Environment",
        description: "Modular space station corridors and rooms. Build your own sci-fi levels easily.",
        category: "3D Models",
        price: 0,
        rating: 4.6,
        downloads: 1100,
        imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800",
        fileUrl: "https://drive.google.com/drive/u/0/my-drive",
        tags: ["scifi", "space", "environment"]
      },
      {
        title: "Horror Sound Pack",
        description: "Terrifying sound effects for horror games. Screams, creaks, whispers, and jumpscares.",
        category: "Sounds",
        price: 0,
        rating: 4.8,
        downloads: 3100,
        imageUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=800",
        fileUrl: "https://drive.google.com/drive/u/0/my-drive",
        tags: ["horror", "sound", "scary"]
      },
      {
        title: "Inventory System",
        description: "Flexible inventory system with drag-and-drop support, stacking, and equipment slots.",
        category: "Scripts",
        price: 0,
        rating: 4.5,
        downloads: 1800,
        imageUrl: "https://images.unsplash.com/photo-1553481187-be93c21490a9?auto=format&fit=crop&q=80&w=800",
        fileUrl: "https://drive.google.com/drive/u/0/my-drive",
        tags: ["inventory", "system", "script"]
      },
      {
        title: "Pixel Art Characters",
        description: "A pack of 50 animated pixel art characters for 2D games. Heroes, monsters, and NPCs.",
        category: "2D",
        price: 0,
        rating: 4.7,
        downloads: 4200,
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
        fileUrl: "https://drive.google.com/drive/u/0/my-drive",
        tags: ["pixelart", "2d", "character"]
      },
      {
        title: "Orchestral Epic Music",
        description: "Epic orchestral tracks for boss battles and cinematic cutscenes.",
        category: "Sounds",
        price: 0,
        rating: 4.9,
        downloads: 1600,
        imageUrl: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?auto=format&fit=crop&q=80&w=800",
        fileUrl: "https://drive.google.com/drive/u/0/my-drive",
        tags: ["music", "orchestral", "epic"]
      },
      {
        title: "Vehicle Physics Controller",
        description: "Realistic vehicle physics for racing games. Suspension, engine simulation, and drifting.",
        category: "Scripts",
        price: 0,
        rating: 4.6,
        downloads: 950,
        imageUrl: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800",
        fileUrl: "https://drive.google.com/drive/u/0/my-drive",
        tags: ["vehicle", "physics", "racing"]
      }
    ];

    await Asset.create(dummyAssets);

    res.status(201).json({
      success: true,
      message: 'Assets seeded successfully',
      data: dummyAssets
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
