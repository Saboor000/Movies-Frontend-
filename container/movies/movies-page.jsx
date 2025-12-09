"use client";
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Star, Calendar, Film, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

// Sample movie data
const MOVIES = [
  {
    id: 1,
    title: "Interstellar",
    year: 2014,
    rating: 8.7,
    genre: ["Sci-Fi", "Adventure"],
    poster: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    description: "A team of explorers travel through a wormhole in space.",
  },
  {
    id: 2,
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    genre: ["Action", "Crime"],
    poster: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #2d2d2d 100%)",
    description: "Batman faces the Joker in an intense battle for Gotham.",
  },
  {
    id: 3,
    title: "Inception",
    year: 2010,
    rating: 8.8,
    genre: ["Sci-Fi", "Thriller"],
    poster: "linear-gradient(135deg, #1e3a5f 0%, #2d5a87 50%, #3d7ab8 100%)",
    description:
      "A thief enters dreams to steal secrets from the subconscious.",
  },
  {
    id: 4,
    title: "Pulp Fiction",
    year: 1994,
    rating: 8.9,
    genre: ["Crime", "Drama"],
    poster: "linear-gradient(135deg, #8b0000 0%, #a52a2a 50%, #cd5c5c 100%)",
    description: "Interconnected stories of crime in Los Angeles.",
  },
  {
    id: 5,
    title: "The Matrix",
    year: 1999,
    rating: 8.7,
    genre: ["Sci-Fi", "Action"],
    poster: "linear-gradient(135deg, #003300 0%, #004d00 50%, #006600 100%)",
    description: "A hacker discovers the truth about his reality.",
  },
  {
    id: 6,
    title: "Forrest Gump",
    year: 1994,
    rating: 8.8,
    genre: ["Drama", "Romance"],
    poster: "linear-gradient(135deg, #4a5568 0%, #718096 50%, #a0aec0 100%)",
    description: "The life journey of a simple man with a big heart.",
  },
  {
    id: 7,
    title: "The Shawshank Redemption",
    year: 1994,
    rating: 9.3,
    genre: ["Drama"],
    poster: "linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #5d6d7e 100%)",
    description: "Two imprisoned men bond over years of friendship.",
  },
  {
    id: 8,
    title: "Fight Club",
    year: 1999,
    rating: 8.8,
    genre: ["Drama", "Thriller"],
    poster: "linear-gradient(135deg, #4a1c40 0%, #6b2c50 50%, #8b3c60 100%)",
    description: "An insomniac forms an underground fighting club.",
  },
  {
    id: 9,
    title: "Gladiator",
    year: 2000,
    rating: 8.5,
    genre: ["Action", "Drama"],
    poster: "linear-gradient(135deg, #8b4513 0%, #a0522d 50%, #cd853f 100%)",
    description: "A general becomes a gladiator to avenge his family.",
  },
  {
    id: 10,
    title: "Avatar",
    year: 2009,
    rating: 7.9,
    genre: ["Sci-Fi", "Adventure"],
    poster: "linear-gradient(135deg, #006994 0%, #0099cc 50%, #00bfff 100%)",
    description: "A marine explores an alien world called Pandora.",
  },
  {
    id: 11,
    title: "The Godfather",
    year: 1972,
    rating: 9.2,
    genre: ["Crime", "Drama"],
    poster: "linear-gradient(135deg, #1c1c1c 0%, #2d2d2d 50%, #3d3d3d 100%)",
    description: "The aging patriarch transfers control to his son.",
  },
  {
    id: 12,
    title: "Parasite",
    year: 2019,
    rating: 8.5,
    genre: ["Thriller", "Drama"],
    poster: "linear-gradient(135deg, #2f4f4f 0%, #3d6b6b 50%, #4a8787 100%)",
    description: "A poor family schemes to infiltrate a wealthy household.",
  },
];

const GENRES = [
  "All",
  "Sci-Fi",
  "Action",
  "Drama",
  "Crime",
  "Thriller",
  "Adventure",
  "Romance",
];
const YEARS = [
  "All",
  "2019+",
  "2010-2018",
  "2000-2009",
  "1990-1999",
  "Pre-1990",
];
const SORT_OPTIONS = ["Rating", "Year", "Title"];

