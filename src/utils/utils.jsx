import Fuse from 'fuse.js';
const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options).replace(/ /g, '-');
  };
   const extractCategoriesAndSubcategories = (data) => {
    const categories = new Map();
  
    data.forEach(item => {
      const category = item.category; 
      const subcategory = item.subcategory;
  
      if (!categories.has(category)) {
        categories.set(category, new Set());
      }
      categories.get(category).add(subcategory);
    });
  
    return Array.from(categories, ([category, subcategories]) => ({
      category,
      subcategories: Array.from(subcategories),
    }));
  };
const fuzzySearch = (data, keys, query) => {
  const fuse = new Fuse(data, {
    keys: keys,
    includeScore: true,
    threshold: 0.3, // Adjust this to control the fuzziness level
  });
  return fuse.search(query).map(result => result.item);
};

  export {formatDate,extractCategoriesAndSubcategories,fuzzySearch};