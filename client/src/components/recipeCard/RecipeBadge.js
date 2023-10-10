import styled from "styled-components";
import vegetarian from "./badgeImages/vegetarianIcon.svg"
import dairyFree from "./badgeImages/dairyFree.svg"
import glutenFree from "./badgeImages/glutenFree.svg"
import vegan from "./badgeImages/vegan.svg"

const badgeStyles = {
  vegan: { backgroundImage: vegan },
  'glutenFree': { backgroundImage: glutenFree},
  vegetarian: { backgroundImage: vegetarian },
  'dairyFree': { backgroundImage: dairyFree }
};

const RecipeBadge = ({ types }) => {
  const badges = types.map(({type}) => {
    return <Badge {...badgeStyles[type]}> </Badge>
  })

  return<BadgeWrapper>{badges}</BadgeWrapper>
}

const Badge = styled.div`
display: block;
text-align:center;
align-items:center;
justify-content: center;
justify-items:center;
height: 30px; 
width: 30px; 
background: ${({ background }) => background || 'none'};
background-image: ${({ backgroundImage }) => `url(${backgroundImage})` || 'none'};
background-position:center;
background-size: contain;
background-repeat: no-repeat;
border-radius: 50%; 
box-shadow: 0px 2px 5px 1px #D0CFD1;
`;


const BadgeWrapper = styled.div`
position: absolute;
top: -45px;
right: 0;
z-index: 10;
display: flex;
gap: 1rem;
`;

export default RecipeBadge;