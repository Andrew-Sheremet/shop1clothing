import { useContext,Fragment } from 'react'
import { CategoriesContext } from '../../context/CategoriesContext';
import CategoryPreview from '../../components/CategoryPreview/CategoryPreview';

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext)
  return (
<Fragment>
{Object.keys(categoriesMap).map((title)=>{
    const products = categoriesMap[title];
    return(
        <CategoryPreview key={title} products={products} title={title}/>
      
    )
})}


</Fragment>


  )
}

export default CategoriesPreview
