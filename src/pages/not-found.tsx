import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF8F2] to-[#FFE8CC] p-4">
      <Link href="/" className="mb-8">
        <BrandLogo />
      </Link>
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Página não encontrada</h1>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            O endereço que abriu não existe ou foi movido.
          </p>
          <Link href="/">
            <Button className="w-full bg-primary hover:bg-primary/90">Voltar ao início</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
