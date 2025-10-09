"use client";

import { cn } from "@/lib/cn";

export function FirstFeaturesSection() {
	const features = [
		{
			title: "Facial Authentication",
			description:
				"Validate faces between images or templates with 5 different methods for secure verification.",
			icon: (
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<circle cx="12" cy="10" r="3"/>
					<circle cx="12" cy="12" r="10"/>
					<path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>
				</svg>
			),
		},
		{
			title: "Passive Liveness Detection",
			description:
				"Verify live person presence in selfies using tokenized images with anti-spoofing technology.",
			icon: (
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<circle cx="12" cy="12" r="10"/>
					<path d="m9 12 2 2 4-4"/>
				</svg>
			),
		},
		{
			title: "Identity Validation",
			description:
				"Combined liveness validation and facial comparison between document photo and selfie.",
			icon: (
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
					<path d="m9 12 2 2 4-4"></path>
				</svg>
			),
		},
		{
			title: "Document Data Extraction",
			description:
				"Extract all data from ID documents using OCR for MRZ, barcodes, and visible fields.",
			icon: (
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<rect width="20" height="14" x="2" y="5" rx="2"/>
					<path d="M8 11h.01"/>
					<path d="M8 15h6"/>
					<path d="M17 11h.01"/>
				</svg>
			),
		},
		{
			title: "Facial Extraction",
			description:
				"Detect and validate facial characteristics including age, gender, and glasses detection.",
			icon: (
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<circle cx="12" cy="8" r="3"/>
					<path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
					<path d="M19 8h2"/>
					<path d="M19 12h2"/>
					<path d="M3 8h2"/>
					<path d="M3 12h2"/>
				</svg>
			),
		},
		{
			title: "Civil Validation",
			description:
				"Validate identity data and facial biometrics against official Civil Registry records.",
			icon: (
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
					<circle cx="9" cy="7" r="4"></circle>
					<path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
					<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
				</svg>
			),
		},
		{
			title: "Morphology",
			description:
				"Validate document authenticity through morphological analysis of ID structure and features.",
			icon: (
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<circle cx="11" cy="11" r="8"/>
					<path d="m21 21-4.3-4.3"/>
					<path d="M11 8v6"/>
					<path d="M8 11h6"/>
				</svg>
			),
		},
		{
			title: "User Authentication",
			description:
				"Authenticate registered users with biometric templates and liveness validation.",
			icon: (
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
					<path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
				</svg>
			),
		},
		{
			title: "Injection Attack Detection",
			description:
				"Detect virtual cameras, deep fakes, and face morphing attacks with advanced security analysis.",
			icon: (
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
					<path d="M12 8v4"></path>
					<path d="M12 16h.01"></path>
				</svg>
			),
		},
	];
	return (
		<div className="flex flex-col justify-center items-center mt-20">
			<h2 className="font-display text-3xl tracking-tight text-primary sm:text-4xl text-center">
				Core Services
			</h2>
			<p className="mt-4 text-lg tracking-tight text-fd-muted-foreground text-center max-w-2xl px-4">
				Comprehensive identity verification platform with biometric authentication, document validation, and advanced security capabilities.
			</p>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 w-full max-w-[1100px] mx-auto mt-10 px-2">
				{features.map((feature, index) => (
					<Feature key={feature.title} {...feature} index={index} />
				))}
			</div>
		</div>
	);
}

const Feature = ({
	title,
	description,
	icon,
	index,
}: {
	title: string;
	description: string;
	icon: React.ReactNode;
	index: number;
}) => {
	return (
		<div
			className={cn(
				"flex flex-col lg:border-r py-10 relative group/feature border-fd-border",
				(index % 3 === 0) && "lg:border-l border-fd-border",
				index < 6 && "lg:border-b border-fd-border",
			)}
		>
			{index < 4 && (
				<div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-fd-primary/10 to-transparent pointer-events-none" />
			)}
			{index >= 4 && (
				<div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-fd-primary/10 to-transparent pointer-events-none" />
			)}
			<div className="mb-4 relative z-10 px-10">
				<div className="inline-flex items-center justify-center w-12 h-12 rounded-lg border border-fd-border bg-fd-background/50 text-fd-muted-foreground group-hover/feature:border-fd-primary/50 group-hover/feature:bg-fd-primary/5 transition-colors duration-200">
					{icon}
				</div>
			</div>
			<div className="text-lg font-bold mb-2 relative z-10 px-10">
				<div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-fd-muted group-hover/feature:bg-fd-primary transition-all duration-200 origin-center" />
				<span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-fd-foreground">
					{title}
				</span>
			</div>
			<p className="text-sm text-fd-muted-foreground lg:max-w-xs relative z-10 px-10">
				{description}
			</p>
		</div>
	);
};
