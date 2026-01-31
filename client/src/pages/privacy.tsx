import { Link } from "wouter";
import { Card } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-privacy">
      <div className="mx-auto w-full max-w-4xl px-4 py-10 md:px-6 md:py-14">
        <Link href="/">
          <a className="text-sm text-muted-foreground underline-offset-4 hover:underline" data-testid="link-privacy-back">
            Back to site
          </a>
        </Link>

        <h1 className="mt-6 font-serif text-3xl font-semibold tracking-tight" data-testid="text-privacy-title">
          Privacy Policy
        </h1>
        <p className="mt-2 text-muted-foreground" data-testid="text-privacy-subtitle">
          This is a placeholder privacy policy page for the prototype.
        </p>

        <Card className="mt-6 rounded-2xl border bg-card p-6" data-testid="card-privacy">
          <div className="text-sm text-muted-foreground" data-testid="text-privacy-body">
            Add your privacy policy content here.
          </div>
        </Card>
      </div>
    </div>
  );
}
