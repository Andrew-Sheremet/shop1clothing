import { useParams } from 'react-router-dom';
import { useContext,useState,useEffect } from 'react';
import { CategoriesContext } from '../../context/CategoriesContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Category.scss'



const Category = () => {
    const {category} = useParams();
    const {categoriesMap} = useContext(CategoriesContext);
    const [products,setProducts]=useState(categoriesMap[category]);

    useEffect(()=>{
setProducts(categoriesMap[category])
    },[category,categoriesMap])

  return (
      <>
        <h2 className='category-title'>{category}</h2>
      <div className='category-container'>
            {products && products.map((item)=>(
                <ProductCard product={item} key={item.id}/>
            ))}
    </div>
      </>
      
  )
}

export default Category