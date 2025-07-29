export interface fetchApiResponse {
  totalResults: string;
  hitScore: any;
  timeTaken: any;
  totalPages: string;
  currentPageResults: string;
  currentPage: string;
  products: Product[];
}

export interface Product {
  id: string;
  brand: string | null;
  brandId: string | null;
  brandCode: string | null;
  subBrand: string | null;
  subBrandId: string | null;
  subBrandCode: string | null;
  name: string;
  description: string | null;
  derived_description: string | null;
  gtin: string;
  gtins: any[];
  caution: string | null;
  sku_code: string | null;
  isLocalProduct: string;
  main_category: string;
  category_level_1: string;
  category_level_2: string | null;
  main_category_id: string;
  mainCategoryCode: string | null;
  category_level_1_id: string;
  categoryLevel1Code: string | null;
  category_level_2_id: string | null;
  categoryLevel2Code: string | null;
  onMainCategory: string | null;
  onCategoryLevel1: string | null;
  onCategoryLevel2: string | null;
  onMainCategoryId: string | null;
  onCategoryLevel1Id: string | null;
  onCategoryLevel2Id: string | null;
  onMainCategoryCode: string | null;
  onCategoryLevel1Code: string | null;
  onCategoryLevel2Code: string | null;
  offMainCategory: string | null;
  offCategoryLevel1: string | null;
  offCategoryLevel2: string | null;
  offMainCategoryId: string | null;
  offCategoryLevel1Id: string | null;
  offCategoryLevel2Id: string | null;
  offMainCategoryCode: string | null;
  offCategoryLevel1Code: string | null;
  offCategoryLevel2Code: string | null;
  departmentId: string | null;
  departmentCode: string | null;
  departmentName: string | null;
  subDepartmentId: string | null;
  subDepartmentCode: string | null;
  subDepartmentName: string | null;
  lobId: string | null;
  lobCode: string | null;
  lobName: string | null;
  gs1category: string | null;
  gs1sub_category: string | null;
  gpc_code: string | null;
  minimum_order_quantity: string | null;
  minimum_order_quantity_unit: string | null;
  created_by: string;
  compare_price: string | null;
  sellingUnit: string;
  is_gs1_product: string | null;
  marketing_info: string | null;
  url: string | null;
  soldQuantity: string | null;
  marketPlaceSellable: boolean;
  activation_date: string;
  deactivation_date: string;
  country_of_origin: string | null;
  created_date: string;
  modified_date: string;
  type: string | null;
  packaging_type: string;
  primary_gtin: string | null;
  published: string | null;
  gs1_images: ImageSet;
  images: ImageSet;
  company_detail: CompanyDetail;
  weights_and_measures: WeightsAndMeasures;
  dimensions: Dimensions;
  case_configuration: CaseConfiguration;
  mrp: Mrp;
  hs_code: string;
  igst: string;
  cgst: string;
  sgst: string;
  cess: string;
  otherTax: string | null;
  returnable: string | null;
  sell_out_of_stock: string;
  min_order_value: string;
  label: string | null;
  taxCategory: string | null;
  articleCode: string | null;
  supplierItemCodes: string | null;
  itemReferences: any[];
  storeItemReferences: any[];
  inventoryCode: any[];
  listedOn: any[];
  attributes: ProductAttributes;
  language: Language;
  productSource: ProductSource;
  isDeleted: boolean;
  isOfflineStored: boolean | null;
  deletedBy: string | null;
}

export interface ImageSet {
  front: string | null;
  back: string | null;
  top: string | null;
  bottom: string | null;
  left: string | null;
  right: string | null;
  top_left: string | null;
  top_right: string | null;
}

export interface CompanyDetail {
  name: string | null;
  manufacturerName: string | null;
  brand: string | null;
  manufacturer: string | null;
  manufacturerImage: string | null;
  manufacturerLogo: string | null;
  manufacturerId: string | null;
  marketedBy: string | null;
}

export interface WeightsAndMeasures {
  measurement_unit: string;
  net_weight: string;
  gross_weight: string;
  net_content: string;
  secondarySpecs: any[];
}

export interface Dimensions {
  measurement_unit: string | null;
  height: string | null;
  width: string | null;
  depth: string | null;
}

export interface CaseConfiguration {
  gtin: string | null;
  quantity: string | null;
  height: string | null;
  width: string | null;
  depth: string | null;
  weight: string | null;
  weight_measurement_unit: string | null;
  dimension_measurement_unit: string | null;
  pack_type: string | null;
}

export interface Mrp {
  mrp: number;
  target_market: string;
  activation_date: string;
  currency: string;
  location: string;
}

export interface ProductAttributes {
  [key: string]: string | null;
}

export interface Language {
  nativeLanguages: string[];
}

export interface ProductSource {
  sourceId: string;
  sourceLocationId: string;
  sourceType: string | null;
  productStatus: string;
  hoStatus: string | null;
  createdDate: number;
  modifiedDate: number;
  productVisibility: string | null;
  supportedWarehouses: string[];
  supportedVendors: string[];
  supportedVendorNames: string[];
  supportedRetails: string[];
  marketPlaceSellers: string[];
  removeProductFrom: string[];
  deletedBy: string[];
  tags: string[];
  bundledGtins: string[];
  imageStatus: string;
  tenantId: string | null;
}
