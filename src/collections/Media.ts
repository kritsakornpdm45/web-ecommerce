import type { CollectionConfig } from 'payload'
export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    group: 'settings',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      // required: true,
      hooks: {
        beforeChange: [
          ({ value, data }) => {
            // If no alt text is provided, use the filename
            if (!value && data?.filename) {
              // Remove file extension and replace hyphens/underscores with spaces
              return data.filename.split('.').slice(0, -1).join('.').replace(/[-_]/g, ' ')
            }
            return value
          },
        ],
      },
    },
  ],
  upload: true,
}
