import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {COLORS, FONTS} from '../constants';
import {BranchLabelProps} from '../types';

export const BranchLabel: React.FC<BranchLabelProps> = ({
	text,
	x,
	y,
	enterFrame,
	color = COLORS.textSecondary,
}) => {
	const frame = useCurrentFrame();
	const localFrame = Math.max(0, frame - enterFrame);
	const opacity = interpolate(localFrame, [0, 10], [0, 1], {
		extrapolateRight: 'clamp',
	});
	const scale = interpolate(localFrame, [0, 10], [0.85, 1], {
		extrapolateRight: 'clamp',
	});

	return (
		<div
			style={{
				position: 'absolute',
				left: x,
				top: y,
				opacity,
				transform: `scale(${scale})`,
				transformOrigin: 'center center',
				backgroundColor: `${color}18`,
				border: `1px solid ${color}44`,
				borderRadius: 4,
				paddingLeft: 8,
				paddingRight: 8,
				paddingTop: 3,
				paddingBottom: 3,
				whiteSpace: 'nowrap',
			}}
		>
			<span
				style={{
					color,
					fontFamily: FONTS.mono,
					fontSize: 11,
					fontWeight: 700,
					letterSpacing: '0.05em',
				}}
			>
				{text}
			</span>
		</div>
	);
};
