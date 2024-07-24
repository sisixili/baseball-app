
// Note: Some of the colours have the same name, but slightly different hex codes
const franchiseColours = {

    // Active franchises
    // Official colours obtained from https://teamcolorcodes.com/mlb-color-codes/
    'Arizona Diamondbacks': "#A71930",              // Sedona red
    'Atlanta Braves': "#CE1141",                    // Scarlet
    'Baltimore Orioles': "#DF4601",                 // Orange
    'Boston Red Sox': "#BD3039",                    // Red
    'Chicago Cubs': "#0E3386",                      // Blue
    'Chicago White Sox': "#C4CED4",                 // Silver, main colour is black but that will block words
    'Cincinnati Reds': "#C6011F",                   // Red
    'Cleveland Indians': "#00385D",                 // Navy blue
    'Colorado Rockies': "#333366",                  // Rockies purple
    'Detroit Tigers': "#0C2340",                    // Navy
    'Houston Astros': "#002D62",                    // Navy
    'Kansas City Royals': "#004687",                // Royal blue
    'Los Angeles Angels of Anaheim': "#003263",     // Midnight blue
    'Los Angeles Dodgers': "#1493FF",               // Dodger blue
    'Florida Marlins': "#00A3E0",                   // Miami blue
    'Milwaukee Brewers': "#FFC52F",                 // Yellow
    'Minnesota Twins': "#002B5C",                   // Twins navy
    'New York Mets': "#002D72",                     // Blue
    'New York Yankees': "#003087",                  // Blue
    'Oakland Athletics': "#003831",                 // Green
    'Philadelphia Phillies': "#E81828",             // Red
    'Pittsburgh Pirates': "#FDB827",                // Gold, main colour is black but that will block words
    'St. Louis Cardinals': "#C41E3A",               // Cardinal red
    'San Diego Padres': "#2F241D",                  // San Diego Padres brown
    'San Francisco Giants': "#FD5A1E",              // Orange
    'Seattle Mariners': "#0C2C56",                  // Navy blue
    'Tampa Bay Rays': "#092C5C",                    // Navy blue
    'Texas Rangers': "#003278",                     // Blue
    'Toronto Blue Jays': "#134A8E",                 // Blue
    'Washington Nationals': "#AB0003",              // Red

    // Non active franchises that actually show up during the animation
    // For the most part, no official colours, so colours are estimated
    'Philadelphia Athletics': "#336699",            // Azure blue
    'Boston Red Stockings': "#BA0021",              // Red
    'Chicago White Stockings': "#2C5FAD",           // Cyan blue
    'New York Mutuals': "#228B22",                  // Forest green
    'Washington Olympics': "#4682B4",               // Steel blue
    'Troy Haymakers': "#A0522D",                    // Maroon
    'Baltimore Canaries': "#FFD700",                // Bright yellow
    'Brooklyn Atlantics': "#5F9EA0",                // Dark blue
    'Providence Grays': "#808080",                  // Gray
    'Buffalo Bisons': "#005BAC",                    // Bright blue
    'Cleveland Blues': "#0033A0",                   // Blue
    'Detroit Wolverines': "#3A539B",                // Tory blue
    'Louisville Colonels': "#8B0000",               // Deep red
    'Philadelphia White Stockings': "#3B83BD",      // Medium Blue


    // Non active franchises that don't currently show up in the animation
    // Randomly assigned colours
    'Altoona Mountain City': "#FF5733", // Fiery Red-Orange
    'Baltimore Terrapins': "#61FF6F", // Light Green
    'Baltimore Monumentals': "#FF61A1", // Raspberry Pink
    'Boston Reds': "#6FFF33", // Neon Green
    'Brooklyn Gladiators': "#336FFF", // Royal Blue
    'Brooklyn Tip-Tops': "#FF336F", // Deep Pink
    "Brooklyn Ward's Wonders": "#33FF6F", // Light Spring Green
    'Columbus Buckeyes': "#6F33FF", // Deep Lavender
    'Philadelphia Centennials': "#7FFF50", // Chartreuse
    'Cleveland Forest Citys': "#507FFF", // Sky Blue
    'Chicago Whales': "#50FF7F", // Light Green
    'Chicago Pirates': "#7F50FF", // Medium Slate Blue
    "Cincinnati Kelly's Killers": "#0045FF", // Bright Blue
    'Cleveland Infants': "#00FF45", // Lime
    'Columbus Solons': "#4500FF", // Indigo
    'Cleveland Spiders': "#FF1493", // Deep Pink
    'Cincinnati Outlaw Reds': "#FF9314", // Deep Saffron
    'Chicago/Pittsburgh (Union League)': "#9314FF",     // Vivid Violet
    'Brooklyn Eckfords': "#6347FF", // Purple Blue
    'Hartford Dark Blues': "#FF4763", // Light Coral
    'Indianapolis Blues': "#63FF47", // Pale Green
    'Indianapolis Hoosiers': "#FF69B4", // Hot Pink
    'Kansas City Cowboys': "#69B4FF", // Light Sky Blue
    'Kansas City Packers': "#B4FF69", // Pale Goldenrod
    'Fort Wayne Kekiongas': "#B469FF", // Medium Orchid
    'Louisville Grays': "#FFA500", // Orange
    'Middletown Mansfields': "#00A5FF", // Vivid Sky Blue
    'Baltimore Marylands': "#A500FF", // Electric Purple
    'Milwaukee Grays': "#6F61FF", // Lavender 
    'Newark Pepper': "#FF61A1", // Raspberry Pink
    'New Haven Elm Citys': "#61FFA1", // Pale Green
    'New York Giants': "#FF6F33", // Pumpkin Orange
    'New York Metropolitans': "#336FFF", // Royal Blue
    'Pittsburgh Burghers': "#FF7F50", // Coral Orange
    'Pittsburgh Rebels': "#7FFF50", // Chartreuse
    'Philadelphia Keystones': "#FF507F", // Light Red
    'Elizabeth Resolutes': "#45FF00", // Bright Green
    'Richmond Virginians': "#0045FF", // Bright Blue
    'Rochester Broncos': "#FF0045", // Cherry Red
    'Rockford Forest Citys': "#00FF45", // Lime
    'St. Louis Brown Stockings': "#4500FF", // Indigo
    'St. Louis Terriers': "#FF9314", // Deep Saffron
    'St. Louis Maroons': "#9314FF", // Vivid Violet
    'St. Louis Red Stockings': "#14FF93", // Mint
    'St. Paul Apostles': "#6347FF", // Purple Blue
    'Syracuse Stars': "#47FF63", // Light Green
    'Toledo Maumees': "#63FF47", // Pale Green
    'Toledo Blue Stockings': "#FF69B4", // Hot Pink
    'Troy Trojans': "#FFB469", // Light Salmon
    'Washington Senators': "#B469FF", // Medium Orchid
    'Washington Blue Legs': "#69FFB4", // Aquamarine
    'Keokuk Westerns': "#FFA500", // Orange
    'Wilmington Quicksteps': "#A5FF00", // Green Yellow
    'Worcester Ruby Legs': "#00A5FF", // Vivid Sky Blue
    'Washington Statesmen': "#A500FF", // Electric Purple
};
   
const addColours = (data) => {
    return data.map(item => {
      item.colour = franchiseColours[item.franchiseName] || "#23B5D3"; // Default color (blue of navbar)
      return item;
    });
  };
  
  export default addColours;
  

