import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, FONTS} from '../constants';

export const SceneIntro: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const titleScale = spring({
		frame,
		fps,
		config: {damping: 18, stiffness: 80, mass: 1.2},
		from: 0.6,
		to: 1,
	});
	const titleOpacity = interpolate(frame, [0, 12], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const subtitleOpacity = interpolate(frame, [20, 40], [0, 1], {
		extrapolateRight: 'clamp',
	});
	const subtitleY = interpolate(frame, [20, 40], [20, 0], {
		extrapolateRight: 'clamp',
	});

	const badgeOpacity = interpolate(frame, [40, 58], [0, 1], {
		extrapolateRight: 'clamp',
	});

	return (
		<div
			style={{
				width: 1920,
				height: 1080,
				backgroundColor: COLORS.bg,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				position: 'relative',
				overflow: 'hidden',
			}}
		>
			{/* Background grid lines */}
			<svg
				style={{position: 'absolute', top: 0, left: 0, opacity: 0.06}}
				width="1920"
				height="1080"
			>
				{Array.from({length: 20}).map((_, i) => (
					<line
						key={`h${i}`}
						x1={0}
						y1={i * 56}
						x2={1920}
						y2={i * 56}
						stroke={COLORS.textSecondary}
						strokeWidth={1}
					/>
				))}
				{Array.from({length: 35}).map((_, i) => (
					<line
						key={`v${i}`}
						x1={i * 56}
						y1={0}
						x2={i * 56}
						y2={1080}
						stroke={COLORS.textSecondary}
						strokeWidth={1}
					/>
				))}
			</svg>

			{/* Title */}
			<div
				style={{
					opacity: titleOpacity,
					transform: `scale(${titleScale})`,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 16,
				}}
			>
				<div
					style={{
						fontFamily: FONTS.heading,
						fontSize: 72,
						fontWeight: 800,
						color: COLORS.textPrimary,
						letterSpacing: '-0.02em',
						textAlign: 'center',
						lineHeight: 1.1,
					}}
				>
					Service Order
					<br />
					<span style={{color: COLORS.statusProduction}}>
						Management System
					</span>
				</div>

				{/* Subtitle */}
				<div
					style={{
						opacity: subtitleOpacity,
						transform: `translateY(${subtitleY}px)`,
						fontFamily: FONTS.mono,
						fontSize: 18,
						color: COLORS.textSecondary,
						letterSpacing: '0.08em',
						textAlign: 'center',
					}}
				>
					WORKFLOW OVERVIEW
				</div>

				{/* Status badges row */}
				<div
					style={{
						opacity: badgeOpacity,
						display: 'flex',
						gap: 12,
						marginTop: 12,
						flexWrap: 'wrap',
						justifyContent: 'center',
					}}
				>
					{[
						{label: 'PENDING_FINANCE', color: COLORS.statusPending},
						{label: 'APPROVED', color: COLORS.statusApproved},
						{label: 'REJECTED', color: COLORS.statusRejected},
						{label: 'IN_PRODUCTION', color: COLORS.statusProduction},
						{label: 'COMPLETED', color: COLORS.statusCompleted},
					].map(({label, color}) => (
						<div
							key={label}
							style={{
								backgroundColor: `${color}18`,
								border: `1px solid ${color}55`,
								borderRadius: 6,
								paddingLeft: 10,
								paddingRight: 10,
								paddingTop: 4,
								paddingBottom: 4,
								fontFamily: FONTS.mono,
								fontSize: 11,
								color,
								fontWeight: 700,
								letterSpacing: '0.04em',
							}}
						>
							{label}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
