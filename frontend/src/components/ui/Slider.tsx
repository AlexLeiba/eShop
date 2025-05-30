import React from 'react';
import SlideButton from './SlideButton';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Container } from '../Grid/Container';
import type { ProductsDataType } from '../../pages/ProductsList';
import { useTranslation } from 'react-i18next';

type SliderProps = {
  data: ProductsDataType['data'];
};
export function Slider({ data }: SliderProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'DashboardPage' });
  const [slide, setSlide] = React.useState(0);

  function handleSlide(direction: 'prev' | 'next') {
    if (direction === 'prev') {
      setSlide((prev) => {
        if (prev === 0) return data?.slice(0, 3).length - 1;
        return prev - 1;
      });
    } else {
      setSlide((prev) => {
        if (data?.slice(0, 3).length - 1 === prev) return 0;

        return prev + 1;
      });
    }
  }
  return (
    <div className='w-full h-full relative flex overflow-x-hidden '>
      <SlideButton
        disabled={data?.length === 0}
        direction='prev'
        title='Prev'
        onClick={() => handleSlide('prev')}
      />
      <SlideButton
        disabled={data?.length === 0}
        direction='next'
        title='Next'
        onClick={() => handleSlide('next')}
      />

      {data && data.length > 0 ? (
        data?.slice(0, 3).map((item) => {
          return (
            <Container
              style={{
                minWidth: '100vw',
                transform: `translateX(${slide === 0 ? 0 : -(slide * 100)}vw)`,
                transition: 'transform 0.5s ease-in-out',
                backgroundColor: item.featuredBackgroundColor,
              }}
              key={item._id}
              className={cn(
                'pt-[152px] overflow-hidden h-[700px] text-black bg-white flex items-center'
              )}
            >
              <div className='grid lg:grid-cols-2  md:grid-cols-1 items-center'>
                <img
                  className='w-[700px] lg:h-[500px] h-[300px] object-contain'
                  src={item.image}
                  alt={item.title}
                />
                <div className='flex gap-4 flex-col'>
                  <h1 className='text-5xl font-bold'>
                    {item.title.toUpperCase()}
                  </h1>
                  <p className='text-xl'>{item.description}</p>
                  <Link to={`/product/${item._id}`}>
                    <Button
                      className='w-[200px]'
                      size='large'
                      variant='primary'
                    >
                      <p className='text-2xl'>{t('shopNowButton')}</p>
                    </Button>
                  </Link>
                </div>
              </div>
            </Container>
          );
        })
      ) : (
        <div
          style={{
            minWidth: '100vw',
          }}
          className={cn(
            'pt-[152px] overflow-hidden h-[700px] text-black bg-gray-200 animate-pulse '
          )}
        ></div>
      )}
    </div>
  );
}
