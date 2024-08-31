
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";


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
    const [sortOption, setSortOption] = useState("dateAdded");
    const [allBrands,setAllBrands] = useState([])
    const [allCategory,setAllCategory] = useState([])
    const [loading, setLoading] = useState(false);
   

    //Fetch items

    useEffect(()=>{
        const fetchItems= async() =>{
            try {
              setLoading(true);
              const response = await axios(
                "https://jobtask-server-xi.vercel.app/allproducts",
                {
                  params: {
                    page: page,
                    limit: itemsPerPage,
                    search,
                    brand,
                    sortBy: sortOption,
                    minPrice,
                    maxPrice,
                    category,
                  },
                }
              );

              setItems(response.data.products);
              setTotalPages(response.data.totalPages);
            } catch (error) {
              console.error(error, "error fetching");
            } finally {
              setLoading(false);
            }
        }
        fetchItems()
    },[brand, category, itemsPerPage, maxPrice, minPrice, page, search, sortOption])

    //fetch brands
    useEffect(()=>{
      const fetchBrands = async () => {
        const { data } = await axios("https://jobtask-server-xi.vercel.app/brands");
        setAllBrands(data)
      }
       fetchBrands()

    },[])

     useEffect(() => {
       const fetchCategories = async () => {
         const { data } = await axios("https://jobtask-server-xi.vercel.app/category");
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

    const handleSortByPrice =(e) => {
      const selectPriceOption = e.target.value
      setSortOption(selectPriceOption)

    }

    const formDate = (dateString)=>{
      return format(new Date(dateString), 'dd-MM-yyyy')
    }

    const handleSetMinPrice = (e)=>{
      const minPrice = e.target.value
      setMinPrice(minPrice)
    }

    const handleSetMaxPrice = (e) => {
      const maxPrice = e.target.value;
      setMaxPrice(maxPrice);
    };

    return (
      <div>
        <div className="bg-[#149777] text-white h-auto pb-10 w-full mx-3 rounded-xl">
          <div className="flex justify-center items-center mx-auto pt-12">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search for Items"
              className="input input-bordered w-full mx-6 md:mx-36 lg:mx-72 xl:mx-96 text-black"
            />
          </div>
          <div className="mt-6 mx-3 flex flex-wrap justify-center  gap-3 justify-start">
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
                  Browse by Category
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

            {/* sort by Price*/}
            <div className="form-control w-96">
              <label className="label">
                <span className="label-text text-white">Select by Price</span>
              </label>
              <select
                onChange={handleSortByPrice}
                className="select select-bordered w-full max-w-xs"
                value={sortOption}
              >
                <option value="" selected>
                  Select
                </option>
                <option value="priceAsc">Low to High</option>
                <option value="priceDesc">High to Low</option>
              </select>
            </div>

            <div className="form-control w-96">
              <label className="label">
                <span className="label-text text-white">Set Price Limit</span>
              </label>
              <div className="flex gap-2">
                <div className="flex justify-center items-center">
                  <p>$</p>
                </div>
                <input
                  type="number"
                  placeholder="Min Price"
                  className="input input-bordered w-2/5 max-w-xs"
                  onChange={handleSetMinPrice}
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  className="input input-bordered w-2/5 max-w-xs"
                  onChange={handleSetMaxPrice}
                />
              </div>
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
                    Added on: {formDate(item.productDate)}
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