import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Filter } from "lucide-react";
import { SearchBar } from "../components/SearchBar";
import "../i18n/config";
import { DestinationCard } from "../components/DestinationCard";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useDestinations } from "../hooks/useDestinations";
import { useCategories } from "../hooks/useCategories";

const mockDestinations = [
  {
    id: "1",
    name: "Cabo Ledo Beach",
    location: "Luanda Province",
    rating: 4.8,
    distance: "70 km",
    category: "Beaches",
    image:
      "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=800",
    isFavorite: true,
  },
  {
    id: "2",
    name: "Kalandula Falls",
    location: "Malanje Province",
    rating: 4.9,
    distance: "420 km",
    category: "Nature",
    image:
      "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=800",
    isFavorite: false,
  },
  {
    id: "3",
    name: "Tundavala Gap",
    location: "Huíla Province",
    rating: 4.7,
    distance: "850 km",
    category: "Adventure",
    image:
      "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800",
    isFavorite: true,
  },
  {
    id: "4",
    name: "Fortaleza de São Miguel",
    location: "Luanda",
    rating: 4.5,
    distance: "5 km",
    category: "Culture",
    image:
      "https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=800",
    isFavorite: false,
  },
  {
    id: "5",
    name: "Miradouro da Lua",
    location: "Luanda Province",
    rating: 4.6,
    distance: "45 km",
    category: "Nature",
    image:
      "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800",
    isFavorite: false,
  },
  {
    id: "6",
    name: "Ilha do Mussulo",
    location: "Luanda",
    rating: 4.4,
    distance: "30 km",
    category: "Beaches",
    image:
      "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800",
    isFavorite: true,
  },
];

export function Destinations() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const { items: destinationsFromApi, loading: destinationsLoading } =
    useDestinations();
  const { categories } = useCategories();
  const destinations =
    destinationsFromApi && destinationsFromApi.length > 0
      ? destinationsFromApi
      : mockDestinations;

  const [localFavorites, setLocalFavorites] = useState<Record<string, boolean>>(
    {}
  );

  const toggleFavorite = (id: string) => {
    setLocalFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const displayDestinations = destinations.map((d: any) => ({
    id: d.id,
    name: d.name,
    slug: (d as any).slug,
    location: d.location ?? d.province ?? "",
    province: (d as any).province,
    latitude: (d as any).latitude,
    longitude: (d as any).longitude,
    images: (d as any).images ?? [],
    rating: d.rating,
    distance: (d as any).distance,
    category: d?.category?.name ?? d.category ?? "",
    image: Array.isArray(d.images) ? d.images[0]?.url : d.image,
    isFavorite: localFavorites[d.id] ?? !!d.isFavorite,
  }));

  const filteredDestinations = displayDestinations.filter((dest) => {
    const matchesSearch =
      (dest.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (dest.location || "").toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || dest.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>{t("destinations.title")}</h1>
          <p className="text-muted-foreground mt-1">
            {t("destinations.found", { count: filteredDestinations.length })}
          </p>
        </div>
        <Button className="bg-[#136F63] hover:bg-[#0F5A51] text-white rounded-xl">
          <Plus className="w-5 h-5 mr-2" />
          {t("destinations.add")}
        </Button>
      </div>

      <div className="flex gap-4">
        <SearchBar
          placeholder={t("common.search_placeholder")}
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
            <SelectItem value="all">
              {t("destinations.categories.all")}
            </SelectItem>
            {categories && categories.length > 0 ? (
              categories.map((c) => (
                <SelectItem key={c.id} value={c.name}>
                  {c.name}
                </SelectItem>
              ))
            ) : (
              <>
                <SelectItem value="Beaches">
                  {t("destinations.categories.beaches")}
                </SelectItem>
                <SelectItem value="Nature">
                  {t("destinations.categories.nature")}
                </SelectItem>
                <SelectItem value="Culture">
                  {t("destinations.categories.culture")}
                </SelectItem>
                <SelectItem value="Adventure">
                  {t("destinations.categories.adventure")}
                </SelectItem>
                <SelectItem value="Restaurants">
                  {t("destinations.categories.restaurants")}
                </SelectItem>
                <SelectItem value="Hotels">
                  {t("destinations.categories.hotels")}
                </SelectItem>
              </>
            )}
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
