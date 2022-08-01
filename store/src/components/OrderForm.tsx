import React from 'react'
import {useForm, SubmitHandler, Controller} from 'react-hook-form'
import ReactSelect from 'react-select';
import { IOption, IOrderFields } from '../interface'

const options: IOption[] = [
  { value: 'lviv', label: 'Lviv' },
  { value: 'kiev', label: 'Kiev' },
  { value: 'odessa', label: 'Odessa' },
  { value: 'kharkiv', label: 'Kharkiv' },
];

const getValue = (value:string) => 
  value ? options.find((option) => option.value === value) : ''

interface IOrderForm  {
  succedOrder: () => void;
}

const OrderForm: React.FC<IOrderForm> = ({ succedOrder }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<IOrderFields>({
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<IOrderFields> = (data) => {
    console.log(data)
    if (errors.email && errors.name) {
      return
    }
    reset()
    succedOrder()
  }

  return (
    <div>
      <h1 className=' w-[40%] m-auto text-2xl mb-4 mt-2 font-bold'>Enter your shipping info</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col text-center '>
        <input className='mb-4 p-3 border border-solid border-1 border-black  w-[66%]  m-auto rounded-md text-base outline-none'
          {...register('email', {
            required: 'Email is required field',
            pattern: {
              value: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
              message: 'Please enter valid email!'
            }
          })}
          placeholder='Email'
        />
        {errors?.email && (
          <div className='text-red-600  mb-2'>
            {errors.email?.message}
          </div>
        )}
        
        <input
          className='mb-4 p-3 border border-solid border-1 border-black  w-[66%]  m-auto rounded-md text-base outline-none'
          {...register('name', {
            required: 'Name is required field'
          })}
          placeholder='Name' />
        {errors?.name && (
          <div className='text-red-600 mb-2'>
            {errors.name?.message}
          </div>
        )}
        <input
          className='mb-4 p-3 border border-solid border-1 border-black  w-[66%]  m-auto rounded-md text-base outline-none'
          {...register('secondName', {
            required: 'SecondName is required field'
          })}
          placeholder='Second name' />
        {errors?.secondName && (
          <div className='text-red-600 mb-2'>
            {errors.secondName?.message}
          </div>
        )}
        <Controller
          control={control}
          name='address.city'
          rules={{
            required: 'City is required'
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <ReactSelect
                className='w-[66%] m-auto mb-3'
                placeholder='Cities'
                options={options}
                value={getValue(value)}
                onChange={newValue => onChange((newValue as IOption))}
              />
              {error && <div className='text-red-600 m-2'>{error.message}</div>}
            </div>
          )}
        />

        <input
          className='mb-4 p-3 border border-solid border-1 border-black  w-[66%]  m-auto rounded-md text-base outline-none'
          {...register('address.street', {
            required: 'Street is required field'
          })}
          placeholder='Street' />
        {errors?.address?.street && (
          <div className='text-red-600 mb-2'>
            {errors.address.street?.message}
          </div>
        )}
        <input
          className='mb-4 p-3 border border-solid border-1 border-black  w-[66%]  m-auto rounded-md text-base outline-none'
          {...register('address.house', {
            required: 'House is required field'
          })}
          placeholder='House' />
        {errors?.address?.house && (
          <div className='text-red-600 mb-2'>
            {errors.address.house?.message}
          </div>
        )}

        <button className='text-base mt-5 border-none bg-blue-700  rounded-3xl p-3 w-[50%] m-auto text-white cursor-pointer '
         
        >Send
        </button>
      </form>
    </div>
  )
};

export default OrderForm