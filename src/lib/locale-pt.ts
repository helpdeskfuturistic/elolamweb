/** Textos da interface web em português (ElOlam Meal). */

export const LOCALE_DATE = 'pt-PT';

export const PROVIDER_TYPE_LABELS: Record<string, string> = {
  registered_restaurant: 'Restaurante',
  food_business: 'Negócio de alimentos',
  home_cook: 'Cozinheiro(a) em casa',
  food_truck: 'Food truck',
  individual_seller: 'Vendedor individual',
  other: 'Outro',
};

export const ORDER_STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  pending: { label: 'Pendente', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  accepted: { label: 'Aceite', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  preparing: { label: 'A preparar', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  ready_for_pickup: { label: 'Pronto para recolha', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  picked_up: { label: 'A caminho', color: 'bg-orange-100 text-orange-700 border-orange-200' },
  delivered: { label: 'Entregue', color: 'bg-green-100 text-green-700 border-green-200' },
  cancelled: { label: 'Cancelado', color: 'bg-red-100 text-red-700 border-red-200' },
};

export const ROLE_LABELS: Record<string, string> = {
  customer: 'Cliente',
  provider: 'Fornecedor de comida',
  delivery_partner: 'Parceiro de entrega',
  admin: 'Administrador',
};

export function deliveryFeeLabel(provider: { deliveryFee?: number | null; deliveryMethod?: string | null }) {
  const fee = provider.deliveryFee ?? 25;
  if (fee <= 0) return 'Entrega grátis';
  return `Entrega ${fee}`;
}

export const VERIFICATION = {
  registeredBusiness: 'Empresa registrada',
  individualSeller: 'Vendedor individual',
  pending: 'Verificação pendente',
} as const;
