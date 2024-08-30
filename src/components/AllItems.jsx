import axios from "axios";
import { useEffect, useState } from "react";

const AllItems = () => {

    const [items,setItems] = useState([])
    const [page,setPage] = useState(1)
    const [totalPages,setTotalPages] = useState(1)
    const [itemsPerPage,setItemsPerPage] = useState(10)
    const [search,setSearch] = useState('')

    //Fetch items

    useEffect(()=>{
        const fetchItems= async() =>{
            try{
                const response = await axios('http://localhost:3000/allproducts',{
                    params:{
                        page:page,
                        itemsPerPage:itemsPerPage,
                        search:search
                    }
                })
                setItems(response.data.products)
                setTotalPages(response.data.totalPages)
                

            }catch(error){
                console.error(error,'error fetching')
            }
        }
        fetchItems()
    },[itemsPerPage, page, search])

    const handlePageChange = (pageNumber)=>{
        setPage(pageNumber)
    }

    console.log(items)

    return (
      <div>
        <div className="bg-[#149777] text-white h-36 w-full mx-3 rounded-xl">
          <div className="flex justify-center items-center mx-auto pt-12">
            <input
              type="text"
              placeholder="Search for Items"
              className="input input-bordered w-full mx-6 md:mx-36 lg:mx-72 xl:mx-96"
            />
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
                    ? "bg-blue-500 text-white"
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