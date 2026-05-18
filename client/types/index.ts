export interface NavLink {
  label: string;
  to: string;
}

export interface ArticleCard {
  id: number;
  title: string;
  dateTime: string;
  displayDate: string;
  imageSrc: string;
  imageAlt: string;
}

export interface StatCard {
  value: string;
  label: string;
  iconSrc: string;
  iconAlt: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  iconSrc: string;
  iconAlt: string;
}
