import { Building2, Mail, MapPin, Phone, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function ContactCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="rounded-[1.5rem] border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal-50">
          {icon}
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-950">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
        </div>
      </div>
    </Card>
  );
}

export function ContactSection() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
        <div className="space-y-5">
          <ContactCard
            icon={<MapPin className="h-5 w-5 text-teal-700" />}
            title="Company address"
            description="Nowl More, Roras Road, P.O Box 1092, Sialkot 51310, Pakistan"
          />

          <ContactCard
            icon={<Mail className="h-5 w-5 text-teal-700" />}
            title="Email"
            description="info@acme-cw.com | acme-cw@live.com"
          />

          <ContactCard
            icon={<Phone className="h-5 w-5 text-teal-700" />}
            title="Phone"
            description="+92 052 3558738, +92 052 3563693"
          />

          <Card className="rounded-[1.75rem] border-slate-200 bg-slate-50 p-6 shadow-sm">
            <Building2 className="h-6 w-6 text-teal-700" />
            <h2 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-slate-950">
              Sales & distribution inquiries
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Use the form for distributor requests, OEM/private-label
              requirements, product specifications, catalog requests, and bulk
              quotation inquiries.
            </p>
          </Card>
        </div>

        <Card className="rounded-[2rem] border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-700">
              Inquiry form
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tighter text-slate-950">
              Tell us what you need.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              This is a frontend-only form. Connect it later to email,
              database, CRM, or admin inquiry management.
            </p>
          </div>

          <form className="mt-8 grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Full name
                </label>
                <Input
                  className="mt-2 h-12 rounded-xl"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Company
                </label>
                <Input
                  className="mt-2 h-12 rounded-xl"
                  placeholder="Company name"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Email
                </label>
                <Input
                  type="email"
                  className="mt-2 h-12 rounded-xl"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Country
                </label>
                <Input
                  className="mt-2 h-12 rounded-xl"
                  placeholder="Your country"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Inquiry type
              </label>
              <Select>
                <SelectTrigger className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10">
                  <SelectValue placeholder="Select inquiry type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="product-inquiry">
                    Product inquiry
                  </SelectItem>
                  <SelectItem value="request-quote">
                    Catalog request
                  </SelectItem>
                  <SelectItem value="oem-private-label">
                    Export inquiry
                  </SelectItem>
                  <SelectItem value="distribution-inquiry">
                    Distribution inquiry
                  </SelectItem>
                  <SelectItem value="quality-documentation">
                    Quality documentation
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Message
              </label>
              <Textarea
                className="mt-2 min-h-36 rounded-xl"
                placeholder="Mention product categories, SKUs, quantities, OEM/private-label needs, packaging requirements, or target market."
              />
            </div>

            <Button type="submit" size="lg" className="rounded-full">
              Send Inquiry <Send className="h-4 w-4" />
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
