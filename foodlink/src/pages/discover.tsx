import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import {
  useListProviders,
  useListCountries,
  useListCitiesByCountry,
} from '@workspace/api-client-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Star, MapPin, Truck, Shield, AlertCircle, RefreshCw } from 'lucide-react';
import { deliveryFeeLabel, PROVIDER_TYPE_LABELS, VERIFICATION } from '@/lib/locale-pt';

function VerificationBadge({ status, registered }: { status: string; registered?: boolean }) {
  if (status === 'verified' && registered)
    return (
      <Badge className="bg-green-100 text-green-700 border-green-200 gap-1">
        <Shield className="h-3 w-3" />
        {VERIFICATION.registeredBusiness}
      </Badge>
    );
  if (status === 'verified')
    return (
      <Badge className="bg-amber-100 text-amber-700 border-amber-200 gap-1">
        <AlertCircle className="h-3 w-3" />
        {VERIFICATION.individualSeller}
      </Badge>
    );
  return <Badge variant="secondary">{VERIFICATION.pending}</Badge>;
}

function ProviderCard({ provider }: { provider: any }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} layout>
      <Link href={`/providers/${provider.id}`}>
        <Card className="hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer group">
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-2xl font-bold text-primary group-hover:bg-primary/20 transition-colors">
                {provider.logo ? (
                  <img src={provider.logo} alt={provider.businessName} className="w-full h-full object-cover rounded-xl" />
                ) : (
                  provider.businessName.slice(0, 1)
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-bold text-base truncate">{provider.businessName}</h3>
                  {provider.rating && (
                    <div className="flex items-center gap-1 shrink-0 text-sm font-semibold text-amber-600">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {provider.rating.toFixed(1)}
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-2">{PROVIDER_TYPE_LABELS[provider.providerType] ?? provider.providerType}</p>
                <div className="flex flex-wrap gap-1.5">
                  <VerificationBadge status={provider.verificationStatus} registered={provider.registeredCompany} />
                  {provider.deliveryMethod && (
                    <Badge variant="outline" className="text-xs gap-1">
                      <Truck className="h-3 w-3" />
                      {deliveryFeeLabel(provider)}
                    </Badge>
                  )}
                  {provider.cityName && (
                    <Badge variant="outline" className="text-xs gap-1">
                      <MapPin className="h-3 w-3" />
                      {provider.cityName}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

function ProviderSkeleton() {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <Skeleton className="w-14 h-14 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-24" />
            <div className="flex gap-2"><Skeleton className="h-5 w-28" /><Skeleton className="h-5 w-20" /></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Discover() {
  const [search, setSearch] = useState('');
  const [countryId, setCountryId] = useState<number | undefined>();
  const [cityId, setCityId] = useState<number | undefined>();
  const [providerType, setProviderType] = useState<string | undefined>();

  const { data: countries } = useListCountries();
  const { data: cities } = useListCitiesByCountry(countryId!, { query: { enabled: !!countryId } });
  const { data: providers, isLoading } = useListProviders(
    { countryId, cityId, search: search || undefined, providerType },
    { query: { staleTime: 30_000 } }
  );

  const reset = () => { setSearch(''); setCountryId(undefined); setCityId(undefined); setProviderType(undefined); };

  const countLabel =
    providers?.length === 1
      ? '1 fornecedor encontrado'
      : `${providers?.length ?? 0} fornecedores encontrados`;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Explorar comida perto de si</h1>
          <p className="text-muted-foreground">
            Encontre fornecedores na sua cidade — restaurantes, cozinheiros em casa e vendedores independentes,
            com ou sem registo formal.
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-4 mb-8 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Pesquisar fornecedores…" className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <Select value={countryId ? String(countryId) : ''} onValueChange={v => { setCountryId(Number(v)); setCityId(undefined); }}>
            <SelectTrigger className="w-40"><SelectValue placeholder="País" /></SelectTrigger>
            <SelectContent>{countries?.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={cityId ? String(cityId) : ''} onValueChange={v => setCityId(Number(v))} disabled={!countryId}>
            <SelectTrigger className="w-36"><SelectValue placeholder="Cidade" /></SelectTrigger>
            <SelectContent>{cities?.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.cityName}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={providerType ?? ''} onValueChange={v => setProviderType(v || undefined)}>
            <SelectTrigger className="w-44"><SelectValue placeholder="Tipo de fornecedor" /></SelectTrigger>
            <SelectContent>
              {Object.entries(PROVIDER_TYPE_LABELS).map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button variant="ghost" size="sm" onClick={reset} className="gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" />Limpar
          </Button>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <ProviderSkeleton key={i} />)}
          </div>
        ) : providers && providers.length > 0 ? (
          <>
            <p className="text-sm text-muted-foreground mb-4">{countLabel}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {providers.map(p => <ProviderCard key={p.id} provider={p} />)}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Search className="h-7 w-7 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">Nenhum fornecedor encontrado</h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              Ainda não há fornecedores nesta zona. Experimente outra localização ou volte mais tarde.
            </p>
            <div className="flex justify-center gap-3">
              <Button variant="outline" onClick={reset}>Limpar filtros</Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
