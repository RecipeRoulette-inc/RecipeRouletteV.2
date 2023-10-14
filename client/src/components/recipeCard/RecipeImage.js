import styled from "styled-components";

const RecipeImage = ({ imgUrl }) => {
  console.log(imgUrl);
  return (
    <ImageWrap>
      <Image src={imgUrl}></Image>
    </ImageWrap>
  )
};
const ImageWrap = styled.div`
`;
const Image = styled.img`
`;

export default RecipeImage;
