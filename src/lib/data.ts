
export const jokes = {
  GIS: [
    "Why did the GIS analyst get kicked out of the garden? For constantly trying to ground-truth the daisies.",
    "I asked a GIS professional for their favorite movie. They said, 'The Legend of Bagger Vance,' but they thought it was about vector analysis.",
    "What's a GIS analyst's favorite pickup line? 'Are you a 90-meter DEM? Because I'm falling for you.'",
    "A geographer's wife had twins. He was delighted, he now had two points of reference.",
    "Why are cartographers so good at relationships? They know how to handle projections.",
    "Why was the shapefile so stressed? It had too many layers of issues, and it couldn't handle one more projection.",
    "My shapefile has 8 related files and none of them are on speaking terms.",
    "What do you call a map that's always lying? A pseudo-map.",
    "Why don't cartographers play hide and seek? Because they always give away their position.",
    "A GIS manager doesn't have stress, they have 'unprojected data on a deadline'.",
    "What is a GIS analyst's favorite band? 'The Eagles', because they do great aerial surveys.",
    "What did the geodatabase say to the shapefile? 'You really need to get your life structured.'",
    "Why did the raster image go to therapy? It had serious resolution issues and couldn't see the bigger picture.",
    "You might be a GIS professional if you've ever tried to buffer your personal space in a crowded room.",
    "Why are GIS jokes the best? They have a global reach.",
    "Manager: 'Just a simple map.' The 'simple map': 57 layers, 3 different coordinate systems, and a client who thinks 'thematic' is a type of tea.",
    "How does a GIS expert order a pizza? By giving the exact coordinates of their house, and then complaining the delivery route wasn't optimized.",
    "What did the GPS say to the driver? 'In 200 feet, you have reached your destination... or a statistically significant approximation thereof.'",
    "Why don't GIS people get lost? They always find their bearings... eventually... after recalibrating.",
    "What's the most romantic thing a GIS analyst can say? 'My love for you has no boundaries, but if it did, I'd digitize them perfectly.'",
    "Why did the map go to school? To improve its projection and get a few more degrees.",
    "Blunder #101: Accidentally deleting the 'final_final_v2_FINAL' shapefile. The screams were audible from space.",
    "Why was the map legend so popular? It knew how to explain everything, unlike the project manager.",
    "Why did the surveyor get a promotion? He was outstanding in his field, and his measurements actually lined up.",
    "What do you call a geographer who's a great singer? A map-star.",
    "Why did the GIS analyst bring a ladder to the bar? He heard the drinks were on the house, and he needed to verify the building footprint.",
    "How do you comfort a sad map? You tell it, 'It's okay, every map has its ups and downs, especially the DEMs.'",
    "Why are GIS professionals so good at solving problems? They're used to finding the best path, even when the data is a total mess.",
    "What did the north arrow say to the scale bar? 'You rule! But the manager keeps changing my orientation.'",
    "Why did the coordinate system go to the party? To get on the grid and escape the 'Unknown SRS' error for one night."
  ],
  PLRA: [
    "Why did the land registrar bring a ladder to work? To reach the high court!",
    "What's a PLRA officer's favorite type of story? One with a clear plot.",
    "They say money doesn't grow on trees, but try telling that to someone who just registered a forestry lease.",
    "A surveyor, a lawyer, and a PLRA officer are in a hot air balloon. The balloon is losing height. Who do they throw out? The surveyor, he's used to dealing with drops.",
    "How do you know you're talking to a happy PLRA employee? They've found their lot in life.",
    "Why are PLRA documents so trustworthy? Because they're always on the level.",
    "A citizen asked me how land registration works. I said, 'It's a complex process, but in the end, it's all deed and done.'",
  ],
};

export const roasts = {
  GIS: "Welcome, master of maps and wizard of waypoints! We've allocated a special server just to process your colossal intellect. Please try not to crash it before the New Year's countdown.",
  PLRA: "Ah, a champion of charters and a protector of plots! We trust you've already filed the appropriate paperwork for your spot on the dance floor. Your claim has been duly noted... and will be processed in 3-5 business years.",
};

type Wish = {
  quote: string;
  wish: string;
};

