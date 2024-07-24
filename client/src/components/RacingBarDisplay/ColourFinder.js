
const addColours = (data) => {
    return data.map(item => {
      switch (item.franchiseName) {
        case 'Boston Red Stockings':
          item.colour = "#006969"; // temp colour
          break;
        case 'New York Mutuals':
          item.colour = "#426969"; // temp colour
          break;
        // Add more cases here

        default:
          item.colour = "#23B5D3"; // Default color (blue of navbar)
      }
      return item;
    });
  };
  
  export default addColours;
  

