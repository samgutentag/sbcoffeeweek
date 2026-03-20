// SB Coffee Week 2026 — Cafe & Restaurant Data
// Event: March 19–28, 2026
// Source: Santa Barbara Independent
const SOURCE_URL =
  "https://www.independent.com/2026/03/18/here-comes-santa-barbara-coffee-week/";

const AREA_COLORS = {
  Downtown: "#e63946",
  "Upper State": "#e9c46a",
  Westside: "#457b9d",
  Goleta: "#2a9d8f",
  Carpinteria: "#8338ec",
  Montecito: "#f4a261",
};

const restaurants = [
  // ==========================================
  // JUST COFFEE (justCoffee: true)
  // ==========================================

  // --- Goleta ---
  {
    name: "Del Pueblo Café",
    address: "5134 Hollister Ave, Goleta, CA",
    website: "http://dpcsb.com/",
    phone: "(805) 692-8800",
    instagram: null,
    area: "Goleta",
    lat: 34.4353,
    lng: -119.8042,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Del+Pueblo+Cafe+5134+Hollister+Ave+Goleta+CA",
    appleMapsUrl: null,
    justCoffee: true,
    coffeeWithFood: false,
    coffeeAsCocktail: false,
    menuItems: [
      {
        name: "La Lucha Latte",
        description:
          "Piloncillo, orange peel, star anise with espresso. $5",
      },
      {
        name: "Mi Plátano Canelo Latte",
        description: "Banana, vanilla, brown sugar. $5",
      },
      {
        name: "Arcoíris Cold Brew",
        description: "Lavender-rose cold foam. $5",
      },
    ],
  },

  // --- Dune Coffee (4 locations) ---
  {
    name: "Dune Coffee (Anacapa)",
    address: "528 Anacapa St, Santa Barbara, CA",
    website: "https://www.dunecoffee.com",
    phone: "(805) 962-7733",
    instagram: "dunecoffeeroasters",
    area: "Downtown",
    lat: 34.4178,
    lng: -119.6941,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Dune+Coffee+528+Anacapa+St+Santa+Barbara+CA",
    appleMapsUrl: null,
    justCoffee: true,
    coffeeWithFood: false,
    coffeeAsCocktail: false,
    menuItems: [
      {
        name: "Espresso Tonic",
        description: "Available dine-in and to-go. $5",
      },
      {
        name: "Zip Zinger Three Ways",
        description:
          "Espresso, macchiato, drip (Honduras, Colombia, Ethiopia blend). Dine-in only. $10",
      },
    ],
  },
  {
    name: "Dune Coffee (Calle Real)",
    address: "5915 Calle Real, Goleta, CA",
    website: "https://www.dunecoffee.com",
    phone: "(805) 869-2748",
    instagram: "dunecoffeeroasters",
    area: "Goleta",
    lat: 34.4413,
    lng: -119.8306,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Dune+Coffee+5915+Calle+Real+Goleta+CA",
    appleMapsUrl: null,
    justCoffee: true,
    coffeeWithFood: false,
    coffeeAsCocktail: false,
    menuItems: [
      {
        name: "Espresso Tonic",
        description: "Available dine-in and to-go. $5",
      },
      {
        name: "Zip Zinger Three Ways",
        description:
          "Espresso, macchiato, drip (Honduras, Colombia, Ethiopia blend). Dine-in only. $10",
      },
    ],
  },
  {
    name: "Dune Coffee (State St)",
    address: "1101 State St, Santa Barbara, CA",
    website: "https://www.dunecoffee.com",
    phone: "(805) 963-2721",
    instagram: "dunecoffeeroasters",
    area: "Downtown",
    lat: 34.4233,
    lng: -119.7043,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Dune+Coffee+1101+State+St+Santa+Barbara+CA",
    appleMapsUrl: null,
    justCoffee: true,
    coffeeWithFood: false,
    coffeeAsCocktail: false,
    menuItems: [
      {
        name: "Espresso Tonic",
        description: "Available dine-in and to-go. $5",
      },
      {
        name: "Zip Zinger Three Ways",
        description:
          "Espresso, macchiato, drip (Honduras, Colombia, Ethiopia blend). Dine-in only. $10",
      },
    ],
  },
  {
    name: "Dune Coffee (Storke)",
    address: "250 Storke Rd, Goleta, CA",
    website: "https://www.dunecoffee.com",
    phone: "(805) 968-0493",
    instagram: "dunecoffeeroasters",
    area: "Goleta",
    lat: 34.4330,
    lng: -119.8622,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Dune+Coffee+250+Storke+Rd+Goleta+CA",
    appleMapsUrl: null,
    justCoffee: true,
    coffeeWithFood: false,
    coffeeAsCocktail: false,
    menuItems: [
      {
        name: "Espresso Tonic",
        description: "Available dine-in and to-go. $5",
      },
      {
        name: "Zip Zinger Three Ways",
        description:
          "Espresso, macchiato, drip (Honduras, Colombia, Ethiopia blend). Dine-in only. $10",
      },
    ],
  },

  // --- Lighthouse Coffee (5 locations) ---
  {
    name: "Lighthouse Coffee (Cliff Dr)",
    address: "1819 Cliff Dr Ste C, Santa Barbara, CA",
    website: "https://www.lighthousecoffee.com",
    phone: "(805) 770-3911",
    instagram: "lighthousecoffee",
    area: "Westside",
    lat: 34.4013,
    lng: -119.7224,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Lighthouse+Coffee+1819+Cliff+Dr+Ste+C+Santa+Barbara+CA",
    appleMapsUrl: null,
    justCoffee: true,
    coffeeWithFood: false,
    coffeeAsCocktail: false,
    menuItems: [
      {
        name: "Orange Honey Vanilla Latte",
        description:
          "Local fruit simple syrup with house-made honey, available hot or cold. $5",
      },
    ],
  },
  {
    name: "Lighthouse Coffee (Chapala)",
    address: "711 Chapala St, Santa Barbara, CA",
    website: "https://www.lighthousecoffee.com",
    phone: "(805) 324-4973",
    instagram: "lighthousecoffee",
    area: "Downtown",
    lat: 34.4179,
    lng: -119.6991,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Lighthouse+Coffee+711+Chapala+St+Santa+Barbara+CA",
    appleMapsUrl: null,
    justCoffee: true,
    coffeeWithFood: false,
    coffeeAsCocktail: false,
    menuItems: [
      {
        name: "Orange Honey Vanilla Latte",
        description:
          "Local fruit simple syrup with house-made honey, available hot or cold. $5",
      },
    ],
  },
  {
    name: "Lighthouse Coffee (Haley)",
    address: "401 E Haley St, Santa Barbara, CA",
    website: "https://www.lighthousecoffee.com",
    phone: null,
    instagram: "lighthousecoffee",
    area: "Downtown",
    lat: 34.4199,
    lng: -119.6914,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Lighthouse+Coffee+401+E+Haley+St+Santa+Barbara+CA",
    appleMapsUrl: null,
    justCoffee: true,
    coffeeWithFood: false,
    coffeeAsCocktail: false,
    menuItems: [
      {
        name: "Orange Honey Vanilla Latte",
        description:
          "Local fruit simple syrup with house-made honey, available hot or cold. $5",
      },
    ],
  },
  {
    name: "Lighthouse Coffee (Turnpike)",
    address: "199 S Turnpike Rd, Goleta, CA",
    website: "https://www.lighthousecoffee.com",
    phone: "(805) 679-5153",
    instagram: "lighthousecoffee",
    area: "Goleta",
    lat: 34.4375,
    lng: -119.7900,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Lighthouse+Coffee+199+S+Turnpike+Rd+Goleta+CA",
    appleMapsUrl: null,
    justCoffee: true,
    coffeeWithFood: false,
    coffeeAsCocktail: false,
    menuItems: [
      {
        name: "Orange Honey Vanilla Latte",
        description:
          "Local fruit simple syrup with house-made honey, available hot or cold. $5",
      },
    ],
  },
  {
    name: "Lighthouse Coffee (Calle Real)",
    address: "5696 Calle Real, Goleta, CA",
    website: "https://www.lighthousecoffee.com",
    phone: "(805) 679-5424",
    instagram: "lighthousecoffee",
    area: "Goleta",
    lat: 34.4408,
    lng: -119.8230,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Lighthouse+Coffee+5696+Calle+Real+Goleta+CA",
    appleMapsUrl: null,
    justCoffee: true,
    coffeeWithFood: false,
    coffeeAsCocktail: false,
    menuItems: [
      {
        name: "Orange Honey Vanilla Latte",
        description:
          "Local fruit simple syrup with house-made honey, available hot or cold. $5",
      },
    ],
  },

  // --- Carpinteria ---
  {
    name: "Lucky Llama Coffee House",
    address: "5100 Carpinteria Ave, Carpinteria, CA",
    website: "https://www.luckyllamacoffee.com/",
    phone: "(805) 684-8811",
    instagram: "luckyllamacoffee",
    area: "Carpinteria",
    lat: 34.3983,
    lng: -119.5172,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Lucky+Llama+Coffee+House+5100+Carpinteria+Ave+Carpinteria+CA",
    appleMapsUrl: null,
    justCoffee: true,
    coffeeWithFood: false,
    coffeeAsCocktail: false,
    menuItems: [
      {
        name: "Mayan Mocha",
        description:
          "Cinnamon and cayenne with cocoa powder and espresso. $5",
      },
    ],
  },

  // --- Downtown ---
  {
    name: "Santa Barbara Roasting Company",
    address: "321 Motor Way, Santa Barbara, CA",
    website: "https://www.sbcoffee.com",
    phone: "805-962-0320",
    instagram: "sbroastingco",
    area: "Downtown",
    lat: 34.4156,
    lng: -119.6870,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Santa+Barbara+Roasting+Company+321+Motor+Way+Santa+Barbara+CA",
    appleMapsUrl: null,
    justCoffee: true,
    coffeeWithFood: false,
    coffeeAsCocktail: false,
    menuItems: [
      {
        name: "RoCo Flat White",
        description:
          "Breve made with light-roast Espresso Milano, whole milk, cinnamon dust. $5",
      },
    ],
  },

  // ==========================================
  // COFFEE WITH FOOD (coffeeWithFood: true)
  // ==========================================

  // --- Carpinteria ---
  {
    name: "Carp Moon Café",
    address: "4991 Carpinteria Ave, Carpinteria, CA",
    website: "https://carpmooncafe.com/",
    phone: "(805) 318-9444",
    instagram: null,
    area: "Carpinteria",
    lat: 34.3985,
    lng: -119.5188,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Carp+Moon+Cafe+4991+Carpinteria+Ave+Carpinteria+CA",
    appleMapsUrl: null,
    justCoffee: false,
    coffeeWithFood: true,
    coffeeAsCocktail: false,
    menuItems: [
      {
        name: "Café de Olla",
        description:
          "Traditional Mexican spiced coffee, served with banana bread. $5",
      },
      {
        name: "Shaken Moon Espresso",
        description:
          "Double organic espresso, brown sugar, oat milk, served with waffles and berries. $10",
      },
    ],
  },

  // --- Downtown (reused from burger week) ---
  {
    name: "Crushcakes & Café (Anacapa)",
    address: "1315 Anacapa St, Santa Barbara, CA",
    website: "https://www.crushcakes.com",
    phone: "805-963-9353",
    instagram: "crushcakescafe",
    area: "Downtown",
    lat: 34.425637,
    lng: -119.705214,
    mapUrl: "https://maps.app.goo.gl/BwkDspDsomjtTNk79",
    appleMapsUrl: "https://maps.apple/p/u2LdIBaUBhX.u.z",
    justCoffee: false,
    coffeeWithFood: true,
    coffeeAsCocktail: false,
    menuItems: [
      {
        name: "Brown Bear Cold Foam",
        description:
          "Vanilla cold-brew brewed with cinnamon and nutmeg, with brown-sugar foam. $5",
      },
      {
        name: "Brown Bear Cold Foam + Pastry",
        description:
          "Same drink with choice of blueberry muffin or chocolate-chip scone. $10",
      },
    ],
  },

  // --- Goleta (reused from burger week) ---
  {
    name: "Crushcakes & Café (Hollister)",
    address: "5392 Hollister Ave, Goleta, CA",
    website: "https://www.crushcakes.com",
    phone: "805-845-2780",
    instagram: "crushcakescafe",
    area: "Goleta",
    lat: 34.435346,
    lng: -119.812297,
    mapUrl: "https://maps.app.goo.gl/YXrd5iwBn4oCouXA9",
    appleMapsUrl: "https://maps.apple/p/Ir9WS14tYcDv6N",
    justCoffee: false,
    coffeeWithFood: true,
    coffeeAsCocktail: false,
    menuItems: [
      {
        name: "Brown Bear Cold Foam",
        description:
          "Vanilla cold-brew brewed with cinnamon and nutmeg, with brown-sugar foam. $5",
      },
      {
        name: "Brown Bear Cold Foam + Pastry",
        description:
          "Same drink with choice of blueberry muffin or chocolate-chip scone. $10",
      },
    ],
  },

  // --- Downtown ---
  {
    name: "Goodland Waffles & Melts",
    address: "1131 State St, Santa Barbara, CA",
    website: "https://www.goodlandwaffles.com/",
    phone: "(805) 259-4356",
    instagram: "goodlandwaffles",
    area: "Downtown",
    lat: 34.4238,
    lng: -119.7049,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Goodland+Waffles+and+Melts+1131+State+St+Santa+Barbara+CA",
    appleMapsUrl: null,
    justCoffee: false,
    coffeeWithFood: true,
    coffeeAsCocktail: false,
    menuItems: [
      {
        name: "Salted Maple Latte",
        description:
          "Groundwork Coffee's Black Magic Espresso with house-made salted maple syrup. $5",
      },
      {
        name: "Salted Maple Latte + Waffle",
        description:
          "Same latte served with a waffle and syrup. $10",
      },
    ],
  },

  // --- Renaud's Patisserie (4 locations) ---
  {
    name: "Renaud's Patisserie (3315 State)",
    address: "3315 State St, Santa Barbara, CA",
    website: "https://www.renaudspatisserie.com",
    phone: "805-569-2400",
    instagram: "renaudspatisserie",
    area: "Upper State",
    lat: 34.4393,
    lng: -119.7358,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Renauds+Patisserie+3315+State+St+Santa+Barbara+CA",
    appleMapsUrl: null,
    justCoffee: false,
    coffeeWithFood: true,
    coffeeAsCocktail: false,
    menuItems: [
      {
        name: "Drip Coffee & Croissant",
        description:
          "Choice of Hawaiian, French, or Guatemalan roast with Peerless Coffee. $5",
      },
      {
        name: "Drip Coffee & Croissant BLT",
        description:
          "Croissant with aioli, ham, bacon, lettuce, red onion. $10",
      },
    ],
  },
  {
    name: "Renaud's Patisserie (1324 State)",
    address: "1324 State St, Santa Barbara, CA",
    website: "https://www.renaudspatisserie.com",
    phone: "805-892-2800",
    instagram: "renaudspatisserie",
    area: "Upper State",
    lat: 34.4260,
    lng: -119.7063,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Renauds+Patisserie+1324+State+St+Santa+Barbara+CA",
    appleMapsUrl: null,
    justCoffee: false,
    coffeeWithFood: true,
    coffeeAsCocktail: false,
    menuItems: [
      {
        name: "Drip Coffee & Croissant",
        description:
          "Choice of Hawaiian, French, or Guatemalan roast with Peerless Coffee. $5",
      },
      {
        name: "Drip Coffee & Croissant BLT",
        description:
          "Croissant with aioli, ham, bacon, lettuce, red onion. $10",
      },
    ],
  },
  {
    name: "Renaud's Patisserie (Coast Village)",
    address: "1187 Coast Village Rd, Montecito, CA",
    website: "https://www.renaudspatisserie.com",
    phone: "805-565-8760",
    instagram: "renaudspatisserie",
    area: "Montecito",
    lat: 34.4264,
    lng: -119.6327,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Renauds+Patisserie+1187+Coast+Village+Rd+Montecito+CA",
    appleMapsUrl: null,
    justCoffee: false,
    coffeeWithFood: true,
    coffeeAsCocktail: false,
    menuItems: [
      {
        name: "Drip Coffee & Croissant",
        description:
          "Choice of Hawaiian, French, or Guatemalan roast with Peerless Coffee. $5",
      },
      {
        name: "Drip Coffee & Croissant BLT",
        description:
          "Croissant with aioli, ham, bacon, lettuce, red onion. $10",
      },
    ],
  },
  {
    name: "Renaud's Patisserie (Gelson's)",
    address: "3305 State St, Santa Barbara, CA",
    website: "https://www.renaudspatisserie.com",
    phone: "805-569-2400",
    instagram: "renaudspatisserie",
    area: "Upper State",
    lat: 34.4391,
    lng: -119.7355,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Renauds+Patisserie+Gelsons+3305+State+St+Santa+Barbara+CA",
    appleMapsUrl: null,
    justCoffee: false,
    coffeeWithFood: true,
    coffeeAsCocktail: false,
    menuItems: [
      {
        name: "Drip Coffee & Croissant",
        description:
          "Choice of Hawaiian, French, or Guatemalan roast with Peerless Coffee. $5",
      },
      {
        name: "Drip Coffee & Croissant BLT",
        description:
          "Croissant with aioli, ham, bacon, lettuce, red onion. $10",
      },
    ],
  },

  // --- Downtown (reused from burger week) ---
  {
    name: "Third Window Brewing (Santa Barbara)",
    address: "406 E Haley St Ste 3, Santa Barbara, CA",
    website: "https://www.thirdwindowbrewing.com",
    phone: "805-979-5090",
    instagram: "thirdwindowbrewing",
    area: "Downtown",
    lat: 34.420992,
    lng: -119.690444,
    mapUrl: "https://maps.app.goo.gl/CxyGVg16v1dAXkVq6",
    appleMapsUrl: "https://maps.apple/p/o2.x6VY5-8B~c4",
    justCoffee: false,
    coffeeWithFood: true,
    coffeeAsCocktail: false,
    menuItems: [
      {
        name: "Oatey McOatface",
        description:
          "Oatmeal stout brewed with Handlebar Coffee beans. $5",
      },
      {
        name: "Oatey McOatface + Espresso Cheesecake",
        description:
          "Same beer served with espresso cheesecake. Dine-in only, kitchen hours. $10",
      },
    ],
  },

  // --- Carpinteria (reused from burger week) ---
  {
    name: "Third Window Brewing (Carpinteria)",
    address: "720 Linden Ave, Carpinteria, CA",
    website: "https://www.thirdwindowbrewing.com",
    phone: "+1 (805) 562-6475",
    instagram: "thirdwindowbrewing",
    area: "Carpinteria",
    lat: 34.39704,
    lng: -119.520395,
    mapUrl: "https://maps.app.goo.gl/gpcE5McRYoq2aY4MA",
    appleMapsUrl: "https://maps.apple/p/HhNum2x75sTZXQ",
    justCoffee: false,
    coffeeWithFood: true,
    coffeeAsCocktail: false,
    menuItems: [
      {
        name: "Oatey McOatface",
        description:
          "Oatmeal stout brewed with Handlebar Coffee beans. $5",
      },
      {
        name: "Oatey McOatface + Espresso Cheesecake",
        description:
          "Same beer served with espresso cheesecake. Dine-in only, kitchen hours. $10",
      },
    ],
  },

  // ==========================================
  // COFFEE AS COCKTAIL (coffeeAsCocktail: true)
  // ==========================================

  // --- Goleta (reused from burger week) ---
  {
    name: "CAYA Restaurant",
    address: "5650 Calle Real, Goleta, CA",
    website: "https://www.cayarestaurant.com",
    phone: "805-964-1288",
    instagram: "cayarestaurant",
    area: "Goleta",
    lat: 34.441588,
    lng: -119.820858,
    mapUrl: "https://maps.app.goo.gl/KDWoCpGP4Bj5tKxG8",
    appleMapsUrl: "https://maps.apple/p/qsKhePr8N5NbRr",
    justCoffee: false,
    coffeeWithFood: false,
    coffeeAsCocktail: true,
    menuItems: [
      {
        name: "Espresso Martini",
        description:
          "Vodka, coffee liqueur, espresso, garnished with three espresso beans. Available 11am–11pm. $10",
      },
    ],
  },

  // --- Goleta ---
  {
    name: "Marisella",
    address: "8301 Hollister Ave, Goleta, CA",
    website: "https://www.marisellarestaurant.com/",
    phone: "(805) 505-8888",
    instagram: "marisellasb",
    area: "Goleta",
    lat: 34.4247,
    lng: -119.9050,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Marisella+Ritz+Carlton+Bacara+8301+Hollister+Ave+Goleta+CA",
    appleMapsUrl: null,
    justCoffee: false,
    coffeeWithFood: false,
    coffeeAsCocktail: true,
    menuItems: [
      {
        name: "Italian Carajillo",
        description:
          "Fresh espresso, Licor 43, Averna Amaro, orange twist. Happy hour only, Mon–Fri 4–5pm. $10",
      },
    ],
  },

  // --- Downtown ---
  {
    name: "Paloma",
    address: "702 Anacapa St, Santa Barbara, CA",
    website: "https://www.palomabar.com",
    phone: "805-966-9090",
    instagram: "paloma_sb",
    area: "Downtown",
    lat: 34.4197,
    lng: -119.6968,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Paloma+702+Anacapa+St+Santa+Barbara+CA",
    appleMapsUrl: null,
    justCoffee: false,
    coffeeWithFood: false,
    coffeeAsCocktail: true,
    menuItems: [
      {
        name: "Frozen Espresso Martini",
        description:
          "Kahlúa, Hendry's vodka, cold brew concentrate, vanilla, simple syrup, topped with whipped cream. Dine-in only. $10",
      },
    ],
  },

  // --- Downtown ---
  {
    name: "Sama Sama Kitchen",
    address: "1208 State St, Santa Barbara, CA",
    website: "https://www.samasamakitchen.com",
    phone: "805-845-4472",
    instagram: "samasamakitchen",
    area: "Downtown",
    lat: 34.4252,
    lng: -119.7056,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Sama+Sama+Kitchen+1208+State+St+Santa+Barbara+CA",
    appleMapsUrl: null,
    justCoffee: false,
    coffeeWithFood: false,
    coffeeAsCocktail: true,
    menuItems: [
      {
        name: "Kopi Gila",
        description:
          "Pandan-infused Nosotros reposado, house coffee concentrate, dry curaçao, warming spices, orange peel. Evenings only. $10",
      },
    ],
  },
];
