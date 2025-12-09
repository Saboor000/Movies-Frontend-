"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Star, Clock, Calendar, User, ArrowLeft, Send } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";

function StarRating({
  rating,
  onRatingChange,
  interactive = false,
  size = "md",
}) {
  const sizeClass =
    size === "lg" ? "w-6 h-6" : size === "sm" ? "w-4 h-4" : "w-5 h-5";
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onRatingChange?.(star)}
          className={`${
            interactive ? "cursor-pointer hover:scale-110" : "cursor-default"
          } transition-transform`}
        >
          <Star
            className={`${sizeClass} ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-white/30"
            } ${interactive && star <= rating ? "star-glow" : ""}`}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  const user = review.user || {};
  const avatarUrl = user.avatar || null;
  const initials =
    user.firstName?.[0] + user.lastName?.[0] || review.user?.id || "U";

  return (
    <Card className="review-card bg-white/5 border-white/10 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="w-10 h-10 bg-linear-to-br from-violet-500 to-purple-600 border-2 border-violet-500/30">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} />
            ) : (
              <AvatarFallback className="bg-transparent text-white text-sm font-semibold">
                {initials}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="text-white font-semibold">
                  {user.firstName
                    ? `${user.firstName} ${user.lastName}`
                    : review.user || "Unknown"}
                </h4>
                <p className="text-white/50 text-xs">
                  {review.date || new Date().toISOString().split("T")[0]}
                </p>
              </div>
              <StarRating rating={review.rating} size="sm" />
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              {review.comment}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function MovieDetails() {
  const router = useRouter();
  const params = useParams();
  const movieId = params.id;

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieAndReviews = async () => {
      try {
        const resMovie = await axiosInstance.get(`/movies/${movieId}`);
        const data = resMovie.data;
        const formattedMovie = {
          id: data.id,
          title: data.title,
          tagline: data.tagline,
          rating: data.vote_average,
          year: data.release_date?.split("-")[0],
          duration: `${data.runtime} min`,
          description: data.overview,
          poster: data.poster_path
            ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
            : null,
          genre: data.genres.map((g) => g.name),
          director: data.production_companies?.[0]?.name || "Unknown",
          productionCompanies: data.production_companies,
          languages: data.spoken_languages,
          homepage: data.homepage,
        };
        setMovie(formattedMovie);

        const resReviews = await axiosInstance.get(`/reviews`, {
          params: { movieId },
        });
        setReviews(resReviews.data);
      } catch (err) {
        console.error("Fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieAndReviews();
  }, [movieId]);

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : movie?.rating;

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newReview.trim() || newRating === 0) return;

    try {
      const res = await axiosInstance.post("/reviews", {
        movieId,
        rating: newRating,
        comment: newReview,
      });

      const newReviewData = res.data;
      setReviews([newReviewData, ...reviews]);
      setNewReview("");
      setNewRating(0);
    } catch (err) {
      console.error(
        "Review submission failed:",
        err.response?.data || err.message
      );
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  if (!movie)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Movie not found.
      </div>
    );

  return (
    <div className="min-h-screen w-full movie-gradient-bg movie-page-scroll relative overflow-x-hidden">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          onClick={() => router.push("/movies")}
          className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Movie Details Section */}
      <div className="relative pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 animate-fade-in">
          {/* Poster */}
          <div className="lg:w-1/3">
            <div
              className="aspect-2/3 rounded-2xl shadow-2xl relative overflow-hidden movie-card"
              style={{
                backgroundImage: `url(${movie.poster})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 movie-poster-overlay opacity-40" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 w-fit">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 star-glow" />
                  <span className="text-white font-bold">{movie.rating}</span>
                  <span className="text-white/60 text-sm">/ 10</span>
                </div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="lg:w-2/3 space-y-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-1 drop-shadow-lg">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="text-white/50 italic mb-3 pt-3">
                  {movie.tagline}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-white/70 mb-4">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{movie.year}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{movie.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  <span>{movie.director}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genre.map((g) => (
                  <Badge
                    key={g}
                    className="genre-badge bg-violet-500/30 text-violet-200 border-violet-500/50 px-3 py-1"
                  >
                    {g}
                  </Badge>
                ))}
              </div>

              {movie.productionCompanies?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.productionCompanies.map((p) => (
                    <Badge
                      key={p.id}
                      variant="secondary"
                      className="bg-white/10 text-white/90 border-white/20 px-3 py-1.5"
                    >
                      {p.name}
                    </Badge>
                  ))}
                </div>
              )}

              {movie.languages?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.languages.map((l) => (
                    <Badge
                      key={l.iso_639_1}
                      variant="secondary"
                      className="bg-white/10 text-white/90 border-white/20 px-3 py-1.5"
                    >
                      {l.english_name}
                    </Badge>
                  ))}
                </div>
              )}

              {movie.homepage && (
                <div className="mb-6">
                  <a
                    href={movie.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-400 hover:underline"
                  >
                    Official Website
                  </a>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-white font-semibold mb-3 text-lg">
                Synopsis
              </h3>
              <p className="text-white/80 leading-relaxed">
                {movie.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <Separator className="bg-white/10 mb-10" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                User Reviews
              </h2>
              <div className="flex items-center gap-3">
                <StarRating
                  rating={Math.round(parseFloat(averageRating))}
                  size="md"
                />
                <span className="text-white font-semibold">
                  {averageRating}
                </span>
                <span className="text-white/50">
                  ({reviews.length} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Add Review Form */}
          <Card className="glass-card border-white/10 mb-8">
            <CardContent className="p-6">
              <h3 className="text-white font-semibold mb-4">Write a Review</h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="text-white/70 text-sm mb-2 block">
                    Your Rating
                  </label>
                  <StarRating
                    rating={newRating}
                    onRatingChange={setNewRating}
                    interactive={true}
                    size="lg"
                  />
                </div>
                <div>
                  <label className="text-white/70 text-sm mb-2 block">
                    Your Review
                  </label>
                  <Textarea
                    placeholder="Share your thoughts about this movie..."
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 min-h-[100px] focus:border-violet-500/50"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={!newReview.trim() || newRating === 0}
                  className="bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Review
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div
                  key={review.id}
                  className="opacity-0 grid-item-reveal"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ReviewCard review={review} />
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                  <Star className="w-8 h-8 text-white/30" />
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">
                  No Reviews Yet
                </h3>
                <p className="text-white/60">
                  Be the first to review this movie!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
