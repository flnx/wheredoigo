import { useParams } from "react-router-dom"


export const EditPlace = () => {
  const { placeId } = useParams();

  console.log(placeId);


  return (
    <div>EditPlace</div>
  )
}
