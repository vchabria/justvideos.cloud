import { Link } from "wouter";
import { ArrowRight, Lock, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const PAYMENT_URL = "https://imjo.in/3VsKPF";

export default function PaymentPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-background" data-testid="page-payment">
      <div className="mx-auto w-full max-w-3xl px-4 py-10 md:px-6 md:py-14">
        <div className="flex items-center justify-between gap-3">
          <Link href="/">
            <a className="text-sm text-muted-foreground underline-offset-4 hover:underline" data-testid="link-payment-back">
              Back to site
            </a>
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-sm" data-testid="badge-payment-secure">
            <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
            Secure payment
          </div>
        </div>

        <h1 className="mt-6 font-serif text-3xl font-semibold tracking-tight" data-testid="text-payment-title">
          Confirm your booking
        </h1>
        <p className="mt-2 text-muted-foreground" data-testid="text-payment-subtitle">
          To book a call, please complete the payment first. Once paid, you’ll be redirected to schedule your time.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card className="grain rounded-2xl border bg-card p-5 shadow-sm" data-testid="card-payment">
            <div className="flex items-center gap-2 text-sm font-medium" data-testid="text-payment-card-title">
              <Lock className="size-4 text-primary" aria-hidden="true" />
              Payment link
            </div>
            <p className="mt-2 text-sm text-muted-foreground" data-testid="text-payment-card-desc">
              Click below to open the payment page.
            </p>
            <div className="mt-4">
              <Button className="w-full rounded-xl" asChild data-testid="button-pay-now">
                <a href={PAYMENT_URL} target="_blank" rel="noreferrer">
                  Pay now
                  <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
            <div className="mt-3 text-xs text-muted-foreground" data-testid="text-payment-note">
              After payment, return here and click “Continue to booking”.
            </div>
          </Card>

          <Card className="grain rounded-2xl border bg-card p-5 shadow-sm" data-testid="card-booking">
            <div className="text-sm font-medium" data-testid="text-booking-card-title">
              Continue to booking
            </div>
            <p className="mt-2 text-sm text-muted-foreground" data-testid="text-booking-card-desc">
              This is where your calendar booking embed will live.
            </p>
            <div className="mt-4 aspect-video w-full rounded-xl border bg-muted/40" data-testid="embed-booking-calendar" />
            <div className="mt-4 flex gap-2">
              <Button variant="secondary" className="rounded-xl" asChild data-testid="button-booking-home">
                <Link href="/">
                  <a>Back</a>
                </Link>
              </Button>
              <Button className="rounded-xl" data-testid="button-booking-continue" disabled>
                Continue
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
