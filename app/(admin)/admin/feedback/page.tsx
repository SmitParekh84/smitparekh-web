"use client";

import { Star, Mail, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFeedbackList } from "@/hooks/api/use-feedback";

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={
            n <= rating
              ? "h-3.5 w-3.5 fill-yellow-500 text-yellow-500"
              : "h-3.5 w-3.5 text-muted-foreground/30"
          }
        />
      ))}
    </div>
  );
}

export default function FeedbackPage() {
  const { data: feedback, isLoading, isError, refetch } = useFeedbackList();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Feedback</h2>
        <p className="text-sm text-muted-foreground">
          What visitors are saying about the site.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All entries</CardTitle>
          <CardDescription>
            {feedback ? `${feedback.length} total` : "—"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          )}

          {isError && (
            <div className="py-12 text-center">
              <p className="mb-3 text-sm text-muted-foreground">
                Could not load feedback. Is the backend running?
              </p>
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                Retry
              </Button>
            </div>
          )}

          {!isLoading && !isError && feedback && feedback.length === 0 && (
            <p className="py-12 text-center text-sm text-muted-foreground">
              No feedback yet.
            </p>
          )}

          {!isLoading && !isError && feedback && feedback.length > 0 && (
            <ul className="divide-y divide-border">
              {feedback.map((entry) => (
                <li key={entry._id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium">{entry.name || "Anonymous"}</span>
                        {entry.email && (
                          <a
                            href={`mailto:${entry.email}`}
                            className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-blue-500"
                          >
                            <Mail className="h-3 w-3" />
                            {entry.email}
                          </a>
                        )}
                        {typeof entry.rating === "number" && (
                          <Badge variant="secondary" className="gap-1.5">
                            <StarRow rating={entry.rating} />
                          </Badge>
                        )}
                      </div>
                      <p className="mt-2 whitespace-pre-line text-sm text-foreground/90">
                        {entry.message}
                      </p>
                    </div>
                    <time className="shrink-0 text-xs text-muted-foreground">
                      {new Date(entry.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
