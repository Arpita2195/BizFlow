import React, { useState } from "react";
import { Star, MessageSquare } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { ratingDistribution } from "../../data/demoData";
import { Card, Avatar, Input, Button, Badge, EmptyState } from "../../components/ui/Primitives";
import PageHeader from "../../components/ui/PageHeader";

export default function Reviews() {
  const { reviews, addReviewReply } = useApp();
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});

  const avg = reviews.length > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : "0.0";

  const handleSendReply = (reviewId: string) => {
    const text = replyTextMap[reviewId];
    if (!text) return;
    addReviewReply(reviewId, text);
    setReplyTextMap((prev) => ({ ...prev, [reviewId]: "" }));
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <PageHeader title="Customer Reviews & Ratings" subtitle="Track customer satisfaction, star ratings, and engage directly with feedback" />

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-5 flex flex-col justify-between">
          <div>
            <p className="text-xs text-bronze font-semibold uppercase tracking-wider mb-1">Average Star Rating</p>
            <div className="flex items-center gap-3 mb-2">
              <p className="font-display text-4xl font-bold text-charcoal">{avg}</p>
              <div className="flex text-[#3B82F6]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
            </div>
          </div>
          <p className="text-xs text-bronze">Based on {reviews.length} verified customer feedback ratings</p>
        </Card>

        <Card className="lg:col-span-2 p-5 flex flex-col justify-center gap-2">
          <h3 className="font-display text-sm font-bold text-charcoal mb-1">Rating Breakdown Distribution</h3>
          {ratingDistribution.map((r) => (
            <div key={r.stars} className="flex items-center gap-3">
              <span className="text-xs font-semibold text-bronze w-10">{r.stars} ★</span>
              <div className="flex-1 h-2.5 bg-bronze/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#3B82F6]" style={{ width: `${reviews.length > 0 ? r.pct : 0}%` }} />
              </div>
              <span className="text-xs font-bold text-charcoal w-10 text-right">{reviews.length > 0 ? r.pct : 0}%</span>
            </div>
          ))}
        </Card>
      </div>

      {/* Reviews List */}
      <div className="flex flex-col gap-4">
        {reviews.length > 0 ? (
          reviews.map((r) => (
            <Card key={r.id} className="p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Avatar name={r.customer} size={40} />
                  <div>
                    <h4 className="text-sm font-bold text-charcoal">{r.customer}</h4>
                    <p className="text-xs text-bronze">{r.service} • {r.date}</p>
                  </div>
                </div>
                <div className="flex text-[#3B82F6] shrink-0">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
              </div>

              <p className="text-xs text-charcoal leading-relaxed bg-white/40 p-3 rounded-lg border border-bronze/15">
                "{r.comment}"
              </p>

              {/* Existing Owner Reply */}
              {r.reply && (
                <div className="p-3 rounded-lg bg-gold/10 border border-gold/20 text-xs ml-4">
                  <span className="font-bold text-charcoal block mb-0.5 flex items-center gap-1">
                    <MessageSquare size={13} className="text-gold" /> Business Owner Response:
                  </span>
                  <p className="text-bronze">{r.reply}</p>
                </div>
              )}

              {/* Post Reply Input */}
              {!r.reply && (
                <div className="mt-1 flex items-center gap-2">
                  <Input
                    placeholder="Write a response to this review..."
                    value={replyTextMap[r.id] || ""}
                    onChange={(e) => setReplyTextMap({ ...replyTextMap, [r.id]: e.target.value })}
                    className="text-xs py-2"
                  />
                  <Button size="sm" variant="secondary" onClick={() => handleSendReply(r.id)}>
                    Post Reply
                  </Button>
                </div>
              )}
            </Card>
          ))
        ) : (
          <EmptyState
            icon={Star}
            title="No Customer Reviews Collected Yet"
            message="When clients complete their appointments and leave feedback, their ratings and reviews will appear here."
          />
        )}
      </div>
    </div>
  );
}
