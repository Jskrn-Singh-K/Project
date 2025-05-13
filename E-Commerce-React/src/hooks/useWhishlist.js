const useWishlist = (category) => {
  const data = JSON.parse(localStorage.getItem("whishlist")) || [];

  const alreadyInWishlist = data.some(item => item._id === category._id);

  if (!alreadyInWishlist) {
    const updatedWishlist = [...data, category];
    localStorage.setItem("whishlist", JSON.stringify(updatedWishlist));
  }
};

export default useWishlist;
