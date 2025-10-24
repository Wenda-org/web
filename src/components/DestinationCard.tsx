import { MapPin, Star, Heart } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DestinationCardProps {
  id: string;
  name: string;
  location: string;
  rating: number;
  distance?: string;
  category: string;
  image: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onClick?: () => void;
}

export function DestinationCard({
  name,
  location,
  rating,
  distance,
  category,
  image,
  isFavorite = false,
  onToggleFavorite,
  onClick,
}: DestinationCardProps) {
  return (
    <Card 
      className="overflow-hidden rounded-xl cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className="relative h-48">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-3 left-3 bg-[#136F63] text-white rounded-lg">
          {category}
        </Badge>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.();
          }}
        >
          <Heart
            className={`w-5 h-5 ${isFavorite ? 'fill-[#EF476F] text-[#EF476F]' : 'text-gray-600'}`}
          />
        </Button>
      </div>
      <CardContent className="p-4">
        <h3>{name}</h3>
        <div className="flex items-center gap-1 text-muted-foreground mt-1">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-[#FFD166] text-[#FFD166]" />
            <span>{rating.toFixed(1)}</span>
          </div>
          {distance && (
            <span className="text-muted-foreground">{distance}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
