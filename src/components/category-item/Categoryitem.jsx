import React from 'react'
import styles from './CategoryItem.module.scss'
import { useNavigate } from 'react-router-dom'

const Categoryitem = ({category}) => {
  const {title,imageUrl,route}=category
  const navigate = useNavigate()
  const onNavigateHandler =()=>{
    navigate(route)
  }
  
  return (
    <div onClick={onNavigateHandler} className={styles['category-container']}>
          <div
        className={styles['background-image']}
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
           
          <div className={styles['category-body-container']}>
            <h2>{title}</h2>
            <p>Shop Now</p>
          </div>
        </div>
  )
}

export default Categoryitem