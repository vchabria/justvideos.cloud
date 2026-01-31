import { Link } from "wouter";
import { Card } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-terms">
      <div className="mx-auto w-full max-w-4xl px-4 py-10 md:px-6 md:py-14">
        <Link href="/">
          <a className="text-sm text-muted-foreground underline-offset-4 hover:underline" data-testid="link-terms-back">
            Back to site
          </a>
        </Link>

        <h1 className="mt-6 font-serif text-3xl font-semibold tracking-tight" data-testid="text-terms-title">
          Terms of Service
        </h1>
        <p className="mt-2 text-muted-foreground" data-testid="text-terms-subtitle">
          This is a placeholder terms page for the prototype.
        </p>

        <Card className="mt-6 rounded-2xl border bg-card p-6" data-testid="card-terms">
          <div className="text-sm text-muted-foreground" data-testid="text-terms-body">
            Add your terms of service content here.
          </div>
        </Card>
      </div>
    </div>
  );
}
