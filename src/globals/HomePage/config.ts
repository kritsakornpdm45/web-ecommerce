import type { GlobalConfig } from 'payload'

export const home: GlobalConfig = {
  label: 'Home Page',
  slug: 'homePage',
  admin: {
    group: 'pages',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Home Banner',
          fields: [
            {
              name: 'homeBannerImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Background Image',
              admin: { description: 'Background image for this banner' },
            },
            {
              name: 'mainTitle',
              type: 'text',
              required: true,
              label: 'Main Headline Text',
              admin: { description: 'Main headline text (e.g., "WELCOME TO SHOP")' },
            },
            {
              name: 'subTitle',
              type: 'text',
              required: true,
              label: 'Sub-Headline Text',
              admin: { description: 'Sub-headline text in Thai' },
            },
            {
              name: 'buttonText',
              type: 'text',
              required: true,
              label: 'Button Text',
              admin: { description: 'Text for the call-to-action button' },
            },
            {
              name: 'buttonLink',
              type: 'text',
              required: true,
              label: 'Button Link',
              admin: { description: 'URL for the call-to-action button' },
            },
          ],
        },
        {
          label: 'Service Features',
          fields: [
            {
              name: 'serviceFeaturesItems',
              type: 'array',
              label: 'Service Features Items',
              fields: [
                {
                  name: 'featuresImage',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  label: 'Features Image',
                  admin: { description: 'Features image' },
                },
                {
                  name: 'featTitle',
                  type: 'text',
                  required: true,
                  label: 'Title',
                },
                {
                  name: 'featDesc',
                  type: 'text',
                  label: 'Description',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
