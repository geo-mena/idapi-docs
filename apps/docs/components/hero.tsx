"use client";

import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import AnimatedGradientText from "./ui/animated-gradient-text";
import AnimatedGridPattern from "./ui/animated-grid-pattern";
import { buttonVariants } from "./ui/button";
import HeroVideoDialog from "./ui/hero-video-dialog";

export function Hero() {
	const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsCopied(false);
		}, 2000);
		return () => clearTimeout(timer);
	}, [isCopied]);
	return (
		<div className="relative w-full min-h-[calc(100vh-200px)]">
			<div className="absolute inset-0 -z-10" />
			<div className="relative flex w-full items-center justify-center overflow-hidden bg-background/95 backdrop-blur-sm py-16 md:py-24 [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]">
				<div className="relative px-4 w-full max-w-6xl">
					<div className="text-center">
						<motion.a
							href="https://facephi.com"
							target="_blank"
							rel="noopener noreferrer"
							className="relative z-10 mb-4 inline-block"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
						>
							<div className="z-10 flex items-center justify-center">
								<AnimatedGradientText>
									🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
									<span
										className={cn(
											"inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent",
										)}
									>
										Introducing Facephi
									</span>
									<ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
								</AnimatedGradientText>
							</div>
						</motion.a>

						<motion.h1
							className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-muted-foreground sm:text-7xl"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
						>
							Identity{" "}
							<span className="relative whitespace-nowrap  text-primary">
								<svg
									aria-hidden="true"
									viewBox="0 0 418 42"
									className="absolute left-0 top-2/3 h-[0.58em] w-full fill-[#5965F2]"
									preserveAspectRatio="none"
								>
									<path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
								</svg>
								<span className="relative">Platform</span>
							</span>{" "}
							Documentation
						</motion.h1>
						<motion.p
							className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-fd-muted-foreground"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: 0.2 }}
						>
							Explore our detailed guides featuring best practices and integration examples for the Facephi Identity Platform.
						</motion.p>
						<motion.div
							className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: 0.4 }}
						>
							<div className="flex flex-col gap-6">
								<div className="mx-auto mt-6 grid w-full max-w-sm grid-cols-1 md:grid-cols-2 gap-3">
									<Link
										href="https://github.com/facephi"
										aria-label="Facephi on GitHub"
										target="_blank"
										className={cn(buttonVariants({ size: 'lg', className: 'w-full rounded-full flex flex-row items-center gap-2' }))}
									>
										<svg aria-hidden="true" className="h-6 w-6 fill-white dark:fill-black">
											<path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
										</svg>
										GitHub
									</Link>
									<Link
										href="/docs/services"
										aria-label="Documentation"
										className={cn(buttonVariants({ size: 'lg', className: 'w-full rounded-full bg-gradient-to-b from-[#5965F2] to-[#5965F2]/60 hover:bg-[#4A55E0] flex flex-row items-center gap-2 text-white shadow-inner shadow-white/20' }))}
									>
										<svg aria-hidden="true" className="h-6 w-6 fill-white" viewBox="0 0 24 24">
											<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
										</svg>
										Documentation
									</Link>
								</div>
							</div>
						</motion.div>
					</div>
					<motion.div
						className="mx-auto mt-10 max-w-2xl"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, delay: 0.6 }}
					>
						<div className="mt-10 flex flex-row justify-center gap-x-8 rounded-lg sm:gap-x-0  sm:gap-y-10 xl:gap-x-12 xl:gap-y-0">
							<HeroVideoDialog
								className="block w-full max-w-md rounded-xl"
								animationStyle="top-in-bottom-out"
								videoSrc="https://www.youtube.com/embed/SJbqZEMgwO0?si=tK7a2d9-c_sMsFTN"
								thumbnailSrc="/miniature.png"
								thumbnailAlt="Hero Video"
							/>
						</div>
					</motion.div>
				</div>
				<AnimatedGridPattern
					numSquares={30}
					maxOpacity={0.1}
					height={40}
					width={40}
					duration={3}
					repeatDelay={1}
					className={cn(
						"[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
						"absolute inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
					)}
				/>
			</div>
		</div>
	);
}
