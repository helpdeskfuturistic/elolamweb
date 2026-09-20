import { type ReactNode } from 'react';
import { Link } from 'wouter';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { BrandLogo } from '@/components/BrandLogo';
import { ShoppingBag, UtensilsCrossed, Truck, LayoutDashboard, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS_BY_ROLE: Record<string, { href: string; label: string; icon: ReactNode }[]> = {
  customer: [
    { href: '/discover', label: 'Explorar', icon: <UtensilsCrossed className="h-4 w-4" /> },
    { href: '/orders', label: 'Os meus pedidos', icon: <ShoppingBag className="h-4 w-4" /> },
  ],
  provider: [
    { href: '/provider/dashboard', label: 'Painel', icon: <LayoutDashboard className="h-4 w-4" /> },
    { href: '/orders', label: 'Pedidos', icon: <ShoppingBag className="h-4 w-4" /> },
  ],
  delivery_partner: [
    { href: '/driver/dashboard', label: 'Painel', icon: <LayoutDashboard className="h-4 w-4" /> },
  ],
  admin: [
    { href: '/admin', label: 'Administração', icon: <LayoutDashboard className="h-4 w-4" /> },
  ],
};

const ROLE_DISPLAY: Record<string, string> = {
  customer: 'cliente',
  provider: 'fornecedor',
  delivery_partner: 'entregador',
  admin: 'administrador',
};

export function Layout({ children }: { children: ReactNode }) {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinks = user ? (NAV_LINKS_BY_ROLE[user.role] ?? []) : [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="shrink-0">
            <BrandLogo />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}>
                <Button variant="ghost" size="sm" className="gap-2">
                  {link.icon}
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {user.fullName.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:block text-sm font-medium max-w-28 truncate">{user.fullName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium truncate">{user.fullName}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {ROLE_DISPLAY[user.role] ?? user.role.replace('_', ' ')}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="h-4 w-4 mr-2" />
                      Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Terminar sessão
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Entrar
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Criar conta
                  </Button>
                </Link>
              </div>
            )}

            {isAuthenticated && (
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileOpen(o => !o)}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && navLinks.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-border bg-card overflow-hidden"
            >
              <nav className="px-4 py-3 flex flex-col gap-1">
                {navLinks.map(link => (
                  <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                      {link.icon}
                      {link.label}
                    </Button>
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <BrandLogo iconClassName="w-6 h-6" textClassName="text-sm" />
          <p className="text-xs text-muted-foreground text-center sm:text-right">
            A ligar quem cozinha a quem tem fome — ElOlam Meal.
          </p>
        </div>
      </footer>
    </div>
  );
}
