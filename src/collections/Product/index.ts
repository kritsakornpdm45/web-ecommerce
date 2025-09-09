// import type { CollectionConfig } from 'payload'
// import { adminGroups } from '../../utilities/adminGroups'
import { Products } from './blocks/Product/config'
import { ProductCategories } from './blocks/ProductCategories/config'

// Export both collections for easy import in payload.config.ts
export const ProductCollections = [Products, ProductCategories]

// Re-export the individual collections for direct import if needed
export { Products, ProductCategories }
