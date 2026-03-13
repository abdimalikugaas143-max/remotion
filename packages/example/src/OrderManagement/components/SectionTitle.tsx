import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {COLORS, FONTS} from '../constants';
import {SectionTitleProps} from '../types';

export const SectionTitle: React.FC<SectionTitleProps> = ({
	title,
	subtitle,
	enterFrame,
}) => {
	const frame = useCurrentFrame();
	const localFrame = Math.max(0, frame - enterFrame);

	const opacity = interpolate(localFrame, [0, 15], [0, 1], {
		extrapolateRight: 'clamp',
	});
	const translateY = interpolate(localFrame, [0, 15], [-30, 0], {
		extrapolateRight: 'clamp',
	});

	return (
		<div
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				paddingTop: 28,
				paddingBottom: 20,
				paddingLeft: 60,
				opacity,
				transform: `translateY(${translateY}px)`,
				borderBottom: `1px solid ${COLORS.border}`,
				backgroundColor: `${COLORS.bg}cc`,
			}}
		>
			<div
				style={{
					fontFamily: FONTS.heading,
					fontSize: 18,
					fontWeight: 700,
					color: COLORS.textPrimary,
					letterSpacing: '0.02em',
				}}
			>
				{title}
			</div>
			{subtitle && (
				<div
					style={{
						fontFamily: FONTS.heading,
						fontSize: 13,
						color: COLORS.textSecondary,
						marginTop: 4,
					}}
				>
					{subtitle}
				</div>
			)}
		</div>
	);
};
