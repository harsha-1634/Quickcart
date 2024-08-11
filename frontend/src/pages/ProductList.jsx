import React, { useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Products from '../components/Products';
import Newsleter from '../components/Newsleter';
import Footer from '../components/Footer';
import { mobile } from "../responsive"
import { useLocation } from 'react-router-dom';
const Container=styled.div`

`;
const Title=styled.h1`
  margin:20px;
`;
const FilterContainer=styled.div`
  display:flex;
  justify-content:space-between;
   ${mobile({width:"0px 20px",display:"flex",flexDirection:"column" })}

`;
const Filter=styled.div`
  margin:20px;
`;

const Filtertext=styled.span`
  font-size:20px;
  font-weight:600;
  margin-right:20px;
  ${mobile({margin:"0px"})}
`;

const Select=styled.select`
  padding:10px;
  margin-right:20px;
  ${mobile({margin:"10px 0px"})}
`
const Option=styled.option`

`
const ProductList = () => {
  const location = useLocation();
  const cat=location.pathname.split("/")[2];
  const [sort,setSort]=useState("Newest");
  // console.log(location.pathname.split("/")[2]);
  const [filters,setFilters]=useState({});
  const handleFilters=(e)=>{
    const value=e.target.value;
    setFilters({
      ...filters,
      [e.target.name]:value,
    });
  };
  return (
    <Container>
      <Navbar/>
      <Announcement/>
      <Title>Dresses</Title>
      <FilterContainer>
        <Filter>
            <Filtertext>Filter Products:</Filtertext>
            <Select>
            <Option name="color" onChange={handleFilters} >
              color
            </Option>
            {/* default option for filters */}
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>gray</Option>
          </Select>
          <Select >
            <Option name="size" onChange={handleFilters} >
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
            <Filtertext>Sort Products:</Filtertext>
            <Select onChange={(e)=>setSort(e.target.value)}>
            <Option value="Newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort}/>
      <Newsleter/>
      <Footer/>
    </Container>
  )
}

export default ProductList

