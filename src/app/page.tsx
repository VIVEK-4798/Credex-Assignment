'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-32 sm:px-6 lg:px-8">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
        
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Stop Overpaying for{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI Tools
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Get a free audit of your AI stack in under 2 minutes. Discover how much you could save.
          </p>
          
          <Link href="/audit">
            <Button size="lg" className="gap-2 text-base h-12 px-8">
              Audit My AI Spend
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>

          {/* Trust indicator */}
          <p className="mt-10 text-sm text-gray-500">
            ✨ No credit card required • Takes 2 minutes
          </p>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {/* Stat 1 */}
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">120+</div>
              <p className="text-gray-600">Startup teams trust us</p>
            </div>

            {/* Stat 2 */}
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">$40k+</div>
              <p className="text-gray-600">Saved in AI spend</p>
            </div>

            {/* Stat 3 */}
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">2 min</div>
              <p className="text-gray-600">Average audit time</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-32 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get actionable insights in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-8 text-center hover:shadow-lg transition-shadow">
                <div className="mb-4 text-4xl">📋</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Enter Your Tools
                </h3>
                <p className="text-gray-600">
                  List the AI tools your team uses and current spend per tool.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-8 text-center hover:shadow-lg transition-shadow">
                <div className="mb-4 text-4xl">🔍</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Get Your Audit
                </h3>
                <p className="text-gray-600">
                  We analyze your stack and identify waste and duplicate subscriptions.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-8 text-center hover:shadow-lg transition-shadow">
                <div className="mb-4 text-4xl">💰</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Save Money
                </h3>
                <p className="text-gray-600">
                  Get recommendations to cut costs without sacrificing quality.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Link href="/audit">
              <Button size="lg" className="gap-2 text-base h-12 px-8">
                Start Your Free Audit
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            What You&apos;ll Discover
          </h2>
          <div className="space-y-6">
            {[
              'Duplicate tool subscriptions you didn&apos;t know about',
              'Unused features in your current plans',
              'Cost-effective alternatives for your needs',
              'Negotiation tips with vendors',
              'Consolidation opportunities'
            ].map((feature, i) => (
              <div key={i} className="flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <p className="text-lg text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-8">
            {/* Left side */}
            <div>
              <p className="text-gray-600 mb-4">
                Built for the Credex assignment.
              </p>
            </div>

            {/* Right side - Links */}
            <div className="flex justify-end gap-8">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                GitHub
              </a>
              <a
                href="#privacy"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Privacy
              </a>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-200 pt-8">
            <p className="text-center text-sm text-gray-500">
              © 2026 AI Spend Audit. Built to help startups optimize their AI tool spending.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
