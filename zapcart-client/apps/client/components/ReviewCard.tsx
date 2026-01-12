"use client";

import { useState } from "react";
import { IProductReview } from "@/types/productReviews";
import { Star, ThumbsUp, ThumbsDown, BadgeCheck, MessageSquare, Image as ImageIcon } from "lucide-react";
import { Button } from "@repo/ui/ui/button";
import { cn } from "@repo/lib/utils";
import { format } from "date-fns";

interface ReviewCardProps {
    review: IProductReview;
    onVoteHelpful?: (reviewId: string, voteType: 'helpful' | 'notHelpful') => void;
}

export function ReviewCard({ review, onVoteHelpful }: ReviewCardProps) {
    const [userVote, setUserVote] = useState<'helpful' | 'notHelpful' | null>(null);
    const [showImages, setShowImages] = useState(false);

    // Get initials from userName
    const getInitials = (name: string) => {
        const parts = name.split(' ');
        if (parts.length >= 2) {
            return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    const handleVote = (voteType: 'helpful' | 'notHelpful') => {
        if (userVote === voteType) {
            setUserVote(null); // Remove vote if clicking same button
        } else {
            setUserVote(voteType);
            onVoteHelpful?.(review.id, voteType);
        }
    };

    const formatDate = (date: Date) => {
        try {
            return format(new Date(date), 'MMM dd, yyyy');
        } catch {
            return new Date(date).toLocaleDateString();
        }
    };

    return (
        <div className="py-6 border rounded-lg p-6 mb-4 bg-gray-50">
            <div className="flex items-start gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center shrink-0">
                    {review?.user?.avatarUrl ? (
                        <img 
                            src={review.user.avatarUrl} 
                            alt={review.user.name} 
                            className="w-full h-full rounded-full object-cover"
                        />
                    ) : (
                        <span className="text-sm font-semibold text-white">
                            {review?.user ? getInitials(review.user.name || "Anonymous User") : "AU"}
                        </span>
                    )}
                </div>
                <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{review?.user ? review.user.name : "Anonymous"}</h4>
                            {review.isVerifiedPurchase && (
                                <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                                    <BadgeCheck className="w-4 h-4" />
                                    <span>Verified Purchase</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{formatDate(review.createdAt)}</span>
                    <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${
                                    i < review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "fill-gray-300 text-gray-300"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
            
            {review.title && (
                <h5 className="font-semibold text-base mb-2 ml-16">{review.title}</h5>
            )}
            
            <p className="text-sm text-gray-600 leading-relaxed ml-16 mb-4">{review.comment}</p>

            {/* Review Images */}
            {review.images && review.images.length > 0 && (
                <div className="ml-16 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <ImageIcon className="w-4 h-4 text-muted-foreground" />
                        <button 
                            onClick={() => setShowImages(!showImages)}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            {showImages ? 'Hide' : 'View'} {review.images.length} {review.images.length === 1 ? 'image' : 'images'}
                        </button>
                    </div>
                    {showImages && (
                        <div className="flex gap-2 flex-wrap">
                            {review.images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`Review image ${idx + 1}`}
                                    className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Helpful Votes */}
            <div className="ml-16 flex items-center gap-4 pt-3 border-t">
                <span className="text-sm text-muted-foreground">Was this helpful?</span>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVote('helpful')}
                        className={cn(
                            "h-8 px-3 gap-1.5",
                            userVote === 'helpful' && "bg-green-50 border-green-600 text-green-600"
                        )}
                    >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">{review.helpfulCount}</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVote('notHelpful')}
                        className={cn(
                            "h-8 px-3 gap-1.5",
                            userVote === 'notHelpful' && "bg-red-50 border-red-600 text-red-600"
                        )}
                    >
                        <ThumbsDown className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">{review.notHelpfulCount}</span>
                    </Button>
                </div>
                {review.helpfulnessRatio > 0 && (
                    <span className="text-xs text-muted-foreground">
                        {Math.round(review.helpfulnessRatio * 100)}% found this helpful
                    </span>
                )}
            </div>

            {/* Seller/Admin Reply */}
            {review.reply && (
                <div className="ml-16 mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-blue-600 mt-0.5" />
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-semibold text-blue-900">{review.reply.repliedBy.name}</span>
                                <span className="text-xs text-blue-600">responded</span>
                                <span className="text-xs text-muted-foreground">
                                    {formatDate(review.reply.repliedAt)}
                                </span>
                            </div>
                            <p className="text-sm text-gray-700">{review.reply.content}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
