const ProductImage = ({ product }) => {
    const images = product?.image;
  
    if (!images || images.length === 0) {
      return (
        <div className="text-gray-500 text-center py-10">
          No images to display.
        </div>
      );
    }
  
    return (
      <div className={`grid gap-4 ${images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} h-screen overflow-y-auto`}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Product image ${index + 1}`}
            className={`${index % 3 === 0 ? 'col-span-2' : ''} w-full h-auto object-cover rounded-lg`}
          />
        ))}
      </div>
    );
  };
  
  export default ProductImage;
  