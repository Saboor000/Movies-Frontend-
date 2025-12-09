"use client";
import { useState, useMemo, useEffect } from "react";
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
import axiosInstance from "@/lib/axiosInstance";

const SORT_OPTIONS = ["Rating", "Year", "Title"];

const GENRE_MAP = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const GENRE_ALIAS_MAP = {
  "Sci-Fi": "science_fiction",
  "TV Movie": "tv_movie",
  Action: "action",
  Adventure: "adventure",
  Animation: "animation",
  Comedy: "comedy",
  Crime: "crime",
  Documentary: "documentary",
  Drama: "drama",
  Family: "family",
  Fantasy: "fantasy",
  History: "history",
  Horror: "horror",
  Music: "music",
  Mystery: "mystery",
  Romance: "romance",
  Thriller: "thriller",
  War: "war",
  Western: "western",
};

export default function Movie() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [sortBy, setSortBy] = useState("Rating");
  const [genres, setGenres] = useState(["All"]);
  const [years, setYears] = useState(["All"]);

  const router = useRouter();

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Generate descending years dynamically (last 25 years)
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearList = ["All"];
    for (let y = currentYear; y >= currentYear - 25; y--) {
      yearList.push(y.toString());
    }
    setYears(yearList);
  }, []);

  // Fetch movies from API
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const params = {};
        if (debouncedSearch) params.query = debouncedSearch;
        if (selectedGenre !== "All") {
          params.genre =
            GENRE_ALIAS_MAP[selectedGenre] ||
            selectedGenre.toLowerCase().replace(" ", "_");
        }
        if (selectedYear !== "All") params.year = selectedYear;

        const res = await axiosInstance.get(
          debouncedSearch ? "/movies/search" : "/movies",
          { params }
        );

        const moviesWithGenres = res.data.map((movie) => ({
          ...movie,
          genre: movie.genre_ids.map((id) => GENRE_MAP[id]).filter(Boolean),
          year: movie.release_date
            ? new Date(movie.release_date).getFullYear()
            : "",
          rating: movie.vote_average,
          description: movie.overview,
          poster: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "",
        }));

        setMovies(moviesWithGenres);

        // Extract unique genres
        const genreSet = new Set();
        moviesWithGenres.forEach((m) =>
          m.genre.forEach((g) => genreSet.add(g))
        );
        setGenres(["All", ...Array.from(genreSet)]);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [debouncedSearch, selectedGenre, selectedYear]);

  // Sorting
  const filteredMovies = useMemo(() => {
    const sorted = [...movies];
    if (sortBy === "Rating") sorted.sort((a, b) => b.rating - a.rating);
    if (sortBy === "Year") sorted.sort((a, b) => b.year - a.year);
    if (sortBy === "Title")
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    return sorted;
  }, [movies, sortBy]);

  if (loading)
    return (
      <div className="min-h-screen w-full flex items-center justify-center movie-gradient-bg">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );

  return (
    <div className="min-h-screen w-full movie-gradient-bg movie-page-scroll relative overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center mb-10 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center animate-pulse-glow shadow-lg">
              <Film className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 drop-shadow-lg">
            Discover Movies
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Explore our curated collection of the finest films across all genres
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8 animate-fade-in">
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
        <div className="flex flex-wrap justify-center gap-4 mb-10 animate-fade-in">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-white/60" />
            <span className="text-white/60 text-sm font-medium">Filters:</span>
          </div>

          {/* Genre */}
          <Select value={selectedGenre} onValueChange={setSelectedGenre}>
            <SelectTrigger className="w-[140px] bg-white/10 border-white/20 text-white hover:bg-white/15 transition-all duration-300">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-white/20">
              {genres.map((genre) => (
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

          {/* Year */}
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[140px] bg-white/10 border-white/20 text-white hover:bg-white/15 transition-all duration-300">
              <Calendar className="w-4 h-4 mr-2 opacity-60" />
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-white/20">
              {years.map((year) => (
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

          {/* Sort */}
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

      {/* Movie Grid */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredMovies.map((movie, index) => (
                <Card
                  key={movie.id}
                  onClick={() => router.push(`/movies/${movie.id}`)}
                  className={`movie-card group cursor-pointer opacity-0 grid-item-reveal`}
                  style={{ animationDelay: `${(index % 12) * 0.05}s` }}
                >
                  <CardContent className="p-0">
                    {/* Poster */}
                    <div
                      className="relative aspect-2/3 w-full bg-cover bg-center rounded-lg"
                      style={{ backgroundImage: `url(${movie.poster})` }}
                    >
                      <div className="absolute inset-0 movie-poster-overlay opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                      <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 star-glow" />
                        <span className="text-white text-xs font-semibold">
                          {movie.rating}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-bold text-base mb-1 line-clamp-2 group-hover:text-violet-300 transition-colors duration-300">
                          {movie.title}
                        </h3>
                        <p className="text-white/70 text-xs mb-2">
                          {movie.year}
                        </p>
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
