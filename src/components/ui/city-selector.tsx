'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MapPin, Search, ChevronDown, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  getCountries,
  getCitiesForCountry,
  getCountryFlag,
  searchCities,
  type CityOption,
} from '@/lib/data/cities';
import { cn } from '@/lib/utils';

interface CitySelectorProps {
  value: string; // "City, Country"
  onChange: (city: string, country: string) => void;
  error?: string;
}

export function CitySelector({ value, onChange, error }: CitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'search' | 'browse'>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [results, setResults] = useState<CityOption[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search handler
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.length >= 2) {
      setResults(searchCities(query));
    } else {
      setResults([]);
    }
  }, []);

  const handleSelect = (city: string, country: string) => {
    onChange(city, country);
    setIsOpen(false);
    setSearchQuery('');
    setResults([]);
    setSelectedCountry('');
  };

  const handleClear = () => {
    onChange('', '');
    setSearchQuery('');
  };

  const countries = getCountries();

  return (
    <div ref={containerRef} className="relative">
      <label className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">
        City *
      </label>

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setMode('search');
          setTimeout(() => inputRef.current?.focus(), 100);
        }}
        className={cn(
          'flex w-full items-center gap-2 rounded-lg border px-4 py-3 text-left transition-colors',
          isOpen
            ? 'border-[var(--primary)] ring-1 ring-[var(--primary)]'
            : 'border-[var(--border)] hover:border-[var(--primary)]/30',
          'bg-[var(--surface)]'
        )}
      >
        <MapPin className="h-4 w-4 shrink-0 text-[var(--text-muted)]" />
        {value ? (
          <span className="flex-1 text-[var(--text)]">{value}</span>
        ) : (
          <span className="flex-1 text-[var(--text-muted)]">Select your city...</span>
        )}
        {value ? (
          <X
            className="h-4 w-4 shrink-0 text-[var(--text-muted)] hover:text-[var(--danger)]"
            onClick={(e) => { e.stopPropagation(); handleClear(); }}
          />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 text-[var(--text-muted)]" />
        )}
      </button>

      {error && <p className="mt-1 text-xs text-[var(--danger)]">{error}</p>}

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] shadow-xl"
          >
            {/* Mode tabs */}
            <div className="flex border-b border-[var(--border)]">
              <button
                type="button"
                onClick={() => { setMode('search'); setSelectedCountry(''); }}
                className={cn(
                  'flex flex-1 items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-medium transition-colors',
                  mode === 'search'
                    ? 'border-b-2 border-[var(--primary)] text-[var(--primary)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                )}
              >
                <Search className="h-3.5 w-3.5" />
                Search
              </button>
              <button
                type="button"
                onClick={() => { setMode('browse'); setSearchQuery(''); setResults([]); }}
                className={cn(
                  'flex flex-1 items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-medium transition-colors',
                  mode === 'browse'
                    ? 'border-b-2 border-[var(--primary)] text-[var(--primary)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                )}
              >
                <Globe className="h-3.5 w-3.5" />
                Browse
              </button>
            </div>

            {/* Search mode */}
            {mode === 'search' && (
              <div>
                <div className="p-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                      ref={inputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      placeholder="Type a city name..."
                      className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] py-2.5 pl-9 pr-3 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:outline-none"
                      autoComplete="off"
                    />
                  </div>
                </div>

                <div className="max-h-48 overflow-y-auto">
                  {searchQuery.length < 2 ? (
                    <p className="px-4 py-6 text-center text-xs text-[var(--text-muted)]">
                      Type at least 2 characters to search...
                    </p>
                  ) : results.length === 0 ? (
                    <p className="px-4 py-6 text-center text-xs text-[var(--text-muted)]">
                      No cities found for &quot;{searchQuery}&quot;
                    </p>
                  ) : (
                    results.map((r) => (
                      <button
                        key={`${r.countryCode}-${r.city}`}
                        type="button"
                        onClick={() => handleSelect(r.city, r.country)}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-[var(--primary)]/10"
                      >
                        <span className="text-base">{getCountryFlag(r.country)}</span>
                        <div>
                          <p className="text-sm font-medium text-[var(--text)]">{r.city}</p>
                          <p className="text-[10px] text-[var(--text-muted)]">{r.country}</p>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Browse mode */}
            {mode === 'browse' && !selectedCountry && (
              <div className="max-h-56 overflow-y-auto">
                {countries.map((country) => (
                  <button
                    key={country}
                    type="button"
                    onClick={() => setSelectedCountry(country)}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-[var(--primary)]/10"
                  >
                    <span className="text-base">{getCountryFlag(country)}</span>
                    <span className="text-sm text-[var(--text)]">{country}</span>
                    <ChevronDown className="ml-auto h-3.5 w-3.5 -rotate-90 text-[var(--text-muted)]" />
                  </button>
                ))}
              </div>
            )}

            {/* Browse mode — cities for selected country */}
            {mode === 'browse' && selectedCountry && (
              <div>
                <button
                  type="button"
                  onClick={() => setSelectedCountry('')}
                  className="flex w-full items-center gap-2 border-b border-[var(--border)] px-4 py-2 text-xs font-medium text-[var(--primary)] hover:bg-[var(--primary)]/5"
                >
                  ← Back to countries
                </button>
                <div className="max-h-48 overflow-y-auto">
                  {getCitiesForCountry(selectedCountry).map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => handleSelect(city, selectedCountry)}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-[var(--primary)]/10"
                    >
                      <MapPin className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                      <span className="text-sm text-[var(--text)]">{city}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
