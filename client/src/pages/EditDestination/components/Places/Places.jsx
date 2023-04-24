import { memo } from "react"

const Places = (places) => {
    console.log(places);

  return (
    <div>Hello Places World</div>
  )
}

export const MemoizedPlaces = memo(Places);