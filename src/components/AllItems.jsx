import { data } from "autoprefixer";
import axios from "axios";
import { useEffect, useState } from "react";
import sortBy from "sort-by";

const AllItems = () => {

    const [items,setItems] = useState([])
    const [page,setPage] = useState(1)
    const [totalPages,setTotalPages] = useState(1)
    const [itemsPerPage,setItemsPerPage] = useState(10)
    const [search,setSearch] = useState('')
    const [brand,setBrands] = useState('')
    const [category,setCategory] = useState('')
    const [minPrice,setMinPrice] = useState('')
    const [maxPrice,setMaxPrice] = useState('')
    const [sortBy,setSortBy] = useState('dateAdded')
    const [allBrands,setAllBrands] = useState()
    const [allCategory,setAllCategory] = useState()
   

    //Fetch items

    useEffect(()=>{
        const fetchItems= async() =>{
            try{
                const response = await axios('http://localhost:3000/allproducts',{
                    params:{
                        page:page,
                        itemsPerPage:itemsPerPage,
                        search,
                        brand,
                        sortBy,
                        minPrice,
                        maxPrice,
                        category
                    }
                })
              
                setItems(response.data.products)
                setTotalPages(response.data.totalPages)
                
            }catch(error){
                console.error(error,'error fetching')
            }
        }
        fetchItems()
    },[brand, category, itemsPerPage, maxPrice, minPrice, page, search, sortBy])

    //fetch brands
    useEffect(()=>{
      const fetchBrands = async () => {
        const { data } = await axios("http://localhost:3000/brands");
        setAllBrands(data)
      }
       fetchBrands()

    },[])

     useEffect(() => {
       const fetchCategories = async () => {
         const { data } = await axios("http://localhost:3000/category");
         setAllCategory(data)
       };
       fetchCategories();
     }, []);

    const handlePageChange = (pageNumber)=>{
        setPage(pageNumber)
    }

    const handleSearchChange = (event) => {
      setSearch(event.target.value);
      setPage(1); // Reset to the first page when a new search is performed
    };

    const handleChangeBrandName = (event) => {
      const selectedBrand = event.target.value;
       if (selectedBrand === "all") {
         setBrands(""); // Set to empty string or a value your backend interprets as "all brands"
       } else {
         setBrands(selectedBrand);
       }
      setPage(1);
    }

    const handleChangeCategory = (event) => {
      const selectedCategory = event.target.value;
      if (selectedCategory === "all") {
        setCategory(""); // Set to empty string or a value your backend interprets as "all brands"
      } else {
        setCategory(selectedCategory);
      }
      setPage(1);
    };

    

    return (
      <div>
        <div className="bg-[#149777] text-white h-64 w-full mx-3 rounded-xl">
          <div className="flex justify-center items-center mx-auto pt-12">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search for Items"
              className="input input-bordered w-full mx-6 md:mx-36 lg:mx-72 xl:mx-96 text-black"
            />
          </div>
          <div className="mt-6 mx-3 flex  gap-3 justify-start">
            {/* sort by brand name */}
            <div className="form-control w-96">
              <label className="label">
                <span className="label-text text-white">Select by Brands</span>
              </label>
              <select
                onChange={handleChangeBrandName}
                className="select select-bordered w-full max-w-xs"
              >
                <option value="all">Select All</option>
                {allBrands.map((brand, i) => (
                  <option key={i} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* sort by category */}
            <div className="form-control w-96 ">
              <label className="label">
                <span className="label-text text-white">
                  Select by Category
                </span>
              </label>
              <select
                onChange={handleChangeCategory}
                className="select select-bordered w-full max-w-xs"
              >
                <option value="all">Select All</option>
                {allCategory.map((category, i) => (
                  <option key={i} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 mx-3 flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3  ">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white p4 rounded-lg shadow-xl w-[300px]"
              >
                <img
                  src={item.image}
                  alt={item.productName}
                  className=" mx-auto pt-6 h-32 object-cover rounded-xl mb-4"
                />
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">
                    {item.productName}
                  </h3>
                  <p className="text-gray-700">
                    Category: {item.productCategory}
                  </p>
                  <p className="text-gray-700">Price: ${item.productPrice}</p>
                  <p className="text-gray-500 text-sm">
                    Added on: {item.productDate}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Brand: {item.brandName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <nav className="flex space-x-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 ${
                  page === i + 1
                    ? "bg-[#149777] text-white"
                    : "bg-gray-300 text-gray-800"
                } rounded-lg`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    );
};

export default AllItems;