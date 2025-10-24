import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Filter } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import '../i18n/config';
import { DestinationCard } from '../components/DestinationCard';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const mockDestinations = [
  {
    id: '1',
    name: 'Cabo Ledo Beach',
    location: 'Luanda Province',
    rating: 4.8,
    distance: '70 km',
    category: 'Beaches',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    isFavorite: true,
  },
  {
    id: '2',
    name: 'Kalandula Falls',
    location: 'Malanje Province',
    rating: 4.9,
    distance: '420 km',
    category: 'Nature',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800',
    isFavorite: false,
  },
  {
    id: '3',
    name: 'Tundavala Gap',
    location: 'Huíla Province',
    rating: 4.7,
    distance: '850 km',
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    isFavorite: true,
  },
  {
    id: '4',
    name: 'Fortaleza de São Miguel',
    location: 'Luanda',
    rating: 4.5,
    distance: '5 km',
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1555881675-dd6fb868e4e9?w=800',
    isFavorite: false,
  },
  {
    id: '5',
    name: 'Miradouro da Lua',
    location: 'Luanda Province',
    rating: 4.6,
    distance: '45 km',
    category: 'Nature',
    image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800',
    isFavorite: false,
  },
  {
    id: '6',
    name: 'Ilha do Mussulo',
    location: 'Luanda',
    rating: 4.4,
    distance: '30 km',
    category: 'Beaches',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
    isFavorite: true,
  },
];

export function Destinations() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [destinations, setDestinations] = useState(mockDestinations);

  const toggleFavorite = (id: string) => {
    setDestinations((prev) =>
      prev.map((dest) =>
        dest.id === id ? { ...dest, isFavorite: !dest.isFavorite } : dest
      )
    );
  };

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch = dest.name.toLowerCase().includes(search.toLowerCase()) ||
      dest.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || dest.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>{t('destinations.title')}</h1>
          <p className="text-muted-foreground mt-1">
            {filteredDestinations.length} destinations found
          </p>
        </div>
        <Button className="bg-[#136F63] hover:bg-[#0F5A51] text-white rounded-xl">
          <Plus className="w-5 h-5 mr-2" />
          {t('destinations.add')}
        </Button>
      </div>

      <div className="flex gap-4">
        <SearchBar
          placeholder={t('common.search_placeholder')}
          value={search}
          onChange={setSearch}
          className="flex-1 max-w-md"
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-48 rounded-xl">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Beaches">{t('destinations.categories.beaches')}</SelectItem>
            <SelectItem value="Nature">{t('destinations.categories.nature')}</SelectItem>
            <SelectItem value="Culture">{t('destinations.categories.culture')}</SelectItem>
            <SelectItem value="Adventure">{t('destinations.categories.adventure')}</SelectItem>
            <SelectItem value="Restaurants">{t('destinations.categories.restaurants')}</SelectItem>
            <SelectItem value="Hotels">{t('destinations.categories.hotels')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDestinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            {...destination}
            onToggleFavorite={() => toggleFavorite(destination.id)}
          />
        ))}
      </div>
    </div>
  );
}
