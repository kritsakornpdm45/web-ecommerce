import type { GlobalConfig } from 'payload'

export const header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  access: {
    read: () => true,
  },
  admin: {
    group: 'pages',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Logo',
          fields: [
            {
              name: 'logoPicture1',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo Picture 1',
            },
          ],
        },

        {
          label: 'Navigation',
          fields: [
            {
              name: 'navigationLinks',
              type: 'array',
              label: 'Navigation Links',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                  label: 'Link Text',
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                  label: 'URL',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
