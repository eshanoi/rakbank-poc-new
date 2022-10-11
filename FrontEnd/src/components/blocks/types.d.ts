export interface ProductConfiguratorStep {
  name: string;
  summary?: string;
  type?: string;
}

export interface ProductConfiguratorModel {
  steps: ProductConfiguratorStep[]
}