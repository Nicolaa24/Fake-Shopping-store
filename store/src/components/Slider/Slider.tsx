import React from 'react'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import img1 from '../../assets/img1.jpg'
import img2 from '../../assets/img2.jpg'
import img3 from '../../assets/img3.jpg'


export const Slider = () => {
const images = [img1, img2, img3];
  const [activeSlide, setActiveSlide] = React.useState(0);
 
  
  const prevSliderHandler = (index:number) => {
    if (index === 0) {
      setActiveSlide(images.length - 1);
    } else if (index >= 1) {
      setActiveSlide(activeSlide - 1);
    } else {
      setActiveSlide(images.length - 1);
    }
  };

  const nextSliderHandler = (index:number) => {
    if (index === images.length - 1) {
      setActiveSlide(0);
    } else if (index < images.length - 1) {
      setActiveSlide(activeSlide + 1);
    } else {
      setActiveSlide(images.length - 1);
    }
  };

  const goToSlide = (slideIndex:number) => {
    setActiveSlide(slideIndex);
  };


  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(activeSlide + 1)
      if (activeSlide === images.length-1) {
        setActiveSlide(0)
      }
    }, 3500)
    return () => clearInterval(interval)
  },[activeSlide])



  return (
<div className='m-3'>
      {images.map((item, index) => {
        return (
          <div
            key={index}
            className={
              activeSlide === index
                ? 'flex justify-between items-center'
                : 'hidden'
            }
          >
            <button
              className='text-3xl border-2 border-black  dark:text-white'
              onClick={() => prevSliderHandler(index)}
            >
              <FiChevronLeft />
            </button>
            <div className=' w-full max-h-[600px]'>
              <img
                src={item}
                alt='landscape'
                className=' object-cover w-full max-h-[600px] px-6'
              />
            </div>
            <button
              className='text-3xl border-2 border-black  dark:text-white'
              onClick={() => nextSliderHandler(index)}
            >
              <FiChevronRight />
            </button>
          </div>
        );
      })}
      <div className='flex w-[200px] m-auto duration-700 '>
        {images.map((item, index) => (
          <div className={ index ===activeSlide ?'m-4 text-3xl cursor-pointer  text-slate-300 ' :'m-4 text-3xl cursor-pointer  text-slate-600 '}
            onClick={()=>goToSlide(index)}
            key={index}>●</div>
        ))}
      </div>
    </div>
  )
}