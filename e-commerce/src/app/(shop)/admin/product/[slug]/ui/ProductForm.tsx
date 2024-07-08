"use client"

import { createUpdateProduct } from "@/actions"
import { Category, Product, ProductImage } from "@/interfaces"
import clsx from "clsx"
import Image from "next/image"
import { useForm } from "react-hook-form"

interface Props {
  product: Partial<Product> & { ProductImage?: ProductImage[] }
  categories: Category[]
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"]

interface FormInputs {
  title: string
  slug: string
  description: string
  price: number
  inStock: number
  sizes: string[]
  tags: string
  gender: "men" | "women" | "kid" | "unisex"
  categoryId: string
  // Images
}

export const ProductForm = ({ product, categories }: Props) => {
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    watch,
    formState: { isValid },
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(", "),
      sizes: product.sizes ?? [],
      // images
    },
  })

  watch("sizes")

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData()

    const { ...productData } = data

    if (product.id) {
      formData.append("id", product.id ?? "")
    }
    formData.append("title", productData.title)
    formData.append("slug", productData.slug)
    formData.append("description", productData.description)
    formData.append("price", productData.price.toString())
    formData.append("inStock", productData.inStock.toString())
    formData.append("sizes", productData.sizes.toString())
    formData.append("tags", productData.tags)
    formData.append("categoryId", productData.categoryId)
    formData.append("gender", productData.gender)

    const res = await createUpdateProduct(formData)
    console.log(res)
  }

  const onSizeChange = (size: string) => {
    const sizes = getValues("sizes")

    // Using sets
    // const sizes = new Set(getValues("sizes"))
    // sizes.has(size) ? sizes.delete(size) : sizes.add(size)
    // setValue("sizes", Array.from(sizes))

    if (sizes.includes(size)) {
      const newSizes = sizes.filter((s) => s !== size)
      setValue("sizes", newSizes)
    } else {
      setValue("sizes", [...sizes, size])
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='grid mb-16 grid-cols-1 md:grid-cols-2 gap-3'
    >
      {/* Textos */}
      <div className='w-full'>
        <div className='flex flex-col mb-2'>
          <span>Title</span>
          <input
            type='text'
            className='p-2 border rounded-md bg-gray-200'
            {...register("title", { required: true })}
          />
        </div>

        <div className='flex flex-col mb-2'>
          <span>Slug</span>
          <input
            type='text'
            className='p-2 border rounded-md bg-gray-200'
            {...register("slug", { required: true })}
          />
        </div>

        <div className='flex flex-col mb-2'>
          <span>Description</span>
          <textarea
            {...register("description", { required: true })}
            rows={5}
            className='p-2 border rounded-md bg-gray-200'
          ></textarea>
        </div>

        <div className='flex flex-col mb-2'>
          <span>Price</span>
          <input
            type='number'
            className='p-2 border rounded-md bg-gray-200'
            {...register("price", { required: true, min: 0 })}
          />
        </div>

        <div className='flex flex-col mb-2'>
          <span>Tags</span>
          <input
            type='text'
            className='p-2 border rounded-md bg-gray-200'
            {...register("tags", { required: true })}
          />
        </div>

        <div className='flex flex-col mb-2'>
          <span>Gender</span>
          <select
            className='p-2 border rounded-md bg-gray-200'
            {...register("gender", { required: true })}
          >
            <option value=''>[Seleccione]</option>
            <option value='men'>Men</option>
            <option value='women'>Women</option>
            <option value='kid'>Kid</option>
            <option value='unisex'>Unisex</option>
          </select>
        </div>

        <div className='flex flex-col mb-2'>
          <span>Category</span>
          <select
            className='p-2 border rounded-md bg-gray-200'
            {...register("categoryId", { required: true })}
          >
            <option disabled value=''>
              [Seleccione]
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button className='btn-primary w-full'>Guardar</button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className='w-full'>
        <div className='flex flex-col mb-2'>
          <span>Stock</span>
          <input
            type='number'
            className='p-2 border rounded-md bg-gray-200'
            {...register("inStock", { required: true, min: 0 })}
          />
        </div>

        {/* As checkboxes */}
        <div className='flex flex-col'>
          <span>Sizes</span>
          <div className='flex flex-wrap'>
            {sizes.map((size) => (
              // bg-blue-500 text-white <--- si está seleccionado
              <div
                key={size}
                onClick={() => onSizeChange(size)}
                className={clsx(
                  "flex items-center justify-center w-12 h-10 mr-2 border border-gray-400 rounded-md transition-all cursor-pointer",
                  {
                    "bg-blue-500 text-white border-white":
                      getValues("sizes").includes(size),
                  }
                )}
              >
                <p>{size}</p>
              </div>
            ))}
          </div>

          <div className='flex flex-col mb-2'>
            <span>Photos</span>
            <input
              type='file'
              multiple
              className='p-2 border rounded-md bg-gray-200'
              accept='image/png, image/jpeg'
            />
          </div>
          <div className='grid justify-items-center grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2'>
            {product.ProductImage?.map((image) => (
              <div key={image.id}>
                <Image
                  alt={product.title ?? ""}
                  src={`/products/${image.url}`}
                  width={300}
                  height={300}
                  className='rounded shadow-sm'
                />
                <button
                  onClick={() => console.log(image.url)}
                  type='button'
                  className='btn-danger mt-2'
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  )
}
