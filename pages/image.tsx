// import ImageComponent from "../app/image/image.component";
import dynamic from "next/dynamic";

const ImageComponent = dynamic(() => import("../app/image/image.component"), {ssr: false})

const Image = () => {
  return (
    <>
      <ImageComponent/>
    </>
  )
}

export default Image
