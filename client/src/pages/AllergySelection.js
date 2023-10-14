import styled from 'styled-components';
import Allergy from '../components/allergy/Allergy';
import { useState } from 'react';

const AllergyPage = () => {

  const [allergies, setAllergies] = useState([]);

  const handleAddAllergy = (allergy) => {
    setAllergies((prev) => [...prev, allergy])
  }; 

  const intolerences = ['dairy', 'egg', 'gluten', 'grain', 'peanut', 'seafood', 'sesame', 'shellfish', 'soy', 'sulfite', 'tree nut', 'wheat'].map(allergen => <Allergy allergen={allergen} addAllergy={handleAddAllergy} />);

  return (
    <Wrapper>
      {intolerences}
    </Wrapper>
  )
};

const Wrapper = styled.div`
position: relatie; 
width: 100%; 
height: 500px; 
overflow: hidden;
`;

export default AllergyPage; 