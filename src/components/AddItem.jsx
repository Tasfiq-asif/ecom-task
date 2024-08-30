
import axios from "axios";
import { useMutation} from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";


const AddItem = () => {
  const queryClient = useQueryClient();
  
    const { mutateAsync: createPost } = useMutation({
      mutationFn: async (product) => {
        const data = await axios.post(
          "http://localhost:3000/products",
          product
        );
        return data;
      },
      onSuccess: () => {
        console.log("Data saved successfully");
        queryClient.invalidateQueries("products"); // Refetch the products query
       
      },
    });

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const form = e.target;
        const image = form.image.files[0];
        const productName = form.productName.value;
        const productCategory = form.productCategory.value;
        const productPrice = parseFloat(form.productPrice.value); 
        const productDate = new Date(form.date.value);
        const brandName = form.brandName.value;

        let imageUrl = ""

        if (image) {
            const formData = new FormData();
            formData.append("image",image);
            try{
              
              // Upload the image
              const { data } = await axios.post(
                `https://api.imgbb.com/1/upload?key=${
                  import.meta.env.VITE_IMGBB_API_KEY
                }`,
                formData
              );
              imageUrl = data.data.url;
            }catch(error){
                console.error("Error uploading image:", error);
              
                return;

            }
        }

        const newProduct = {
          image: imageUrl,
          productName,
          productCategory,
          productPrice,
          productDate,
          brandName,
        };

        createPost(newProduct);
        form.reset();
    }

    return (
      <div>
        <form onSubmit={handleSubmit} className="card-body">
          {/* image */}
          <div className="md:px-10 mx-auto mt-4 w-full ">
            <label
              htmlFor="Image"
              className="block text-sm text-gray-500 dark:text-gray-300"
            >
              Image
            </label>
            <input
              type="file"
              name="image"
              placeholder="Upload Your Image"
              className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full border  bg-white px-5 py-2.5 text-gray-700 focus:border-lightPink focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40 dark:border-red-400 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-red-300"
            />
          </div>

          {/* Product Name */}
          <div className="md:px-10 mx-auto mt-4 w-full">
            <label
              htmlFor="productName"
              className="block text-sm text-gray-500 dark:text-gray-300"
            >
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              placeholder="Enter Product Name"
              className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border bg-white px-5 py-2.5 text-gray-700 focus:border-lightPink focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40 dark:border-red-400 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-red-300"
            />
          </div>

          {/* Product Category */}
          <div className="md:px-10 mx-auto mt-4 w-full">
            <label
              htmlFor="productCategory"
              className="block text-sm text-gray-500 dark:text-gray-300"
            >
              Product Category
            </label>
            <select
              name="productCategory"
              className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border bg-white px-5 py-2.5 text-gray-700 focus:border-lightPink focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40 dark:border-red-400 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-red-300"
            >
              <option value="">Select a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Furniture">Furniture</option>
              <option value="Home">Home</option>
            </select>
          </div>

          {/* Product Price */}
          <div className="md:px-10 mx-auto mt-4 w-full">
            <label
              htmlFor="productPrice"
              className="block text-sm text-gray-500 dark:text-gray-300"
            >
              Product Price
            </label>
            <input
              type="number"
              name="productPrice"
              placeholder="Enter Product Price"
              step="0.01"
              className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border bg-white px-5 py-2.5 text-gray-700 focus:border-lightPink focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40 dark:border-red-400 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-red-300"
            />
          </div>

          {/* Date */}
          <div className="md:px-10 mx-auto mt-4 w-full">
            <label
              htmlFor="date"
              className="block text-sm text-gray-500 dark:text-gray-300"
            >
              Date
            </label>
            <input
              type="date"
              name="date"
              placeholder="Select Date"
              className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border bg-white px-5 py-2.5 text-gray-700 focus:border-lightPink focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40 dark:border-red-400 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-red-300"
            />
          </div>

          {/* Brand Name */}
          <div className="md:px-10 mx-auto mt-4 w-full">
            <label
              htmlFor="brandName"
              className="block text-sm text-gray-500 dark:text-gray-300"
            >
              Brand Name
            </label>
            <input
              type="text"
              name="brandName"
              placeholder="Enter Brand Name"
              className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border bg-white px-5 py-2.5 text-gray-700 focus:border-lightPink focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40 dark:border-red-400 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-red-300"
            />
          </div>
          <div className="px-10 mx-auto mt-4 w-full ">
            <button
              className=" w-full md:px-10 mx-auto mt-4 text-white bg-black  rounded-lg py-3 px-3 my-4"
              type="submit"
            >
              Confirm & Publish
            </button>
          </div>
        </form>
      </div>
    );
};

export default AddItem;