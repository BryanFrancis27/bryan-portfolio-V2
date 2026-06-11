import Image from "next/image";
import Link from "next/link";
import { FileText, Github, Linkedin, Mail } from "lucide-react";
import profileImage from "@/assets/AI-Profile.png";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { buttonVariants } from "@/components/ui/button";
import { contactChannels } from "@/data/contact";

export default function ContactPage() {
  return (
    <DashboardShell>
      <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.2fr)] 2xl:grid-cols-[minmax(22rem,0.7fr)_minmax(0,1.3fr)]">
        <section className="alien-panel rounded-lg border border-white/[0.08] p-6 md:p-8">
          <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.025] grayscale">
            <Image
              src={profileImage}
              alt="Portrait of Bryan Encarnacion"
              className="h-auto w-full object-cover"
              priority
            />
          </div>
          <div className="mt-6">
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-zinc-400">
              Contact Channel
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-white">Bryan Encarnacion</h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Software Engineer in Cebu, Philippines. Full Stack Developer and Product Builder.
            </p>
          </div>
        </section>

        <section className="min-w-0 space-y-4">
          <div className="alien-panel rounded-lg border border-white/[0.08] p-6 md:p-8">
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-zinc-400">
              Communication Port
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Open a Direct Channel</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Reach out for software engineering roles, full stack product work, or technical
              collaboration.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="mailto:bryanfrancis1027@gmail.com" className={buttonVariants({ size: "lg" })}>
                Email Bryan
                <Mail className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/ENCARNACION-RESUME.pdf" className={buttonVariants({ variant: "outline", size: "lg" })}>
                Download Resume
                <FileText className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {contactChannels.map((channel) => {
              const Icon =
                channel.label === "GitHub"
                  ? Github
                  : channel.label === "LinkedIn"
                    ? Linkedin
                    : channel.label === "Resume"
                      ? FileText
                      : Mail;

              return (
                <Link
                  key={channel.label}
                  href={channel.href}
                  className="alien-panel group rounded-lg border border-white/[0.08] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-white/20"
                >
                  <div className="flex min-w-0 items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/14 bg-white/[0.035] text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h2 className="text-lg font-semibold text-white">{channel.label}</h2>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{channel.detail}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
