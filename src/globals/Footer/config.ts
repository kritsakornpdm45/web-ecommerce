import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: () => true,
    update: () => true,
  },
  admin: {
    group: 'pages',
    description: 'Footer configuration (brand, newsletter, links, payments, social).',
  },
  fields: [
    //Brand Section Info
    {
      name: 'brand',
      type: 'group',
      fields: [
        { name: 'name', type: 'text', required: true, defaultValue: 'IPSUM.CO' },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          defaultValue:
            'We provide gaming gear that enhances your playstyle and makes you proud to use — from keyboards to chairs.',
        },
      ],
    },
    //Newsletter Section Info (black box with text, input, button)
    {
      name: 'newsletter',
      type: 'group',
      label: 'Newsletter',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'STAY UP TO DATE ABOUT OUR LATEST OFFERS',
        },
        {
          name: 'placeholder',
          type: 'text',
          required: true,
          defaultValue: 'Enter your email address',
        },
        {
          name: 'buttonText',
          type: 'text',
          required: true,
          defaultValue: 'Subscribe to Newsletter',
        },
      ],
    },
    //Social Icons Section Info (array of icons with name, icon upload, url)
    {
      name: 'socialIcons',
      type: 'array',
      label: 'Social Icons',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'icon', type: 'upload', relationTo: 'media', required: true },
        { name: 'href', type: 'text', label: 'URL' }, // <- future-proof
      ],
    },
    //Payment Methods Section Info (array of payment methods with name, icon upload)
    {
      name: 'paymentMethods',
      type: 'array',
      label: 'Payment Methods',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'icon', type: 'upload', relationTo: 'media', required: true },
      ],
    },
    //Footer Links Section Info (array of sections with title, array of links with label, url)
    {
      name: 'footerSections',
      type: 'array',
      label: 'Footer Sections',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          label: 'Links',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', label: 'URL (optional)' }, // <- เพิ่มตรงนี้
          ],
        },
      ],
    },
    //Copyright Text
    {
      name: 'copyright',
      type: 'text',
      required: true,
      defaultValue: 'IPSUM © 2000-2023, All Rights Reserved',
    },
  ],
}
