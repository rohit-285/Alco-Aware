import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import Button from '../ui/Button';

// Validation Schema
const reviewSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name too long"),
  rating: z.number().min(1, "Please leave a rating").max(5),
  comment: z.string().max(500, "Comment must be under 500 characters").optional()
});

const Skeleton = () => (
  <div className="glass-panel p-6 rounded-2xl animate-pulse">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-full bg-white/10" />
      <div>
        <div className="h-4 w-32 bg-white/10 rounded mb-2" />
        <div className="h-3 w-20 bg-white/10 rounded" />
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-3 w-full bg-white/10 rounded" />
      <div className="h-3 w-5/6 bg-white/10 rounded" />
    </div>
  </div>
);

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form setup
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 5, name: '', comment: '' }
  });

  const watchRating = watch('rating');
  const watchComment = watch('comment') || "";

  // Fetch reviews function
  const fetchReviews = async (pageNum = 1, append = false) => {
    setIsLoading(true);
    try {
      const res = await api.get(`/reviews?page=${pageNum}&limit=6`);
      if (res.success) {
        if (append) {
          setReviews(prev => [...prev, ...res.data.reviews]);
        } else {
          setReviews(res.data.reviews);
        }
        setHasMore(pageNum < res.data.pages);
      }
    } catch (err) {
      toast.error('Failed to load reviews');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchReviews(1);
  }, []);

  // Form Submission
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await api.post('/reviews', data);
      if (res.success) {
        toast.success('Thanks for your review!');
        reset();
        // Refresh first page to show new review
        fetchReviews(1);
        setPage(1);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchReviews(nextPage, true);
  };

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 border-t border-border mt-12 mb-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-sora font-semibold text-white">Community Feedback 💬</h2>
        <p className="text-text-muted mt-3">What others are saying about AlcoAware.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Col - Submit Form */}
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 rounded-3xl sticky top-24"
          >
            <h3 className="font-sora text-xl text-white mb-6">Leave a Review</h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Rating */}
              <div>
                <label className="block text-sm font-inter text-text-muted mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setValue('rating', star, { shouldValidate: true })}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star 
                        size={28} 
                        fill={star <= watchRating ? 'var(--primary)' : 'transparent'}
                        color={star <= watchRating ? 'var(--primary)' : 'var(--border)'}
                        className="transition-colors drop-shadow-sm"
                      />
                    </button>
                  ))}
                </div>
                {errors.rating && <p className="text-danger text-xs mt-1">{errors.rating.message}</p>}
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-inter text-text-muted mb-2">Name</label>
                <input 
                  type="text"
                  {...register("name")}
                  className="w-full bg-bg-surface/50 border border-border focus:ring-primary/50 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none focus:ring-2 transition-all"
                  placeholder="Your Name (or alias)"
                />
                {errors.name && <p className="text-danger text-xs mt-1">{errors.name.message}</p>}
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-inter text-text-muted mb-2 flex justify-between">
                  <span>Comment</span>
                  <span className="text-xs opacity-50">{watchComment.length}/500</span>
                </label>
                <textarea 
                  {...register("comment")}
                  className="w-full bg-bg-surface/50 border border-border focus:ring-primary/50 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none focus:ring-2 transition-all resize-none h-32"
                  placeholder="How was your experience?"
                />
                {errors.comment && <p className="text-danger text-xs mt-1">{errors.comment.message}</p>}
              </div>

              {/* Submit */}
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Submitting...' : 'Post Review'}
              </Button>

            </form>
          </motion.div>
        </div>

        {/* Right Col - Reviews Grid */}
        <div className="lg:col-span-2">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <AnimatePresence>
              {reviews.map((review, idx) => (
                <motion.div
                  key={review._id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (idx % 6) * 0.1 }} // subtle stagger for freshly loaded batch
                  className="glass-panel p-6 rounded-2xl flex flex-col h-full"
                >
                  <div className="flex items-center gap-4 mb-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center font-sora font-bold text-lg shadow-inner">
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-sora text-white text-sm font-medium">{review.name}</h4>
                      <p className="text-xs text-text-muted font-inter">
                        {new Date(review.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    {/* Stars top right */}
                    <div className="ml-auto flex shrink-0">
                       {[...Array(5)].map((_, i) => (
                         <Star 
                           key={i} 
                           size={14} 
                           fill={i < review.rating ? 'var(--primary)' : 'transparent'} 
                           color={i < review.rating ? 'var(--primary)' : 'var(--border)'} 
                         />
                       ))}
                    </div>
                  </div>
                  
                  {review.comment ? (
                    <p className="font-inter text-sm text-text-primary/80 leading-relaxed italic line-clamp-4 hover:line-clamp-none transition-all">
                      "{review.comment}"
                    </p>
                  ) : (
                    <p className="font-inter text-sm text-text-muted/50 italic flex items-center gap-2">
                       <MessageSquare size={14} /> Only left a rating
                    </p>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Loading skeletons */}
            {isLoading && [...Array(hasMore ? 2 : 0)].map((_, i) => <Skeleton key={'skel'+i} />)}
          </div>

          {!isLoading && reviews.length === 0 && (
            <div className="w-full p-12 text-center border-2 border-dashed border-border rounded-3xl text-text-muted">
              <span className="text-6xl mb-4 block">✨</span>
              <p className="font-sora text-lg text-white mb-2">No reviews yet!</p>
              <p className="font-inter text-sm">Be the first to share your experience using the form on the left.</p>
            </div>
          )}

          {/* Load More */}
          {hasMore && reviews.length > 0 && !isLoading && (
            <div className="mt-12 flex justify-center">
              <Button variant="outline" onClick={loadMore}>
                Load More Reviews
              </Button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

export default Reviews;
