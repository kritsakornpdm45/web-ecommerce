import type { CollectionConfig, Where } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'isActive', 'updatedAt'],
    group: 'products',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Product Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            // If no slug is provided, generate one from the name
            if (!value && data?.skuCode) {
              return data.skuCode
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-]/g, '')
                .replace(/-+/g, '-')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'skuCode',
      type: 'text',
      label: 'SKU code',
      required: true,
      defaultValue: '-',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Basic Info',
          fields: [
            {
              name: 'imageList',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  label: 'Product Image',
                },
              ],
            },
            {
              name: 'price',
              type: 'number',
              required: true,
              label: 'Price (USD)',
              admin: {
                description: 'Enter the price in USD',
              },
            },
            {
              name: 'originalPrice',
              type: 'number',
              label: 'Original Price (USD)',
            },
            {
              name: 'rating',
              type: 'number',
              label: 'Rating',
              min: 0,
              max: 5,
            },
            {
              name: 'categories',
              type: 'relationship',
              relationTo: 'product-categories',
              hasMany: true,
              //fix query with Where type der
              // filterOptions: ({ id }): Where | boolean => {
              //   if (!id) return true
              //   return { id: { not_in: [id] } }
              // },
              filterOptions: (): Where | boolean => ({ isActive: { equals: true } }),
              required: true,
              label: 'Categories',
              admin: {
                description: 'Select product categories',
              },
            },
            {
              name: 'description',
              type: 'richText',
              label: 'Product Description',
            },
          ],
        },
        {
          label: 'Features',
          fields: [
            {
              name: 'features',
              type: 'array',
              fields: [
                {
                  name: 'icon',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Feature Icon',
                  required: true,
                  admin: {
                    description: 'Upload an SVG or PNG icon for this feature',
                  },
                },
                {
                  name: 'title',
                  type: 'text',
                  label: 'Feature Title',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Is Active',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 20,
  },
}