export const newYearWishes: {
  GIS: Wish[];
  PLRA: Wish[];
} = {
  GIS: [
    {
      quote: "May your new year be as well-projected as a UTM grid and your resolutions as precise as a survey point.",
      wish: "Wishing you a 2026 full of clean data, successful geoprocessing, and maps so beautiful they bring a tear to the eye. Happy New Year!",
    },
    {
      quote: "Let's resolve to have zero 'Unknown Coordinate System' errors this year.",
      wish: "Here's to a year where all your layers align perfectly, your buffers are just right, and every analysis runs without a single crash. Happy New Year!",
    },
    {
      quote: "New year, new projections. Let's make this one global.",
      wish: "May your data be rich, your metadata complete, and your clients finally understand what a shapefile is. Have a spatially-aware New Year!",
    },
    {
      quote: "Forget resolutions, I'm setting my 'area of interest' for success.",
      wish: "Wishing you a year of seamless mosaic datasets, intuitive web maps, and coffee that's as strong as your geodatabase locks. Cheers!",
    },
    {
      quote: "In 2026, may our vectors be sharp and our rasters be high-resolution.",
      wish: "Let this be the year of optimized queries, elegant symbology, and finding that one misplaced file on the first try. Happy New Year!",
    },
    {
        quote: "Here's to a new year of exploring new datasets and charting new territories of success.",
        wish: "May your paths be the shortest, your networks fully connected, and your professional growth exponential. Happy 2026!"
    },
    {
        quote: "Let's digitize our dreams and georeference our goals for the year ahead.",
        wish: "Wishing you a year where 'data cleaning' is a myth and every project finishes ahead of schedule. Have a wonderful New Year!"
    },
    {
        quote: "May your professional connections be as strong as a well-defined topological relationship.",
        wish: "Here's to a year of insightful spatial analysis and discovering patterns of joy and prosperity. Happy New Year!"
    },
    {
        quote: "Let's buffer our happiness and clip away the negativity in the coming year.",
        wish: "May your maps be interactive, your apps be user-friendly, and your impact be global. Cheers to a fantastic 2026!"
    },
    {
        quote: "This year, let's resolve to make data-driven decisions that lead to happiness.",
        wish: "Wishing you a year where your most complex model runs in seconds and your visualizations win awards. Happy New Year!"
    },
    {
        quote: "New Year's Resolution: To finally organize my 'Final_Map_v3_for_real_this_time.mxd' files.",
        wish: "May your rasters be cloud-free and your vectors topologically sound. Have a geographically terrific New Year!"
    },
    {
        quote: "Let's overlay our past experiences with future ambitions to create a masterpiece.",
        wish: "Wishing you a year of perfect alignments, successful field collections, and stakeholders who appreciate scale bars. Cheers!"
    },
    {
        quote: "May your personal 'DEM' for 2026 show only high points and elevations.",
        wish: "Here's to a year of discovering new insights, creating stunning cartography, and maybe, just maybe, getting a bigger monitor. Happy New Year!"
    },
    {
        quote: "This year, our team's synergy will be our primary key.",
        wish: "May you navigate the challenges of 2026 with the ease of a GPS and find all your points of interest. Happy New Year!"
    },
    {
        quote: "Let's join our tables of friendship and union all our efforts for a great year.",
        wish: "Wishing you a year free of projection nightmares and full of 'aha!' moments from your spatial queries. Have a brilliant 2026!"
    },
    {
        quote: "May your attributes be accurate and your domains be well-defined in the new year.",
        wish: "Here's to a year of seamless data integration, powerful analytics, and making the world a better-mapped place. Happy New Year!"
    },
    {
        quote: "Let's set our scale for greatness in 2026.",
        wish: "May your geocoding hit rates be 100% and your clients' revision requests be 0%. A joyful New Year to you!"
    },
    {
        quote: "Here's to a year where we finally agree on which 'Web Mercator' is the right one.",
        wish: "Wishing you a year where your work is always in scope, on budget, and beautifully projected. Happy New Year!"
    },
    {
        quote: "May your career path be as well-planned as an optimal route analysis.",
        wish: "Let's make 2026 a year of legendary maps and groundbreaking analysis. Cheers to new discoveries!"
    },
    {
        quote: "Let's dissolve the boundaries between departments and create a unified feature class of success.",
        wish: "May your hard work be visualized in the most compelling dashboards and your efforts be recognized globally. Happy New Year!"
    }
  ],
  PLRA: [
    {
      quote: "Let's resolve to make this year's records as clean as a freshly-issued title. No encroachments on our happiness!",
      wish: "Here's to a prosperous 2026, with clear boundaries, undisputed claims, and a parcel of joy for everyone. Happy New Year!",
    },
    {
      quote: "May your new year be free of disputes and full of clear-cut success.",
      wish: "Wishing you a year where every transaction is smooth, every record is accurate, and every day is a registered success. Happy New Year!",
    },
    {
      quote: "This year, let's survey our blessings and demarcate our goals.",
      wish: "May your 2026 be built on a solid foundation of happiness, with no legal challenges in sight. Have a wonderful New Year!",
    },
    {
      quote: "Let's deed our time to what matters: joy, family, and good work.",
      wish: "Here's to a year of seamless registrations, happy landowners, and a perfectly balanced ledger of life. Cheers!",
    },
    {
      quote: "May your title to happiness be clear and unencumbered in 2026.",
      wish: "Wishing you a year where all your plans are approved, your boundaries are respected, and your assets multiply. Happy New Year!",
    },
    {
        quote: "Let's transfer the sorrows of the past into the deeds of a bright future.",
        wish: "May your new year be as well-documented and valuable as a prime piece of real estate. Happy 2026!"
    },
    {
        quote: "This year, we'll build a legacy on the foundations of integrity and hard work.",
        wish: "Wishing you a year of profitable acquisitions, peaceful possessions, and a portfolio of happy memories. Happy New Year!"
    },
    {
        quote: "May your personal and professional plots be fertile and prosperous.",
        wish: "Here's to a year of clear titles, easy conveyances, and a monumental amount of success. Cheers to 2026!"
    },
    {
        quote: "Let's register a new chapter of success, signed, sealed, and delivered.",
        wish: "May your new year be free from encroachments and full of rightly-earned rewards. Have a prosperous New Year!"
    },
    {
        quote: "Here's to a year where our biggest asset is our collective teamwork and spirit.",
        wish: "Wishing you a 2026 of sound investments, clear records, and a land of opportunities. Happy New Year!"
    },
    {
        quote: "May the blueprint of your new year lead to a magnificent structure of success.",
        wish: "Let's measure our success not just in acres, but in the smiles we create. Have a joyous New Year!"
    },
    {
        quote: "Let's zone out the negativity and plan for a year of positive developments.",
        wish: "Wishing you a year where every property is a treasure and every day is a valuable asset. Happy 2026!"
    },
    {
        quote: "This year, may our claims be bold and our returns be bountiful.",
        wish: "Here's to a year of impeccable records and a legacy that will be admired for generations. Happy New Year!"
    },
    {
        quote: "Let's stake our claim on a fantastic new year, with clearly marked boundaries for fun!",
        wish: "May your 2026 be a landmark year, filled with monumental achievements and personal growth. Cheers!"
    },
    {
        quote: "New Year's Resolution: To keep my personal records as updated as our land registry.",
        wish: "Wishing you a year where the only chain is a chain of title, leading directly to happiness. Happy New Year!"
    },
    {
        quote: "Let's ensure the right-of-way is always clear for success and happiness.",
        wish: "May your new year be free of liens, encumbrances, and anything that holds you back. Have a liberating 2026!"
    },
    {
        quote: "This year, we are the architects of our own fortune. Let's build something great.",
        wish: "Here's to a year of solid foundations, towering achievements, and a panoramic view of success. Happy New Year!"
    },
    {
        quote: "May your personal equity grow and your happiness compound daily in 2026.",
        wish: "Wishing you a year where every inspection passes with flying colors and every investment pays off. Happy New Year!"
    },
    {
        quote: "Let's get all our happiness and success properly notarized this year.",
        wish: "May you hold the title of 'Happiest Person' all year long, with no contest. Have a wonderful 2026!"
    },
    {
        quote: "Time to close the book on the old year and open a new, more valuable volume.",
        wish: "Wishing you a year of undisputed joy, valuable connections, and a wealth of good fortune. Happy New Year!"
    }
  ],
};