export default function Movie() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [sortBy, setSortBy] = useState("Rating");
  const router = useRouter();

  const filteredMovies = useMemo(() => {
    let result = MOVIES.filter((movie) => {
      // Search filter
      const matchesSearch = movie.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // Genre filter
      const matchesGenre =
        selectedGenre === "All" || movie.genre.includes(selectedGenre);

      // Year filter
      let matchesYear = true;
      if (selectedYear !== "All") {
        if (selectedYear === "2019+") matchesYear = movie.year >= 2019;
        else if (selectedYear === "2010-2018")
          matchesYear = movie.year >= 2010 && movie.year <= 2018;
        else if (selectedYear === "2000-2009")
          matchesYear = movie.year >= 2000 && movie.year <= 2009;
        else if (selectedYear === "1990-1999")
          matchesYear = movie.year >= 1990 && movie.year <= 1999;
        else if (selectedYear === "Pre-1990") matchesYear = movie.year < 1990;
      }

      return matchesSearch && matchesGenre && matchesYear;
    });

    // Sort
    result.sort((a, b) => {
      if (sortBy === "Rating") return b.rating - a.rating;
      if (sortBy === "Year") return b.year - a.year;
      if (sortBy === "Title") return a.title.localeCompare(b.title);
      return 0;
    });

    return result;
  }, [searchQuery, selectedGenre, selectedYear, sortBy]);

  return (
    <div className="min-h-screen w-full movie-gradient-bg movie-page-scroll relative overflow-x-hidden">
      {/* Floating Decorative Shapes */}
      <div
        className="floating-shape floating-shape-1 w-64 h-64 bg-linear-to-br from-violet-600/10 to-purple-800/10"
        style={{ top: "5%", left: "5%" }}
      />
      <div
        className="floating-shape floating-shape-2 w-80 h-80 bg-linear-to-br from-indigo-500/10 to-cyan-600/10"
        style={{ bottom: "10%", right: "5%" }}
      />
      <div
        className="floating-shape floating-shape-3 w-40 h-40 bg-linear-to-br from-fuchsia-600/10 to-pink-700/10"
        style={{ top: "50%", left: "80%" }}
      />

      {/* Hero Section */}
      <div className="relative pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 animate-fade-in">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center animate-pulse-glow shadow-lg">
                <Film className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 drop-shadow-lg">
              Discover Movies
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Explore our curated collection of the finest films across all
              genres
            </p>
          </div>

          {/* Search Bar */}
          <div
            className="max-w-2xl mx-auto mb-8 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <Input
                type="text"
                placeholder="Search movies by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-4 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-2xl focus:bg-white/15 focus:border-violet-500/50 transition-all duration-300 search-input-glow"
              />
            </div>
          </div>

          {/* Filters */}
          <div
            className="flex flex-wrap justify-center gap-4 mb-10 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-white/60" />
              <span className="text-white/60 text-sm font-medium">
                Filters:
              </span>
            </div>

            {/* Genre Filter */}
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-[140px] bg-white/10 border-white/20 text-white hover:bg-white/15 transition-all duration-300">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/20">
                {GENRES.map((genre) => (
                  <SelectItem
                    key={genre}
                    value={genre}
                    className="text-white hover:bg-white/10"
                  >
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Year Filter */}
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[140px] bg-white/10 border-white/20 text-white hover:bg-white/15 transition-all duration-300">
                <Calendar className="w-4 h-4 mr-2 opacity-60" />
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/20">
                {YEARS.map((year) => (
                  <SelectItem
                    key={year}
                    value={year}
                    className="text-white hover:bg-white/10"
                  >
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort By */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] bg-white/10 border-white/20 text-white hover:bg-white/15 transition-all duration-300">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/20">
                {SORT_OPTIONS.map((option) => (
                  <SelectItem
                    key={option}
                    value={option}
                    className="text-white hover:bg-white/10"
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <div className="text-center mb-6">
            <span className="text-white/60 text-sm">
              Showing {filteredMovies.length} movie
              {filteredMovies.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Movie Grid */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredMovies.map((movie, index) => (
                <Card
                  key={movie.id}
                  onClick={() => router.push(`/movies/${movie.id}`)}
                  className={`movie-card group cursor-pointer opacity-0 grid-item-reveal delay-${
                    (index % 6) + 1
                  }`}
                  style={{ animationDelay: `${(index % 12) * 0.05}s` }}
                >
                  <CardContent className="p-0">
                    {/* Poster */}
                    <div
                      className="relative aspect-2/3 w-full"
                      style={{ background: movie.poster }}
                    >
                      {/* Poster Overlay */}
                      <div className="absolute inset-0 movie-poster-overlay opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                      {/* Rating Badge */}
                      <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 star-glow" />
                        <span className="text-white text-xs font-semibold">
                          {movie.rating}
                        </span>
                      </div>

                      {/* Movie Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-bold text-base mb-1 line-clamp-2 group-hover:text-violet-300 transition-colors duration-300">
                          {movie.title}
                        </h3>
                        <p className="text-white/70 text-xs mb-2">
                          {movie.year}
                        </p>

                        {/* Genre Badges */}
                        <div className="flex flex-wrap gap-1.5">
                          {movie.genre.slice(0, 2).map((g) => (
                            <Badge
                              key={g}
                              variant="secondary"
                              className="genre-badge bg-violet-500/30 text-violet-200 border-violet-500/50 text-[10px] px-2 py-0.5"
                            >
                              {g}
                            </Badge>
                          ))}
                        </div>

                        {/* Description on Hover */}
                        <p className="text-white/0 group-hover:text-white/80 text-xs mt-2 line-clamp-2 transition-colors duration-300 h-0 group-hover:h-auto overflow-hidden">
                          {movie.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* No Results */
            <div className="text-center py-20 animate-fade-in">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                <Film className="w-10 h-10 text-white/30" />
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">
                No movies found
              </h3>
              <p className="text-white/60 max-w-md mx-auto">
                Try adjusting your search or filters to find what you&apos;re
                looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
